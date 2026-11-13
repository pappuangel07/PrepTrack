const crypto = require('node:crypto');
const { validateAuthSchema } = require('./001-auth-schema');

// A generous ceiling for persisted counters; ordinary rate policies should block far below it.
const MAX_ATTEMPT_COUNT = 1_000_000;
// subject_hash has one canonical encoding: exactly 64 lowercase hexadecimal characters.

const RATE_LIMIT_INDEXES = {
  auth_rate_limits_updated_idx: { columns: [['updated_at_ms', 0, 'BINARY']], partial: false },
  auth_rate_limits_blocked_idx: { columns: [['blocked_until_ms', 0, 'BINARY']], partial: true },
};

function failAt(failpoint, point) {
  if (failpoint === point) throw new Error(`Injected migration failure at ${point}.`);
}

function assertColumns(db, tableName, expected) {
  const actual = db.pragma(`table_xinfo("${tableName}")`).map((column) => [
    column.name, column.type.toUpperCase(), column.notnull, column.dflt_value, column.pk, column.hidden,
  ]);
  if (JSON.stringify(actual) !== JSON.stringify(expected)) {
    throw new Error(`Schema version 2 is incompatible: column definitions differ for "${tableName}".`);
  }
}

function assertForeignKey(db, tableName, from, to, onDelete) {
  const rows = db.pragma(`foreign_key_list("${tableName}")`).map((row) => [
    row.from, row.table, row.to, row.on_delete.toUpperCase(),
  ]).sort((a, b) => a[0].localeCompare(b[0]));
  if (JSON.stringify(rows) !== JSON.stringify([[from, 'students', to, onDelete]])) {
    throw new Error(`Schema version 2 is incompatible: foreign key differs for "${tableName}".`);
  }
}

function assertIndex(db, indexName, expected) {
  const listed = db.pragma(`index_list("auth_rate_limits")`).find((item) => item.name === indexName);
  const columns = db.pragma(`index_xinfo("${indexName}")`)
    .filter((column) => column.key === 1)
    .map((column) => [column.name, column.desc, column.coll.toUpperCase()]);
  if (!listed || listed.unique !== 0 || listed.partial !== Number(expected.partial) ||
      JSON.stringify(columns) !== JSON.stringify(expected.columns)) {
    throw new Error(`Schema version 2 is incompatible: index "${indexName}" differs.`);
  }
  if (expected.partial) {
    const definition = db.prepare('SELECT sql FROM sqlite_master WHERE type = ? AND name = ?')
      .get('index', indexName)?.sql || '';
    if (!/WHERE\s+blocked_until_ms\s+IS\s+NOT\s+NULL\s*$/i.test(definition)) {
      throw new Error(`Schema version 2 is incompatible: partial index "${indexName}" predicate differs.`);
    }
  }
}

function assertAllowedSchemaObjects(db) {
  const expectedExplicitIndexes = new Map([
    ['auth_rate_limits_updated_idx', 'auth_rate_limits'],
    ['auth_rate_limits_blocked_idx', 'auth_rate_limits'],
  ]);
  const explicitIndexes = db.prepare(`SELECT name, tbl_name FROM sqlite_master
    WHERE type = 'index' AND sql IS NOT NULL AND tbl_name IN ('bootstrap_state', 'auth_rate_limits')`).all();
  if (explicitIndexes.length !== expectedExplicitIndexes.size || explicitIndexes.some((index) =>
      expectedExplicitIndexes.get(index.name) !== index.tbl_name)) {
    throw new Error('Schema version 2 is incompatible: unexpected explicit index on a bootstrap or rate-limit table.');
  }

  const triggers = db.prepare(`SELECT name, tbl_name FROM sqlite_master
    WHERE type = 'trigger' AND tbl_name IN ('bootstrap_state', 'auth_rate_limits')`).all();
  if (triggers.length) {
    throw new Error(`Schema version 2 is incompatible: unexpected trigger "${triggers[0].name}" on "${triggers[0].tbl_name}".`);
  }

  const expectedAutomaticIndexes = {
    bootstrap_state: [{ unique: 1, partial: 0, origin: 'u', columns: [['owner_student_id', 0, 'BINARY']] }],
    auth_rate_limits: [{ unique: 1, partial: 0, origin: 'pk', columns: [['scope', 0, 'BINARY'], ['subject_hash', 0, 'BINARY']] }],
  };
  for (const [tableName, expectedIndexes] of Object.entries(expectedAutomaticIndexes)) {
    const automaticIndexes = db.pragma(`index_list("${tableName}")`).filter((index) => index.origin !== 'c');
    const actual = automaticIndexes.map((index) => ({
      unique: index.unique,
      partial: index.partial,
      origin: index.origin,
      columns: db.pragma(`index_xinfo("${index.name}")`).filter((column) => column.key === 1)
        .map((column) => [column.name, column.desc, column.coll.toUpperCase()]),
    }));
    if (JSON.stringify(actual) !== JSON.stringify(expectedIndexes)) {
      throw new Error(`Schema version 2 is incompatible: implicit indexes differ for "${tableName}".`);
    }
  }
}

