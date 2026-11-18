
'use strict';

// Startup readiness is deliberately metadata-only. Migration validators also
// probe CHECK constraints by inserting rows inside savepoints; those probes
// are useful during explicit migrations and tests, but are not appropriate at
// application startup.
const EXPECTED_SQL = {
  students: `CREATE TABLE students (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    display_name TEXT NOT NULL CHECK (length(trim(display_name)) > 0),
    email TEXT NOT NULL COLLATE NOCASE UNIQUE CHECK (length(trim(email)) > 0),
    password_hash TEXT NOT NULL,
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
  )`,
  sessions: `CREATE TABLE sessions (
    sid TEXT PRIMARY KEY NOT NULL,
    student_id INTEGER REFERENCES students(id) ON DELETE CASCADE,
    session_data TEXT NOT NULL,
    created_at_ms INTEGER NOT NULL,
    expires_at_ms INTEGER NOT NULL CHECK (expires_at_ms > 0)
  )`,
  roadmap_progress: `CREATE TABLE roadmap_progress (
    student_id INTEGER NOT NULL REFERENCES students(id) ON DELETE RESTRICT,
    roadmap_id INTEGER NOT NULL REFERENCES roadmap(id) ON DELETE RESTRICT,
    status TEXT NOT NULL DEFAULT 'Not Started'
      CHECK (status IN ('Not Started', 'In Progress', 'Completed')),
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (student_id, roadmap_id)
  )`,
  java_topic_progress: `CREATE TABLE java_topic_progress (
    student_id INTEGER NOT NULL REFERENCES students(id) ON DELETE RESTRICT,
    topic_id INTEGER NOT NULL REFERENCES java_topics(id) ON DELETE RESTRICT,
    status TEXT NOT NULL DEFAULT 'Not Started'
      CHECK (status IN ('Not Started', 'In Progress', 'Completed')),
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (student_id, topic_id)
  )`,
  dsa_topic_progress: `CREATE TABLE dsa_topic_progress (
    student_id INTEGER NOT NULL REFERENCES students(id) ON DELETE RESTRICT,
    topic_id INTEGER NOT NULL REFERENCES dsa_topics(id) ON DELETE RESTRICT,
    status TEXT NOT NULL DEFAULT 'Not Started'
      CHECK (status IN ('Not Started', 'In Progress', 'Completed')),
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (student_id, topic_id)
  )`,
  aptitude_topic_progress: `CREATE TABLE aptitude_topic_progress (
    student_id INTEGER NOT NULL REFERENCES students(id) ON DELETE RESTRICT,
    topic_id INTEGER NOT NULL REFERENCES aptitude_topics(id) ON DELETE RESTRICT,
    status TEXT NOT NULL DEFAULT 'Not Started'
      CHECK (status IN ('Not Started', 'In Progress', 'Completed')),
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (student_id, topic_id)
  )`,
  bootstrap_state: `CREATE TABLE bootstrap_state (
    singleton INTEGER PRIMARY KEY CHECK (singleton = 1),
    owner_student_id INTEGER NOT NULL UNIQUE REFERENCES students(id) ON DELETE RESTRICT,
    completed_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
  )`,
  auth_rate_limits: `CREATE TABLE auth_rate_limits (
    scope TEXT NOT NULL CHECK (scope IN ('login', 'registration')),
    subject_hash TEXT NOT NULL CHECK (
      length(subject_hash) = 64 AND subject_hash NOT GLOB '*[^0-9a-f]*'
    ),
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
  )`,
  session_revocations: `CREATE TABLE session_revocations (
    sid_hash TEXT PRIMARY KEY NOT NULL CHECK (
      length(sid_hash) = 64 AND sid_hash NOT GLOB '*[^0-9a-f]*'
    ),
    revoked_at_ms INTEGER NOT NULL CHECK (
      typeof(revoked_at_ms) = 'integer' AND revoked_at_ms > 0
    ),
    retain_until_ms INTEGER NOT NULL CHECK (
      typeof(retain_until_ms) = 'integer' AND retain_until_ms >= revoked_at_ms
    )
  )`,
};

