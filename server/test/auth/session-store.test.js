'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const { spawn, spawnSync } = require('node:child_process');
const path = require('node:path');
const Database = require('better-sqlite3');
const { SQLiteSessionStore, DEFAULT_ABSOLUTE_TIMEOUT_MS, TOMBSTONE_GRACE_MS } = require('../../auth/sqlite-session-store');
const { callbackCall, disposableAuthDatabase } = require('./support');

const SESSION_RACE_WORKER = String.raw`
  (function main() {
  const fs = require('node:fs');
  const path = require('node:path');
  const Database = require(process.argv[1]);
  const { SQLiteSessionStore } = require(process.argv[2]);
  const [mode, databasePath, sid, barrierPath, releasePath, loadedPath, startPath,
    attemptPath, firstResultPath, lateStartPath, lateAttemptPath, lateResultPath, cleanupAt] = process.argv.slice(3);
  const db = new Database(databasePath, { timeout: 10000 });
  function waitForFile(filePath) {
    const deadline = Date.now() + 20000;
    while (!fs.existsSync(filePath)) {
      if (Date.now() > deadline) throw new Error('Timed out waiting for barrier file: ' + filePath);
      Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, 5);
    }
  }
  db.function('test_barrier', () => {
    fs.writeFileSync(barrierPath, 'writer lock held inside session-store transaction');
    waitForFile(releasePath);
    return 1;
  });
  const store = new SQLiteSessionStore(db);
  function finish(filePath, value) { fs.writeFileSync(filePath, JSON.stringify(value)); }
  if (mode === 'stale-set') {
    const req = { sessionID: sid };
    store.get(sid, (getError, data) => {
      if (getError || !data) {
        finish(firstResultPath, { error: getError?.message || 'session did not load' });
        db.close();
        return;
      }
      store.createSession(req, data);
      const staleSession = req.session;
      fs.writeFileSync(loadedPath, 'stale request loaded and provenance assigned');
      waitForFile(startPath);
      fs.writeFileSync(attemptPath, 'stale set() invoked');
      store.set(sid, staleSession, (firstError) => {
        finish(firstResultPath, { error: firstError?.code || null, message: firstError?.message || null });
        waitForFile(lateStartPath);
        fs.writeFileSync(lateAttemptPath, 'late stale set() invoked');
        store.set(sid, staleSession, (lateError) => {
          finish(lateResultPath, { error: lateError?.code || null, message: lateError?.message || null });
          db.close();
        });
      });
    });
    return;
  }

  fs.writeFileSync(attemptPath, mode + ' invoked');
  try {
    if (mode === 'destroy') {
      store.destroy(sid, (error) => finish(firstResultPath, { error: error?.message || null }));
    } else if (mode === 'cleanup') {
      finish(firstResultPath, { removed: store.cleanupExpired(Number(cleanupAt)) });
    } else {
      throw new Error('Unknown worker mode: ' + mode);
    }
  } catch (error) { finish(firstResultPath, { error: error.message }); }
  db.close();
  })();
`;

function racePaths(directory, label) {
  return Object.fromEntries(['barrier', 'release', 'loaded', 'start', 'attempt', 'first', 'lateStart', 'lateAttempt', 'late']
    .map((name) => [name, path.join(directory, `${label}-${name}.signal`)]));
}

function spawnRaceWorker(mode, fixture, sid, paths, cleanupAt = '') {
  const args = [
    '-e', SESSION_RACE_WORKER,
    require.resolve('better-sqlite3'),
    require.resolve('../../auth/sqlite-session-store'),
    mode, fixture.filename, sid, paths.barrier, paths.release, paths.loaded, paths.start,
    paths.attempt, paths.first, paths.lateStart, paths.lateAttempt, paths.late, String(cleanupAt),
  ];
  const child = spawn(process.execPath, args, { cwd: path.resolve(__dirname, '../..'), stdio: ['ignore', 'pipe', 'pipe'] });
  child.stderrText = '';
  child.stderr.setEncoding('utf8');
  child.stderr.on('data', (chunk) => { child.stderrText += chunk; });
  return child;
}

async function waitForSignal(filePath, child, label, timeoutMs = 15000) {
  const deadline = Date.now() + timeoutMs;
  while (!fs.existsSync(filePath)) {
    if (child.exitCode !== null) throw new Error(`${label} process exited early with ${child.exitCode}: ${child.stderrText}`);
    if (Date.now() >= deadline) throw new Error(`Timed out waiting for ${label}.`);
    await new Promise((resolve) => setTimeout(resolve, 10));
  }
}