function assertConstraintFailure(db, label, expectedCode, sql, params) {
  try {
    db.prepare(sql).run(...params);
  } catch (error) {
    if (error.code === expectedCode) return;
    throw new Error(`Schema validation for ${label} failed for an unrelated reason: ${error.message}`);
  }
  throw new Error(`Schema version 2 is incompatible: ${label} was accepted.`);
}

function assertV2Behavior(db) {
  const suffix = `${Date.now()}_${Math.floor(Math.random() * 1e9)}`;
  const hash = crypto.randomBytes(32).toString('hex');
  const studentId = db.prepare('SELECT COALESCE(MAX(id), 0) + 1 AS id FROM students').get().id;
  const student = db.prepare('INSERT INTO students (id, display_name, email, password_hash) VALUES (?, ?, ?, ?)');
  const stateInsert = db.prepare('INSERT INTO bootstrap_state (singleton, owner_student_id) VALUES (?, ?)');
  const rateInsert = db.prepare(`INSERT INTO auth_rate_limits
    (scope, subject_hash, attempt_count, window_started_at_ms, blocked_until_ms, updated_at_ms)
    VALUES (?, ?, ?, ?, ?, ?)`);

  db.exec('SAVEPOINT auth_bootstrap_schema_validation');
  try {
    // Validation must also work after the one-time bootstrap has populated state.
    db.prepare('DELETE FROM bootstrap_state').run();
    student.run(studentId, 'Schema Probe', `bootstrap-probe-${suffix}@invalid.test`, 'probe-hash');
    stateInsert.run(1, studentId);

    assertConstraintFailure(db, 'bootstrap singleton value', 'SQLITE_CONSTRAINT_CHECK',
      'INSERT INTO bootstrap_state (singleton, owner_student_id) VALUES (?, ?)', [2, studentId]);
    assertConstraintFailure(db, 'bootstrap singleton uniqueness', 'SQLITE_CONSTRAINT_PRIMARYKEY',
      'INSERT INTO bootstrap_state (singleton, owner_student_id) VALUES (?, ?)', [1, studentId]);
    db.pragma('ignore_check_constraints = ON');
    try {
      assertConstraintFailure(db, 'bootstrap owner uniqueness', 'SQLITE_CONSTRAINT_UNIQUE',
        'INSERT INTO bootstrap_state (singleton, owner_student_id) VALUES (?, ?)', [2, studentId]);
    } finally {
      db.pragma('ignore_check_constraints = OFF');
    }

    rateInsert.run('login', hash, 0, 1, null, 1);
    rateInsert.run('registration', crypto.randomBytes(32).toString('hex'), 1, 2, 3, 2);
    assertConstraintFailure(db, 'rate-limit composite key uniqueness', 'SQLITE_CONSTRAINT_PRIMARYKEY',
      `INSERT INTO auth_rate_limits (scope, subject_hash, window_started_at_ms, updated_at_ms)
       VALUES (?, ?, ?, ?)`, ['login', hash, 2, 2]);

    const invalidRows = [
      ['unsupported scope', 'SQLITE_CONSTRAINT_CHECK', 'other', 'b'.repeat(64), 0, 1, null, 1],
      ['invalid key hash', 'SQLITE_CONSTRAINT_CHECK', 'login', 'not-a-sha256', 0, 1, null, 1],
      ['64-character non-hex hash', 'SQLITE_CONSTRAINT_CHECK', 'login', 'g'.repeat(64), 0, 1, null, 1],
      ['64-character uppercase hash', 'SQLITE_CONSTRAINT_CHECK', 'login', 'A'.repeat(64), 0, 1, null, 1],
      ['text attempts', 'SQLITE_CONSTRAINT_CHECK', 'login', 'c'.repeat(64), 'not-integer', 1, null, 1],
      ['fractional attempts', 'SQLITE_CONSTRAINT_CHECK', 'login', 'd'.repeat(64), 1.5, 1, null, 1],
      ['negative attempts', 'SQLITE_CONSTRAINT_CHECK', 'login', 'e'.repeat(64), -1, 1, null, 1],
      ['attempt maximum exceeded', 'SQLITE_CONSTRAINT_CHECK', 'login', 'f'.repeat(64), MAX_ATTEMPT_COUNT + 1, 1, null, 1],
      ['text window timestamp', 'SQLITE_CONSTRAINT_CHECK', 'login', '7'.repeat(64), 0, 'not-integer', null, 1],
      ['fractional window timestamp', 'SQLITE_CONSTRAINT_CHECK', 'login', '8'.repeat(64), 0, 1.5, null, 1],
      ['zero window timestamp', 'SQLITE_CONSTRAINT_CHECK', 'login', '9'.repeat(64), 0, 0, null, 1],
      ['negative window timestamp', 'SQLITE_CONSTRAINT_CHECK', 'login', '0'.repeat(64), 0, -1, null, 1],
      ['text blocked timestamp', 'SQLITE_CONSTRAINT_CHECK', 'login', '1'.repeat(64), 0, 1, 'not-integer', 1],
      ['fractional blocked timestamp', 'SQLITE_CONSTRAINT_CHECK', 'login', '2'.repeat(64), 0, 1, 1.5, 1],
      ['zero blocked timestamp', 'SQLITE_CONSTRAINT_CHECK', 'login', '3'.repeat(64), 0, 1, 0, 1],
      ['negative blocked timestamp', 'SQLITE_CONSTRAINT_CHECK', 'login', '4'.repeat(64), 0, 1, -1, 1],
      ['text updated timestamp', 'SQLITE_CONSTRAINT_CHECK', 'login', '5'.repeat(64), 0, 1, null, 'not-integer'],
      ['fractional updated timestamp', 'SQLITE_CONSTRAINT_CHECK', 'login', '6'.repeat(64), 0, 1, null, 1.5],
      ['zero updated timestamp', 'SQLITE_CONSTRAINT_CHECK', 'login', 'a'.repeat(64), 0, 1, null, 0],
      ['negative updated timestamp', 'SQLITE_CONSTRAINT_CHECK', 'login', 'b'.repeat(64), 0, 1, null, -1],
    ];
    for (const [label, code, scope, hash, attempts, window, blocked, updated] of invalidRows) {
      assertConstraintFailure(db, label, code,
        `INSERT INTO auth_rate_limits
          (scope, subject_hash, attempt_count, window_started_at_ms, blocked_until_ms, updated_at_ms)
         VALUES (?, ?, ?, ?, ?, ?)`, [scope, hash, attempts, window, blocked, updated]);
    }
    const invalidUpdates = [
      ['text attempts update', 'attempt_count', 'not-integer'],
      ['fractional attempts update', 'attempt_count', 1.5],
      ['negative attempts update', 'attempt_count', -1],
      ['attempt maximum update', 'attempt_count', MAX_ATTEMPT_COUNT + 1],
      ['text window update', 'window_started_at_ms', 'not-integer'],
      ['fractional window update', 'window_started_at_ms', 1.5],
      ['zero window update', 'window_started_at_ms', 0],
      ['negative window update', 'window_started_at_ms', -1],
      ['text blocked update', 'blocked_until_ms', 'not-integer'],
      ['fractional blocked update', 'blocked_until_ms', 1.5],
      ['zero blocked update', 'blocked_until_ms', 0],
      ['negative blocked update', 'blocked_until_ms', -1],
      ['text updated timestamp update', 'updated_at_ms', 'not-integer'],
      ['fractional updated timestamp update', 'updated_at_ms', 1.5],
      ['zero updated timestamp update', 'updated_at_ms', 0],
      ['negative updated timestamp update', 'updated_at_ms', -1],
    ];
    for (const [label, column, value] of invalidUpdates) {
      assertConstraintFailure(db, label, 'SQLITE_CONSTRAINT_CHECK',
        `UPDATE auth_rate_limits SET "${column}" = ? WHERE scope = ? AND subject_hash = ?`,
        [value, 'login', hash]);
    }
    db.prepare('UPDATE auth_rate_limits SET attempt_count = ?, window_started_at_ms = ?, blocked_until_ms = ?, updated_at_ms = ? WHERE scope = ? AND subject_hash = ?')
      .run(MAX_ATTEMPT_COUNT, 2, 3, 4, 'login', hash);
    db.prepare('UPDATE auth_rate_limits SET attempt_count = ?, blocked_until_ms = ? WHERE scope = ? AND subject_hash = ?')
      .run(0, null, 'login', hash);
  } finally {
    db.exec('ROLLBACK TO auth_bootstrap_schema_validation; RELEASE auth_bootstrap_schema_validation');
  }
}