const EXPECTED_LEGACY_SQL = {
  roadmap: `CREATE TABLE roadmap (
    id INTEGER PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'Not Started'
  )`,
  java_topics: `CREATE TABLE java_topics (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL UNIQUE,
    category TEXT NOT NULL,
    description TEXT NOT NULL DEFAULT '',
    status TEXT NOT NULL DEFAULT 'Not Started'
      CHECK (status IN ('Not Started', 'In Progress', 'Completed')),
    sort_order INTEGER NOT NULL UNIQUE
  )`,
  dsa_topics: `CREATE TABLE dsa_topics (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL UNIQUE,
    category TEXT NOT NULL,
    description TEXT NOT NULL DEFAULT '',
    status TEXT NOT NULL DEFAULT 'Not Started'
      CHECK (status IN ('Not Started', 'In Progress', 'Completed')),
    sort_order INTEGER NOT NULL UNIQUE
  )`,
  aptitude_topics: `CREATE TABLE aptitude_topics (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL UNIQUE,
    category TEXT NOT NULL,
    description TEXT NOT NULL DEFAULT '',
    status TEXT NOT NULL DEFAULT 'Not Started'
      CHECK (status IN ('Not Started', 'In Progress', 'Completed')),
    sort_order INTEGER NOT NULL UNIQUE
  )`,
  tasks: `CREATE TABLE tasks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    description TEXT NOT NULL DEFAULT '',
    due_date TEXT,
    completed INTEGER NOT NULL DEFAULT 0,
    priority TEXT NOT NULL DEFAULT 'Medium',
    deleted INTEGER NOT NULL DEFAULT 0,
    student_id INTEGER REFERENCES students(id) ON DELETE RESTRICT
  )`,
  notes: `CREATE TABLE notes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    subject TEXT NOT NULL CHECK (subject IN ('Java', 'DSA', 'Aptitude')),
    content TEXT NOT NULL DEFAULT '',
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    student_id INTEGER REFERENCES students(id) ON DELETE RESTRICT
  )`,
  bookmarks: `CREATE TABLE bookmarks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    url TEXT NOT NULL,
    subject TEXT NOT NULL CHECK (subject IN ('Java', 'DSA', 'Aptitude')),
    description TEXT NOT NULL DEFAULT '',
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    student_id INTEGER REFERENCES students(id) ON DELETE RESTRICT
  )`,
  study_sessions: `CREATE TABLE study_sessions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    subject TEXT NOT NULL CHECK (subject IN ('Java', 'DSA', 'Aptitude')),
    topic TEXT NOT NULL,
    study_date TEXT NOT NULL,
    start_time TEXT NOT NULL,
    duration_minutes INTEGER NOT NULL CHECK (duration_minutes > 0),
    completed INTEGER NOT NULL DEFAULT 0 CHECK (completed IN (0, 1)),
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    student_id INTEGER REFERENCES students(id) ON DELETE RESTRICT
  )`,
  pomodoro_sessions: `CREATE TABLE pomodoro_sessions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    subject TEXT NOT NULL CHECK (subject IN ('Java', 'DSA', 'Aptitude')),
    duration_minutes INTEGER NOT NULL CHECK (duration_minutes > 0),
    completed_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    student_id INTEGER REFERENCES students(id) ON DELETE RESTRICT
  )`,
};

