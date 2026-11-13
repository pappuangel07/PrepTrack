'use strict';

const crypto = require('node:crypto');
const { validateAuthBootstrapSchema } = require('./002-auth-bootstrap');

const EXPECTED_INDEX = 'session_revocations_expiry_idx';
const SESSION_REVOCATIONS_TABLE_SQL = `CREATE TABLE session_revocations (
      sid_hash TEXT PRIMARY KEY NOT NULL CHECK (
        length(sid_hash) = 64 AND sid_hash NOT GLOB '*[^0-9a-f]*'
      ),
      revoked_at_ms INTEGER NOT NULL CHECK (
        typeof(revoked_at_ms) = 'integer' AND revoked_at_ms > 0
      ),
      retain_until_ms INTEGER NOT NULL CHECK (
        typeof(retain_until_ms) = 'integer' AND retain_until_ms >= revoked_at_ms
      )
    )`;

function normalizeSql(sql) {
  return sql.replace(/\s+/g, ' ').trim();
}

function failAt(failpoint, point) {
  if (failpoint === point) throw new Error(`Injected migration failure at ${point}.`);
}

function assertColumns(db) {
  const actual = db.pragma('table_xinfo("session_revocations")').map((column) => [
    column.name, column.type.toUpperCase(), column.notnull, column.dflt_value, column.pk, column.hidden,
  ]);
  const expected = [
    ['sid_hash', 'TEXT', 1, null, 1, 0],
    ['revoked_at_ms', 'INTEGER', 1, null, 0, 0],
    ['retain_until_ms', 'INTEGER', 1, null, 0, 0],
  ];
  if (JSON.stringify(actual) !== JSON.stringify(expected)) {
    throw new Error('Schema version 3 is incompatible: session_revocations columns differ.');
  }
}

function assertIndex(db, name, table, unique, partial, origin, expectedColumns) {
  const listed = db.pragma(`index_list("${table}")`).find((index) => index.name === name);
  const columns = listed && db.pragma(`index_xinfo("${name}")`).filter((column) => column.key === 1)
    .map((column) => [column.name, column.desc, column.coll.toUpperCase()]);
  if (!listed || listed.unique !== unique || listed.partial !== partial || listed.origin !== origin ||
      JSON.stringify(columns) !== JSON.stringify(expectedColumns)) {
    throw new Error(`Schema version 3 is incompatible: index "${name}" differs.`);
  }
}

function assertAllowedObjects(db) {
  const indexes = db.prepare(`SELECT name FROM sqlite_master
    WHERE type = 'index' AND tbl_name = 'session_revocations' AND sql IS NOT NULL`).all();
  if (indexes.length !== 1 || indexes[0].name !== EXPECTED_INDEX) {
    throw new Error('Schema version 3 is incompatible: unexpected explicit index on session_revocations.');
  }
  const triggers = db.prepare(`SELECT name FROM sqlite_master
    WHERE type = 'trigger' AND tbl_name = 'session_revocations'`).all();
  if (triggers.length) throw new Error(`Schema version 3 is incompatible: unexpected trigger "${triggers[0].name}".`);

  const automatic = db.pragma('index_list("session_revocations")').filter((index) => index.origin !== 'c');
  if (automatic.length !== 1 || automatic[0].unique !== 1 || automatic[0].partial !== 0 || automatic[0].origin !== 'pk') {
    throw new Error('Schema version 3 is incompatible: session_revocations primary-key index differs.');
  }
  const pkColumns = db.pragma(`index_xinfo("${automatic[0].name}")`).filter((column) => column.key === 1)
    .map((column) => [column.name, column.desc, column.coll.toUpperCase()]);
  if (JSON.stringify(pkColumns) !== JSON.stringify([['sid_hash', 0, 'BINARY']])) {
    throw new Error('Schema version 3 is incompatible: session_revocations primary-key columns differ.');
  }
  assertIndex(db, EXPECTED_INDEX, 'session_revocations', 0, 0, 'c', [['retain_until_ms', 0, 'BINARY']]);
}