function assertV2Schema(db) {
  // Phase 2 schema validation remains authoritative at every later version.
  validateAuthSchema(db);
  const objects = db.prepare(`SELECT type, name FROM sqlite_master
    WHERE type IN ('table', 'index') AND name IN
      ('bootstrap_state', 'auth_rate_limits', 'auth_rate_limits_updated_idx', 'auth_rate_limits_blocked_idx')`).all();
  const expectedObjects = [
    ['table', 'auth_rate_limits'], ['table', 'bootstrap_state'],
    ['index', 'auth_rate_limits_blocked_idx'], ['index', 'auth_rate_limits_updated_idx'],
  ];
  const actualNames = new Set(objects.map((row) => `${row.type}:${row.name}`));
  for (const [type, name] of expectedObjects) {
    if (!actualNames.has(`${type}:${name}`)) {
      throw new Error(`Schema version 2 is incomplete: ${type} "${name}" is missing.`);
    }
  }

  assertAllowedSchemaObjects(db);

  assertColumns(db, 'bootstrap_state', [
    ['singleton', 'INTEGER', 0, null, 1, 0],
    ['owner_student_id', 'INTEGER', 1, null, 0, 0],
    ['completed_at', 'TEXT', 1, 'CURRENT_TIMESTAMP', 0, 0],
  ]);
  assertColumns(db, 'auth_rate_limits', [
    ['scope', 'TEXT', 1, null, 1, 0],
    ['subject_hash', 'TEXT', 1, null, 2, 0],
    ['attempt_count', 'INTEGER', 1, '0', 0, 0],
    ['window_started_at_ms', 'INTEGER', 1, null, 0, 0],
    ['blocked_until_ms', 'INTEGER', 0, null, 0, 0],
    ['updated_at_ms', 'INTEGER', 1, null, 0, 0],
  ]);
  assertForeignKey(db, 'bootstrap_state', 'owner_student_id', 'id', 'RESTRICT');

  const stateSql = db.prepare('SELECT sql FROM sqlite_master WHERE type = ? AND name = ?')
    .get('table', 'bootstrap_state').sql;
  const limitsSql = db.prepare('SELECT sql FROM sqlite_master WHERE type = ? AND name = ?')
    .get('table', 'auth_rate_limits').sql;
  if (!/CHECK\s*\(\s*singleton\s*=\s*1\s*\)/i.test(stateSql)) {
    throw new Error('Schema version 2 is incompatible: bootstrap singleton CHECK is missing.');
  }
  for (const [label, pattern] of [
    ['scope', /CHECK\s*\(\s*scope\s+IN\s*\(\s*'login'\s*,\s*'registration'\s*\)\s*\)/i],
    ['attempt count', new RegExp(`CHECK\\s*\\(\\s*typeof\\s*\\(\\s*attempt_count\\s*\\)\\s*=\\s*'integer'\\s+AND\\s+attempt_count\\s+BETWEEN\\s+0\\s+AND\\s+${MAX_ATTEMPT_COUNT}\\s*\\)`, 'i')],
    ['window expiry', /CHECK\s*\(\s*typeof\s*\(\s*window_started_at_ms\s*\)\s*=\s*'integer'\s+AND\s+window_started_at_ms\s*>\s*0\s*\)/i],
    ['blocked expiry', /CHECK\s*\(\s*blocked_until_ms\s+IS\s+NULL\s+OR\s*\(\s*typeof\s*\(\s*blocked_until_ms\s*\)\s*=\s*'integer'\s+AND\s+blocked_until_ms\s*>\s*0\s*\)\s*\)/i],
    ['update expiry', /CHECK\s*\(\s*typeof\s*\(\s*updated_at_ms\s*\)\s*=\s*'integer'\s+AND\s+updated_at_ms\s*>\s*0\s*\)/i],
  ]) {
    if (!pattern.test(limitsSql)) throw new Error(`Schema version 2 is incompatible: ${label} CHECK is missing.`);
  }

  const uniqueKey = db.pragma('index_list("auth_rate_limits")')
    .filter((index) => index.unique === 1)
    .some((index) => JSON.stringify(db.pragma(`index_xinfo("${index.name}")`)
      .filter((column) => column.key === 1).map((column) => column.name)) === JSON.stringify(['scope', 'subject_hash']));
  if (!uniqueKey) throw new Error('Schema version 2 is incompatible: rate-limit scope/key uniqueness is missing.');
  for (const [indexName, expected] of Object.entries(RATE_LIMIT_INDEXES)) assertIndex(db, indexName, expected);
  assertV2Behavior(db);

  const violations = db.pragma('foreign_key_check');
  if (violations.length) throw new Error(`Schema version 2 has ${violations.length} foreign-key violation(s).`);
}