const EXPECTED_COLUMNS = {
  students: [
    ['id', 'INTEGER', 0, null, 1], ['display_name', 'TEXT', 1, null, 0],
    ['email', 'TEXT', 1, null, 0], ['password_hash', 'TEXT', 1, null, 0],
    ['created_at', 'TEXT', 1, 'CURRENT_TIMESTAMP', 0], ['updated_at', 'TEXT', 1, 'CURRENT_TIMESTAMP', 0],
  ],
  sessions: [
    ['sid', 'TEXT', 1, null, 1], ['student_id', 'INTEGER', 0, null, 0],
    ['session_data', 'TEXT', 1, null, 0], ['created_at_ms', 'INTEGER', 1, null, 0],
    ['expires_at_ms', 'INTEGER', 1, null, 0],
  ],
  roadmap_progress: [
    ['student_id', 'INTEGER', 1, null, 1], ['roadmap_id', 'INTEGER', 1, null, 2],
    ['status', 'TEXT', 1, "'Not Started'", 0], ['updated_at', 'TEXT', 1, 'CURRENT_TIMESTAMP', 0],
  ],
  java_topic_progress: [
    ['student_id', 'INTEGER', 1, null, 1], ['topic_id', 'INTEGER', 1, null, 2],
    ['status', 'TEXT', 1, "'Not Started'", 0], ['updated_at', 'TEXT', 1, 'CURRENT_TIMESTAMP', 0],
  ],
  dsa_topic_progress: [
    ['student_id', 'INTEGER', 1, null, 1], ['topic_id', 'INTEGER', 1, null, 2],
    ['status', 'TEXT', 1, "'Not Started'", 0], ['updated_at', 'TEXT', 1, 'CURRENT_TIMESTAMP', 0],
  ],
  aptitude_topic_progress: [
    ['student_id', 'INTEGER', 1, null, 1], ['topic_id', 'INTEGER', 1, null, 2],
    ['status', 'TEXT', 1, "'Not Started'", 0], ['updated_at', 'TEXT', 1, 'CURRENT_TIMESTAMP', 0],
  ],
  bootstrap_state: [
    ['singleton', 'INTEGER', 0, null, 1], ['owner_student_id', 'INTEGER', 1, null, 0],
    ['completed_at', 'TEXT', 1, 'CURRENT_TIMESTAMP', 0],
  ],
  auth_rate_limits: [
    ['scope', 'TEXT', 1, null, 1], ['subject_hash', 'TEXT', 1, null, 2],
    ['attempt_count', 'INTEGER', 1, '0', 0], ['window_started_at_ms', 'INTEGER', 1, null, 0],
    ['blocked_until_ms', 'INTEGER', 0, null, 0], ['updated_at_ms', 'INTEGER', 1, null, 0],
  ],
  session_revocations: [
    ['sid_hash', 'TEXT', 1, null, 1], ['revoked_at_ms', 'INTEGER', 1, null, 0],
    ['retain_until_ms', 'INTEGER', 1, null, 0],
  ],
};

const EXPECTED_BASE_COLUMNS = {
  roadmap: [
    ['id', 'INTEGER', 0, null, 1], ['title', 'TEXT', 1, null, 0],
    ['description', 'TEXT', 1, null, 0], ['status', 'TEXT', 1, "'Not Started'", 0],
  ],
  java_topics: [
    ['id', 'INTEGER', 0, null, 1], ['title', 'TEXT', 1, null, 0], ['category', 'TEXT', 1, null, 0],
    ['description', 'TEXT', 1, "''", 0], ['status', 'TEXT', 1, "'Not Started'", 0], ['sort_order', 'INTEGER', 1, null, 0],
  ],
  dsa_topics: [
    ['id', 'INTEGER', 0, null, 1], ['title', 'TEXT', 1, null, 0], ['category', 'TEXT', 1, null, 0],
    ['description', 'TEXT', 1, "''", 0], ['status', 'TEXT', 1, "'Not Started'", 0], ['sort_order', 'INTEGER', 1, null, 0],
  ],
  aptitude_topics: [
    ['id', 'INTEGER', 0, null, 1], ['title', 'TEXT', 1, null, 0], ['category', 'TEXT', 1, null, 0],
    ['description', 'TEXT', 1, "''", 0], ['status', 'TEXT', 1, "'Not Started'", 0], ['sort_order', 'INTEGER', 1, null, 0],
  ],
  tasks: [
    ['id', 'INTEGER', 0, null, 1], ['title', 'TEXT', 1, null, 0], ['description', 'TEXT', 1, "''", 0],
    ['due_date', 'TEXT', 0, null, 0], ['completed', 'INTEGER', 1, '0', 0], ['priority', 'TEXT', 1, "'Medium'", 0],
    ['deleted', 'INTEGER', 1, '0', 0], ['student_id', 'INTEGER', 0, null, 0],
  ],
  notes: [
    ['id', 'INTEGER', 0, null, 1], ['title', 'TEXT', 1, null, 0], ['subject', 'TEXT', 1, null, 0],
    ['content', 'TEXT', 1, "''", 0], ['created_at', 'TEXT', 1, 'CURRENT_TIMESTAMP', 0],
    ['updated_at', 'TEXT', 1, 'CURRENT_TIMESTAMP', 0], ['student_id', 'INTEGER', 0, null, 0],
  ],
  bookmarks: [
    ['id', 'INTEGER', 0, null, 1], ['title', 'TEXT', 1, null, 0], ['url', 'TEXT', 1, null, 0],
    ['subject', 'TEXT', 1, null, 0], ['description', 'TEXT', 1, "''", 0],
    ['created_at', 'TEXT', 1, 'CURRENT_TIMESTAMP', 0], ['updated_at', 'TEXT', 1, 'CURRENT_TIMESTAMP', 0],
    ['student_id', 'INTEGER', 0, null, 0],
  ],
  study_sessions: [
    ['id', 'INTEGER', 0, null, 1], ['subject', 'TEXT', 1, null, 0], ['topic', 'TEXT', 1, null, 0],
    ['study_date', 'TEXT', 1, null, 0], ['start_time', 'TEXT', 1, null, 0], ['duration_minutes', 'INTEGER', 1, null, 0],
    ['completed', 'INTEGER', 1, '0', 0], ['created_at', 'TEXT', 1, 'CURRENT_TIMESTAMP', 0],
    ['student_id', 'INTEGER', 0, null, 0],
  ],
  pomodoro_sessions: [
    ['id', 'INTEGER', 0, null, 1], ['subject', 'TEXT', 1, null, 0], ['duration_minutes', 'INTEGER', 1, null, 0],
    ['completed_at', 'TEXT', 1, 'CURRENT_TIMESTAMP', 0], ['created_at', 'TEXT', 1, 'CURRENT_TIMESTAMP', 0],
    ['student_id', 'INTEGER', 0, null, 0],
  ],
};

