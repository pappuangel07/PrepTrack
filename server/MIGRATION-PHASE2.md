# Phase 2 migration operation notes

## Initialize and migrate a genuinely empty database safely

Do all first-run rehearsal work in a newly created isolated copy of the project under the Windows temporary directory. Never point these steps at the working project directory. `server.js` always opens `server/preptrack.db`; the isolated copy is what makes that fixed path safe for initialization.

From the project root, make a unique copy while excluding every SQLite database and sidecar. The copy includes the existing `node_modules`, so this procedure does not install packages:

```powershell
$source = (Get-Location).Path
$isolated = Join-Path $env:TEMP ("PrepTrack-phase2-empty-" + [guid]::NewGuid().ToString("N"))
New-Item -ItemType Directory -Path $isolated | Out-Null
robocopy $source $isolated /E /XD .git /XF *.db *.db-wal *.db-shm *.db-journal *.sqlite *.sqlite-wal *.sqlite-shm *.sqlite-journal *.sqlite3
```

Robocopy exit codes 0 through 7 indicate the copy completed without a fatal error; stop if it returns 8 or higher. Confirm that `$isolated\server\preptrack.db` does not exist before continuing:

```powershell
if (Test-Path (Join-Path $isolated 'server\preptrack.db')) { throw 'The isolated copy is not empty; discard it and create another unique destination.' }
```

If it exists, discard this isolated copy and create another unique destination.

Ensure port 5000 is available. Start the server from the isolated copy, wait for startup, then stop it with Ctrl+C. This initializes only the isolated copy's empty `server/preptrack.db` and seeds the baseline tables/catalogs using the existing startup code:

```powershell
node "$isolated\server\server.js"
```

Create a new, distinct migration rehearsal copy through SQLite's online backup API. The following command opens the isolated initialized database read-only and writes only `preptrack-migration-copy.db` in the isolated copy:

```powershell
$env:PREPTRACK_ISOLATED_COPY = $isolated
node -e "const path=require('node:path'); const root=process.env.PREPTRACK_ISOLATED_COPY; const Database=require(path.join(root,'server','node_modules','better-sqlite3')); const source=new Database(path.join(root,'server','preptrack.db'),{readonly:true,fileMustExist:true}); source.backup(path.join(root,'server','preptrack-migration-copy.db')).then(()=>source.close(),error=>{source.close();throw error;});"
```

Verify that copy, then migrate only that distinct file:

```powershell
node -e "const path=require('node:path'); const root=process.env.PREPTRACK_ISOLATED_COPY; const Database=require(path.join(root,'server','node_modules','better-sqlite3')); const db=new Database(path.join(root,'server','preptrack-migration-copy.db'),{readonly:true,fileMustExist:true}); const integrity=db.pragma('integrity_check'); const foreignKeys=db.pragma('foreign_key_check'); console.log(JSON.stringify({integrity,foreignKeys})); db.close(); if(integrity.length!==1||integrity[0].integrity_check!=='ok'||foreignKeys.length) process.exitCode=1;"
node "$isolated\server\migrate.js" --db "$isolated\server\preptrack-migration-copy.db" --target-version 1
```

The explicit target above rehearses only Phase 2 schema version 1. The CLI protects the isolated copy's own `server/preptrack.db` and refuses to migrate it. The online backup has a different file identity and a different name. Do not rename, hard-link, or otherwise alias a protected database to get around the guard. Do not replace `$isolated` with the working project path. If port 5000 is occupied, do not stop or interfere with another service; wait until it is available or use a separate disposable Windows environment.

## Phase 3.0 schema version 2

Migration 002 adds schema version 2. The current migration runner supports explicit targets 1, 2, and 3; without `--target-version`, it targets the latest supported version, 3. To rehearse version 2 specifically against a distinct disposable database, use:

```powershell
node "$isolated\server\migrate.js" --db "$isolated\server\preptrack-migration-copy.db" --target-version 2
```

Version 2 adds only:

- `bootstrap_state`, constrained to a single singleton row and a unique initial-owner reference.
- `auth_rate_limits`, with unique `(scope, subject_hash)` keys, integer-only millisecond timestamps, and an `attempt_count` integer range of 0 through 1,000,000. The ceiling is a storage safety cap; application rate policies should block well below it. Expiry cleanup and active-block lookups have dedicated indexes.

