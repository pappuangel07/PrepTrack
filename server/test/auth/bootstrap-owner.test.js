
'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const Database = require('better-sqlite3');
const { bootstrapFirstStudent } = require('../../auth/bootstrap-owner');

function createDatabase() {
  const db = new Database(':memory:');
  db.pragma('foreign_keys = ON');

  db.exec(`
    CREATE TABLE students (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      display_name TEXT NOT NULL,
      email TEXT NOT NULL UNIQUE,
      password_hash TEXT NOT NULL
    );

    CREATE TABLE tasks (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      student_id INTEGER REFERENCES students(id)
    );

    CREATE TABLE study_sessions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      subject TEXT NOT NULL,
      student_id INTEGER REFERENCES students(id)
    );

    CREATE TABLE pomodoro_sessions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      subject TEXT NOT NULL,
      student_id INTEGER REFERENCES students(id)
    );

    CREATE TABLE notes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      student_id INTEGER REFERENCES students(id)
    );

    CREATE TABLE bookmarks (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      student_id INTEGER REFERENCES students(id)
    );

    CREATE TABLE bootstrap_state (
      singleton INTEGER PRIMARY KEY CHECK(singleton = 1),
      owner_student_id INTEGER NOT NULL UNIQUE
        REFERENCES students(id),
      completed_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    );
  `);

  return db;
}

function createStudent(db, email) {
  return Number(db.prepare(`
    INSERT INTO students (display_name, email, password_hash)
    VALUES (?, ?, ?)
  `).run('Test Student', email, 'test-hash').lastInsertRowid);
}


test('first student receives all unassigned legacy records', () => {
  const db = createDatabase();

  try {
    const studentId = createStudent(db, 'first@test.com');

    const inserts = [
      ['tasks', 'title', 'Task', 22],
      ['study_sessions', 'subject', 'DSA', 2],
      ['pomodoro_sessions', 'subject', 'Java', 5],
      ['notes', 'title', 'Note', 3],
      ['bookmarks', 'title', 'Bookmark', 4]
    ];

    for (const [table, column, value, count] of inserts) {
      for (let i = 0; i < count; i++) {
        db.prepare(`INSERT INTO ${table} (${column}) VALUES (?)`)
          .run(`${value} ${i}`);
      }
    }

    const result = bootstrapFirstStudent(db, studentId);

    assert.deepEqual(result, {
      bootstrapped: true,
      tasksTransferred: 22,
      studySessionsTransferred: 2,
      pomodoroTransferred: 5,
      notesTransferred: 3,
      bookmarksTransferred: 4
    });

    for (const [table, , , expectedCount] of inserts) {
      const assigned = db.prepare(
        `SELECT COUNT(*) AS count FROM ${table} WHERE student_id = ?`
      ).get(studentId).count;

      const unassigned = db.prepare(
        `SELECT COUNT(*) AS count FROM ${table} WHERE student_id IS NULL`
      ).get().count;

      assert.equal(assigned, expectedCount, `${table} assigned count`);
      assert.equal(unassigned, 0, `${table} unassigned count`);
    }
  } finally {
    db.close();
  }
});


test('second student cannot claim legacy records', () => {
  const db = createDatabase();

  try {
    createStudent(db, 'first@test.com');
    const secondId = createStudent(db, 'second@test.com');

    db.prepare('INSERT INTO tasks (title) VALUES (?)').run('Legacy task');

    const result = bootstrapFirstStudent(db, secondId);

    assert.deepEqual(result, { bootstrapped: false });

    assert.equal(
      db.prepare('SELECT COUNT(*) AS count FROM tasks WHERE student_id IS NULL')
        .get().count,
      1
    );

    assert.equal(
      db.prepare('SELECT COUNT(*) AS count FROM bootstrap_state').get().count,
      0
    );
  } finally {
    db.close();
  }
});

test('repeated bootstrap does not transfer records again', () => {
  const db = createDatabase();

  try {
    const studentId = createStudent(db, 'first@test.com');

    db.prepare('INSERT INTO tasks (title) VALUES (?)').run('Legacy task');

    const first = bootstrapFirstStudent(db, studentId);
    const second = bootstrapFirstStudent(db, studentId);

    assert.equal(first.bootstrapped, true);
    assert.deepEqual(second, { bootstrapped: false });

    assert.equal(
      db.prepare('SELECT owner_student_id FROM bootstrap_state')
        .get().owner_student_id,
      studentId
    );
  } finally {
    db.close();
  }
});

test('invalid student ID is rejected', () => {
  const db = createDatabase();

  try {
    assert.throws(() => bootstrapFirstStudent(db, 0), /Invalid student ID/);
    assert.throws(() => bootstrapFirstStudent(db, -1), /Invalid student ID/);
  } finally {
    db.close();
  }
});