const REQUIRED_TABLES = [
  'roadmap', 'java_topics', 'dsa_topics', 'aptitude_topics',
  'tasks', 'notes', 'bookmarks', 'study_sessions', 'pomodoro_sessions',
  ...Object.keys(EXPECTED_SQL),
];

const EXPECTED_INDEXES = {
  sessions_expiry_idx: ['sessions', 0, 0, [['expires_at_ms', 0, 'BINARY']]],
  sessions_student_idx: ['sessions', 0, 0, [['student_id', 0, 'BINARY']]],
  roadmap_progress_student_idx: ['roadmap_progress', 0, 0, [['student_id', 0, 'BINARY']]],
  java_topic_progress_student_idx: ['java_topic_progress', 0, 0, [['student_id', 0, 'BINARY']]],
  dsa_topic_progress_student_idx: ['dsa_topic_progress', 0, 0, [['student_id', 0, 'BINARY']]],
  aptitude_topic_progress_student_idx: ['aptitude_topic_progress', 0, 0, [['student_id', 0, 'BINARY']]],
  tasks_owner_idx: ['tasks', 0, 0, [['student_id', 0, 'BINARY'], ['deleted', 0, 'BINARY'], ['id', 1, 'BINARY']]],
  notes_owner_idx: ['notes', 0, 0, [['student_id', 0, 'BINARY'], ['updated_at', 1, 'BINARY'], ['id', 1, 'BINARY']]],
  bookmarks_owner_idx: ['bookmarks', 0, 0, [['student_id', 0, 'BINARY'], ['subject', 0, 'BINARY'], ['updated_at', 1, 'BINARY']]],
  study_sessions_owner_idx: ['study_sessions', 0, 0, [['student_id', 0, 'BINARY'], ['study_date', 0, 'BINARY'], ['start_time', 0, 'BINARY']]],
  pomodoro_owner_idx: ['pomodoro_sessions', 0, 0, [['student_id', 0, 'BINARY'], ['completed_at', 0, 'BINARY']]],
  auth_rate_limits_updated_idx: ['auth_rate_limits', 0, 0, [['updated_at_ms', 0, 'BINARY']]],
  auth_rate_limits_blocked_idx: ['auth_rate_limits', 0, 1, [['blocked_until_ms', 0, 'BINARY']]],
  session_revocations_expiry_idx: ['session_revocations', 0, 0, [['retain_until_ms', 0, 'BINARY']]],
};

