'use strict';

const assert = require('node:assert/strict');
const fs = require('node:fs');
const Module = require('node:module');
const os = require('node:os');
const path = require('node:path');
const test = require('node:test');
const Database = require('better-sqlite3');
const express = require('express');
const { createApp, startServer } = require('../../server.js');
const {
  createBaseline,
  createV3,
  captureState,
} = require('../support/database-fixtures');

const tempRoot = fs.mkdtempSync(path.join(os.tmpdir(), 'preptrack-app-test-'));
const TEST_SECURITY_CONFIG = {
  sessionSecret: 'test-session-secret-0123456789-abcdef',
  rateLimitSecret: 'test-rate-limit-secret-0123456789-abcd',
  appOrigin: 'http://localhost:5173',
  env: { NODE_ENV: 'test' },
};
test.after(() => fs.rmSync(tempRoot, { recursive: true, force: true }));



function get(server, pathname) {
  return new Promise((resolve, reject) => {
    const request = require('node:http').get({ port: server.address().port, path: pathname }, (response) => {
      let body = '';
      response.setEncoding('utf8');
      response.on('data', (chunk) => { body += chunk; });
      response.on('end', () => resolve({ status: response.statusCode, body: JSON.parse(body) }));
    });
    request.on('error', reject);
  });
}

test('app factory accepts an injected disposable database and preserves representative endpoints', async (t) => {
  const db = createV3(path.join(tempRoot, 'valid-v3.db'));
  t.after(() => db.close());
  assert.equal(db.pragma('user_version')[0].user_version, 3);
  const stateBeforeApp = captureState(db);
  const app = createApp({ db, ...TEST_SECURITY_CONFIG });
  assert.equal(db.pragma('foreign_keys')[0].foreign_keys, 1);
  assert.deepEqual(captureState(db), stateBeforeApp, 'constructing the app must not change schema or rows');

  const server = app.listen(0);
  t.after(() => new Promise((resolve) => server.close(resolve)));
  await new Promise((resolve) => server.once('listening', resolve));
  assert.deepEqual(await get(server, '/'), {
    status: 200, body: { message: 'PrepTrack backend is running!' },
  });
  assert.deepEqual(await get(server, '/api/roadmap'), {
  status: 401,
  body: { error: 'Authentication required.' },
});

assert.deepEqual(await get(server, '/api/tasks'), {
  status: 401,
  body: { error: 'Authentication required.' },
});

assert.deepEqual(await get(server, '/api/java-topics'), {
  status: 401,
  body: { error: 'Authentication required.' },
});
});

test('factory import has no production database or listener side effects', () => {
  const beforeHandles = process._getActiveHandles().filter((handle) => handle?.listening === true).length;
  const modulePath = require.resolve('../../server.js');
  let databaseModuleLoads = 0;
  let listenCalls = 0;
  const originalLoad = Module._load;
  const originalListen = express.application.listen;
  Module._load = function trackedLoad(request, parent, isMain) {
    if (request === 'better-sqlite3' && parent?.filename === modulePath) databaseModuleLoads++;
    return originalLoad.call(this, request, parent, isMain);
  };
  express.application.listen = function trackedListen(...args) {
    listenCalls++;
    return originalListen.apply(this, args);
  };
  delete require.cache[modulePath];
  try {
    const imported = require('../../server.js');
    const afterHandles = process._getActiveHandles().filter((handle) => handle?.listening === true).length;
    assert.equal(typeof imported.createApp, 'function');
    assert.equal(databaseModuleLoads, 0);
    assert.equal(listenCalls, 0);
    assert.equal(afterHandles, beforeHandles);
  } finally {
    Module._load = originalLoad;
    express.application.listen = originalListen;
  }
});