function assertConstraintFailure(db, label, expectedCode, sql, parameters) {
  try { db.prepare(sql).run(...parameters); }
  catch (error) {
    if (error.code === expectedCode) return;
    throw new Error(`Schema version 3 validation for ${label} failed for another reason: ${error.message}`);
  }
  throw new Error(`Schema version 3 is incompatible: ${label} constraint did not reject the value.`);
}

function assertBehavior(db) {
  const validHash = crypto.randomBytes(32).toString('hex');
  // Exercise both small values for boundary checks and realistic epoch
  // milliseconds. The latter detects extra restrictive checks such as
  // `retain_until_ms < 1000`, which would otherwise accept the small probes.
  const realisticRevokedAtMs = 1_800_000_000_000;
  const realisticRetainUntilMs = realisticRevokedAtMs + 8 * 24 * 60 * 60 * 1000;
  db.exec('SAVEPOINT session_revocation_schema_validation');
  try {
    const insert = db.prepare(`INSERT INTO session_revocations (sid_hash, revoked_at_ms, retain_until_ms)
      VALUES (?, ?, ?)`);
    insert.run(validHash, 100, 200);
    const realisticHash = crypto.randomBytes(32).toString('hex');
    try { insert.run(realisticHash, realisticRevokedAtMs, realisticRetainUntilMs); }
    catch (error) {
      throw new Error(`Schema version 3 is incompatible: realistic epoch-millisecond timestamps were rejected (${error.message}).`);
    }
    const realisticRow = db.prepare('SELECT revoked_at_ms, retain_until_ms FROM session_revocations WHERE sid_hash = ?')
      .get(realisticHash);
    if (realisticRow.revoked_at_ms !== realisticRevokedAtMs || realisticRow.retain_until_ms !== realisticRetainUntilMs) {
      throw new Error('Schema version 3 is incompatible: realistic epoch-millisecond timestamps were not preserved.');
    }
    assertConstraintFailure(db, 'SID hash format', 'SQLITE_CONSTRAINT_CHECK',
      'INSERT INTO session_revocations VALUES (?, ?, ?)', ['g'.repeat(64), 100, 200]);
    assertConstraintFailure(db, 'revoked timestamp storage type', 'SQLITE_CONSTRAINT_CHECK',
      'INSERT INTO session_revocations VALUES (?, ?, ?)', [crypto.randomBytes(32).toString('hex'), 'not-an-integer', 200]);
    assertConstraintFailure(db, 'revoked timestamp fraction', 'SQLITE_CONSTRAINT_CHECK',
      'INSERT INTO session_revocations VALUES (?, ?, ?)', [crypto.randomBytes(32).toString('hex'), 100.5, 200]);
    assertConstraintFailure(db, 'revoked timestamp non-positive', 'SQLITE_CONSTRAINT_CHECK',
      'INSERT INTO session_revocations VALUES (?, ?, ?)', [crypto.randomBytes(32).toString('hex'), 0, 200]);
    assertConstraintFailure(db, 'retention timestamp storage type', 'SQLITE_CONSTRAINT_CHECK',
      'INSERT INTO session_revocations VALUES (?, ?, ?)', [crypto.randomBytes(32).toString('hex'), 100, 'not-an-integer']);
    assertConstraintFailure(db, 'retention timestamp fraction', 'SQLITE_CONSTRAINT_CHECK',
      'INSERT INTO session_revocations VALUES (?, ?, ?)', [crypto.randomBytes(32).toString('hex'), 100, 200.5]);
    assertConstraintFailure(db, 'retention timestamp non-positive', 'SQLITE_CONSTRAINT_CHECK',
      'INSERT INTO session_revocations VALUES (?, ?, ?)', [crypto.randomBytes(32).toString('hex'), 100, 0]);
    assertConstraintFailure(db, 'retention before revocation', 'SQLITE_CONSTRAINT_CHECK',
      'INSERT INTO session_revocations VALUES (?, ?, ?)', [crypto.randomBytes(32).toString('hex'), 200, 100]);
    assertConstraintFailure(db, 'timestamp update behavior', 'SQLITE_CONSTRAINT_CHECK',
      'UPDATE session_revocations SET retain_until_ms = ? WHERE sid_hash = ?', [0, validHash]);
    assertConstraintFailure(db, 'duplicate SID hash', 'SQLITE_CONSTRAINT_PRIMARYKEY',
      'INSERT INTO session_revocations VALUES (?, ?, ?)', [validHash, 100, 200]);
  } finally {
    db.exec('ROLLBACK TO session_revocation_schema_validation; RELEASE session_revocation_schema_validation');
  }
}