const EXPECTED_FOREIGN_KEYS = {
  sessions: [['student_id', 'students', 'id', 'CASCADE']],
  roadmap_progress: [['student_id', 'students', 'id', 'RESTRICT'], ['roadmap_id', 'roadmap', 'id', 'RESTRICT']],
  java_topic_progress: [['student_id', 'students', 'id', 'RESTRICT'], ['topic_id', 'java_topics', 'id', 'RESTRICT']],
  dsa_topic_progress: [['student_id', 'students', 'id', 'RESTRICT'], ['topic_id', 'dsa_topics', 'id', 'RESTRICT']],
  aptitude_topic_progress: [['student_id', 'students', 'id', 'RESTRICT'], ['topic_id', 'aptitude_topics', 'id', 'RESTRICT']],
  bootstrap_state: [['owner_student_id', 'students', 'id', 'RESTRICT']],
  tasks: [['student_id', 'students', 'id', 'RESTRICT']],
  notes: [['student_id', 'students', 'id', 'RESTRICT']],
  bookmarks: [['student_id', 'students', 'id', 'RESTRICT']],
  study_sessions: [['student_id', 'students', 'id', 'RESTRICT']],
  pomodoro_sessions: [['student_id', 'students', 'id', 'RESTRICT']],
  session_revocations: [],
  auth_rate_limits: [],
};

const EXPECTED_EXPLICIT_INDEXES = {
  roadmap: [],
  java_topics: [],
  dsa_topics: [],
  aptitude_topics: [],
  students: [],
  sessions: ['sessions_expiry_idx', 'sessions_student_idx'],
  roadmap_progress: ['roadmap_progress_student_idx'],
  java_topic_progress: ['java_topic_progress_student_idx'],
  dsa_topic_progress: ['dsa_topic_progress_student_idx'],
  aptitude_topic_progress: ['aptitude_topic_progress_student_idx'],
  tasks: ['tasks_owner_idx'],
  notes: ['notes_owner_idx'],
  bookmarks: ['bookmarks_owner_idx'],
  study_sessions: ['study_sessions_owner_idx'],
  pomodoro_sessions: ['pomodoro_owner_idx'],
  bootstrap_state: [],
  auth_rate_limits: ['auth_rate_limits_updated_idx', 'auth_rate_limits_blocked_idx'],
  session_revocations: ['session_revocations_expiry_idx'],
};

// This is the only application trigger permitted by startup readiness.
// It permanently protects the one-time legacy-data ownership marker.
const EXPECTED_TRIGGERS = {
  bootstrap_state: {
    name: 'bootstrap_state_prevent_delete',
    sql: `CREATE TRIGGER bootstrap_state_prevent_delete
      BEFORE DELETE ON bootstrap_state
      BEGIN
        SELECT RAISE(ABORT, 'bootstrap_state cannot be deleted');
      END`,
  },
};