test('missing and outdated schema fail closed without advancing user_version', (t) => {
  const missing = new Database(path.join(tempRoot, 'missing-schema.db'));
  t.after(() => missing.close());
  assert.throws(() => createApp({ db: missing }), /schema version 3/);
  assert.equal(missing.pragma('user_version')[0].user_version, 0);

  const old = createBaseline(path.join(tempRoot, 'outdated-schema.db'));
  t.after(() => old.close());
  assert.throws(() => createApp({ db: old }), /schema version 3/);
  assert.equal(old.pragma('user_version')[0].user_version, 0);
  assert.equal(old.prepare("SELECT COUNT(*) AS n FROM sqlite_master WHERE name = 'students'").get().n, 0);
});

test('incomplete or incompatible v3 auth schema fails closed without repair', (t) => {
  const missingTable = createV3(path.join(tempRoot, 'missing-table.db'));
  t.after(() => missingTable.close());
  missingTable.exec('DROP TABLE sessions');
  assert.throws(() => createApp({ db: missingTable }), /missing|incompatible/i);
  assert.equal(missingTable.pragma('user_version')[0].user_version, 3);
  assert.equal(missingTable.prepare("SELECT COUNT(*) AS n FROM sqlite_master WHERE name = 'sessions'").get().n, 0);

  const invalidCheck = createV3(path.join(tempRoot, 'invalid-check.db'));
  t.after(() => invalidCheck.close());
  invalidCheck.exec(`ALTER TABLE session_revocations RENAME TO original_revocations;
    CREATE TABLE session_revocations (sid_hash TEXT PRIMARY KEY NOT NULL CHECK(length(sid_hash)=64),
      revoked_at_ms INTEGER NOT NULL, retain_until_ms INTEGER NOT NULL);
    DROP TABLE original_revocations;`);
  const before = captureState(invalidCheck);
  assert.throws(() => createApp({ db: invalidCheck }), /definition differs/i);
  assert.deepEqual(captureState(invalidCheck), before, 'incompatible schema readiness must not modify schema, rows, or user_version');
});

test('readiness rejects unexpected triggers attached to every required application table', (t) => {
  const db = createV3(path.join(tempRoot, 'unexpected-triggers.db'));
  t.after(() => db.close());
  const requiredTables = [
    'roadmap', 'java_topics', 'dsa_topics', 'aptitude_topics', 'tasks', 'notes', 'bookmarks',
    'study_sessions', 'pomodoro_sessions', 'students', 'sessions', 'roadmap_progress',
    'java_topic_progress', 'dsa_topic_progress', 'aptitude_topic_progress', 'bootstrap_state',
    'auth_rate_limits', 'session_revocations',
  ];
  for (const table of requiredTables) {
    const trigger = `readiness_unexpected_${table}`;
    db.exec(`CREATE TRIGGER "${trigger}" AFTER INSERT ON "${table}" BEGIN SELECT 1; END`);
    const before = captureState(db);
    assert.throws(() => createApp({ db }), /unexpected trigger/i, `${table} triggers must be rejected`);
    assert.deepEqual(captureState(db), before, `checking ${table} triggers must remain read-only`);
    db.exec(`DROP TRIGGER "${trigger}"`);
  }
});

