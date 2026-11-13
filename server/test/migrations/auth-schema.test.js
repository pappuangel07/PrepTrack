const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { spawnSync } = require('node:child_process');
const test = require('node:test');
const Database = require('better-sqlite3');
const { migrateAuthSchema } = require('../../migrations/001-auth-schema');
const { migrateAuthBootstrapSchema, validateAuthBootstrapSchema } = require('../../migrations/002-auth-bootstrap');
const { migrateSessionRevocationSchema, validateSessionRevocationSchema } = require('../../migrations/003-session-revocations');
const { assertDatabasePathIsUnprotected, PROTECTED_DATABASE_PATHS, readDatabaseArguments } = require('../../migrate');
const { migrateToVersion } = require('../../migrate');

const SERVER_DIR = path.resolve(__dirname, '../..');
const MIGRATOR_PATH = path.join(SERVER_DIR, 'migrate.js');
const PHASE1_BACKUP = process.env.PREPTRACK_PHASE1_BACKUP_PATH
  ? path.resolve(process.env.PREPTRACK_PHASE1_BACKUP_PATH)
  : path.join(SERVER_DIR, 'phase1-rehearsal-20261112174903-506aaf49', 'verified-live-backup.db');
const PHASE1_BACKUP_SKIP = fs.existsSync(PHASE1_BACKUP)
  ? false
  : `SKIPPED: external Phase 1 backup artifact is not present at ${PHASE1_BACKUP}`;
const FEATURE_TABLES = ['tasks', 'notes', 'bookmarks', 'study_sessions', 'pomodoro_sessions'];
const AUTOINCREMENT_TABLES = FEATURE_TABLES;
const ALL_AUTOINCREMENT_TABLES = ['students', 'java_topics', 'dsa_topics', 'aptitude_topics', ...FEATURE_TABLES];
const CATALOG_TABLES = ['roadmap', 'java_topics', 'dsa_topics', 'aptitude_topics'];
const ORIGINAL_FEATURE_COLUMNS = {
  tasks: ['id', 'title', 'description', 'due_date', 'completed', 'priority', 'deleted'],
  notes: ['id', 'title', 'subject', 'content', 'created_at', 'updated_at'],
  bookmarks: ['id', 'title', 'url', 'subject', 'description', 'created_at', 'updated_at'],
  study_sessions: ['id', 'subject', 'topic', 'study_date', 'start_time', 'duration_minutes', 'completed', 'created_at'],
  pomodoro_sessions: ['id', 'subject', 'duration_minutes', 'completed_at', 'created_at'],
};

const runDirectory = fs.mkdtempSync(path.join(SERVER_DIR, '.phase3-migration-test-'));
const safeTempRoot = path.resolve(SERVER_DIR);
assert.ok(path.resolve(runDirectory).startsWith(`${safeTempRoot}${path.sep}`));

test.after(() => {
  const resolved = path.resolve(runDirectory);
  assert.ok(resolved.startsWith(`${safeTempRoot}${path.sep}`), 'cleanup target must remain in the server test temp root');
  fs.rmSync(resolved, { recursive: true, force: true });
});

test('CLI target-version parser accepts one exact value and rejects every duplicate or invalid value', () => {
  assert.deepEqual(readDatabaseArguments(['--db', 'fixture.db']), {
    databasePath: path.resolve('fixture.db'), targetVersion: 3,
  });
  assert.equal(readDatabaseArguments(['--db', 'fixture.db', '--target-version', '1']).targetVersion, 1);
  assert.equal(readDatabaseArguments(['--target-version', '2', '--db', 'fixture.db']).targetVersion, 2);
  assert.equal(readDatabaseArguments(['--target-version', '3', '--db', 'fixture.db']).targetVersion, 3);
  for (const values of [['1', '1'], ['2', '2'], ['3', '3'], ['1', '2'], ['2', '1'], ['1', '3'], ['3', '1']]) {
    assert.throws(() => readDatabaseArguments([
      '--db', 'fixture.db', '--target-version', values[0], '--target-version', values[1],
    ]), /Usage:/, `duplicate target versions ${values.join(',')} must be rejected`);
  }
  for (const invalid of ['0', '4', '01', '1.0', 'NaN', '']) {
    assert.throws(() => readDatabaseArguments(['--db', 'fixture.db', '--target-version', invalid]),
      /Target version must be exactly 1, 2, or 3|Usage:/);
  }
});