function waitForChild(child, label, timeoutMs = 20000) {
  if (child.exitCode !== null) {
    return child.exitCode === 0
      ? Promise.resolve()
      : Promise.reject(new Error(`${label} exited with code ${child.exitCode}.`));
  }
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => {
      child.kill();
      reject(new Error(`${label} process did not exit in time.`));
    }, timeoutMs);
    child.once('error', (error) => { clearTimeout(timer); reject(error); });
    child.once('exit', (code, signal) => {
      clearTimeout(timer);
      if (code === 0) resolve();
      else reject(new Error(`${label} exited with code ${code} (${signal || 'no signal'}).`));
    });
  });
}

async function waitBrieflyForBlockedContender(child, resultPath, label) {
  await new Promise((resolve) => setTimeout(resolve, 100));
  assert.equal(fs.existsSync(resultPath), false, `${label} must remain blocked while the competing transaction holds BEGIN IMMEDIATE`);
  assert.equal(child.exitCode, null, `${label} process must still be waiting on the SQLite writer lock`);
}

function installSessionRaceBarriers(db) {
  db.exec(`
    CREATE TRIGGER test_pause_session_update BEFORE UPDATE ON sessions BEGIN
      SELECT test_barrier();
    END;
    CREATE TRIGGER test_pause_revocation_insert AFTER INSERT ON session_revocations BEGIN
      SELECT test_barrier();
    END;
  `);
}

function freshSession(store, studentId, now) {
  const req = {};
  const sid = store.generateSidForRequest(req);
  req.sessionID = sid;
  req.session = { studentId, cookie: { expires: new Date(now + 60_000) } };
  Object.defineProperty(req.session, 'id', { value: sid, enumerable: false });
  assert.equal(store.bindGeneratedSession(req), true);
  return { sid, session: req.session };
}

function loadedSession(store, sid) {
  return callbackCall(store, 'get', sid).then((data) => {
    assert.ok(data);
    const req = { sessionID: sid };
    store.createSession(req, data);
    assert.ok(req.session);
    return req.session;
  });
}

function tombstoneFor(db, store, sid) {
  return db.prepare('SELECT * FROM session_revocations WHERE sid_hash = ?').get(store.hashSid(sid));
}

test('new and loaded provenance is bound to its SID and first save transitions to loaded', async (t) => {
  const fixture = disposableAuthDatabase();
  t.after(() => fixture.close());
  const now = 1_800_000_000_000;
  t.mock.method(Date, 'now', () => now);
  const store = new SQLiteSessionStore(fixture.db, { idleTimeoutMs: 1000, absoluteTimeoutMs: 5000 });
  const fresh = freshSession(store, fixture.studentId, now);
  await callbackCall(store, 'set', fresh.sid, fresh.session);
  assert.equal(fixture.db.prepare('SELECT created_at_ms FROM sessions WHERE sid = ?').get(fresh.sid).created_at_ms, now);

  const loaded = await loadedSession(store, fresh.sid);
  loaded.marker = 'changed';
  await callbackCall(store, 'set', fresh.sid, loaded);
  assert.equal(fixture.db.prepare('SELECT session_data FROM sessions WHERE sid=?').get(fresh.sid).session_data.includes('changed'), true);

  const other = freshSession(store, fixture.studentId, now);
  await assert.rejects(callbackCall(store, 'set', fresh.sid, other.session), /provenance/);
  const missing = { studentId: fixture.studentId, cookie: { expires: new Date(now + 1000) } };
  await assert.rejects(callbackCall(store, 'set', 'unproven-session-id', missing), /provenance/);
  await assert.rejects(callbackCall(store, 'touch', fresh.sid, other.session), /provenance/);
});

test('logout on another SQLite connection tombstones before a loaded request can save late', async (t) => {
  const fixture = disposableAuthDatabase();
  const storeOne = new SQLiteSessionStore(fixture.db, { absoluteTimeoutMs: 5000, tombstoneGraceMs: 1000 });
  const secondDb = new Database(fixture.filename, { timeout: 5000 });
  t.after(() => { secondDb.close(); fixture.close(); });
  const storeTwo = new SQLiteSessionStore(secondDb, { absoluteTimeoutMs: 5000, tombstoneGraceMs: 1000 });
  let now = 1_800_000_000_000;
  t.mock.method(Date, 'now', () => now);

  const fresh = freshSession(storeOne, fixture.studentId, now);
  await callbackCall(storeOne, 'set', fresh.sid, fresh.session);
  const staleRequest = await loadedSession(storeOne, fresh.sid);
  now += 10;
  await callbackCall(storeTwo, 'destroy', fresh.sid);
  await assert.rejects(callbackCall(storeOne, 'set', fresh.sid, staleRequest), /revoked/);
  assert.equal(fixture.db.prepare('SELECT COUNT(*) AS n FROM sessions WHERE sid=?').get(fresh.sid).n, 0);
  assert.equal(tombstoneFor(fixture.db, storeOne, fresh.sid).retain_until_ms,
    1_800_000_000_000 + 5000 + 1000);
});