test('legacy readiness validates constraints and rejects added restrictive checks or missing uniqueness', (t) => {
  const restrictive = createV3(path.join(tempRoot, 'restrictive-legacy-check.db'));
  t.after(() => restrictive.close());
  restrictive.exec(`ALTER TABLE tasks RENAME TO tasks_previous;
    CREATE TABLE tasks (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL CHECK (title <> 'BLOCKED'),
      description TEXT NOT NULL DEFAULT '', due_date TEXT,
      completed INTEGER NOT NULL DEFAULT 0, priority TEXT NOT NULL DEFAULT 'Medium',
      deleted INTEGER NOT NULL DEFAULT 0,
      student_id INTEGER REFERENCES students(id) ON DELETE RESTRICT
    );
    INSERT INTO tasks (id,title,description,due_date,completed,priority,deleted,student_id)
      SELECT id,title,description,due_date,completed,priority,deleted,student_id FROM tasks_previous;
    DROP TABLE tasks_previous;
    CREATE INDEX tasks_owner_idx ON tasks(student_id, deleted, id DESC);`);
  const restrictiveBefore = captureState(restrictive);
  assert.throws(() => createApp({ db: restrictive }), /legacy table definition differs/i);
  assert.deepEqual(captureState(restrictive), restrictiveBefore);

  const missingCheck = createV3(path.join(tempRoot, 'missing-legacy-check.db'));
  t.after(() => missingCheck.close());
  missingCheck.exec(`ALTER TABLE notes RENAME TO notes_previous;
    CREATE TABLE notes (
      id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL, subject TEXT NOT NULL,
      content TEXT NOT NULL DEFAULT '', created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
      student_id INTEGER REFERENCES students(id) ON DELETE RESTRICT
    );
    INSERT INTO notes (id,title,subject,content,created_at,updated_at,student_id)
      SELECT id,title,subject,content,created_at,updated_at,student_id FROM notes_previous;
    DROP TABLE notes_previous;
    CREATE INDEX notes_owner_idx ON notes(student_id, updated_at DESC, id DESC);`);
  const missingCheckBefore = captureState(missingCheck);
  assert.throws(() => createApp({ db: missingCheck }), /legacy table definition differs/i);
  assert.deepEqual(captureState(missingCheck), missingCheckBefore);

  const missingUnique = createV3(path.join(tempRoot, 'missing-legacy-unique.db'));
  t.after(() => missingUnique.close());
  missingUnique.exec(`CREATE TABLE students_replacement (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      display_name TEXT NOT NULL CHECK (length(trim(display_name)) > 0),
      email TEXT NOT NULL COLLATE NOCASE CHECK (length(trim(email)) > 0),
      password_hash TEXT NOT NULL,
      created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    );
    INSERT INTO students_replacement SELECT * FROM students;
    DROP TABLE students;
    ALTER TABLE students_replacement RENAME TO students;`);
  const missingUniqueBefore = captureState(missingUnique);
  assert.throws(() => createApp({ db: missingUnique }), /definition differs/i);
  assert.deepEqual(captureState(missingUnique), missingUniqueBefore);
});

test('legacy explicit-index inventory rejects missing, altered, and unexpected indexes', (t) => {
  const cases = [
    ['missing', (db) => db.exec('DROP INDEX tasks_owner_idx')],
    ['altered', (db) => db.exec('DROP INDEX tasks_owner_idx; CREATE INDEX tasks_owner_idx ON tasks(id)')],
    ['unexpected', (db) => db.exec('CREATE INDEX tasks_extra_idx ON tasks(title)')],
  ];
  for (const [label, mutate] of cases) {
    const db = createV3(path.join(tempRoot, `legacy-index-${label}.db`));
    t.after(() => db.close());
    mutate(db);
    const before = captureState(db);
    assert.throws(() => createApp({ db }), /index/i, `${label} legacy index must be rejected`);
    assert.deepEqual(captureState(db), before, `${label} index rejection must not modify the database`);
  }
});

test('production startup reports readiness failures and closes its database connection', (t) => {
  const filename = path.join(tempRoot, 'startup-failure.db');
  const db = createBaseline(filename);
  db.close();
  let opened;
  class TrackedDatabase extends Database {
    constructor(databasePath) {
      super(databasePath);
      opened = this;
    }
  }
  const priorExitCode = process.exitCode;
  const priorError = console.error;
  const priorListen = express.application.listen;
  const errors = [];
  let listenCalls = 0;
  console.error = (message) => errors.push(String(message));
  express.application.listen = function countListen(...args) {
    listenCalls++;
    return priorListen.apply(this, args);
  };
  try {
    assert.equal(startServer({ databasePath: filename, port: 0, DatabaseClass: TrackedDatabase }), null);
    assert.equal(opened.open, false);
    assert.equal(listenCalls, 0);
    assert.equal(errors.length, 1);
    assert.match(errors[0], /PrepTrack startup failed:.*schema version 3/i);
    assert.equal(process.exitCode, 1);
  } finally {
    console.error = priorError;
    express.application.listen = priorListen;
    process.exitCode = priorExitCode;
  }
});