It does not create an account, assign existing records, enable registration, add authentication routes, or change normal server startup. Version 2 migration and validation run transactionally. A repeated invocation validates the complete expected schema and reports `already-current`; it does not repair an incompatible version-2 database. `--target-version 1` remains available for Phase 2-only migration rehearsal.

For a fresh database, initialize only a database created by running `server/server.js` in the isolated project copy described above, then use the online-backup step and migrate that distinct copy to version 2. Do not run the initialization server in the working checkout: its startup code opens `server/preptrack.db` at a fixed path. The existing CLI guard continues to protect the working live database, known backups, and Phase 1 artifacts.

## Phase 3.1 schema version 3

Migration 003 adds `session_revocations`, keyed by a SHA-256 hash of the session ID, with integer `revoked_at_ms` and `retain_until_ms` fields plus an index on retention expiry. It is additive: it does not rebuild session, student, or feature tables and does not change existing records. It runs only when the migration command is explicitly invoked. Its migration uses a transaction, validates the full v3 schema before commit, and rejects incompatible version-3 schemas without repairing them.

For disposable rehearsal, first make or use a distinct database copy already at version 2, then run:

```powershell
node "$isolated\server\migrate.js" --db "$isolated\server\preptrack-migration-copy.db" --target-version 3
```

Omitting `--target-version` now advances a valid version-0, version-1, or version-2 database through the latest schema, version 3. Explicit target 1 and target 2 remain available. The protected live database, existing backups, and Phase 1 artifacts remain refused by the CLI guard.

`SQLiteSessionStore` writes a revocation tombstone and deletes an expired or logged-out session in one `BEGIN IMMEDIATE` transaction. Cleanup tombstones idle-expired sessions before deleting them and retains each tombstone until the session's absolute expiry plus 24 hours. Store operations use request-local SID provenance so a missing database row cannot be mistaken for a newly generated SID. Auth and migration tests use disposable databases; migration rehearsal must never target `server/preptrack.db` or an existing backup.

Migration tests use only uniquely named disposable databases inside a temporary `.phase3-migration-test-*` directory under `server` or the operating-system temporary directory. They verify versions 0, 1, and 2 to 3, default latest-version behavior, repeat idempotency, unsupported and incompatible schema rejection, singleton, rate-limit, and revocation constraints, migration failure rollback, and preservation of original records and `sqlite_sequence`. Auth tests use isolated temporary SQLite databases with the required v3 schema. Test cleanup is scoped to each newly created test directory; it does not target existing rehearsal folders.

## Phase 3.1/3.2 bootstrap requirement

The offline initial-owner bootstrap must refuse to create or reset an owner if either a `bootstrap_state` marker or any student account already exists. It must never delete or reset the marker. Before approval of Phase 3.2, add a disposable-database replay test that deletes the marker while retaining the existing student and confirms that bootstrap still refuses to create or reset an owner.

## Future live migration

The CLI accepts only an unaliased regular database file whose canonical path is within the launching checkout's `server` directory. It also protects the known database paths there by canonical path and file identity. Thus a CLI launched from the isolated copy cannot accept the original project's absolute database path; a symlink or junction resolving outside that copy is rejected, and a hard link is rejected when the filesystem reports more than one link. The CLI rechecks the target's canonical path and file identity after SQLite opens it and before migration begins.

This is not an atomic check-to-open guarantee. The current Node.js plus `better-sqlite3` interface opens by pathname and does not let the CLI supply or independently inspect the exact operating-system file handle SQLite opened. A process able to replace and restore a file or path during that narrow interval may evade the before/after comparison. Do not run the migration while another process can alter the isolated directory. The guard is designed to prevent accidental targeting and ordinary static aliases; it is not a defense against a concurrent local actor with filesystem write access.

The current CLI intentionally refuses the working project's `server/preptrack.db`, all known backups, and the Phase 1 rehearsal databases. Do not use a copied project or an alias to reach the live database. A live migration requires a separately approved procedure and a dedicated mechanism designed for that exact operation. That future procedure should stop all application writers, create a new online backup at a unique path, verify its integrity, foreign keys, schema, counts and IDs, rehearse migration and rollback on a disposable copy, and review the results. Retain the verified backup and complete post-migration checks before restarting the application. Normal server startup behavior is unchanged in Phase 2.