test('a separate Node process can revoke a SID before the loading process attempts its late save', async (t) => {
  const fixture = disposableAuthDatabase();
  t.after(() => fixture.close());
  const store = new SQLiteSessionStore(fixture.db);
  const now = Date.now();
  const fresh = freshSession(store, fixture.studentId, now);
  await callbackCall(store, 'set', fresh.sid, fresh.session);
  const staleRequest = await loadedSession(store, fresh.sid);
  const storeModule = require.resolve('../../auth/sqlite-session-store');
  const script = `
    const Database = require('better-sqlite3');
    const { SQLiteSessionStore } = require(${JSON.stringify(storeModule)});
    const db = new Database(process.argv[1], { timeout: 5000 });
    new SQLiteSessionStore(db).destroy(process.argv[2], (error) => {
      db.close();
      if (error) { process.stderr.write(error.message); process.exitCode = 1; }
    });
  `;
  const child = spawnSync(process.execPath, ['-e', script, fixture.filename, fresh.sid], {
    encoding: 'utf8', timeout: 15000, cwd: path.resolve(__dirname, '../..'),
  });
  assert.equal(child.status, 0, child.stderr);
  await assert.rejects(callbackCall(store, 'set', fresh.sid, staleRequest), /revoked/);
  assert.equal(fixture.db.prepare('SELECT COUNT(*) AS n FROM sessions').get().n, 0);
  assert.ok(tombstoneFor(fixture.db, store, fresh.sid));
});

test('barrier-coordinated processes serialize stale saves against destroy and cleanup in both lock orderings', async () => {
  for (const competingOperation of ['destroy', 'cleanup']) {
    for (const lockWinner of ['revocation-first', 'stale-save-first']) {
      const fixture = disposableAuthDatabase();
      const children = [];
      const store = new SQLiteSessionStore(fixture.db);
      try {
        const fresh = freshSession(store, fixture.studentId, Date.now());
        await callbackCall(store, 'set', fresh.sid, fresh.session);
        const row = fixture.db.prepare('SELECT expires_at_ms FROM sessions WHERE sid = ?').get(fresh.sid);
        const cleanupAt = row.expires_at_ms + 1000;
        const paths = racePaths(path.dirname(fixture.filename), `${competingOperation}-${lockWinner}`);
        const stalePaths = racePaths(path.dirname(fixture.filename), `${competingOperation}-${lockWinner}-stale`);
        stalePaths.release = paths.release;
        installSessionRaceBarriers(fixture.db);

        const staleProcess = spawnRaceWorker('stale-set', fixture, fresh.sid, stalePaths, cleanupAt);
        children.push(staleProcess);
        await waitForSignal(stalePaths.loaded, staleProcess, 'stale request load');

        const operationProcess = spawnRaceWorker(competingOperation, fixture, fresh.sid, paths, cleanupAt);
        children.push(operationProcess);
        if (lockWinner === 'revocation-first') {
          await waitForSignal(paths.barrier, operationProcess, `${competingOperation} transaction holding BEGIN IMMEDIATE`);
          fs.writeFileSync(stalePaths.start, 'start stale set while revocation/cleanup owns the writer lock');
          await waitForSignal(stalePaths.attempt, staleProcess, 'stale set() invoked during competing transaction');
          await waitBrieflyForBlockedContender(staleProcess, stalePaths.first, 'stale set()');
          assert.equal(fs.existsSync(paths.release), false, 'revocation/cleanup remains paused inside its transaction');
        } else {
          fs.writeFileSync(stalePaths.start, 'start stale set before revocation/cleanup');
          await waitForSignal(stalePaths.barrier, staleProcess, 'stale set() holding BEGIN IMMEDIATE');
          await waitForSignal(paths.attempt, operationProcess, `${competingOperation} invoked during stale transaction`);
          await waitBrieflyForBlockedContender(operationProcess, paths.first, competingOperation);
          assert.equal(fs.existsSync(paths.release), false, 'stale set() remains paused inside its transaction');
        }

        fs.writeFileSync(paths.release, 'release the transaction holding the SQLite writer lock');
        if (lockWinner === 'revocation-first') {
          await waitForChild(operationProcess, `${competingOperation} lock winner`);
          await waitForSignal(stalePaths.first, staleProcess, 'stale set result after revocation/cleanup');
          assert.equal(JSON.parse(fs.readFileSync(stalePaths.first, 'utf8')).error, 'PREPTRACK_SESSION_INVALID',
            'a stale save queued behind revocation/cleanup must be rejected');
        } else {
          await waitForSignal(stalePaths.first, staleProcess, 'stale set result before revocation/cleanup');
          assert.equal(JSON.parse(fs.readFileSync(stalePaths.first, 'utf8')).error, null,
            'a stale save that owns the writer lock first may commit before revocation');
          await waitForChild(operationProcess, `${competingOperation} lock follower`);
        }

        fs.writeFileSync(stalePaths.lateStart, 'attempt a late save after revocation/cleanup commits');
        await waitForSignal(stalePaths.lateAttempt, staleProcess, 'late save invocation');
        await waitForSignal(stalePaths.late, staleProcess, 'late save result');
        assert.equal(JSON.parse(fs.readFileSync(stalePaths.late, 'utf8')).error, 'PREPTRACK_SESSION_INVALID',
          `${competingOperation}/${lockWinner}: a subsequent save must fail after the tombstone is committed`);
        await waitForChild(staleProcess, 'stale request process');

        const operationResult = JSON.parse(fs.readFileSync(paths.first, 'utf8'));
        if (competingOperation === 'destroy') assert.equal(operationResult.error, null);
        else assert.equal(operationResult.removed, 1);
        assert.equal(fixture.db.prepare('SELECT COUNT(*) AS n FROM sessions WHERE sid = ?').get(fresh.sid).n, 0);
        assert.ok(tombstoneFor(fixture.db, store, fresh.sid), 'the completed revocation/cleanup must leave a tombstone');
      } finally {
        for (const child of children) if (child.exitCode === null) child.kill();
        fixture.close();
      }
    }
  }
});