function migrateAuthBootstrapSchema(db, options = {}) {
  if (!db || typeof db.transaction !== 'function') throw new TypeError('migrateAuthBootstrapSchema requires an open better-sqlite3 database.');
  const failpoints = ['after-bootstrap-state', 'after-rate-limit-table', 'after-indexes', 'after-user-version', 'validation', 'after-validation'];
  if (options.failpoint && !failpoints.includes(options.failpoint)) throw new Error(`Unknown migration test failpoint: ${options.failpoint}`);

  db.pragma('foreign_keys = ON');
  if (db.pragma('foreign_keys')[0].foreign_keys !== 1) throw new Error('SQLite foreign-key enforcement could not be enabled.');
  const version = db.pragma('user_version')[0].user_version;
  if (version === 2) {
    assertV2Schema(db);
    return 'already-current';
  }
  if (version !== 1) throw new Error(`Auth bootstrap migration requires schema version 1; found ${version}.`);
  validateAuthSchema(db);

  const transaction = db.transaction(() => {
    if (db.pragma('user_version')[0].user_version !== 1) throw new Error('Schema version changed while migration was starting.');
    validateAuthSchema(db);
    db.exec(`CREATE TABLE bootstrap_state (
      singleton INTEGER PRIMARY KEY CHECK (singleton = 1),
      owner_student_id INTEGER NOT NULL UNIQUE REFERENCES students(id) ON DELETE RESTRICT,
      completed_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    )`);
    failAt(options.failpoint, 'after-bootstrap-state');

    db.exec(`CREATE TABLE auth_rate_limits (
      scope TEXT NOT NULL CHECK (scope IN ('login', 'registration')),
      subject_hash TEXT NOT NULL CHECK (
        length(subject_hash) = 64 AND subject_hash NOT GLOB '*[^0-9a-f]*'
      ),
      attempt_count INTEGER NOT NULL DEFAULT 0 CHECK (
        typeof(attempt_count) = 'integer' AND attempt_count BETWEEN 0 AND ${MAX_ATTEMPT_COUNT}
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
    )`);
    failAt(options.failpoint, 'after-rate-limit-table');

    db.exec(`CREATE INDEX auth_rate_limits_updated_idx ON auth_rate_limits(updated_at_ms);
      CREATE INDEX auth_rate_limits_blocked_idx ON auth_rate_limits(blocked_until_ms)
      WHERE blocked_until_ms IS NOT NULL;`);
    failAt(options.failpoint, 'after-indexes');

    db.pragma('user_version = 2');
    failAt(options.failpoint, 'after-user-version');
    if (options.failpoint === 'validation') db.exec('DROP INDEX auth_rate_limits_updated_idx');
    assertV2Schema(db);
    failAt(options.failpoint, 'after-validation');
  });
  transaction.immediate();
  return 'applied';
}

function validateAuthBootstrapSchema(db) {
  assertV2Schema(db);
}

module.exports = { migrateAuthBootstrapSchema, validateAuthBootstrapSchema };
