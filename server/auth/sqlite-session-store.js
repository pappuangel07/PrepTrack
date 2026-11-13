'use strict';

const crypto = require('node:crypto');
const session = require('express-session');

const DEFAULT_IDLE_TIMEOUT_MS = 30 * 60 * 1000;
const DEFAULT_ABSOLUTE_TIMEOUT_MS = 7 * 24 * 60 * 60 * 1000;
const TOMBSTONE_GRACE_MS = 24 * 60 * 60 * 1000;

// Provenance never enters the serialized session data or request-controlled fields.
const sessionProvenance = new WeakMap();
const pendingGeneratedSid = new WeakMap();
const loadedProvenance = Symbol('preptrack.loaded-session-provenance');

function sessionError(message = 'Session is no longer valid.') {
  const error = new Error(message);
  error.code = 'PREPTRACK_SESSION_INVALID';
  return error;
}

function positiveTimestamp(value, name) {
  if (!Number.isSafeInteger(value) || value <= 0) throw new RangeError(`${name} must be a positive safe integer.`);
  return value;
}

function safeAdd(left, right, label) {
  const result = left + right;
  if (!Number.isSafeInteger(result) || result <= 0) throw new RangeError(`${label} exceeds the safe timestamp range.`);
  return result;
}

class SQLiteSessionStore extends session.Store {
  constructor(db, options = {}) {
    super();
    if (!db || typeof db.prepare !== 'function' || typeof db.transaction !== 'function') {
      throw new TypeError('SQLiteSessionStore requires an open better-sqlite3 database.');
    }
    this.db = db;
    this.idleTimeoutMs = options.idleTimeoutMs ?? DEFAULT_IDLE_TIMEOUT_MS;
    this.absoluteTimeoutMs = options.absoluteTimeoutMs ?? DEFAULT_ABSOLUTE_TIMEOUT_MS;
    this.tombstoneGraceMs = options.tombstoneGraceMs ?? TOMBSTONE_GRACE_MS;
    for (const [key, value] of Object.entries({
      idleTimeoutMs: this.idleTimeoutMs,
      absoluteTimeoutMs: this.absoluteTimeoutMs,
      tombstoneGraceMs: this.tombstoneGraceMs,
    })) positiveTimestamp(value, key);

    this.read = db.prepare('SELECT sid, student_id, session_data, created_at_ms, expires_at_ms FROM sessions WHERE sid = ?');
    this.readRevocation = db.prepare('SELECT retain_until_ms FROM session_revocations WHERE sid_hash = ?');
    this.removeOne = db.prepare('DELETE FROM sessions WHERE sid = ?');
    this.removeExpiredSessions = db.prepare('SELECT sid, created_at_ms FROM sessions WHERE expires_at_ms <= ? OR created_at_ms + ? <= ?');
    this.removeExpiredRevocations = db.prepare('DELETE FROM session_revocations WHERE retain_until_ms <= ?');
    this.upsertRevocation = db.prepare(`INSERT INTO session_revocations (sid_hash, revoked_at_ms, retain_until_ms)
      VALUES (?, ?, ?)
      ON CONFLICT(sid_hash) DO UPDATE SET
        revoked_at_ms = MIN(session_revocations.revoked_at_ms, excluded.revoked_at_ms),
        retain_until_ms = MAX(session_revocations.retain_until_ms, excluded.retain_until_ms)`);
    this.insertSession = db.prepare(`INSERT INTO sessions (sid, student_id, session_data, created_at_ms, expires_at_ms)
      VALUES (?, ?, ?, ?, ?)`);
    this.updateSession = db.prepare(`UPDATE sessions SET student_id = ?, session_data = ?, expires_at_ms = ?
      WHERE sid = ? AND created_at_ms = ?`);
  }

  hashSid(sid) {
    if (typeof sid !== 'string' || sid.length < 16 || sid.length > 256) throw new TypeError('Session ID is invalid.');
    return crypto.createHash('sha256').update(sid, 'utf8').digest('hex');
  }

  generateSidForRequest(req) {
    if (!req || typeof req !== 'object') throw new TypeError('Request context is required to generate a session ID.');
    const sid = crypto.randomBytes(32).toString('base64url');
    const issuedAtMs = positiveTimestamp(Date.now(), 'session issuance time');
    pendingGeneratedSid.set(req, Object.freeze({ sid, issuedAtMs }));
    return sid;
  }

  bindGeneratedSession(req) {
    const pending = req && pendingGeneratedSid.get(req);
    if (!pending) return false;
    if (pending.sid !== req.sessionID || !req.session || req.session.id !== req.sessionID) {
      throw new Error('Generated session ID does not match its request context.');
    }
    sessionProvenance.set(req.session, Object.freeze({
      kind: 'new',
      sid: pending.sid,
      createdAtMs: pending.issuedAtMs,
    }));
    pendingGeneratedSid.delete(req);
    return true;
  }

