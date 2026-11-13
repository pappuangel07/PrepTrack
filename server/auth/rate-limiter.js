'use strict';

const crypto = require('node:crypto');

const MAX_ATTEMPT_COUNT = 1_000_000;
const ALLOWED_SCOPES = new Set(['login', 'registration']);

function addTimestamp(timestamp, duration, label) {
  const result = timestamp + duration;
  if (!Number.isSafeInteger(result) || result <= 0) throw new RangeError(`${label} exceeds the safe timestamp range.`);
  return result;
}

function canonicalSubject(value, dimension = 'identifier') {
  if (typeof value !== 'string' || !value.trim()) throw new TypeError(`${dimension} must be a non-empty string.`);
  const normalized = dimension === 'email' ? value.trim().toLocaleLowerCase('en-US') : value.trim();
  return `${dimension}\0${normalized}`;
}

class PersistentRateLimiter {
  constructor(db, { hmacSecret, now = Date.now } = {}) {
    if (!db || typeof db.prepare !== 'function' || typeof db.transaction !== 'function') throw new TypeError('An open better-sqlite3 database is required.');
    if (typeof hmacSecret !== 'string' || Buffer.byteLength(hmacSecret, 'utf8') < 32) throw new TypeError('hmacSecret must contain at least 32 UTF-8 bytes.');
    this.db = db;
    this.hmacSecret = hmacSecret;
    this.now = now;
  }

  hashSubject(identifier, dimension = 'identifier', scope = 'general') {
    return crypto.createHmac('sha256', this.hmacSecret)
      .update(`${scope}\0${canonicalSubject(identifier, dimension)}`, 'utf8').digest('hex');
  }

  consume({ scope, identifier, dimension = 'identifier', limit, windowMs, blockMs = windowMs }) {
    if (!ALLOWED_SCOPES.has(scope)) throw new TypeError('scope must be login or registration.');
    for (const [name, value] of Object.entries({ limit, windowMs, blockMs })) {
      if (!Number.isSafeInteger(value) || value <= 0) throw new RangeError(`${name} must be a positive safe integer.`);
    }
    if (limit > MAX_ATTEMPT_COUNT) throw new RangeError(`limit must not exceed ${MAX_ATTEMPT_COUNT}.`);
    const subjectHash = this.hashSubject(identifier, dimension, scope);
    const select = this.db.prepare('SELECT attempt_count, window_started_at_ms, blocked_until_ms FROM auth_rate_limits WHERE scope = ? AND subject_hash = ?');
    const insert = this.db.prepare(`INSERT INTO auth_rate_limits
      (scope, subject_hash, attempt_count, window_started_at_ms, blocked_until_ms, updated_at_ms)
      VALUES (?, ?, ?, ?, ?, ?)
      ON CONFLICT(scope, subject_hash) DO UPDATE SET attempt_count = excluded.attempt_count,
        window_started_at_ms = excluded.window_started_at_ms, blocked_until_ms = excluded.blocked_until_ms,
        updated_at_ms = excluded.updated_at_ms`);
    const operation = this.db.transaction(() => {
      // Sample time only after BEGIN IMMEDIATE acquires the writer lock.
      const now = this.now();
      if (!Number.isSafeInteger(now) || now <= 0) throw new RangeError('Clock must return a positive safe integer timestamp.');
      const currentWindowEnd = addTimestamp(now, windowMs, 'Rate-limit window end');
      const currentBlockEnd = addTimestamp(now, blockMs, 'Rate-limit block end');
      const row = select.get(scope, subjectHash);
      if (row?.blocked_until_ms > now) return { allowed: false, retryAfterMs: row.blocked_until_ms - now };
      const priorWindowEnd = row ? addTimestamp(row.window_started_at_ms, windowMs, 'Stored rate-limit window end') : currentWindowEnd;
      if (!row || priorWindowEnd <= now || row.blocked_until_ms != null) {
        insert.run(scope, subjectHash, 1, now, null, now);
        return { allowed: true, remaining: Math.max(0, limit - 1), resetAtMs: currentWindowEnd };
      }
      if (row.attempt_count >= limit) {
        const blockedUntil = currentBlockEnd;
        insert.run(scope, subjectHash, Math.min(row.attempt_count, MAX_ATTEMPT_COUNT), row.window_started_at_ms, blockedUntil, now);
        return { allowed: false, retryAfterMs: blockMs };
      }
      const attempts = row.attempt_count + 1;
      insert.run(scope, subjectHash, attempts, row.window_started_at_ms, null, now);
      return { allowed: true, remaining: Math.max(0, limit - attempts), resetAtMs: priorWindowEnd };
    });
    return operation.immediate();
  }

  cleanup({ olderThanMs, now = this.now(), limit = 1000 } = {}) {
    if (!Number.isSafeInteger(olderThanMs) || olderThanMs <= 0 || !Number.isSafeInteger(now) || now <= 0 || !Number.isSafeInteger(limit) || limit <= 0) throw new RangeError('cleanup requires positive olderThanMs, now, and limit values.');
    return this.db.prepare(`DELETE FROM auth_rate_limits WHERE rowid IN
      (SELECT rowid FROM auth_rate_limits WHERE updated_at_ms < ?
        AND (blocked_until_ms IS NULL OR blocked_until_ms <= ?) ORDER BY updated_at_ms LIMIT ?)`)
      .run(olderThanMs, now, limit).changes;
  }
}

module.exports = { MAX_ATTEMPT_COUNT, PersistentRateLimiter };