function createBaselineDatabase(filePath, { customTrigger = false } = {}) {
  assert.equal(fs.existsSync(filePath), false, `test database path must be new: ${filePath}`);
  const db = new Database(filePath, { fileMustExist: false, timeout: 5000 });
  db.pragma('foreign_keys = ON');
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
      status TEXT NOT NULL DEFAULT 'Not Started' CHECK (status IN ('Not Started', 'In Progress', 'Completed')),
      sort_order INTEGER NOT NULL UNIQUE
    );
    CREATE TABLE dsa_topics (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL UNIQUE,
      category TEXT NOT NULL,
      description TEXT NOT NULL DEFAULT '',
      status TEXT NOT NULL DEFAULT 'Not Started' CHECK (status IN ('Not Started', 'In Progress', 'Completed')),
      sort_order INTEGER NOT NULL UNIQUE
    );
    CREATE TABLE aptitude_topics (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL UNIQUE,
      category TEXT NOT NULL,
      description TEXT NOT NULL DEFAULT '',
      status TEXT NOT NULL DEFAULT 'Not Started' CHECK (status IN ('Not Started', 'In Progress', 'Completed')),
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
      subject TEXT NOT NULL CHECK (subject IN ('Java', 'DSA', 'Aptitude')),
      content TEXT NOT NULL DEFAULT '',
      created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    );
    CREATE TABLE bookmarks (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      url TEXT NOT NULL,
      subject TEXT NOT NULL CHECK (subject IN ('Java', 'DSA', 'Aptitude')),
      description TEXT NOT NULL DEFAULT '',
      created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    );
    CREATE TABLE study_sessions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      subject TEXT NOT NULL CHECK (subject IN ('Java', 'DSA', 'Aptitude')),
      topic TEXT NOT NULL,
      study_date TEXT NOT NULL,
      start_time TEXT NOT NULL,
      duration_minutes INTEGER NOT NULL CHECK (duration_minutes > 0),
      completed INTEGER NOT NULL DEFAULT 0 CHECK (completed IN (0, 1)),
      created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    );
    CREATE TABLE pomodoro_sessions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      subject TEXT NOT NULL CHECK (subject IN ('Java', 'DSA', 'Aptitude')),
      duration_minutes INTEGER NOT NULL CHECK (duration_minutes > 0),
      completed_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
      created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    );

    INSERT INTO roadmap (id, title, description, status) VALUES
      (1, 'Java', 'Java roadmap', 'In Progress'),
      (2, 'Data Structures and Algorithms', 'DSA roadmap', 'Not Started'),
      (3, 'Aptitude', 'Aptitude roadmap', 'Completed');
    INSERT INTO java_topics (id, title, category, description, status, sort_order)
      VALUES (1, 'Java Fixture', 'Core Java', 'Fixture topic', 'Completed', 1);
    INSERT INTO dsa_topics (id, title, category, description, status, sort_order)
      VALUES (1, 'DSA Fixture', 'DSA', 'Fixture topic', 'In Progress', 1);
    INSERT INTO aptitude_topics (id, title, category, description, status, sort_order)
      VALUES (1, 'Aptitude Fixture', 'Aptitude', 'Fixture topic', 'Not Started', 1);
    INSERT INTO tasks (id, title, description, due_date, completed, priority, deleted)
      VALUES (41, 'Fixture pending', 'Task description', '2030-01-01', 0, 'High', 0),
             (44, 'Fixture deleted', 'Deleted description', NULL, 1, 'Low', 1);
    INSERT INTO notes (id, title, subject, content, created_at, updated_at)
      VALUES (8, 'Fixture note', 'Java', 'Note body', '2026-01-01', '2026-01-02');
    INSERT INTO bookmarks (id, title, url, subject, description, created_at, updated_at)
      VALUES (12, 'Fixture link', 'https://example.test/resource', 'DSA', 'Bookmark description', '2026-01-01', '2026-01-02');
    INSERT INTO study_sessions (id, subject, topic, study_date, start_time, duration_minutes, completed, created_at)
      VALUES (6, 'Java', 'Fixture topic', '2026-01-03', '09:30', 45, 1, '2026-01-01');
    INSERT INTO pomodoro_sessions (id, subject, duration_minutes, completed_at, created_at)
      VALUES (19, 'Aptitude', 25, '2026-01-03 09:00:00', '2026-01-03 08:35:00');
  `);

  if (customTrigger) {
    db.exec(`
      CREATE INDEX phase2_tasks_due_date_idx ON tasks(due_date);
      CREATE TABLE phase2_trigger_events (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        task_id INTEGER NOT NULL,
        new_title TEXT NOT NULL
      );
      CREATE TRIGGER phase2_tasks_title_audit
      AFTER UPDATE OF title ON tasks
      BEGIN
        INSERT INTO phase2_trigger_events (task_id, new_title)
        VALUES (NEW.id, NEW.title);
      END;
    `);
  }

  db.close();
}

function copyDatabase(sourcePath, destinationPath) {
  assert.equal(fs.existsSync(destinationPath), false, `copy destination must be new: ${destinationPath}`);
  const source = new Database(sourcePath, { readonly: true, fileMustExist: true });
  return source.backup(destinationPath).finally(() => source.close());
}

function captureState(db) {
  const schemaObjects = db.prepare(
    'SELECT type, name, tbl_name, sql FROM sqlite_master ORDER BY type, name'
  ).all();
  const tableNames = db.prepare(
    'SELECT name FROM sqlite_master WHERE type = ? AND name NOT LIKE ? ORDER BY name'
  ).all('table', 'sqlite_%').map((row) => row.name);
  const rows = {};
  for (const tableName of tableNames) {
    rows[tableName] = db.prepare(`SELECT * FROM "${tableName}" ORDER BY rowid`).all();
  }
  if (schemaObjects.some((object) => object.name === 'sqlite_sequence')) {
    rows.sqlite_sequence = db.prepare('SELECT name, seq FROM sqlite_sequence ORDER BY name').all();
  }
  return {
    schemaObjects,
    rows,
    userVersion: db.pragma('user_version')[0].user_version,
    schemaVersion: db.pragma('schema_version')[0].schema_version,
    foreignKeys: db.pragma('foreign_keys')[0].foreign_keys,
    journalMode: db.pragma('journal_mode')[0].journal_mode,
  };
}

function readOriginalRows(db) {
  const data = {};
  for (const tableName of [...CATALOG_TABLES, ...FEATURE_TABLES]) {
    const columns = tableName in ORIGINAL_FEATURE_COLUMNS
      ? ORIGINAL_FEATURE_COLUMNS[tableName]
      : db.pragma(`table_info("${tableName}")`).map((column) => column.name);
    data[tableName] = db.prepare(
      `SELECT ${columns.join(', ')} FROM "${tableName}" ORDER BY id`
    ).all();
  }
  return data;
}

function readSequences(db) {
  return Object.fromEntries(AUTOINCREMENT_TABLES.map((tableName) => {
    const row = db.prepare('SELECT seq FROM sqlite_sequence WHERE name = ?').get(tableName);
    return [tableName, row ? row.seq : null];
  }));
}

function readAllSequences(db) {
  return Object.fromEntries(ALL_AUTOINCREMENT_TABLES.map((tableName) => {
    const row = db.prepare('SELECT seq FROM sqlite_sequence WHERE name = ?').get(tableName);
    return [tableName, row ? row.seq : null];
  }));
}

function assertCatalogAndStudentGeneratedIds(db, expectedSequences) {
  const actualIds = {};
  const rollback = new Error('ROLLBACK catalog/student AUTOINCREMENT probe');
  const probe = db.transaction(() => {
    for (const tableName of ['java_topics', 'dsa_topics', 'aptitude_topics']) {
      const sortOrder = db.prepare(`SELECT COALESCE(MAX(sort_order), 0) + 1 AS n FROM "${tableName}"`).get().n;
      actualIds[tableName] = db.prepare(`INSERT INTO "${tableName}" (title, category, sort_order) VALUES (?, ?, ?)`)
        .run(`sequence-probe-${tableName}`, 'Probe', sortOrder).lastInsertRowid;
    }
    actualIds.students = db.prepare('INSERT INTO students (display_name, email, password_hash) VALUES (?, ?, ?)')
      .run('Sequence Probe', 'catalog-sequence-probe@example.test', 'hash').lastInsertRowid;
    throw rollback;
  });
  assert.throws(() => probe(), (error) => error === rollback);
  for (const tableName of ['students', 'java_topics', 'dsa_topics', 'aptitude_topics']) {
    assert.equal(actualIds[tableName], (expectedSequences[tableName] ?? 0) + 1,
      `${tableName} must continue at the preserved AUTOINCREMENT sequence`);
  }
  assert.deepEqual(readAllSequences(db), expectedSequences, 'rolled-back generated-ID probes must preserve sqlite_sequence');
}

function readIndexAndTriggerObjects(db) {
  return db.prepare(
    'SELECT type, name, tbl_name, sql FROM sqlite_master WHERE type IN (?, ?) ORDER BY type, name'
  ).all('index', 'trigger');
}

function assertNewForeignKey(db, tableName, targetTable) {
  const keys = db.pragma(`foreign_key_list("${tableName}")`);
  assert.ok(keys.some((key) => key.table === targetTable), `${tableName} must reference ${targetTable}`);
}

function assertForeignKeyAction(db, tableName, from, targetTable, to, onDelete) {
  assert.ok(db.pragma(`foreign_key_list("${tableName}")`).some((key) =>
    key.from === from && key.table === targetTable && key.to === to && key.on_delete === onDelete
  ), `${tableName}.${from} must reference ${targetTable}.${to} ON DELETE ${onDelete}`);
}

function assertIndex(db, name, columns, { unique = 0, partial = 0 } = {}) {
  const index = db.prepare('SELECT tbl_name FROM sqlite_master WHERE type = ? AND name = ?').get('index', name);
  assert.ok(index, `missing index ${name}`);
  const listed = db.pragma(`index_list("${index.tbl_name}")`).find((entry) => entry.name === name);
  assert.equal(listed.unique, unique, `incorrect uniqueness for ${name}`);
  assert.equal(listed.partial, partial, `incorrect partial status for ${name}`);
  assert.deepEqual(db.pragma(`index_xinfo("${name}")`).filter((column) => column.key === 1)
    .map((column) => [column.name, column.desc, column.coll.toUpperCase()]),
  columns.map(([column, desc]) => [column, desc, 'BINARY']), `incorrect definition for ${name}`);
}

function assertConstraintChecks(db) {
  const createStudent = db.prepare(`INSERT INTO students (display_name, email, password_hash) VALUES (?, ?, ?)`);
  assert.throws(() => createStudent.run('  ', 'blank@example.test', 'hash'), /CHECK constraint failed/);
  const firstId = createStudent.run('Student One', 'Student@Example.test', 'hash').lastInsertRowid;
  db.prepare('DELETE FROM students WHERE id = ?').run(firstId);
  const secondId = createStudent.run('Student One', 'Student@Example.test', 'hash').lastInsertRowid;
  assert.ok(secondId > firstId, 'students.id must use AUTOINCREMENT semantics');
  assert.throws(() => createStudent.run('Student Two', 'student@example.test', 'hash'), /UNIQUE constraint failed/);

  const insertSession = db.prepare(`INSERT INTO sessions (sid, session_data, created_at_ms, expires_at_ms) VALUES (?, ?, ?, ?)`);
  assert.throws(() => insertSession.run('bad-expiry', '{}', 1, 0), /CHECK constraint failed/);
  assert.throws(() => db.prepare(`INSERT INTO roadmap_progress (student_id, roadmap_id, status) VALUES (?, 1, 'Invalid')`).run(secondId), /CHECK constraint failed/);
  db.prepare(`INSERT INTO roadmap_progress (student_id, roadmap_id) VALUES (?, 1)`).run(secondId);
  assert.throws(() => db.prepare(`INSERT INTO roadmap_progress (student_id, roadmap_id) VALUES (?, 1)`).run(secondId), /UNIQUE constraint failed/);
}

function runCli(databasePath, targetVersion) {
  const args = [MIGRATOR_PATH, '--db', databasePath];
  if (targetVersion !== undefined) args.push('--target-version', String(targetVersion));
  return spawnSync(process.execPath, args, {
    encoding: 'utf8',
    timeout: 30000,
  });
}

function assertGeneratedIdsAndRollbackSequences(db, expectedSequences) {
  const inserts = {
    tasks: db.prepare('INSERT INTO tasks (title) VALUES (?)'),
    notes: db.prepare('INSERT INTO notes (title, subject, content) VALUES (?, ?, ?)'),
    bookmarks: db.prepare('INSERT INTO bookmarks (title, url, subject) VALUES (?, ?, ?)'),
    study_sessions: db.prepare(`INSERT INTO study_sessions
      (subject, topic, study_date, start_time, duration_minutes) VALUES (?, ?, ?, ?, ?)`),
    pomodoro_sessions: db.prepare('INSERT INTO pomodoro_sessions (subject, duration_minutes) VALUES (?, ?)'),
  };
  const actualIds = {};
  const rollback = new Error('ROLLBACK AUTOINCREMENT probe');
  const probe = db.transaction(() => {
    actualIds.tasks = inserts.tasks.run('sequence probe').lastInsertRowid;
    actualIds.notes = inserts.notes.run('sequence probe', 'Java', 'probe').lastInsertRowid;
    actualIds.bookmarks = inserts.bookmarks.run('sequence probe', 'https://example.test/probe', 'Java').lastInsertRowid;
    actualIds.study_sessions = inserts.study_sessions.run('Java', 'probe', '2031-01-01', '10:00', 10).lastInsertRowid;
    actualIds.pomodoro_sessions = inserts.pomodoro_sessions.run('Java', 25).lastInsertRowid;
    throw rollback;
  });
  assert.throws(() => probe(), (error) => error === rollback);

  const expectedNextIds = Object.fromEntries(AUTOINCREMENT_TABLES.map((tableName) => [
    tableName,
    (expectedSequences[tableName] ?? 0) + 1,
  ]));
  assert.deepEqual(actualIds, expectedNextIds, 'AUTOINCREMENT must continue above the original sqlite_sequence values');
  assert.deepEqual(readSequences(db), expectedSequences, 'rolled-back probes must leave sqlite_sequence unchanged');
}

function assertV2GeneratedIdsAndRollbackSequences(db, expectedFeatureSequences, expectedStudentSequence) {
  const actual = {};
  const rollback = new Error('ROLLBACK v2 AUTOINCREMENT probe');
  const probe = db.transaction(() => {
    actual.students = db.prepare('INSERT INTO students (display_name, email, password_hash) VALUES (?, ?, ?)')
      .run('Sequence Probe', 'v2-sequence-probe@example.test', 'hash').lastInsertRowid;
    actual.tasks = db.prepare('INSERT INTO tasks (title) VALUES (?)').run('v2 sequence probe').lastInsertRowid;
    actual.notes = db.prepare('INSERT INTO notes (title, subject, content) VALUES (?, ?, ?)')
      .run('v2 sequence probe', 'Java', '').lastInsertRowid;
    actual.bookmarks = db.prepare('INSERT INTO bookmarks (title, url, subject) VALUES (?, ?, ?)')
      .run('v2 sequence probe', 'https://example.test/v2', 'Java').lastInsertRowid;
    actual.study_sessions = db.prepare(`INSERT INTO study_sessions
      (subject, topic, study_date, start_time, duration_minutes) VALUES (?, ?, ?, ?, ?)`)
      .run('Java', 'v2 probe', '2031-01-01', '10:00', 10).lastInsertRowid;
    actual.pomodoro_sessions = db.prepare('INSERT INTO pomodoro_sessions (subject, duration_minutes) VALUES (?, ?)')
      .run('Java', 25).lastInsertRowid;
    throw rollback;
  });
  assert.throws(() => probe(), (error) => error === rollback);
  assert.deepEqual(actual, {
    students: (expectedStudentSequence ?? 0) + 1,
    tasks: (expectedFeatureSequences.tasks ?? 0) + 1,
    notes: (expectedFeatureSequences.notes ?? 0) + 1,
    bookmarks: (expectedFeatureSequences.bookmarks ?? 0) + 1,
    study_sessions: (expectedFeatureSequences.study_sessions ?? 0) + 1,
    pomodoro_sessions: (expectedFeatureSequences.pomodoro_sessions ?? 0) + 1,
  });
  assert.deepEqual(readSequences(db), expectedFeatureSequences);
  const currentStudentSequence = db.prepare('SELECT seq FROM sqlite_sequence WHERE name = ?').get('students')?.seq ?? null;
  assert.equal(currentStudentSequence, expectedStudentSequence);
}

function assertMigratedDatabase(databasePath, { expectCustomTrigger = false } = {}) {
  const db = new Database(databasePath, { fileMustExist: true, timeout: 5000 });
  try {
    db.pragma('foreign_keys = ON');
    assert.equal(db.pragma('user_version')[0].user_version, 1);
    assert.deepEqual(db.pragma('integrity_check'), [{ integrity_check: 'ok' }]);
    assert.deepEqual(db.pragma('foreign_key_check'), []);
    for (const tableName of ['students', ...FEATURE_TABLES]) {
      const sql = db.prepare('SELECT sql FROM sqlite_master WHERE type = ? AND name = ?').get('table', tableName).sql;
      assert.match(sql, /\bid\s+INTEGER\s+PRIMARY\s+KEY\s+AUTOINCREMENT\b/i, `${tableName}.id must declare AUTOINCREMENT`);
    }

    for (const tableName of FEATURE_TABLES) {
      const owner = db.pragma(`table_info("${tableName}")`).find((column) => column.name === 'student_id');
      assert.deepEqual([owner.type, owner.notnull, owner.dflt_value, owner.pk], ['INTEGER', 0, null, 0]);
      assertForeignKeyAction(db, tableName, 'student_id', 'students', 'id', 'RESTRICT');
      assert.equal(db.prepare(`SELECT COUNT(*) AS n FROM "${tableName}" WHERE student_id IS NOT NULL`).get().n, 0,
        `${tableName} must remain unassigned until Phase 3 bootstrap`);
    }
    assertForeignKeyAction(db, 'sessions', 'student_id', 'students', 'id', 'CASCADE');
    assertForeignKeyAction(db, 'roadmap_progress', 'student_id', 'students', 'id', 'RESTRICT');
    assertForeignKeyAction(db, 'roadmap_progress', 'roadmap_id', 'roadmap', 'id', 'RESTRICT');
    assertForeignKeyAction(db, 'java_topic_progress', 'student_id', 'students', 'id', 'RESTRICT');
    assertForeignKeyAction(db, 'java_topic_progress', 'topic_id', 'java_topics', 'id', 'RESTRICT');
    assertForeignKeyAction(db, 'dsa_topic_progress', 'student_id', 'students', 'id', 'RESTRICT');
    assertForeignKeyAction(db, 'dsa_topic_progress', 'topic_id', 'dsa_topics', 'id', 'RESTRICT');
    assertForeignKeyAction(db, 'aptitude_topic_progress', 'student_id', 'students', 'id', 'RESTRICT');
    assertForeignKeyAction(db, 'aptitude_topic_progress', 'topic_id', 'aptitude_topics', 'id', 'RESTRICT');

    assert.equal(db.prepare('SELECT COUNT(*) AS n FROM students').get().n, 0,
      'Phase 2 must not bootstrap an initial account');
    assert.equal(db.prepare('SELECT COUNT(*) AS n FROM sessions').get().n, 0);
    for (const progressTable of [
      'roadmap_progress',
      'java_topic_progress',
      'dsa_topic_progress',
      'aptitude_topic_progress',
    ]) {
      assert.equal(db.prepare(`SELECT COUNT(*) AS n FROM ${progressTable}`).get().n, 0,
        'progress copying is deferred to Phase 3 bootstrap');
    }

    const expectedIndexes = {
      sessions_expiry_idx: [['expires_at_ms', 0]], sessions_student_idx: [['student_id', 0]],
      roadmap_progress_student_idx: [['student_id', 0]], java_topic_progress_student_idx: [['student_id', 0]],
      dsa_topic_progress_student_idx: [['student_id', 0]], aptitude_topic_progress_student_idx: [['student_id', 0]],
      tasks_owner_idx: [['student_id', 0], ['deleted', 0], ['id', 1]],
      notes_owner_idx: [['student_id', 0], ['updated_at', 1], ['id', 1]],
      bookmarks_owner_idx: [['student_id', 0], ['subject', 0], ['updated_at', 1]],
      study_sessions_owner_idx: [['student_id', 0], ['study_date', 0], ['start_time', 0]],
      pomodoro_owner_idx: [['student_id', 0], ['completed_at', 0]],
    };
    for (const [name, columns] of Object.entries(expectedIndexes)) assertIndex(db, name, columns);
    assertConstraintChecks(db);

    if (expectCustomTrigger) {
      assert.ok(db.prepare('SELECT 1 FROM sqlite_master WHERE type = ? AND name = ?').get('trigger', 'phase2_tasks_title_audit'));
      const beforeTitle = db.prepare('SELECT title FROM tasks WHERE id = 41').get().title;
      const rollback = new Error('ROLLBACK trigger probe');
      const probe = db.transaction(() => {
        db.prepare('UPDATE tasks SET title = ? WHERE id = ?').run('trigger fired', 41);
        assert.deepEqual(db.prepare('SELECT task_id, new_title FROM phase2_trigger_events').all(), [
          { task_id: 41, new_title: 'trigger fired' },
        ]);
        throw rollback;
      });
      assert.throws(() => probe(), (error) => error === rollback);
      assert.equal(db.prepare('SELECT title FROM tasks WHERE id = 41').get().title, beforeTitle);
      assert.equal(db.prepare('SELECT COUNT(*) AS n FROM phase2_trigger_events').get().n, 0);
    }
  } finally {
    db.close();
  }
}

async function migrateAndVerify(databasePath, { expectCustomTrigger = false } = {}) {
  const dbBefore = new Database(databasePath, { readonly: true, fileMustExist: true });
  const originalRows = readOriginalRows(dbBefore);
  const originalSequences = readSequences(dbBefore);
  const originalIndexesAndTriggers = readIndexAndTriggerObjects(dbBefore);
  dbBefore.close();

  const first = runCli(databasePath, 1);
  assert.equal(first.status, 0, `migration CLI failed: ${first.stderr}`);
  assert.match(first.stdout, /applied: schema version 0 -> 1/);

  const dbAfter = new Database(databasePath, { fileMustExist: true, timeout: 5000 });
  try {
    dbAfter.pragma('foreign_keys = ON');
    assertMigratedDatabase(databasePath, { expectCustomTrigger });
    assert.deepEqual(readOriginalRows(dbAfter), originalRows, 'all original catalog and feature columns must remain unchanged');
    assert.deepEqual(readSequences(dbAfter), originalSequences, 'ALTER TABLE must preserve all sqlite_sequence values');

    const currentIndexesAndTriggers = readIndexAndTriggerObjects(dbAfter);
    const currentByName = new Map(currentIndexesAndTriggers.map((object) => [object.name, object]));
    for (const object of originalIndexesAndTriggers) {
      assert.deepEqual(currentByName.get(object.name), object, `existing index/trigger ${object.name} must be preserved`);
    }

    const repeatedState = captureState(dbAfter);
    const second = runCli(databasePath, 1);
    assert.equal(second.status, 0, `repeat migration CLI failed: ${second.stderr}`);
    assert.match(second.stdout, /already-current: schema version 1 -> 1/);
    assert.deepEqual(captureState(dbAfter), repeatedState, 'repeated migration must not change the database');
  } finally {
    dbAfter.close();
  }

  const sequenceDb = new Database(databasePath, { fileMustExist: true, timeout: 5000 });
  try {
    sequenceDb.pragma('foreign_keys = ON');
    assertGeneratedIdsAndRollbackSequences(sequenceDb, originalSequences);
    assert.deepEqual(sequenceDb.pragma('integrity_check'), [{ integrity_check: 'ok' }]);
    assert.deepEqual(sequenceDb.pragma('foreign_key_check'), []);
  } finally {
    sequenceDb.close();
  }
}

function assertRollback(databasePath, failpoint = 'after-user-version') {
  const db = new Database(databasePath, { fileMustExist: true, timeout: 5000 });
  try {
    db.pragma('foreign_keys = ON');
    const before = captureState(db);
    assert.equal(before.userVersion, 0);
    const expectedError = failpoint === 'validation'
      ? /index "tasks_owner_idx" is missing/
      : new RegExp(`Injected migration failure at ${failpoint}`);
    assert.throws(() => migrateAuthSchema(db, { failpoint }), expectedError);
    assert.deepEqual(captureState(db), before,
      'rollback must restore schema objects, all rows including sqlite_sequence, and user_version');
    assert.deepEqual(db.pragma('integrity_check'), [{ integrity_check: 'ok' }]);
    assert.deepEqual(db.pragma('foreign_key_check'), []);
  } finally {
    db.close();
  }
}

test('schema v1 migrates a fresh baseline and preserves existing rollback guarantees', async () => {
  const freshPath = path.join(runDirectory, 'fresh-preauth-baseline.db');
  const freshRollbackPath = path.join(runDirectory, 'fresh-rollback.db');

  createBaselineDatabase(freshPath, { customTrigger: true });
  createBaselineDatabase(freshRollbackPath, { customTrigger: true });

  for (const failpoint of ['after-tables', 'after-owner-columns', 'after-indexes', 'after-user-version', 'validation', 'after-validation']) {
    assertRollback(freshRollbackPath, failpoint);
  }

  await migrateAndVerify(freshPath, { expectCustomTrigger: true });
});

test('schema v1 migrates a copy of the verified Phase 1 backup', { skip: PHASE1_BACKUP_SKIP }, async () => {
  const backupCopyPath = path.join(runDirectory, 'phase1-verified-backup-copy.db');
  const backupRollbackPath = path.join(runDirectory, 'backup-rollback.db');
  await copyDatabase(PHASE1_BACKUP, backupCopyPath);
  await copyDatabase(PHASE1_BACKUP, backupRollbackPath);

  for (const failpoint of ['after-tables', 'after-owner-columns', 'after-indexes', 'after-user-version', 'validation', 'after-validation']) {
    assertRollback(backupRollbackPath, failpoint);
  }
  await migrateAndVerify(backupCopyPath);
});

test('verified Phase 1 backup copy migrates through v2 without changing legacy rows or sequences', { skip: PHASE1_BACKUP_SKIP }, async () => {
  const databasePath = path.join(runDirectory, 'phase1-backup-through-v2.db');
  await copyDatabase(PHASE1_BACKUP, databasePath);

  const beforeDb = new Database(databasePath, { readonly: true, fileMustExist: true });
  const originalRows = readOriginalRows(beforeDb);
  const originalSequences = readAllSequences(beforeDb);
  assert.equal(originalRows.tasks.length, 22);
  assert.equal(originalRows.pomodoro_sessions.length, 5);
  assert.equal(originalRows.tasks.filter((task) => task.deleted === 1).length, 2);
  beforeDb.close();

  const result = runCli(databasePath, 2);
  assert.equal(result.status, 0, result.stderr);
  assert.match(result.stdout, /applied: schema version 0 -> 2/);

  const afterDb = new Database(databasePath, { timeout: 5000 });
  try {
    afterDb.pragma('foreign_keys = ON');
    assert.equal(afterDb.pragma('user_version')[0].user_version, 2);
    validateAuthBootstrapSchema(afterDb);
    assert.deepEqual(readOriginalRows(afterDb), originalRows,
      'tasks, notes, bookmarks, study sessions, Pomodoro history and shared curriculum rows must match column by column');
    assert.deepEqual(readAllSequences(afterDb), originalSequences,
      'all existing catalog and feature AUTOINCREMENT sequence values must remain unchanged');
    assert.equal(afterDb.prepare('SELECT COUNT(*) AS n FROM tasks').get().n, 22);
    assert.equal(afterDb.prepare('SELECT COUNT(*) AS n FROM pomodoro_sessions').get().n, 5);
    assert.equal(afterDb.prepare('SELECT COUNT(*) AS n FROM students').get().n, 0,
      'Phase 3.0 must not create an initial student');
    assert.equal(afterDb.prepare('SELECT COUNT(*) AS n FROM bootstrap_state').get().n, 0,
      'Phase 3.0 must not create a bootstrap marker');
    for (const tableName of FEATURE_TABLES) {
      assert.equal(afterDb.prepare(`SELECT COUNT(*) AS n FROM "${tableName}" WHERE student_id IS NOT NULL`).get().n, 0,
        `legacy ${tableName} rows must remain unowned until bootstrap`);
    }
    assert.deepEqual(afterDb.prepare('SELECT id, deleted FROM tasks ORDER BY id').all(),
      originalRows.tasks.map(({ id, deleted }) => ({ id, deleted })));
    for (const tableName of ['roadmap_progress', 'java_topic_progress', 'dsa_topic_progress', 'aptitude_topic_progress']) {
      assert.equal(afterDb.prepare(`SELECT COUNT(*) AS n FROM "${tableName}"`).get().n, 0,
        'Phase 3.0 does not copy shared curriculum status into per-student progress yet');
    }
    assert.deepEqual(afterDb.pragma('integrity_check'), [{ integrity_check: 'ok' }]);
    assert.deepEqual(afterDb.pragma('foreign_key_check'), []);

    assertGeneratedIdsAndRollbackSequences(afterDb, readSequences(afterDb));
    assertCatalogAndStudentGeneratedIds(afterDb, originalSequences);
    assert.deepEqual(readAllSequences(afterDb), originalSequences);
  } finally {
    afterDb.close();
  }
});

test('schema v2 migrates v1 databases, preserves data and sequences, and is idempotent', () => {
  const databasePath = path.join(runDirectory, 'v1-to-v2.db');
  createBaselineDatabase(databasePath, { customTrigger: true });
  const db = new Database(databasePath, { timeout: 5000 });
  try {
    db.pragma('foreign_keys = ON');
    migrateAuthSchema(db);
    const originalRows = readOriginalRows(db);
    const originalSequences = readSequences(db);
    const originalStudentSequence = db.prepare('SELECT seq FROM sqlite_sequence WHERE name = ?').get('students')?.seq ?? null;
    const originalCatalogsAndFeatures = readIndexAndTriggerObjects(db);

    assert.equal(migrateAuthBootstrapSchema(db), 'applied');
    assert.equal(db.pragma('user_version')[0].user_version, 2);
    assert.deepEqual(readOriginalRows(db), originalRows, 'v2 must not alter any existing catalog or feature fields');
    assert.deepEqual(readSequences(db), originalSequences, 'v2 must preserve all existing sqlite_sequence values');
    const afterObjects = new Map(readIndexAndTriggerObjects(db).map((object) => [object.name, object]));
    for (const object of originalCatalogsAndFeatures) {
      assert.deepEqual(afterObjects.get(object.name), object, `v2 must preserve ${object.type} ${object.name}`);
    }
    assert.deepEqual(db.pragma('integrity_check'), [{ integrity_check: 'ok' }]);
    assert.deepEqual(db.pragma('foreign_key_check'), []);
    assertV2GeneratedIdsAndRollbackSequences(db, originalSequences, originalStudentSequence);

    const stateColumns = db.pragma('table_xinfo("bootstrap_state")').map((column) => [column.name, column.type, column.notnull, column.pk, column.hidden]);
    assert.deepEqual(stateColumns, [
      ['singleton', 'INTEGER', 0, 1, 0], ['owner_student_id', 'INTEGER', 1, 0, 0], ['completed_at', 'TEXT', 1, 0, 0],
    ]);
    assertForeignKeyAction(db, 'bootstrap_state', 'owner_student_id', 'students', 'id', 'RESTRICT');
    const rateColumns = db.pragma('table_xinfo("auth_rate_limits")').map((column) => [column.name, column.type, column.notnull, column.pk, column.hidden]);
    assert.deepEqual(rateColumns, [
      ['scope', 'TEXT', 1, 1, 0], ['subject_hash', 'TEXT', 1, 2, 0],
      ['attempt_count', 'INTEGER', 1, 0, 0], ['window_started_at_ms', 'INTEGER', 1, 0, 0],
      ['blocked_until_ms', 'INTEGER', 0, 0, 0], ['updated_at_ms', 'INTEGER', 1, 0, 0],
    ]);
    assertIndex(db, 'auth_rate_limits_updated_idx', [['updated_at_ms', 0]]);
    assertIndex(db, 'auth_rate_limits_blocked_idx', [['blocked_until_ms', 0]], { partial: 1 });

    const studentId = db.prepare('INSERT INTO students (display_name, email, password_hash) VALUES (?, ?, ?)')
      .run('Bootstrap Probe', 'bootstrap-probe@example.test', 'hash').lastInsertRowid;
    const putBootstrap = db.prepare('INSERT INTO bootstrap_state (singleton, owner_student_id) VALUES (?, ?)');
    putBootstrap.run(1, studentId);
    assert.throws(() => putBootstrap.run(2, studentId), /CHECK constraint failed/);
    assert.throws(() => putBootstrap.run(1, studentId), /constraint failed/);
    db.pragma('ignore_check_constraints = ON');
    try {
      assert.throws(() => putBootstrap.run(2, studentId), /UNIQUE constraint failed/,
        'owner uniqueness must reject a second owner independently from singleton CHECK');
    } finally {
      db.pragma('ignore_check_constraints = OFF');
    }

    const insertLimit = db.prepare(`INSERT INTO auth_rate_limits
      (scope, subject_hash, attempt_count, window_started_at_ms, blocked_until_ms, updated_at_ms)
      VALUES (?, ?, ?, ?, ?, ?)`);
    insertLimit.run('login', '1'.repeat(64), 0, 100, null, 100);
    assert.throws(() => insertLimit.run('login', '1'.repeat(64), 0, 100, null, 100), /constraint failed/,
      'the composite scope/key primary key must prevent duplicate rate-limit buckets');
    assert.equal(migrateAuthBootstrapSchema(db), 'already-current');
    assert.deepEqual(db.pragma('integrity_check'), [{ integrity_check: 'ok' }]);
    assert.deepEqual(db.pragma('foreign_key_check'), []);
  } finally {
    db.close();
  }
});

test('CLI migrates schema v1 to v2 and repeat invocation is a no-op', () => {
  const databasePath = path.join(runDirectory, 'cli-v1-to-v2.db');
  createBaselineDatabase(databasePath);
  const db = new Database(databasePath);
  migrateAuthSchema(db);
  const rows = readOriginalRows(db);
  const sequences = readSequences(db);
  db.close();

  const result = runCli(databasePath, 2);
  assert.equal(result.status, 0, result.stderr);
  assert.match(result.stdout, /applied: schema version 1 -> 2/);
  const migrated = new Database(databasePath, { readonly: true, fileMustExist: true });
  const afterFirst = captureState(migrated);
  assert.equal(afterFirst.userVersion, 2);
  assert.deepEqual(readOriginalRows(migrated), rows);
  assert.deepEqual(readSequences(migrated), sequences);
  migrated.close();

  const repeated = runCli(databasePath, 2);
  assert.equal(repeated.status, 0, repeated.stderr);
  assert.match(repeated.stdout, /already-current: schema version 2 -> 2/);
  const final = new Database(databasePath, { readonly: true, fileMustExist: true });
  assert.deepEqual(captureState(final), afterFirst);
  final.close();
});

test('CLI defaults to the latest migration and advances a fresh v0 baseline through v3', () => {
  const databasePath = path.join(runDirectory, 'cli-v0-to-latest.db');
  createBaselineDatabase(databasePath);
  const result = runCli(databasePath);
  assert.equal(result.status, 0, result.stderr);
  assert.match(result.stdout, /applied: schema version 0 -> 3/);
  const db = new Database(databasePath, { fileMustExist: true });
  try {
    assert.equal(db.pragma('user_version')[0].user_version, 3);
    validateSessionRevocationSchema(db);
    assert.deepEqual(db.pragma('integrity_check'), [{ integrity_check: 'ok' }]);
    assert.deepEqual(db.pragma('foreign_key_check'), []);
  } finally {
    db.close();
  }
});

test('migration runner advances disposable schema versions 0, 1 and 2 to v3 and is idempotent', () => {
  for (const startVersion of [0, 1, 2]) {
    const databasePath = path.join(runDirectory, `v${startVersion}-to-v3.db`);
    createBaselineDatabase(databasePath);
    const db = new Database(databasePath, { timeout: 5000 });
    try {
      if (startVersion >= 1) migrateAuthSchema(db);
      if (startVersion >= 2) migrateAuthBootstrapSchema(db);
      const originals = readOriginalRows(db);
      let preMigrationRows;
      if (startVersion === 2) {
        const studentId = db.prepare(`INSERT INTO students (display_name, email, password_hash)
          VALUES (?, ?, ?)`).run('v3 preservation', 'v3-preservation@example.test', 'hash').lastInsertRowid;
        db.prepare('INSERT INTO bootstrap_state (singleton, owner_student_id) VALUES (1, ?)').run(studentId);
        db.prepare('INSERT INTO sessions (sid, student_id, session_data, created_at_ms, expires_at_ms) VALUES (?, ?, ?, ?, ?)')
          .run('v3-preserved-session', studentId, '{"studentId":' + studentId + '}', 100, 200);
        db.prepare(`INSERT INTO auth_rate_limits
          (scope, subject_hash, attempt_count, window_started_at_ms, blocked_until_ms, updated_at_ms)
          VALUES ('login', ?, 2, 100, NULL, 100)`).run('a'.repeat(64));
        preMigrationRows = captureState(db).rows;
      }
      const sequences = readAllSequences(db);
      assert.equal(migrateToVersion(db, 3), 'applied');
      assert.equal(db.pragma('user_version')[0].user_version, 3);
      validateSessionRevocationSchema(db);
      assert.deepEqual(readOriginalRows(db), originals);
      assert.deepEqual(readAllSequences(db), sequences);
      assert.equal(db.prepare('SELECT COUNT(*) AS n FROM session_revocations').get().n, 0);
      if (preMigrationRows) {
        const afterRows = captureState(db).rows;
        for (const [tableName, rows] of Object.entries(preMigrationRows)) {
          assert.deepEqual(afterRows[tableName], rows, `${tableName} rows must be preserved by migration 003`);
        }
      }
      assert.equal(migrateToVersion(db, 3), 'already-current');
      assert.deepEqual(db.pragma('integrity_check'), [{ integrity_check: 'ok' }]);
      assert.deepEqual(db.pragma('foreign_key_check'), []);
    } finally { db.close(); }
  }
});

test('schema v3 failure points fully roll back; incompatible v3 schemas are rejected read-only', () => {
  const rollbackPath = path.join(runDirectory, 'v3-rollback.db');
  createBaselineDatabase(rollbackPath);
  const db = new Database(rollbackPath, { timeout: 5000 });
  try {
    migrateAuthSchema(db);
    migrateAuthBootstrapSchema(db);
    const expected = captureState(db);
    for (const failpoint of ['after-table', 'after-index', 'after-user-version', 'validation', 'after-validation']) {
      assert.throws(() => migrateSessionRevocationSchema(db, { failpoint }),
        failpoint === 'validation' ? /unexpected explicit index|index "session_revocations_expiry_idx" differs/ : new RegExp(`Injected migration failure at ${failpoint}`));
      assert.deepEqual(captureState(db), expected, `${failpoint} must restore all schema objects, rows, sqlite_sequence and user_version`);
      assert.deepEqual(db.pragma('integrity_check'), [{ integrity_check: 'ok' }]);
      assert.deepEqual(db.pragma('foreign_key_check'), []);
    }
    assert.equal(migrateSessionRevocationSchema(db), 'applied');
    const migratedState = captureState(db);
    assert.equal(migrateSessionRevocationSchema(db), 'already-current');
    assert.deepEqual(captureState(db), migratedState, 'v3 migration replay must be a no-op');
    db.exec('DROP INDEX session_revocations_expiry_idx');
    const incompatible = captureState(db);
    assert.throws(() => validateSessionRevocationSchema(db), /unexpected explicit index|index "session_revocations_expiry_idx" differs/);
    assert.deepEqual(captureState(db), incompatible, 'incompatible version 3 must not be repaired');
  } finally { db.close(); }
});

test('schema v3 rejects future restrictive timestamp checks without changing the database', () => {
  const databasePath = path.join(runDirectory, 'v3-future-restrictive-retention-check.db');
  createBaselineDatabase(databasePath);
  const db = new Database(databasePath, { timeout: 5000 });
  try {
    db.pragma('foreign_keys = ON');
    migrateAuthSchema(db);
    migrateAuthBootstrapSchema(db);
    migrateSessionRevocationSchema(db);

    validateSessionRevocationSchema(db);
    const realisticRevokedAtMs = 1_800_000_000_000;
    const realisticRetainUntilMs = realisticRevokedAtMs + 8 * 24 * 60 * 60 * 1000;
    const futureRetentionLimit = 2_000_000_000_000;
    assert.ok(realisticRetainUntilMs < futureRetentionLimit,
      'the incompatible bound must be above the validator realistic timestamp probe');
    const realisticHash = 'a'.repeat(64);
    db.prepare(`INSERT INTO session_revocations (sid_hash, revoked_at_ms, retain_until_ms)
      VALUES (?, ?, ?)`).run(realisticHash, realisticRevokedAtMs, realisticRetainUntilMs);
    assert.deepEqual(db.prepare('SELECT revoked_at_ms, retain_until_ms FROM session_revocations WHERE sid_hash = ?')
      .get(realisticHash), {
      revoked_at_ms: realisticRevokedAtMs,
      retain_until_ms: realisticRetainUntilMs,
    });
    db.prepare('DELETE FROM session_revocations WHERE sid_hash = ?').run(realisticHash);

    db.exec(`DROP INDEX session_revocations_expiry_idx;
      DROP TABLE session_revocations;
      CREATE TABLE session_revocations (
        sid_hash TEXT PRIMARY KEY NOT NULL CHECK (
          length(sid_hash) = 64 AND sid_hash NOT GLOB '*[^0-9a-f]*'
        ),
        revoked_at_ms INTEGER NOT NULL CHECK (
          typeof(revoked_at_ms) = 'integer' AND revoked_at_ms > 0
        ),
        retain_until_ms INTEGER NOT NULL CHECK (
          typeof(retain_until_ms) = 'integer' AND retain_until_ms >= revoked_at_ms
          AND retain_until_ms < 2000000000000
        )
      );
      CREATE INDEX session_revocations_expiry_idx ON session_revocations(retain_until_ms);`);
    db.prepare(`INSERT INTO session_revocations (sid_hash, revoked_at_ms, retain_until_ms)
      VALUES (?, ?, ?)`).run('b'.repeat(64), 100, 200);
    const beforeRejectedValidation = captureState(db);
    assert.throws(() => validateSessionRevocationSchema(db), /table definition differs/);
    assert.deepEqual(captureState(db), beforeRejectedValidation,
      'rejected validation must preserve schema objects, rows, sqlite_sequence and user_version');
    assert.throws(() => migrateSessionRevocationSchema(db), /table definition differs/);
    assert.deepEqual(captureState(db), beforeRejectedValidation,
      'rejected migration replay must preserve schema objects, rows, sqlite_sequence and user_version');
    assert.equal(db.pragma('user_version')[0].user_version, 3);
  } finally { db.close(); }
});

test('schema v2 injected failures fully roll back and incompatible versions are read-only rejections', () => {
  const rollbackPath = path.join(runDirectory, 'v2-rollback.db');
  createBaselineDatabase(rollbackPath, { customTrigger: true });
  const db = new Database(rollbackPath, { timeout: 5000 });
  try {
    db.pragma('foreign_keys = ON');
    migrateAuthSchema(db);
    const expectedState = captureState(db);
    for (const failpoint of ['after-bootstrap-state', 'after-rate-limit-table', 'after-indexes', 'after-user-version', 'validation', 'after-validation']) {
      assert.throws(() => migrateAuthBootstrapSchema(db, { failpoint }),
        failpoint === 'validation' ? /index "auth_rate_limits_updated_idx" is missing/ : new RegExp(`Injected migration failure at ${failpoint}`));
      assert.deepEqual(captureState(db), expectedState, `${failpoint} must roll back all schema objects, rows, sqlite_sequence and user_version`);
      assert.deepEqual(db.pragma('integrity_check'), [{ integrity_check: 'ok' }]);
      assert.deepEqual(db.pragma('foreign_key_check'), []);
    }
  } finally {
    db.close();
  }

  const incompatibleV1 = path.join(runDirectory, 'v2-incompatible-v1.db');
  createBaselineDatabase(incompatibleV1);
  const badV1 = new Database(incompatibleV1);
  migrateAuthSchema(badV1);
  badV1.exec('DROP INDEX tasks_owner_idx');
  const badV1State = captureState(badV1);
  assert.throws(() => migrateAuthBootstrapSchema(badV1), /index "tasks_owner_idx" is missing/);
  assert.deepEqual(captureState(badV1), badV1State);
  badV1.close();

  const incompatibleV2 = path.join(runDirectory, 'v2-incompatible-current.db');
  createBaselineDatabase(incompatibleV2);
  const badV2 = new Database(incompatibleV2);
  migrateAuthSchema(badV2);
  migrateAuthBootstrapSchema(badV2);
  badV2.exec('DROP INDEX auth_rate_limits_blocked_idx');
  const badV2State = captureState(badV2);
  assert.throws(() => migrateAuthBootstrapSchema(badV2), /index "auth_rate_limits_blocked_idx" is missing/);
  assert.deepEqual(captureState(badV2), badV2State, 'incompatible version 2 must be rejected without repair');
  badV2.exec(`CREATE INDEX auth_rate_limits_blocked_idx ON auth_rate_limits(blocked_until_ms)
    WHERE blocked_until_ms IS NOT NULL`);
  badV2.exec(`CREATE TRIGGER unexpected_bootstrap_cleanup
    AFTER INSERT ON bootstrap_state BEGIN DELETE FROM bootstrap_state; END`);
  const triggerState = captureState(badV2);
  assert.throws(() => migrateAuthBootstrapSchema(badV2), /unexpected trigger "unexpected_bootstrap_cleanup"/);
  assert.deepEqual(captureState(badV2), triggerState, 'unexpected trigger rejection must leave all database state unchanged');
  badV2.exec('DROP TRIGGER unexpected_bootstrap_cleanup; CREATE INDEX unexpected_rate_limit_index ON auth_rate_limits(scope)');
  const extraIndexState = captureState(badV2);
  assert.throws(() => migrateAuthBootstrapSchema(badV2), /unexpected explicit index/);
  assert.deepEqual(captureState(badV2), extraIndexState, 'unexpected index rejection must leave all database state unchanged');
  badV2.close();

  const weakHashPath = path.join(runDirectory, 'v2-weak-hash-check.db');
  createBaselineDatabase(weakHashPath);
  const weakHashDb = new Database(weakHashPath, { timeout: 5000 });
  migrateAuthSchema(weakHashDb);
  migrateAuthBootstrapSchema(weakHashDb);
  weakHashDb.exec(`
    DROP INDEX auth_rate_limits_updated_idx;
    DROP INDEX auth_rate_limits_blocked_idx;
    DROP TABLE auth_rate_limits;
    CREATE TABLE auth_rate_limits (
      scope TEXT NOT NULL CHECK (scope IN ('login', 'registration')),
      subject_hash TEXT NOT NULL CHECK (length(subject_hash) = 64),
      attempt_count INTEGER NOT NULL DEFAULT 0 CHECK (
        typeof(attempt_count) = 'integer' AND attempt_count BETWEEN 0 AND 1000000
      ),
      window_started_at_ms INTEGER NOT NULL CHECK (
        typeof(window_started_at_ms) = 'integer' AND window_started_at_ms > 0
      ),
      blocked_until_ms INTEGER CHECK (
        blocked_until_ms IS NULL OR (typeof(blocked_until_ms) = 'integer' AND blocked_until_ms > 0)
      ),
      updated_at_ms INTEGER NOT NULL CHECK (
        typeof(updated_at_ms) = 'integer' AND updated_at_ms > 0
      ),
      PRIMARY KEY (scope, subject_hash)
    );
    CREATE INDEX auth_rate_limits_updated_idx ON auth_rate_limits(updated_at_ms);
    CREATE INDEX auth_rate_limits_blocked_idx ON auth_rate_limits(blocked_until_ms)
      WHERE blocked_until_ms IS NOT NULL;
  `);
  const weakHashState = captureState(weakHashDb);
  assert.throws(() => migrateAuthBootstrapSchema(weakHashDb), /64-character non-hex hash was accepted/);
  assert.deepEqual(captureState(weakHashDb), weakHashState,
    'length-only hash constraint rejection must preserve schema, all rows, sqlite_sequence and user_version');
  weakHashDb.close();

  const unsupported = path.join(runDirectory, 'v2-unsupported.db');
  createBaselineDatabase(unsupported);
  const unsupportedDb = new Database(unsupported);
  migrateAuthSchema(unsupportedDb);
  unsupportedDb.pragma('user_version = 9');
  const unsupportedState = captureState(unsupportedDb);
  assert.throws(() => migrateAuthBootstrapSchema(unsupportedDb), /requires schema version 1/);
  assert.deepEqual(captureState(unsupportedDb), unsupportedState);
  unsupportedDb.close();
});

test('CHECK constraints reject invalid inserts and updates across all applicable tables', () => {
  const databasePath = path.join(runDirectory, 'check-behavior.db');
  createBaselineDatabase(databasePath);
  const db = new Database(databasePath);
  try {
    migrateAuthSchema(db);
    const studentId = db.prepare('INSERT INTO students (display_name, email, password_hash) VALUES (?, ?, ?)')
      .run('Probe Student', 'check-behavior@invalid.test', 'hash').lastInsertRowid;
    for (const [index, name] of ['', ' ', '  '].entries()) {
      assert.throws(() => db.prepare('INSERT INTO students (display_name, email, password_hash) VALUES (?, ?, ?)')
        .run(name, `invalid-name-${index}@invalid.test`, 'hash'), /CHECK constraint failed/);
      assert.throws(() => db.prepare('UPDATE students SET display_name = ? WHERE id = ?').run(name, studentId), /CHECK constraint failed/);
      assert.throws(() => db.prepare('INSERT INTO students (display_name, email, password_hash) VALUES (?, ?, ?)')
        .run('Valid Name', name, `hash-${index}`), /CHECK constraint failed/);
      assert.throws(() => db.prepare('UPDATE students SET email = ? WHERE id = ?').run(name, studentId), /CHECK constraint failed/);
    }
    assert.throws(() => db.prepare('INSERT INTO students (display_name, email, password_hash) VALUES (?, ?, ?)')
      .run('Probe Student', null, 'hash'), /NOT NULL constraint failed/);
    assert.throws(() => db.prepare('INSERT INTO students (display_name, email, password_hash) VALUES (?, ?, ?)')
      .run('Duplicate Student', 'CHECK-BEHAVIOR@INVALID.TEST', 'hash'), /UNIQUE constraint failed/);

    for (const [index, expiry] of [0, -1].entries()) {
      assert.throws(() => db.prepare('INSERT INTO sessions (sid, session_data, created_at_ms, expires_at_ms) VALUES (?, ?, ?, ?)')
        .run(`invalid-expiry-${index}`, '{}', 1, expiry), /CHECK constraint failed/);
    }
    db.prepare('INSERT INTO sessions (sid, student_id, session_data, created_at_ms, expires_at_ms) VALUES (?, ?, ?, ?, ?)')
      .run('valid-expiry', studentId, '{}', 1, 1);
    for (const expiry of [0, -1]) {
      assert.throws(() => db.prepare('UPDATE sessions SET expires_at_ms = ? WHERE sid = ?').run(expiry, 'valid-expiry'), /CHECK constraint failed/);
    }

    const progressTables = [
      ['roadmap_progress', 'roadmap_id', 1],
      ['java_topic_progress', 'topic_id', 1],
      ['dsa_topic_progress', 'topic_id', 1],
      ['aptitude_topic_progress', 'topic_id', 1],
    ];
    for (const [tableName, refColumn, refId] of progressTables) {
      const statuses = ['', 'Invalid', 'Unexpected Status', 'Not Started '];
      for (const [index, status] of statuses.entries()) {
        const extraStudentId = db.prepare('INSERT INTO students (display_name, email, password_hash) VALUES (?, ?, ?)')
          .run('Progress Probe', `progress-${tableName}-${index}@invalid.test`, 'hash').lastInsertRowid;
        assert.throws(() => db.prepare(`INSERT INTO "${tableName}" (student_id, "${refColumn}", status) VALUES (?, ?, ?)`)
          .run(extraStudentId, refId, status), /CHECK constraint failed/);
      }
      db.prepare(`INSERT INTO "${tableName}" (student_id, "${refColumn}") VALUES (?, ?)`)
        .run(studentId, refId);
      for (const status of ['Not Started', 'In Progress', 'Completed']) {
        db.prepare(`UPDATE "${tableName}" SET status = ? WHERE student_id = ? AND "${refColumn}" = ?`)
          .run(status, studentId, refId);
      }
      for (const status of statuses) {
        assert.throws(() => db.prepare(`UPDATE "${tableName}" SET status = ? WHERE student_id = ? AND "${refColumn}" = ?`)
          .run(status, studentId, refId), /CHECK constraint failed/);
      }
    }

    for (const tableName of ['java_topics', 'dsa_topics', 'aptitude_topics']) {
      for (const [index, status] of ['', 'Invalid', 'Unexpected Status', 'Not Started '].entries()) {
        assert.throws(() => db.prepare(`INSERT INTO "${tableName}" (title, category, status, sort_order) VALUES (?, ?, ?, ?)`)
          .run(`invalid-${tableName}-${index}`, 'Probe', status, 10000 + index), /CHECK constraint failed/);
      }
      for (const status of ['Not Started', 'In Progress', 'Completed']) {
        db.prepare(`UPDATE "${tableName}" SET status = ? WHERE id = 1`).run(status);
      }
      for (const status of ['', 'Invalid', 'Unexpected Status', 'Not Started ']) {
        assert.throws(() => db.prepare(`UPDATE "${tableName}" SET status = ? WHERE id = 1`).run(status), /CHECK constraint failed/);
      }
    }

    const invalidSubjects = ['', 'Invalid', 'Biology'];
    for (const [index, subject] of invalidSubjects.entries()) {
      assert.throws(() => db.prepare('INSERT INTO notes (title, subject, content) VALUES (?, ?, ?)')
        .run(`bad-note-${index}`, subject, ''), /CHECK constraint failed/);
      assert.throws(() => db.prepare('INSERT INTO bookmarks (title, url, subject) VALUES (?, ?, ?)')
        .run(`bad-bookmark-${index}`, 'https://example.test', subject), /CHECK constraint failed/);
    }
    const noteId = db.prepare('INSERT INTO notes (title, subject, content) VALUES (?, ?, ?)').run('valid probe note', 'Java', '').lastInsertRowid;
    const bookmarkId = db.prepare('INSERT INTO bookmarks (title, url, subject) VALUES (?, ?, ?)').run('valid probe bookmark', 'https://example.test', 'Java').lastInsertRowid;
    for (const subject of ['Java', 'DSA', 'Aptitude']) {
      db.prepare('UPDATE notes SET subject = ? WHERE id = ?').run(subject, noteId);
      db.prepare('UPDATE bookmarks SET subject = ? WHERE id = ?').run(subject, bookmarkId);
    }
    for (const subject of invalidSubjects) {
      assert.throws(() => db.prepare('UPDATE notes SET subject = ? WHERE id = ?').run(subject, noteId), /CHECK constraint failed/);
      assert.throws(() => db.prepare('UPDATE bookmarks SET subject = ? WHERE id = ?').run(subject, bookmarkId), /CHECK constraint failed/);
    }

    for (const subject of invalidSubjects) {
      assert.throws(() => db.prepare('INSERT INTO study_sessions (subject, topic, study_date, start_time, duration_minutes) VALUES (?, ?, ?, ?, ?)')
        .run(subject, 'probe', '2030-01-01', '10:00', 10), /CHECK constraint failed/);
    }
    for (const duration of [0, -1]) {
      assert.throws(() => db.prepare('INSERT INTO study_sessions (subject, topic, study_date, start_time, duration_minutes) VALUES (?, ?, ?, ?, ?)')
        .run('Java', 'probe', '2030-01-01', '10:00', duration), /CHECK constraint failed/);
    }
    for (const completed of [2, -1]) {
      assert.throws(() => db.prepare('INSERT INTO study_sessions (subject, topic, study_date, start_time, duration_minutes, completed) VALUES (?, ?, ?, ?, ?, ?)')
        .run('Java', 'probe', '2030-01-01', '10:00', 10, completed), /CHECK constraint failed/);
    }
    const studyId = db.prepare('INSERT INTO study_sessions (subject, topic, study_date, start_time, duration_minutes) VALUES (?, ?, ?, ?, ?)')
      .run('Java', 'probe', '2030-01-01', '10:00', 10).lastInsertRowid;
    for (const subject of ['Java', 'DSA', 'Aptitude']) {
      db.prepare('UPDATE study_sessions SET subject = ? WHERE id = ?').run(subject, studyId);
    }
    db.prepare('UPDATE study_sessions SET completed = 1 WHERE id = ?').run(studyId);
    for (const subject of invalidSubjects) {
      assert.throws(() => db.prepare('UPDATE study_sessions SET subject = ? WHERE id = ?').run(subject, studyId), /CHECK constraint failed/);
    }
    for (const duration of [0, -1]) {
      assert.throws(() => db.prepare('UPDATE study_sessions SET duration_minutes = ? WHERE id = ?').run(duration, studyId), /CHECK constraint failed/);
    }
    for (const completed of [2, -1]) {
      assert.throws(() => db.prepare('UPDATE study_sessions SET completed = ? WHERE id = ?').run(completed, studyId), /CHECK constraint failed/);
    }

    for (const subject of invalidSubjects) {
      assert.throws(() => db.prepare('INSERT INTO pomodoro_sessions (subject, duration_minutes) VALUES (?, ?)')
        .run(subject, 25), /CHECK constraint failed/);
    }
    for (const duration of [0, -1]) {
      assert.throws(() => db.prepare('INSERT INTO pomodoro_sessions (subject, duration_minutes) VALUES (?, ?)')
        .run('Java', duration), /CHECK constraint failed/);
    }
    const pomodoroId = db.prepare('INSERT INTO pomodoro_sessions (subject, duration_minutes) VALUES (?, ?)')
      .run('Java', 25).lastInsertRowid;
    for (const subject of ['Java', 'DSA', 'Aptitude']) {
      db.prepare('UPDATE pomodoro_sessions SET subject = ? WHERE id = ?').run(subject, pomodoroId);
    }
    for (const subject of invalidSubjects) {
      assert.throws(() => db.prepare('UPDATE pomodoro_sessions SET subject = ? WHERE id = ?').run(subject, pomodoroId), /CHECK constraint failed/);
    }
    for (const duration of [0, -1]) {
      assert.throws(() => db.prepare('UPDATE pomodoro_sessions SET duration_minutes = ? WHERE id = ?').run(duration, pomodoroId), /CHECK constraint failed/);
    }
  } finally {
    db.close();
  }
});

test('rate-limit numeric checks reject invalid storage classes and bounds on insert and update', () => {
  const databasePath = path.join(runDirectory, 'rate-limit-numeric-checks.db');
  createBaselineDatabase(databasePath);
  const db = new Database(databasePath, { timeout: 5000 });
  try {
    migrateAuthSchema(db);
    migrateAuthBootstrapSchema(db);
    const insert = db.prepare(`INSERT INTO auth_rate_limits
      (scope, subject_hash, attempt_count, window_started_at_ms, blocked_until_ms, updated_at_ms)
      VALUES (?, ?, ?, ?, ?, ?)`);
    const validHash = 'd'.repeat(64);
    insert.run('login', validHash, 0, 1, null, 1);
    const invalidInsertCases = [
      ['attempt_count', 'text', 'not-integer'], ['attempt_count', 'fractional', 1.5],
      ['attempt_count', 'negative', -1], ['attempt_count', 'above maximum', 1_000_001],
      ['window_started_at_ms', 'text', 'not-integer'], ['window_started_at_ms', 'fractional', 1.5],
      ['window_started_at_ms', 'zero', 0], ['window_started_at_ms', 'negative', -1],
      ['blocked_until_ms', 'text', 'not-integer'], ['blocked_until_ms', 'fractional', 1.5],
      ['blocked_until_ms', 'zero', 0], ['blocked_until_ms', 'negative', -1],
      ['updated_at_ms', 'text', 'not-integer'], ['updated_at_ms', 'fractional', 1.5],
      ['updated_at_ms', 'zero', 0], ['updated_at_ms', 'negative', -1],
    ];
    for (const [column, label, value] of invalidInsertCases) {
      const values = { attempt_count: 0, window_started_at_ms: 1, blocked_until_ms: null, updated_at_ms: 1 };
      values[column] = value;
      const hash = `${invalidInsertCases.indexOf(invalidInsertCases.find((item) => item[0] === column && item[1] === label))}`.padStart(64, '0');
      assert.throws(() => insert.run('registration', hash, values.attempt_count,
        values.window_started_at_ms, values.blocked_until_ms, values.updated_at_ms),
      (error) => error.code === 'SQLITE_CONSTRAINT_CHECK', `${column} ${label} insert must fail its CHECK`);
    }

    const invalidUpdateCases = [
      ['attempt_count', 'not-integer'], ['attempt_count', 1.5], ['attempt_count', -1], ['attempt_count', 1_000_001],
      ['window_started_at_ms', 'not-integer'], ['window_started_at_ms', 1.5], ['window_started_at_ms', 0], ['window_started_at_ms', -1],
      ['blocked_until_ms', 'not-integer'], ['blocked_until_ms', 1.5], ['blocked_until_ms', 0], ['blocked_until_ms', -1],
      ['updated_at_ms', 'not-integer'], ['updated_at_ms', 1.5], ['updated_at_ms', 0], ['updated_at_ms', -1],
    ];
    for (const [column, value] of invalidUpdateCases) {
      assert.throws(() => db.prepare(`UPDATE auth_rate_limits SET "${column}" = ? WHERE scope = ? AND subject_hash = ?`)
        .run(value, 'login', validHash),
      (error) => error.code === 'SQLITE_CONSTRAINT_CHECK', `${column} invalid update must fail its CHECK`);
    }
    db.prepare('UPDATE auth_rate_limits SET attempt_count = ?, blocked_until_ms = ? WHERE scope = ? AND subject_hash = ?')
      .run(1_000_000, null, 'login', validHash);
    db.prepare('UPDATE auth_rate_limits SET attempt_count = 0, blocked_until_ms = 2 WHERE scope = ? AND subject_hash = ?')
      .run('login', validHash);
    assert.equal(db.prepare('SELECT attempt_count, blocked_until_ms FROM auth_rate_limits WHERE scope = ? AND subject_hash = ?')
      .get('login', validHash).attempt_count, 0);
  } finally {
    db.close();
  }
});

test('rate-limit subject hashes require exactly 64 lowercase hexadecimal characters', () => {
  const databasePath = path.join(runDirectory, 'rate-limit-hash-canonical-form.db');
  createBaselineDatabase(databasePath);
  const db = new Database(databasePath, { timeout: 5000 });
  try {
    migrateAuthSchema(db);
    migrateAuthBootstrapSchema(db);
    const insert = db.prepare(`INSERT INTO auth_rate_limits
      (scope, subject_hash, attempt_count, window_started_at_ms, blocked_until_ms, updated_at_ms)
      VALUES (?, ?, ?, ?, ?, ?)`);
    const values = [0, 1, null, 1];
    assert.throws(() => insert.run('login', 'g'.repeat(64), ...values),
      (error) => error.code === 'SQLITE_CONSTRAINT_CHECK', '64-character non-hex hashes must be rejected');
    assert.throws(() => insert.run('login', 'A'.repeat(64), ...values),
      (error) => error.code === 'SQLITE_CONSTRAINT_CHECK', 'uppercase hex is rejected by the canonical lowercase policy');
    insert.run('login', 'a'.repeat(64), ...values);
    assert.equal(db.prepare('SELECT COUNT(*) AS n FROM auth_rate_limits').get().n, 1,
      'canonical lowercase hexadecimal hashes must be accepted');
  } finally {
    db.close();
  }
});

test('migration rejects unsupported versions, missing baseline schema and partial v0 schemas', () => {
  const unsupportedPath = path.join(runDirectory, 'unsupported-version.db');
  createBaselineDatabase(unsupportedPath);
  let db = new Database(unsupportedPath);
  db.pragma('user_version = 8');
  db.pragma('foreign_keys = ON');
  let rejectedState = captureState(db);
  assert.throws(() => migrateAuthSchema(db), /No migration is defined from schema version 8/);
  assert.deepEqual(captureState(db), rejectedState);
  db.close();

  const missingTablePath = path.join(runDirectory, 'missing-table.db');
  createBaselineDatabase(missingTablePath);
  db = new Database(missingTablePath);
  db.exec('DROP TABLE notes');
  db.pragma('foreign_keys = ON');
  rejectedState = captureState(db);
  assert.throws(() => migrateAuthSchema(db), /required baseline table "notes" is missing/);
  assert.deepEqual(captureState(db), rejectedState);
  db.close();

  const missingColumnPath = path.join(runDirectory, 'missing-column.db');
  createBaselineDatabase(missingColumnPath);
  db = new Database(missingColumnPath);
  db.exec('ALTER TABLE tasks RENAME TO old_tasks; CREATE TABLE tasks (id INTEGER PRIMARY KEY, title TEXT); DROP TABLE old_tasks');
  db.pragma('foreign_keys = ON');
  rejectedState = captureState(db);
  assert.throws(() => migrateAuthSchema(db), /tasks.*missing columns/);
  assert.deepEqual(captureState(db), rejectedState);
  db.close();

  const partialPath = path.join(runDirectory, 'partial-v0.db');
  createBaselineDatabase(partialPath);
  db = new Database(partialPath);
  db.exec('CREATE TABLE students (id INTEGER PRIMARY KEY)');
  const before = captureState(db);
  assert.throws(() => migrateAuthSchema(db), /migration object "students" already exists/);
  assert.deepEqual(captureState(db), before);
  db.close();
});

test('version 1 rejects malformed and incompatible schemas without repairing them', () => {
  const missingIndexPath = path.join(runDirectory, 'v1-missing-index.db');
  createBaselineDatabase(missingIndexPath);
  let db = new Database(missingIndexPath);
  migrateAuthSchema(db);
  db.exec('DROP INDEX tasks_owner_idx');
  const before = captureState(db);
  assert.throws(() => migrateAuthSchema(db), /index "tasks_owner_idx" is missing/);
  assert.deepEqual(captureState(db), before);
  db.close();

  const malformedPath = path.join(runDirectory, 'malformed-v1.db');
  db = new Database(malformedPath);
  db.exec('CREATE TABLE students (id INTEGER PRIMARY KEY, email TEXT); PRAGMA user_version = 1;');
  db.pragma('foreign_keys = ON');
  const malformedBefore = captureState(db);
  assert.throws(() => migrateAuthSchema(db), /incompatible|incomplete/);
  assert.deepEqual(captureState(db), malformedBefore);
  db.close();

  const wrongCheckPath = path.join(runDirectory, 'v1-wrong-check.db');
  createBaselineDatabase(wrongCheckPath);
  db = new Database(wrongCheckPath);
  migrateAuthSchema(db);
  db.pragma('foreign_keys = OFF');
  db.exec(`
    DROP TABLE students;
    CREATE TABLE students (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      display_name TEXT NOT NULL,
      email TEXT NOT NULL COLLATE NOCASE UNIQUE,
      password_hash TEXT NOT NULL,
      created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    );
  `);
  db.pragma('foreign_keys = ON');
  const wrongCheckState = captureState(db);
  assert.throws(() => migrateAuthSchema(db), /constraint for students\.display_name INSERT/);
  assert.deepEqual(captureState(db), wrongCheckState);
  db.close();

  const weakExpiryPath = path.join(runDirectory, 'v1-weak-expiry-check.db');
  createBaselineDatabase(weakExpiryPath);
  db = new Database(weakExpiryPath);
  migrateAuthSchema(db);
  db.pragma('foreign_keys = OFF');
  db.exec(`
    DROP TABLE sessions;
    CREATE TABLE sessions (
      sid TEXT PRIMARY KEY NOT NULL,
      student_id INTEGER REFERENCES students(id) ON DELETE CASCADE,
      session_data TEXT NOT NULL,
      created_at_ms INTEGER NOT NULL,
      expires_at_ms INTEGER NOT NULL CHECK (expires_at_ms <> 0)
    );
    CREATE INDEX sessions_expiry_idx ON sessions(expires_at_ms);
    CREATE INDEX sessions_student_idx ON sessions(student_id);
  `);
  db.pragma('foreign_keys = ON');
  const weakExpiryState = captureState(db);
  assert.throws(() => migrateAuthSchema(db), /constraint for sessions\.expires_at_ms INSERT=-1/);
  assert.deepEqual(captureState(db), weakExpiryState);
  db.close();

  const generatedColumnPath = path.join(runDirectory, 'v1-generated-column.db');
  createBaselineDatabase(generatedColumnPath);
  db = new Database(generatedColumnPath);
  migrateAuthSchema(db);
  db.exec('ALTER TABLE tasks ADD COLUMN title_shadow TEXT GENERATED ALWAYS AS (title) VIRTUAL');
  const generatedColumnState = captureState(db);
  assert.throws(() => migrateAuthSchema(db), /hidden\/generated columns exist|column definitions differ for "tasks"/);
  assert.deepEqual(captureState(db), generatedColumnState);
  db.close();

  const wrongIndexPath = path.join(runDirectory, 'v1-wrong-index.db');
  createBaselineDatabase(wrongIndexPath);
  db = new Database(wrongIndexPath);
  migrateAuthSchema(db);
  db.exec('DROP INDEX tasks_owner_idx; CREATE INDEX tasks_owner_idx ON tasks(deleted, student_id, id DESC)');
  const wrongIndexState = captureState(db);
  assert.throws(() => migrateAuthSchema(db), /index "tasks_owner_idx" has incorrect uniqueness, partial status, order, direction or collation/);
  assert.deepEqual(captureState(db), wrongIndexState);
  db.close();

  const invalidIndexDefinitions = [
    ['unique', 'CREATE UNIQUE INDEX tasks_owner_idx ON tasks(student_id, deleted, id DESC)'],
    ['partial', 'CREATE INDEX tasks_owner_idx ON tasks(student_id, deleted, id DESC) WHERE id > 0'],
    ['direction', 'CREATE INDEX tasks_owner_idx ON tasks(student_id, deleted DESC, id DESC)'],
    ['collation', 'CREATE INDEX tasks_owner_idx ON tasks(student_id COLLATE NOCASE, deleted, id DESC)'],
  ];
  for (const [label, createSql] of invalidIndexDefinitions) {
    const invalidPath = path.join(runDirectory, `v1-${label}-index.db`);
    createBaselineDatabase(invalidPath);
    const invalidDb = new Database(invalidPath);
    migrateAuthSchema(invalidDb);
    invalidDb.exec(`DROP INDEX tasks_owner_idx; ${createSql}`);
    const state = captureState(invalidDb);
    assert.throws(() => migrateAuthSchema(invalidDb), /incorrect uniqueness, partial status, order, direction or collation/);
    assert.deepEqual(captureState(invalidDb), state, `${label} index rejection must not modify the database`);
    invalidDb.close();
  }

  const wrongForeignKeyPath = path.join(runDirectory, 'v1-wrong-foreign-key.db');
  createBaselineDatabase(wrongForeignKeyPath);
  db = new Database(wrongForeignKeyPath);
  migrateAuthSchema(db);
  db.pragma('foreign_keys = OFF');
  db.exec(`
    ALTER TABLE tasks RENAME TO tasks_old;
    CREATE TABLE tasks (
      id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL,
      description TEXT NOT NULL DEFAULT '', due_date TEXT,
      completed INTEGER NOT NULL DEFAULT 0, priority TEXT NOT NULL DEFAULT 'Medium',
      deleted INTEGER NOT NULL DEFAULT 0,
      student_id INTEGER REFERENCES students(id) ON DELETE CASCADE
    );
    INSERT INTO tasks SELECT id, title, description, due_date, completed, priority, deleted, student_id FROM tasks_old;
    DROP TABLE tasks_old;
    CREATE INDEX tasks_owner_idx ON tasks(student_id, deleted, id DESC);
  `);
  db.pragma('foreign_keys = ON');
  const wrongForeignKeyState = captureState(db);
  assert.throws(() => migrateAuthSchema(db), /foreign keys differ for "tasks"/);
  assert.deepEqual(captureState(db), wrongForeignKeyState);
  db.close();

  const noAutoincrementPath = path.join(runDirectory, 'v1-no-autoincrement.db');
  createBaselineDatabase(noAutoincrementPath);
  db = new Database(noAutoincrementPath);
  migrateAuthSchema(db);
  db.pragma('foreign_keys = OFF');
  db.exec(`
    ALTER TABLE tasks RENAME TO tasks_old;
    CREATE TABLE tasks (
      id INTEGER PRIMARY KEY, title TEXT NOT NULL,
      description TEXT NOT NULL DEFAULT '', due_date TEXT,
      completed INTEGER NOT NULL DEFAULT 0, priority TEXT NOT NULL DEFAULT 'Medium',
      deleted INTEGER NOT NULL DEFAULT 0,
      student_id INTEGER REFERENCES students(id) ON DELETE RESTRICT
    );
    INSERT INTO tasks SELECT id, title, description, due_date, completed, priority, deleted, student_id FROM tasks_old;
    DROP TABLE tasks_old;
    CREATE INDEX tasks_owner_idx ON tasks(student_id, deleted, id DESC);
  `);
  db.pragma('foreign_keys = ON');
  const noAutoincrementState = captureState(db);
  assert.throws(() => migrateAuthSchema(db), /tasks\.id.*AUTOINCREMENT/);
  assert.deepEqual(captureState(db), noAutoincrementState);
  db.close();
});

test('path guard blocks relative and canonical paths, symlinks, hard links and fails closed', async (t) => {
  const protectedPath = path.join(runDirectory, 'protected-fixture.db');
  const ordinaryPath = path.join(runDirectory, 'ordinary-fixture.db');
  fs.writeFileSync(protectedPath, 'protected');
  fs.writeFileSync(ordinaryPath, 'ordinary');
  assert.throws(() => assertDatabasePathIsUnprotected(protectedPath, [protectedPath]), /Refusing to migrate/);
  assert.throws(() => assertDatabasePathIsUnprotected(path.relative(process.cwd(), protectedPath), [protectedPath]), /Refusing to migrate/);
  assert.equal(assertDatabasePathIsUnprotected(ordinaryPath, [protectedPath]), fs.realpathSync(ordinaryPath));

  const symlinkPath = path.join(runDirectory, 'protected-symlink.db');
  try {
    fs.symlinkSync(protectedPath, symlinkPath, 'file');
    assert.throws(() => assertDatabasePathIsUnprotected(symlinkPath, [protectedPath]), /Refusing to migrate/);
  } catch (error) {
    if (error.code === 'ERR_ASSERTION') throw error;
    t.skip(`SKIPPED: symbolic-link protection unavailable on this filesystem (${error.code || error.message})`);
  }

  const hardlinkPath = path.join(runDirectory, 'protected-hardlink.db');
  try {
    fs.linkSync(protectedPath, hardlinkPath);
    assert.throws(() => assertDatabasePathIsUnprotected(hardlinkPath, [protectedPath]), /Refusing to migrate/);
  } catch (error) {
    if (error.code === 'ERR_ASSERTION') throw error;
    t.skip(`SKIPPED: hard-link creation unavailable on this filesystem (${error.code || error.message})`);
  }

  if (process.platform === 'win32') {
    const caseVariant = protectedPath.replace(/[a-z]/g, (letter) => letter.toUpperCase());
    assert.throws(() => assertDatabasePathIsUnprotected(caseVariant, [protectedPath]), /Refusing to migrate/);
  } else {
    t.diagnostic('SKIPPED: Windows case-variant path check is not applicable on this platform');
  }

  const directoryAsProtectedFile = path.join(runDirectory, 'protected-directory');
  fs.mkdirSync(directoryAsProtectedFile);
  assert.throws(() => assertDatabasePathIsUnprotected(ordinaryPath, [directoryAsProtectedFile]), /Cannot establish reliable file identity/);
});

test('junction alias protection', (t) => {
  const protectedPath = path.join(runDirectory, 'junction-protected.db');
  const directoryPath = path.join(runDirectory, 'junction-target');
  const junctionPath = path.join(runDirectory, 'junction-alias');
  fs.mkdirSync(directoryPath);
  fs.writeFileSync(protectedPath, 'protected');
  const nestedProtectedPath = path.join(directoryPath, path.basename(protectedPath));
  fs.copyFileSync(protectedPath, nestedProtectedPath);
  try {
    fs.symlinkSync(directoryPath, junctionPath, 'junction');
  } catch (error) {
    t.skip(`SKIPPED: junction creation unsupported (${error.code || error.message})`);
    return;
  }
  assert.throws(() => assertDatabasePathIsUnprotected(path.join(junctionPath, path.basename(protectedPath)), [nestedProtectedPath]), /Refusing to migrate/);
});

test('copied-checkout guard rejects original-checkout database and symlink paths', (t) => {
  const copiedServer = path.join(runDirectory, 'copied-checkout', 'server');
  const originalServer = path.join(runDirectory, 'original-checkout', 'server');
  fs.mkdirSync(copiedServer, { recursive: true });
  fs.mkdirSync(originalServer, { recursive: true });
  const copiedProtectedPaths = PROTECTED_DATABASE_PATHS.map((protectedPath) =>
    path.join(copiedServer, path.relative(SERVER_DIR, protectedPath))
  );
  const originalProtectedPaths = PROTECTED_DATABASE_PATHS.map((protectedPath) =>
    path.join(originalServer, path.relative(SERVER_DIR, protectedPath))
  );
  for (const originalPath of originalProtectedPaths) {
    fs.mkdirSync(path.dirname(originalPath), { recursive: true });
    fs.writeFileSync(originalPath, 'disposable original-checkout protected database');
    assert.throws(() => assertDatabasePathIsUnprotected(originalPath, copiedProtectedPaths, copiedServer),
      /outside this checkout server directory/);
  }

  const originalDatabase = originalProtectedPaths[0];
  const aliasPath = path.join(copiedServer, 'external-live-alias.db');
  try {
    fs.symlinkSync(originalDatabase, aliasPath, 'file');
  } catch (error) {
    t.skip(`SKIPPED: copied-checkout symlink alias unavailable (${error.code || error.message})`);
    return;
  }
  assert.throws(() => assertDatabasePathIsUnprotected(aliasPath, copiedProtectedPaths, copiedServer),
    /outside this checkout server directory/);
});

test('copied-checkout hard-link alias is rejected', (t) => {
  const copiedServer = path.join(runDirectory, 'copied-hardlink-checkout', 'server');
  const originalServer = path.join(runDirectory, 'original-hardlink-checkout', 'server');
  fs.mkdirSync(copiedServer, { recursive: true });
  fs.mkdirSync(originalServer, { recursive: true });
  const originalDatabase = path.join(originalServer, 'preptrack.db');
  const hardlinkAlias = path.join(copiedServer, 'external-live-hardlink.db');
  fs.writeFileSync(originalDatabase, 'disposable original-checkout database');
  try {
    fs.linkSync(originalDatabase, hardlinkAlias);
  } catch (error) {
    t.skip(`SKIPPED: copied-checkout hard-link alias test unavailable (${error.code || error.message})`);
    return;
  }
  const copiedProtectedPaths = PROTECTED_DATABASE_PATHS.map((protectedPath) =>
    path.join(copiedServer, path.relative(SERVER_DIR, protectedPath))
  );
  assert.throws(() => assertDatabasePathIsUnprotected(hardlinkAlias, copiedProtectedPaths, copiedServer),
    /hard-link aliases/);
});