  createSession(req, sess) {
    // express-session 1.19.0 calls this when inflating a stored session and on reload.
    const metadata = sess && sess[loadedProvenance];
    const created = super.createSession(req, sess);
    if (metadata && metadata.sid === req.sessionID) {
      sessionProvenance.set(created, Object.freeze({
        kind: 'loaded', sid: metadata.sid, createdAtMs: metadata.createdAtMs,
      }));
    }
    return created;
  }

  markFreshSession(req) {
    if (!this.bindGeneratedSession(req)) throw new Error('The request does not contain a newly generated PrepTrack session.');
    return req.session;
  }

  regenerate(req, callback) {
    this.destroy(req.sessionID, (destroyError) => {
      if (destroyError) return callback(destroyError);
      try {
        // express-session replaces store.generate and its generated ID uses our genid callback.
        this.generate(req);
        this.bindGeneratedSession(req);
        if (!sessionProvenance.has(req.session)) throw new Error('Regenerated session provenance could not be established.');
        return callback(null);
      } catch (error) { return callback(error); }
    });
  }

  tombstone(sid, createdAtMs, now) {
    const issued = createdAtMs == null ? now : positiveTimestamp(createdAtMs, 'session creation time');
    const absoluteExpiry = safeAdd(issued, this.absoluteTimeoutMs, 'absolute session expiry');
    const graceDeadline = safeAdd(absoluteExpiry, this.tombstoneGraceMs, 'tombstone retention deadline');
    const retainUntil = Math.max(graceDeadline, now);
    this.upsertRevocation.run(this.hashSid(sid), now, retainUntil);
    return retainUntil;
  }

  expireRow(row, now) {
    this.tombstone(row.sid, row.created_at_ms, now);
    this.removeOne.run(row.sid);
  }

  get(sid, callback) {
    try {
      const operation = this.db.transaction(() => {
        const now = positiveTimestamp(Date.now(), 'current time');
        const row = this.read.get(sid);
        const revoked = this.readRevocation.get(this.hashSid(sid));
        if (revoked) {
          if (row) this.removeOne.run(sid);
          return null;
        }
        if (!row) return null;
        if (row.expires_at_ms <= now || safeAdd(row.created_at_ms, this.absoluteTimeoutMs, 'absolute session expiry') <= now) {
          this.expireRow(row, now);
          return null;
        }

        let data;
        try { data = JSON.parse(row.session_data); } catch {
          this.expireRow(row, now);
          return null;
        }
        if (!data || typeof data !== 'object' || Array.isArray(data)) {
          this.expireRow(row, now);
          return null;
        }
        const sessionStudentId = data.studentId == null ? null : data.studentId;
        if (sessionStudentId !== row.student_id) {
          this.expireRow(row, now);
          return null;
        }
        Object.defineProperty(data, loadedProvenance, {
          value: Object.freeze({ sid, createdAtMs: row.created_at_ms }),
          configurable: true,
          enumerable: false,
        });
        return data;
      });
      callback(null, operation.immediate());
    } catch (error) { callback(error); }
  }

  set(sid, sess, callback = () => {}) {
    try {
      const provenance = sess && sessionProvenance.get(sess);
      const sidHash = this.hashSid(sid);
      const studentId = sess.studentId == null ? null : sess.studentId;
      if (studentId !== null && (!Number.isSafeInteger(studentId) || studentId <= 0)) {
        throw new TypeError('Session studentId must be a positive safe integer or null.');
      }
      if (sess.id !== undefined && sess.id !== sid) throw sessionError('Session ID does not match its provenance.');

      const operation = this.db.transaction(() => {
        const now = positiveTimestamp(Date.now(), 'current time');
        if (this.readRevocation.get(sidHash)) return { error: sessionError('Session has been revoked.') };
        const row = this.read.get(sid);
        if (row && (row.expires_at_ms <= now || safeAdd(row.created_at_ms, this.absoluteTimeoutMs, 'absolute session expiry') <= now)) {
          this.expireRow(row, now);
          return { error: sessionError('Session has expired.') };
        }
        if (!provenance || provenance.sid !== sid) return { error: sessionError('Session provenance is missing or belongs to another SID.') };

        let createdAtMs;
        if (row) {
          if (provenance.kind !== 'loaded' || provenance.createdAtMs !== row.created_at_ms) {
            return { error: sessionError('Loaded session provenance no longer matches the database row.') };
          }
          createdAtMs = row.created_at_ms;
        } else {
          if (provenance.kind !== 'new') {
            this.tombstone(sid, provenance.createdAtMs, now);
            return { error: sessionError('Previously loaded session row is missing.') };
          }
          createdAtMs = positiveTimestamp(provenance.createdAtMs, 'session issuance time');
          if (safeAdd(createdAtMs, this.absoluteTimeoutMs, 'absolute session expiry') <= now) {
            this.tombstone(sid, createdAtMs, now);
            return { error: sessionError('New session has exceeded its absolute lifetime.') };
          }
        }

        const cookieExpiry = sess.cookie?.expires ? new Date(sess.cookie.expires).getTime() : Infinity;
        if (!Number.isFinite(cookieExpiry) && cookieExpiry !== Infinity) return { error: new TypeError('Invalid session cookie expiry.') };
        const expiresAtMs = Math.min(
          safeAdd(now, this.idleTimeoutMs, 'idle session expiry'),
          safeAdd(createdAtMs, this.absoluteTimeoutMs, 'absolute session expiry'),
          cookieExpiry,
        );
        if (expiresAtMs <= now) {
          this.tombstone(sid, createdAtMs, now);
          if (row) this.removeOne.run(sid);
          return { error: sessionError('Session cookie has expired.') };
        }
        const serialized = JSON.stringify(sess);
        if (row) this.updateSession.run(studentId, serialized, expiresAtMs, sid, createdAtMs);
        else this.insertSession.run(sid, studentId, serialized, createdAtMs, expiresAtMs);
        return { createdAtMs };
      });
      const result = operation.immediate();
      if (result.error) {
        if (sess.req && sess.req.session === sess) sess.req.session = null;
        return callback(result.error);
      }
      sessionProvenance.set(sess, Object.freeze({ kind: 'loaded', sid, createdAtMs: result.createdAtMs }));
      return callback(null);
    } catch (error) {
      if (error.code === 'PREPTRACK_SESSION_INVALID' && sess?.req?.session === sess) sess.req.session = null;
      return callback(error);
    }
  }

