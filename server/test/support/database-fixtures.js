
'use strict';

const Database = require('better-sqlite3');
const { migrateToVersion } = require('../../migrate');

function createBaseline(filename) {
  const db = new Database(filename);
  db.exec(`
    CREATE TABLE roadmap (
      id INTEGER PRIMARY KEY,
      title TEXT NOT NULL,
      description TEXT NOT NULL,
      status TEXT NOT NULL DEFAULT 'Not Started'
    );

    CREATE TABLE java_topics (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL UNIQUE,
      category TEXT NOT NULL,
      description TEXT NOT NULL DEFAULT '',
      status TEXT NOT NULL DEFAULT 'Not Started'
        CHECK (status IN ('Not Started', 'In Progress', 'Completed')),
      sort_order INTEGER NOT NULL UNIQUE
    );

    CREATE TABLE dsa_topics (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL UNIQUE,
      category TEXT NOT NULL,
      description TEXT NOT NULL DEFAULT '',
      status TEXT NOT NULL DEFAULT 'Not Started'
        CHECK (status IN ('Not Started', 'In Progress', 'Completed')),
      sort_order INTEGER NOT NULL UNIQUE
    );

    CREATE TABLE aptitude_topics (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL UNIQUE,
      category TEXT NOT NULL,
      description TEXT NOT NULL DEFAULT '',
      status TEXT NOT NULL DEFAULT 'Not Started'
        CHECK (status IN ('Not Started', 'In Progress', 'Completed')),
      sort_order INTEGER NOT NULL UNIQUE
    );

    CREATE TABLE tasks (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      description TEXT NOT NULL DEFAULT '',
      due_date TEXT,
      completed INTEGER NOT NULL DEFAULT 0,
      priority TEXT NOT NULL DEFAULT 'Medium',
      deleted INTEGER NOT NULL DEFAULT 0
    );

    CREATE TABLE notes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      subject TEXT NOT NULL
        CHECK (subject IN ('Java', 'DSA', 'Aptitude')),
      content TEXT NOT NULL DEFAULT '',
      created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE bookmarks (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      url TEXT NOT NULL,
      subject TEXT NOT NULL
        CHECK (subject IN ('Java', 'DSA', 'Aptitude')),
      description TEXT NOT NULL DEFAULT '',
      created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE study_sessions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      subject TEXT NOT NULL
        CHECK (subject IN ('Java', 'DSA', 'Aptitude')),
      topic TEXT NOT NULL,
      study_date TEXT NOT NULL,
      start_time TEXT NOT NULL,
      duration_minutes INTEGER NOT NULL CHECK (duration_minutes > 0),
      completed INTEGER NOT NULL DEFAULT 0 CHECK (completed IN (0, 1)),
      created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE pomodoro_sessions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      subject TEXT NOT NULL
        CHECK (subject IN ('Java', 'DSA', 'Aptitude')),
      duration_minutes INTEGER NOT NULL CHECK (duration_minutes > 0),
      completed_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
      created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    );

    INSERT INTO roadmap
      VALUES (1, 'Java', 'Learn Java', 'Not Started');

    INSERT INTO java_topics (title, category, sort_order)
      VALUES ('Java Basics', 'Core Java', 1);

    INSERT INTO dsa_topics (title, category, sort_order)
      VALUES ('Arrays', 'DSA', 1);

    INSERT INTO aptitude_topics (title, category, sort_order)
      VALUES ('Percentages', 'Quantitative Aptitude', 1);
  `);

  return db;
}

function createV3(filename) {
  const db = createBaseline(filename);
  migrateToVersion(db, 3);
  return db;
}

function captureState(db) {
  const objects = db.prepare(
    'SELECT type, name, tbl_name, sql FROM sqlite_master ORDER BY type, name'
  ).all();

  const rows = {};

  for (const { name } of objects.filter(
    (object) => object.type === 'table' && !object.name.startsWith('sqlite_')
  )) {
    rows[name] = db.prepare(`SELECT * FROM "${name}" ORDER BY rowid`).all();
  }

  if (
    db.prepare(
      "SELECT 1 FROM sqlite_master WHERE type = 'table' AND name = 'sqlite_sequence'"
    ).get()
  ) {
    rows.sqlite_sequence = db.prepare(
      'SELECT name, seq FROM sqlite_sequence ORDER BY name'
    ).all();
  }

  return {
    version: db.pragma('user_version')[0].user_version,
    objects,
    rows,
  };
}

module.exports = { createBaseline, createV3, captureState };