function validateSessionRevocationSchema(db) {
  if (!db || typeof db.prepare !== 'function') throw new TypeError('validateSessionRevocationSchema requires an open better-sqlite3 database.');
  if (db.pragma('user_version')[0].user_version !== 3) throw new Error('Session revocation validation requires schema version 3.');
  validateAuthBootstrapSchema(db);
  const table = db.prepare("SELECT sql FROM sqlite_master WHERE type = 'table' AND name = 'session_revocations'").get();
  if (!table) throw new Error('Schema version 3 is incomplete: session_revocations is missing.');
  if (normalizeSql(table.sql) !== normalizeSql(SESSION_REVOCATIONS_TABLE_SQL)) {
    throw new Error('Schema version 3 is incompatible: session_revocations table definition differs.');
  }
  assertColumns(db);
  assertAllowedObjects(db);
  if (db.pragma('foreign_key_list("session_revocations")').length !== 0) {
    throw new Error('Schema version 3 is incompatible: session_revocations must not have foreign keys.');
  }
  assertBehavior(db);
  const violations = db.pragma('foreign_key_check');
  if (violations.length) throw new Error(`Schema version 3 has ${violations.length} foreign-key violation(s).`);
}

function migrateSessionRevocationSchema(db, options = {}) {
  if (!db || typeof db.transaction !== 'function') throw new TypeError('migrateSessionRevocationSchema requires an open better-sqlite3 database.');
  const failpoints = ['after-table', 'after-index', 'after-user-version', 'validation', 'after-validation'];
  if (options.failpoint && !failpoints.includes(options.failpoint)) throw new Error(`Unknown migration test failpoint: ${options.failpoint}`);
  db.pragma('foreign_keys = ON');
  if (db.pragma('foreign_keys')[0].foreign_keys !== 1) throw new Error('SQLite foreign-key enforcement could not be enabled.');
  const version = db.pragma('user_version')[0].user_version;
  if (version === 3) {
    validateSessionRevocationSchema(db);
    return 'already-current';
  }
  if (version !== 2) throw new Error(`Session revocation migration requires schema version 2; found ${version}.`);
  validateAuthBootstrapSchema(db);

  const transaction = db.transaction(() => {
    if (db.pragma('user_version')[0].user_version !== 2) throw new Error('Schema version changed while migration was starting.');
    validateAuthBootstrapSchema(db);
    db.exec(SESSION_REVOCATIONS_TABLE_SQL);
    failAt(options.failpoint, 'after-table');
    db.exec('CREATE INDEX session_revocations_expiry_idx ON session_revocations(retain_until_ms)');
    failAt(options.failpoint, 'after-index');
    db.pragma('user_version = 3');
    failAt(options.failpoint, 'after-user-version');
    if (options.failpoint === 'validation') db.exec('DROP INDEX session_revocations_expiry_idx');
    validateSessionRevocationSchema(db);
    failAt(options.failpoint, 'after-validation');
  });
  transaction.immediate();
  return 'applied';
}

module.exports = { migrateSessionRevocationSchema, validateSessionRevocationSchema };