function normalizeSql(sql) {
  const source = String(sql || '').trim().replace(/;$/, '');
  let normalized = '';
  let quote = null;
  let pendingSpace = false;
  for (let index = 0; index < source.length; index++) {
    const char = source[index];
    if (quote) {
      normalized += char;
      if (char === quote) {
        if (source[index + 1] === quote) normalized += source[++index];
        else quote = null;
      } else if (quote === ']' && char === ']') {
        quote = null;
      }
      continue;
    }
    if (char === "'" || char === '"' || char === '`') {
      if (pendingSpace && normalized && !/[,(]$/.test(normalized)) normalized += ' ';
      pendingSpace = false;
      quote = char;
      normalized += char;
    } else if (char === '[') {
      if (pendingSpace && normalized && !/[,(]$/.test(normalized)) normalized += ' ';
      pendingSpace = false;
      quote = ']';
      normalized += char;
    } else if (/\s/.test(char)) {
      pendingSpace = true;
    } else if (char === ',') {
      normalized = normalized.trimEnd() + ',';
      pendingSpace = false;
    } else if (char === '(') {
      normalized = normalized.trimEnd() + '(';
      pendingSpace = false;
    } else if (char === ')') {
      normalized = normalized.trimEnd() + ')';
      pendingSpace = false;
    } else {
      if (pendingSpace && normalized && !/[,(]$/.test(normalized)) normalized += ' ';
      pendingSpace = false;
      normalized += char.toLowerCase();
    }
  }
  return normalized.trim();
}

function assertColumns(db, table) {
  const actual = db.pragma(`table_xinfo("${table}")`).map((column) => [
    column.name, column.type.toUpperCase(), column.notnull, column.dflt_value, column.pk,
  ]);
  const expected = EXPECTED_COLUMNS[table];
  if (JSON.stringify(actual) !== JSON.stringify(expected)) {
    throw new Error(`Required schema is incompatible: columns differ for "${table}".`);
  }
  if (db.pragma(`table_xinfo("${table}")`).some((column) => column.hidden !== 0)) {
    throw new Error(`Required schema is incompatible: hidden/generated columns exist in "${table}".`);
  }
}

function assertBaseColumns(db) {
  for (const [table, expected] of Object.entries(EXPECTED_BASE_COLUMNS)) {
    const info = db.pragma(`table_xinfo("${table}")`);
    const actual = info.map((column) => [
      column.name, column.type.toUpperCase(), column.notnull, column.dflt_value, column.pk,
    ]);
    if (JSON.stringify(actual) !== JSON.stringify(expected) || info.some((column) => column.hidden !== 0)) {
      throw new Error(`Required schema is incompatible: columns differ for "${table}".`);
    }
  }
  const sqlByTable = Object.fromEntries(db.prepare("SELECT name, sql FROM sqlite_master WHERE type = 'table'")
    .all().map((row) => [row.name, row.sql || '']));
  for (const [table, expectedSql] of Object.entries(EXPECTED_LEGACY_SQL)) {
    if (normalizeSql(sqlByTable[table]) !== normalizeSql(expectedSql)) {
      throw new Error(`Required schema is incompatible: legacy table definition differs for "${table}".`);
    }
  }
  for (const table of ['java_topics', 'dsa_topics', 'aptitude_topics', 'tasks', 'notes', 'bookmarks', 'study_sessions', 'pomodoro_sessions']) {
    if (!/\bid\s+INTEGER\s+PRIMARY\s+KEY\s+AUTOINCREMENT\b/i.test(sqlByTable[table])) {
      throw new Error(`Required schema is incompatible: "${table}.id" must retain AUTOINCREMENT.`);
    }
  }
}

function assertForeignKeys(db, table, expected) {
  const actual = db.pragma(`foreign_key_list("${table}")`)
    .map((key) => [key.from, key.table, key.to, key.on_delete.toUpperCase(), key.on_update.toUpperCase(), key.match.toUpperCase()])
    .sort((a, b) => JSON.stringify(a).localeCompare(JSON.stringify(b)));
  const orderedExpected = expected.map((key) => [...key, 'NO ACTION', 'NONE'])
    .sort((a, b) => JSON.stringify(a).localeCompare(JSON.stringify(b)));
  if (JSON.stringify(actual) !== JSON.stringify(orderedExpected)) {
    throw new Error(`Required schema is incompatible: foreign keys differ for "${table}".`);
  }
}

function assertIndex(db, name, [table, unique, partial, expectedColumns]) {
  const listed = db.pragma(`index_list("${table}")`).find((index) => index.name === name);
  const actual = listed && db.pragma(`index_xinfo("${name}")`).filter((column) => column.key === 1)
    .map((column) => [column.name, column.desc, column.coll.toUpperCase()]);
  if (!listed || listed.unique !== unique || listed.partial !== partial || listed.origin !== 'c' ||
      JSON.stringify(actual) !== JSON.stringify(expectedColumns)) {
    throw new Error(`Required schema is incompatible: index "${name}" differs.`);
  }
}

function assertExpectedTriggers(db) {
  for (const table of REQUIRED_TABLES) {
    const actual = db.prepare(
      "SELECT name, sql FROM sqlite_master WHERE type = 'trigger' AND tbl_name = ? ORDER BY name"
    ).all(table);

    const expected = EXPECTED_TRIGGERS[table]
      ? [EXPECTED_TRIGGERS[table]]
      : [];

    if (actual.length !== expected.length) {
      throw new Error(`Required schema is incompatible: unexpected trigger on "${table}".`);
    }

    for (const expectedTrigger of expected) {
      const actualTrigger = actual.find((trigger) => trigger.name === expectedTrigger.name);

      if (!actualTrigger) {
        throw new Error(
          `Required schema is incompatible: expected trigger "${expectedTrigger.name}" is missing.`
        );
      }

      if (normalizeSql(actualTrigger.sql) !== normalizeSql(expectedTrigger.sql)) {
        throw new Error(
          `Required schema is incompatible: trigger "${expectedTrigger.name}" differs.`
        );
      }
    }
  }
}

function assertSchemaReady(db) {
  if (!db || typeof db.prepare !== 'function' || typeof db.pragma !== 'function') {
    throw new TypeError('A better-sqlite3 database connection is required.');
  }
  const version = db.pragma('user_version')[0]?.user_version;
  if (version !== 3) throw new Error(`PrepTrack requires database schema version 3; found ${version}. Run the explicit migration procedure first.`);

  const existing = new Set(db.prepare("SELECT name FROM sqlite_master WHERE type = 'table'").all().map((row) => row.name));
  for (const table of REQUIRED_TABLES) {
    if (!existing.has(table)) throw new Error(`Required schema is incomplete: table "${table}" is missing.`);
  }

  assertBaseColumns(db);

  for (const [table, sql] of Object.entries(EXPECTED_SQL)) {
    const row = db.prepare("SELECT sql FROM sqlite_master WHERE type = 'table' AND name = ?").get(table);
    if (normalizeSql(row?.sql) !== normalizeSql(sql)) {
      throw new Error(`Required schema is incompatible: definition differs for "${table}".`);
    }
    assertColumns(db, table);
  }

  const featureColumns = {
    tasks: ['id', 'INTEGER', 0, null, 1],
    notes: ['id', 'INTEGER', 0, null, 1],
    bookmarks: ['id', 'INTEGER', 0, null, 1],
    study_sessions: ['id', 'INTEGER', 0, null, 1],
    pomodoro_sessions: ['id', 'INTEGER', 0, null, 1],
  };
  for (const [table, idColumn] of Object.entries(featureColumns)) {
    const columns = db.pragma(`table_xinfo("${table}")`);
    const tableSql = db.prepare("SELECT sql FROM sqlite_master WHERE type = 'table' AND name = ?").get(table)?.sql || '';
    const owner = columns.find((column) => column.name === 'student_id');
    const id = columns.find((column) => column.name === idColumn[0]);
    if (!id || id.type.toUpperCase() !== idColumn[1] || id.pk !== idColumn[4] || !owner ||
        owner.type.toUpperCase() !== 'INTEGER' || owner.notnull !== 0 || owner.dflt_value !== null || owner.hidden !== 0) {
      throw new Error(`Required schema is incompatible: ownership column or primary key differs for "${table}".`);
    }
    if (!/,\s*student_id\s+INTEGER\s+REFERENCES\s+students\s*\(\s*id\s*\)\s+ON\s+DELETE\s+RESTRICT\s*\)$/i.test(normalizeSql(tableSql))) {
      throw new Error(`Required schema is incompatible: ownership-column definition differs for "${table}".`);
    }
    assertForeignKeys(db, table, EXPECTED_FOREIGN_KEYS[table]);
  }

  for (const [table, expected] of Object.entries(EXPECTED_FOREIGN_KEYS)) {
    if (table in featureColumns) continue;
    assertForeignKeys(db, table, expected);
  }
  for (const [name, definition] of Object.entries(EXPECTED_INDEXES)) assertIndex(db, name, definition);

  for (const [table, expected] of Object.entries(EXPECTED_EXPLICIT_INDEXES)) {
    const actual = db.prepare("SELECT name FROM sqlite_master WHERE type = 'index' AND tbl_name = ? AND sql IS NOT NULL ORDER BY name")
      .all(table).map((row) => row.name).sort();
    if (JSON.stringify(actual) !== JSON.stringify(expected.slice().sort())) {
      throw new Error(`Required schema is incompatible: explicit indexes differ for "${table}".`);
    }
  }

  // Permit only the exact trigger that protects the bootstrap ownership marker.
  // Every other trigger, including a modified version of this one, is rejected.
  assertExpectedTriggers(db);

  for (const table of ['auth_rate_limits', 'session_revocations']) {
    assertForeignKeys(db, table, EXPECTED_FOREIGN_KEYS[table]);
  }

  const violations = db.pragma('foreign_key_check');
  if (violations.length) throw new Error(`Required schema has ${violations.length} foreign-key violation(s).`);
  const integrity = db.pragma('integrity_check');
  if (integrity.length !== 1 || integrity[0].integrity_check !== 'ok') {
    throw new Error('Required schema failed SQLite integrity_check.');
  }
  return true;
}

module.exports = { assertSchemaReady };