test('runtime server errors are not reported as startup failures', async (t) => {
  const filename = path.join(tempRoot, 'runtime-error.db');
  const fixture = createV3(filename);
  fixture.close();

  let opened;
  class TrackedDatabase extends Database {
    constructor(databasePath) {
      super(databasePath);
      opened = this;
    }
  }

  const priorLog = console.log;
  const priorError = console.error;
  const priorExitCode = process.exitCode;
  const errors = [];

  console.log = () => {};
  console.error = (message) => errors.push(String(message));

  t.after(() => {
    console.log = priorLog;
    console.error = priorError;
    process.exitCode = priorExitCode;
    if (opened?.open) opened.close();
  });

  const server = startServer({
    databasePath: filename,
    port: 0,
    DatabaseClass: TrackedDatabase,
     ...TEST_SECURITY_CONFIG,
  });

  assert.ok(server);

  await new Promise((resolve) => server.once('listening', resolve));

  const closed = new Promise((resolve) => server.once('close', resolve));
  server.emit('error', new Error('simulated runtime failure'));
  await closed;

  assert.equal(errors.length, 1);
  assert.match(errors[0], /^PrepTrack server error:/);
  assert.doesNotMatch(errors[0], /startup failed/i);
  assert.equal(opened.open, false);
  assert.equal(process.exitCode, 1);
});

test('graceful server close waits for active requests before closing the database', async (t) => {
  const filename = path.join(tempRoot, 'graceful-close.db');
  const fixture = createV3(filename);
  fixture.close();
  let opened;
  class TrackedDatabase extends Database {
    constructor(databasePath) {
      super(databasePath);
      opened = this;
    }
  }
  const priorLog = console.log;
  const priorError = console.error;
  const priorExitCode = process.exitCode;
  const priorUse = express.application.use;
  let releaseRequest;
  let requestEntered;
  const entered = new Promise((resolve) => { requestEntered = resolve; });
  let gateAdded = false;
  console.log = () => {};
  console.error = () => {};
  t.after(() => {
    console.log = priorLog;
    console.error = priorError;
    process.exitCode = priorExitCode;
  });
  express.application.use = function addHeldRequestGate(...args) {
    const result = priorUse.apply(this, args);
    if (!gateAdded) {
      gateAdded = true;
      priorUse.call(this, (req, res, next) => {
        if (req.path !== '/hold-open-request') return next();
        releaseRequest = () => res.json({ released: true });
        requestEntered();
      });
    }
    return result;
  };
  let server;
  try {
server = startServer({
  databasePath: filename,
  port: 0,
  DatabaseClass: TrackedDatabase,
  ...TEST_SECURITY_CONFIG,
});
  } finally {
    express.application.use = priorUse;
  }
  t.after(() => {
    if (server?.listening) server.close();
    if (opened?.open) opened.close();
  });
  await new Promise((resolve) => server.once('listening', resolve));
  console.log = priorLog;
  const request = require('node:http').get({ port: server.address().port, path: '/hold-open-request' }, (response) => {
    response.resume();
  });
  await entered;
  const closed = new Promise((resolve) => server.close(resolve));
  server.emit('error', new Error('simulated error during graceful shutdown'));
  await new Promise((resolve) => setImmediate(resolve));
  assert.equal(opened.open, true, 'database must stay open while the request is active');
  releaseRequest();
  await closed;
  assert.equal(opened.open, false, 'database closes after the server drains active requests');
  request.destroy();
});

test('startup readiness is read-only and never executes an automatic migration', (t) => {
  const db = createBaseline(path.join(tempRoot, 'no-auto-migration.db'));
  t.after(() => db.close());
  const beforeObjects = db.prepare("SELECT type, name, sql FROM sqlite_master ORDER BY type, name").all();
  assert.throws(() => createApp({ db }), /schema version 3/);
  assert.deepEqual(db.prepare("SELECT type, name, sql FROM sqlite_master ORDER BY type, name").all(), beforeObjects);
  assert.equal(db.pragma('user_version')[0].user_version, 0);
});
