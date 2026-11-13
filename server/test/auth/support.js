'use strict';

const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const Database = require('better-sqlite3');

function disposableAuthDatabase() {
  const directory = fs.mkdtempSync(path.join(os.tmpdir(), 'preptrack-auth-primitives-'));
  const filename = path.join(directory, 'auth-test.db');
  const db = new Database(filename);
  db.pragma('foreign_keys = ON');
  db.exec(`
    CREATE TABLE students (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      display_name TEXT NOT NULL,
      email TEXT NOT NULL UNIQUE,
      password_hash TEXT NOT NULL
    );
    CREATE TABLE sessions (
      sid TEXT PRIMARY KEY NOT NULL,
      student_id INTEGER REFERENCES students(id) ON DELETE CASCADE,
      session_data TEXT NOT NULL,
      created_at_ms INTEGER NOT NULL,
      expires_at_ms INTEGER NOT NULL CHECK (expires_at_ms > 0)
    );
    CREATE INDEX sessions_expiry_idx ON sessions(expires_at_ms);
    CREATE INDEX sessions_student_idx ON sessions(student_id);
    CREATE TABLE session_revocations (
      sid_hash TEXT PRIMARY KEY NOT NULL CHECK (length(sid_hash) = 64 AND sid_hash NOT GLOB '*[^0-9a-f]*'),
      revoked_at_ms INTEGER NOT NULL CHECK (typeof(revoked_at_ms) = 'integer' AND revoked_at_ms > 0),
      retain_until_ms INTEGER NOT NULL CHECK (typeof(retain_until_ms) = 'integer' AND retain_until_ms >= revoked_at_ms)
    );
    CREATE INDEX session_revocations_expiry_idx ON session_revocations(retain_until_ms);
    CREATE TABLE auth_rate_limits (
      scope TEXT NOT NULL CHECK (scope IN ('login', 'registration')),
      subject_hash TEXT NOT NULL CHECK (length(subject_hash) = 64 AND subject_hash NOT GLOB '*[^0-9a-f]*'),
      attempt_count INTEGER NOT NULL DEFAULT 0 CHECK (typeof(attempt_count) = 'integer' AND attempt_count BETWEEN 0 AND 1000000),
      window_started_at_ms INTEGER NOT NULL CHECK (typeof(window_started_at_ms) = 'integer' AND window_started_at_ms > 0),
      blocked_until_ms INTEGER CHECK (blocked_until_ms IS NULL OR (typeof(blocked_until_ms) = 'integer' AND blocked_until_ms > 0)),
      updated_at_ms INTEGER NOT NULL CHECK (typeof(updated_at_ms) = 'integer' AND updated_at_ms > 0),
      PRIMARY KEY (scope, subject_hash)
    );
    CREATE INDEX auth_rate_limits_updated_idx ON auth_rate_limits(updated_at_ms);
    CREATE INDEX auth_rate_limits_blocked_idx ON auth_rate_limits(blocked_until_ms) WHERE blocked_until_ms IS NOT NULL;
  `);
  const studentId = db.prepare('INSERT INTO students (display_name, email, password_hash) VALUES (?, ?, ?)')
    .run('Test Student', 'student@example.test', 'not-a-real-password-hash').lastInsertRowid;
  return {
    db,
    filename,
    studentId,
    close() {
      db.close();
      fs.rmSync(directory, { recursive: true, force: true });
    },
  };
}

function callbackCall(target, method, ...args) {
  return new Promise((resolve, reject) => target[method](...args, (error, result) => error ? reject(error) : resolve(result)));
}

module.exports = { callbackCall, disposableAuthDatabase };
