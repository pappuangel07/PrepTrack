const fs = require('node:fs');
const path = require('node:path');
const Database = require('better-sqlite3');
const { migrateAuthSchema, validateAuthSchema } = require('./migrations/001-auth-schema');
const { migrateAuthBootstrapSchema, validateAuthBootstrapSchema } = require('./migrations/002-auth-bootstrap');
const { migrateSessionRevocationSchema, validateSessionRevocationSchema } = require('./migrations/003-session-revocations');

const PROTECTED_DATABASE_PATHS = [
  path.join(__dirname, 'preptrack.db'),
  path.join(__dirname, 'preptrack-backup.db'),
  path.join(__dirname, 'preptrack-backup-new.db'),
  path.join(__dirname, 'preptrack-before-java.db'),
  path.join(__dirname, 'preptrack-before-planner.db'),
  path.join(__dirname, 'phase1-rehearsal-20261112174903-506aaf49', 'verified-live-backup.db'),
  path.join(__dirname, 'phase1-rehearsal-20261112174903-506aaf49', 'disposable-working-copy.db'),
];

function normalizedPath(filePath) {
  const resolved = path.resolve(filePath);
  return process.platform === 'win32' ? resolved.toLocaleLowerCase('en-US') : resolved;
}

function fileIdentity(filePath) {
  const stat = fs.statSync(filePath, { bigint: true });
  if (!stat.isFile() || stat.dev === 0n || stat.ino === 0n || stat.nlink === 0n) {
    throw new Error(`Cannot establish reliable file identity for protected database path: ${filePath}`);
  }
  return { id: `${stat.dev.toString()}:${stat.ino.toString()}`, linkCount: stat.nlink };
}

function canonicalExistingPath(filePath) {
  const resolved = path.resolve(filePath);
  return fs.realpathSync.native(resolved);
}

function isWithinDirectory(rootPath, candidatePath) {
  const relativePath = path.relative(normalizedPath(rootPath), normalizedPath(candidatePath));
  return relativePath === '' || (
    relativePath !== '..' &&
    !relativePath.startsWith(`..${path.sep}`) &&
    !path.isAbsolute(relativePath)
  );
}

function inspectDatabasePathIsUnprotected(
  databasePath,
  protectedPaths = PROTECTED_DATABASE_PATHS,
  allowedRoot = __dirname
) {
  const canonicalTarget = canonicalExistingPath(databasePath);
  const targetIdentity = fileIdentity(canonicalTarget);
  const normalizedTarget = normalizedPath(canonicalTarget);
  const canonicalRoot = fs.realpathSync.native(path.resolve(allowedRoot));

  if (!isWithinDirectory(canonicalRoot, canonicalTarget)) {
    throw new Error('Refusing to migrate a database outside this checkout server directory.');
  }
  if (targetIdentity.linkCount !== 1n) {
    throw new Error('Refusing to migrate a database with hard-link aliases.');
  }

  for (const protectedPath of protectedPaths) {
    let canonicalProtected;
    try {
      canonicalProtected = canonicalExistingPath(protectedPath);
    } catch (error) {
      if (error.code === 'ENOENT' || error.code === 'ENOTDIR') {
        if (normalizedPath(protectedPath) === normalizedTarget) {
          throw new Error('Refusing to migrate a protected database path.');
        }
        continue;
      }
      throw new Error(`Cannot verify protected database path ${protectedPath}: ${error.message}`);
    }

    // Identity is checked before path equality so unsupported file identity fails closed.
    const protectedIdentity = fileIdentity(canonicalProtected);
    if (normalizedPath(canonicalProtected) === normalizedTarget || protectedIdentity.id === targetIdentity.id) {
      throw new Error('Refusing to migrate the live database or a protected backup/rehearsal artifact.');
    }
  }
  return { canonicalPath: canonicalTarget, identity: targetIdentity.id };
}