test('idle cleanup tombstones before row deletion and exact expiry boundaries reject touch and save', async (t) => {
  const fixture = disposableAuthDatabase();
  let now = 1_800_000_000_000;
  t.mock.method(Date, 'now', () => now);
  const first = new SQLiteSessionStore(fixture.db, { idleTimeoutMs: 1000, absoluteTimeoutMs: 5000, tombstoneGraceMs: 100 });
  const secondDb = new Database(fixture.filename, { timeout: 5000 });
  t.after(() => { secondDb.close(); fixture.close(); });
  const second = new SQLiteSessionStore(secondDb, { idleTimeoutMs: 1000, absoluteTimeoutMs: 5000, tombstoneGraceMs: 100 });
  const fresh = freshSession(first, fixture.studentId, now);
  await callbackCall(first, 'set', fresh.sid, fresh.session);
  const loaded = await loadedSession(first, fresh.sid);

  now += 1000;
  assert.equal(second.cleanupExpired(now), 1);
  assert.equal(fixture.db.prepare('SELECT COUNT(*) AS n FROM sessions').get().n, 0);
  assert.equal(tombstoneFor(fixture.db, first, fresh.sid).retain_until_ms, 1_800_000_000_000 + 5000 + 100);
  await assert.rejects(callbackCall(first, 'set', fresh.sid, loaded), /revoked|missing/);

  const expiresAt = 1_800_000_000_000 + 5000 + 100;
  now = expiresAt - 1;
  assert.equal(first.cleanupExpired(now), 0);
  assert.ok(tombstoneFor(fixture.db, first, fresh.sid));
  now = expiresAt;
  first.cleanupExpired(now);
  assert.equal(tombstoneFor(fixture.db, first, fresh.sid), undefined);
  await assert.rejects(callbackCall(first, 'set', fresh.sid, loaded), /missing|expired/);
});