  touch(sid, sess, callback = () => {}) {
    try {
      const provenance = sess && sessionProvenance.get(sess);
      const sidHash = this.hashSid(sid);
      const operation = this.db.transaction(() => {
        const now = positiveTimestamp(Date.now(), 'current time');
        if (this.readRevocation.get(sidHash)) return sessionError('Session has been revoked.');
        const row = this.read.get(sid);
        if (!row) {
          if (provenance?.kind === 'loaded' && provenance.sid === sid) this.tombstone(sid, provenance.createdAtMs, now);
          return sessionError('Session row is missing.');
        }
        if (!provenance || provenance.kind !== 'loaded' || provenance.sid !== sid || provenance.createdAtMs !== row.created_at_ms) {
          return sessionError('Session provenance is missing or belongs to another SID.');
        }
        if (row.expires_at_ms <= now || safeAdd(row.created_at_ms, this.absoluteTimeoutMs, 'absolute session expiry') <= now) {
          this.expireRow(row, now);
          return sessionError('Session has expired.');
        }
        const cookieExpiry = sess.cookie?.expires ? new Date(sess.cookie.expires).getTime() : Infinity;
        if (!Number.isFinite(cookieExpiry) && cookieExpiry !== Infinity) return new TypeError('Invalid session cookie expiry.');
        const expiresAtMs = Math.min(
          safeAdd(now, this.idleTimeoutMs, 'idle session expiry'),
          safeAdd(row.created_at_ms, this.absoluteTimeoutMs, 'absolute session expiry'),
          cookieExpiry,
        );
        if (expiresAtMs <= now) {
          this.expireRow(row, now);
          return sessionError('Session cookie has expired.');
        }
        this.db.prepare('UPDATE sessions SET expires_at_ms = ? WHERE sid = ? AND created_at_ms = ?')
          .run(expiresAtMs, sid, row.created_at_ms);
        return null;
      });
      const error = operation.immediate();
      if (error && sess.req && sess.req.session === sess) sess.req.session = null;
      return callback(error);
    } catch (error) { return callback(error); }
  }

  destroy(sid, callback = () => {}) {
    try {
      const operation = this.db.transaction(() => {
        const now = positiveTimestamp(Date.now(), 'current time');
        const row = this.read.get(sid);
        const existingRevocation = this.readRevocation.get(this.hashSid(sid));
        if (row) this.tombstone(sid, row.created_at_ms, now);
        else if (!existingRevocation) this.tombstone(sid, null, now);
        this.removeOne.run(sid);
      });
      operation.immediate();
      return callback(null);
    } catch (error) { return callback(error); }
  }

  cleanupExpired(nowOverride) {
    if (nowOverride !== undefined) positiveTimestamp(nowOverride, 'cleanup time');
    const operation = this.db.transaction(() => {
      const now = positiveTimestamp(nowOverride ?? Date.now(), 'cleanup time');
      const rows = this.removeExpiredSessions.all(now, this.absoluteTimeoutMs, now);
      for (const row of rows) this.expireRow(row, now);
      this.removeExpiredRevocations.run(now);
      return rows.length;
    });
    return operation.immediate();
  }
}

module.exports = {
  DEFAULT_ABSOLUTE_TIMEOUT_MS,
  DEFAULT_IDLE_TIMEOUT_MS,
  TOMBSTONE_GRACE_MS,
  SQLiteSessionStore,
};