function assertDatabasePathIsUnprotected(databasePath, protectedPaths = PROTECTED_DATABASE_PATHS, allowedRoot = __dirname) {
  return inspectDatabasePathIsUnprotected(databasePath, protectedPaths, allowedRoot).canonicalPath;
}

function readDatabaseArguments(args) {
  let databasePath;
  let targetVersion = 3;
  let hasTargetVersion = false;
  for (let index = 0; index < args.length; index += 1) {
    if (args[index] === '--db' && args[index + 1] && !databasePath) {
      databasePath = args[index + 1];
      index += 1;
    } else if (args[index] === '--target-version' && args[index + 1] && !hasTargetVersion) {
      const rawValue = args[index + 1];
      if (rawValue !== '1' && rawValue !== '2' && rawValue !== '3') throw new Error('Target version must be exactly 1, 2, or 3.');
      const value = Number(rawValue);
      targetVersion = value;
      hasTargetVersion = true;
      index += 1;
    } else {
      throw new Error('Usage: node server/migrate.js --db <existing-database-path> [--target-version 1|2|3]');
    }
  }
  if (!databasePath) throw new Error('Usage: node server/migrate.js --db <existing-database-path> [--target-version 1|2|3]');
  return { databasePath: path.resolve(databasePath), targetVersion };
}

function migrateToVersion(db, targetVersion = 3) {
  if (![1, 2, 3].includes(targetVersion)) throw new Error(`Unsupported target schema version ${targetVersion}.`);
  let version = db.pragma('user_version')[0].user_version;
  let changed = false;
  if (version > targetVersion) throw new Error(`Database version ${version} is newer than requested target ${targetVersion}.`);
  if (version === 0) {
    migrateAuthSchema(db);
    version = 1;
    changed = true;
  }
  if (version === 1) {
    validateAuthSchema(db);
    if (targetVersion >= 2) {
      migrateAuthBootstrapSchema(db);
      version = 2;
      changed = true;
    }
  }
  if (version === 2) {
    validateAuthBootstrapSchema(db);
    if (targetVersion >= 3) {
      migrateSessionRevocationSchema(db);
      version = 3;
      changed = true;
    }
  } else if (version === 3) {
    validateSessionRevocationSchema(db);
  } else if (version !== 0 && version !== 1) {
    throw new Error(`No migration is defined from schema version ${version}.`);
  }
  return changed ? 'applied' : 'already-current';
}

function runMigration(databasePath, targetVersion = 3) {
  const absolutePath = path.resolve(databasePath);
  if (!fs.existsSync(absolutePath) || !fs.statSync(absolutePath).isFile()) {
    throw new Error(`Database file must already exist: ${absolutePath}`);
  }

  const checkedTarget = inspectDatabasePathIsUnprotected(absolutePath);
  const { canonicalPath } = checkedTarget;

  const db = new Database(canonicalPath, { fileMustExist: true, timeout: 5000 });
  try {
    const openedPath = canonicalExistingPath(canonicalPath);
    const openedIdentity = fileIdentity(openedPath);
    if (normalizedPath(openedPath) !== normalizedPath(canonicalPath) ||
        openedIdentity.id !== checkedTarget.identity || openedIdentity.linkCount !== 1n) {
      throw new Error('Database identity changed between protection check and SQLite open; refusing to migrate.');
    }
    const before = db.pragma('user_version')[0].user_version;
    const result = migrateToVersion(db, targetVersion);
    const after = db.pragma('user_version')[0].user_version;
    process.stdout.write(`${result}: schema version ${before} -> ${after}\n`);
    return result;
  } finally {
    db.close();
  }
}

if (require.main === module) {
  try {
    const { databasePath, targetVersion } = readDatabaseArguments(process.argv.slice(2));
    runMigration(databasePath, targetVersion);
  } catch (error) {
    process.stderr.write(`${error.message}\n`);
    process.exitCode = 1;
  }
}

module.exports = {
  readDatabaseArguments,
  migrateToVersion,
  runMigration,
  assertDatabasePathIsUnprotected,
  PROTECTED_DATABASE_PATHS,
};