test('get tombstones idle expiry; absolute expiry is exact and cannot be extended by touch', async (t) => {
  const fixture = disposableAuthDatabase();
  t.after(() => fixture.close());
  let now = 1_800_000_000_000;
  t.mock.method(Date, 'now', () => now);
  const store = new SQLiteSessionStore(fixture.db, { idleTimeoutMs: 1000, absoluteTimeoutMs: 1500, tombstoneGraceMs: 100 });
  const fresh = freshSession(store, fixture.studentId, now);
  await callbackCall(store, 'set', fresh.sid, fresh.session);
  const loaded = await loadedSession(store, fresh.sid);
  now += 1000;
  assert.equal(await callbackCall(store, 'get', fresh.sid), null);
  assert.ok(tombstoneFor(fixture.db, store, fresh.sid));
  await assert.rejects(callbackCall(store, 'touch', fresh.sid, loaded), /revoked|missing/);

  const second = freshSession(store, fixture.studentId, now);
  await callbackCall(store, 'set', second.sid, second.session);
  const secondLoaded = await loadedSession(store, second.sid);
  now += 499;
  await callbackCall(store, 'touch', second.sid, secondLoaded);
  now += 1001;
  await assert.rejects(callbackCall(store, 'touch', second.sid, secondLoaded), /revoked|expired/);
  assert.equal(fixture.db.prepare('SELECT COUNT(*) AS n FROM sessions WHERE sid=?').get(second.sid).n, 0);
});

test('destroy remains safe when absolute expiry plus grace has already elapsed', async (t) => {
  const fixture = disposableAuthDatabase();
  t.after(() => fixture.close());
  let now = 1_800_000_000_000;
  t.mock.method(Date, 'now', () => now);
  const store = new SQLiteSessionStore(fixture.db, { idleTimeoutMs: 50, absoluteTimeoutMs: 100, tombstoneGraceMs: 10 });
  const fresh = freshSession(store, fixture.studentId, now);
  await callbackCall(store, 'set', fresh.sid, fresh.session);
  now += 111;
  await callbackCall(store, 'destroy', fresh.sid);
  const tombstone = tombstoneFor(fixture.db, store, fresh.sid);
  assert.equal(tombstone.retain_until_ms, now,
    'an already elapsed retention deadline clamps to revocation time and is immediately cleanup-eligible');
  assert.equal(store.cleanupExpired(now), 0);
  assert.equal(tombstoneFor(fixture.db, store, fresh.sid), undefined);
  assert.equal(fixture.db.prepare('SELECT COUNT(*) AS n FROM sessions').get().n, 0);
});

test('regeneration and session callbacks follow express-session 1.19.0 lifecycle hooks', async (t) => {
  const fixture = disposableAuthDatabase();
  t.after(() => fixture.close());
  const store = new SQLiteSessionStore(fixture.db);
  const now = Date.now();
  const first = freshSession(store, fixture.studentId, now);
  await callbackCall(store, 'set', first.sid, first.session);
  const req = { sessionID: first.sid, sessionStore: store, session: await loadedSession(store, first.sid) };
  store.generate = (request) => {
    const sid = store.generateSidForRequest(request);
    request.sessionID = sid;
    request.session = { cookie: { expires: new Date(Date.now() + 60_000) } };
    Object.defineProperty(request.session, 'id', { value: sid, enumerable: false });
  };
  await new Promise((resolve, reject) => store.regenerate(req, (error) => error ? reject(error) : resolve()));
  assert.notEqual(req.sessionID, first.sid);
  assert.equal(tombstoneFor(fixture.db, store, first.sid) !== undefined, true);
  req.session.studentId = fixture.studentId;
  await callbackCall(store, 'set', req.sessionID, req.session);
  assert.equal(fixture.db.prepare('SELECT COUNT(*) AS n FROM sessions').get().n, 1);
  assert.equal(fixture.db.prepare('SELECT COUNT(*) AS n FROM sessions WHERE sid=?').get(first.sid).n, 0);
});

test('session store writes and tombstones remain single-row under same-process parallel calls', async (t) => {
  const fixture = disposableAuthDatabase();
  const one = new SQLiteSessionStore(fixture.db);
  const secondDb = new Database(fixture.filename, { timeout: 5000 });
  t.after(() => { secondDb.close(); fixture.close(); });
  const two = new SQLiteSessionStore(secondDb);
  const now = Date.now();
  const fresh = freshSession(one, fixture.studentId, now);
  await Promise.all(Array.from({ length: 10 }, () => callbackCall(one, 'set', fresh.sid, fresh.session)));
  assert.equal(fixture.db.prepare('SELECT COUNT(*) AS n FROM sessions WHERE sid=?').get(fresh.sid).n, 1);
  const stale = await loadedSession(one, fresh.sid);
  await callbackCall(two, 'destroy', fresh.sid);
  await assert.rejects(callbackCall(one, 'set', fresh.sid, stale), /revoked|missing/);
  assert.ok(tombstoneFor(fixture.db, one, fresh.sid));
});
