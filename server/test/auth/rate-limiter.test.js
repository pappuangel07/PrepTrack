'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const { spawn } = require('node:child_process');
const path = require('node:path');
const { MAX_ATTEMPT_COUNT, PersistentRateLimiter } = require('../../auth/rate-limiter');
const { disposableAuthDatabase } = require('./support');

test('persistent rate limits are atomic, scoped, private, and expire', async (t) => {
  const fixture = disposableAuthDatabase();
  t.after(() => fixture.close());
  let now = 1_800_000_000_000;
  const limiter = new PersistentRateLimiter(fixture.db, { hmacSecret: 's'.repeat(48), now: () => now });
  const policy = { scope: 'login', identifier: 'Student@Example.test', dimension: 'email', limit: 3, windowMs: 1000, blockMs: 500 };
  assert.equal(limiter.consume(policy).allowed, true);
  assert.equal(limiter.consume(policy).allowed, true);
  assert.equal(limiter.consume(policy).allowed, true);
  assert.deepEqual(limiter.consume(policy), { allowed: false, retryAfterMs: 500 });
  const stored = fixture.db.prepare('SELECT * FROM auth_rate_limits').get();
  assert.equal(stored.attempt_count, 3);
  assert.equal(stored.blocked_until_ms, now + 500);
  assert.match(stored.subject_hash, /^[0-9a-f]{64}$/);
  assert.equal(JSON.stringify(stored).includes('Student'), false);

  const restarted = new PersistentRateLimiter(fixture.db, { hmacSecret: 's'.repeat(48), now: () => now });
  assert.equal(restarted.consume(policy).allowed, false);
  now += 501;
  assert.equal(restarted.consume(policy).allowed, true);
  now += 1001;
  assert.equal(restarted.consume(policy).allowed, true);
  assert.equal(fixture.db.prepare('SELECT COUNT(*) AS n FROM auth_rate_limits').get().n, 1);
});

test('rate limit subject hashes are keyed and policy inputs are validated', async (t) => {
  const fixture = disposableAuthDatabase();
  t.after(() => fixture.close());
  let now = 1_800_000_000_000;
  const first = new PersistentRateLimiter(fixture.db, { hmacSecret: 'a'.repeat(48), now: () => now });
  const second = new PersistentRateLimiter(fixture.db, { hmacSecret: 'b'.repeat(48), now: () => now });
  assert.notEqual(first.hashSubject('203.0.113.4'), second.hashSubject('203.0.113.4'));
  assert.notEqual(first.hashSubject('203.0.113.4'), first.hashSubject('203.0.113.4', 'ip'));
  assert.notEqual(first.hashSubject('same@example.test', 'email', 'login'), first.hashSubject('same@example.test', 'email', 'registration'));
  assert.throws(() => first.consume({ scope: 'other', identifier: 'x', limit: 1, windowMs: 1 }), /scope/);
  assert.throws(() => first.consume({ scope: 'login', identifier: 'x', limit: 0, windowMs: 1 }), /limit/);
  first.consume({ scope: 'registration', identifier: 'old', limit: 3, windowMs: 10 });
  now += 20;
  assert.equal(first.cleanup({ olderThanMs: now - 1, now, limit: 20 }), 1);
  assert.equal(fixture.db.prepare('SELECT COUNT(*) AS n FROM auth_rate_limits').get().n, 0);
});

test('cleanup retains a currently active block even when its row is old', async (t) => {
  const fixture = disposableAuthDatabase();
  t.after(() => fixture.close());
  let now = 1_800_000_000_000;
  const limiter = new PersistentRateLimiter(fixture.db, { hmacSecret: 'd'.repeat(48), now: () => now });
  const policy = { scope: 'login', identifier: 'locked-user', limit: 1, windowMs: 10, blockMs: 5000 };
  limiter.consume(policy);
  limiter.consume(policy);
  now += 1;
  assert.equal(limiter.cleanup({ olderThanMs: now + 1, now, limit: 20 }), 0);
  assert.equal(fixture.db.prepare('SELECT COUNT(*) AS n FROM auth_rate_limits').get().n, 1);
});

test('parallel consumers serialize threshold updates across store instances', async (t) => {
  const fixture = disposableAuthDatabase();
  t.after(() => fixture.close());
  const first = new PersistentRateLimiter(fixture.db, { hmacSecret: 'c'.repeat(48) });
  const second = new PersistentRateLimiter(fixture.db, { hmacSecret: 'c'.repeat(48) });
  const policy = { scope: 'registration', identifier: 'same-ip', limit: 5, windowMs: 60_000, blockMs: 1000 };
  const outcomes = await Promise.all(Array.from({ length: 20 }, (_, i) => Promise.resolve().then(() => (i % 2 ? first : second).consume(policy))));
  assert.equal(outcomes.filter((outcome) => outcome.allowed).length, 5);
  assert.equal(fixture.db.prepare('SELECT COUNT(*) AS n FROM auth_rate_limits').get().n, 1);
  assert.equal(fixture.db.prepare('SELECT attempt_count FROM auth_rate_limits').get().attempt_count, 5);
  assert.ok(outcomes.some((outcome) => !outcome.allowed));
});

test('rate-limit count ceiling and exact window/block boundaries are enforced', async (t) => {
  const fixture = disposableAuthDatabase();
  t.after(() => fixture.close());
  let now = 1_800_000_000_000;
  const limiter = new PersistentRateLimiter(fixture.db, { hmacSecret: 'e'.repeat(48), now: () => now });
  const policy = { scope: 'login', identifier: 'limit-boundary', limit: 2, windowMs: 1000, blockMs: 100 };
  assert.equal(limiter.consume(policy).allowed, true);
  assert.equal(limiter.consume(policy).allowed, true);
  assert.equal(limiter.consume(policy).allowed, false);
  now += 99;
  assert.deepEqual(limiter.consume(policy), { allowed: false, retryAfterMs: 1 });
  now += 1;
  assert.equal(limiter.consume(policy).allowed, true, 'the exact block boundary is no longer blocked');
  now += 1000;
  assert.equal(limiter.consume(policy).allowed, true, 'the exact window boundary starts a new window');
  assert.throws(() => limiter.consume({ ...policy, limit: MAX_ATTEMPT_COUNT + 1 }), /must not exceed 1000000/);

  const hash = limiter.hashSubject('ceiling', 'identifier', 'registration');
  fixture.db.prepare(`INSERT INTO auth_rate_limits
    (scope, subject_hash, attempt_count, window_started_at_ms, blocked_until_ms, updated_at_ms)
    VALUES (?, ?, ?, ?, NULL, ?)`)
    .run('registration', hash, MAX_ATTEMPT_COUNT, now, now);
  const atCeiling = limiter.consume({ ...policy, scope: 'registration', identifier: 'ceiling', limit: MAX_ATTEMPT_COUNT });
  assert.equal(atCeiling.allowed, false);
  assert.equal(fixture.db.prepare('SELECT attempt_count FROM auth_rate_limits WHERE scope=? AND subject_hash=?')
    .get('registration', hash).attempt_count, MAX_ATTEMPT_COUNT);
});

test('rate-limit derived timestamps reject unsafe arithmetic before writing', async (t) => {
  const fixture = disposableAuthDatabase();
  t.after(() => fixture.close());
  const nearMaximum = Number.MAX_SAFE_INTEGER - 5;
  const limiter = new PersistentRateLimiter(fixture.db, { hmacSecret: 'f'.repeat(48), now: () => nearMaximum });
  const initialCount = fixture.db.prepare('SELECT COUNT(*) AS n FROM auth_rate_limits').get().n;
  assert.throws(() => limiter.consume({ scope: 'login', identifier: 'window-overflow', limit: 1, windowMs: 6 }), /safe timestamp range/);
  assert.throws(() => limiter.consume({ scope: 'login', identifier: 'block-overflow', limit: 1, windowMs: 1, blockMs: 6 }), /safe timestamp range/);
  assert.equal(fixture.db.prepare('SELECT COUNT(*) AS n FROM auth_rate_limits').get().n, initialCount);
});

test('independent Node processes serialize persistent rate-limit updates', async (t) => {
  const fixture = disposableAuthDatabase();
  t.after(() => fixture.close());
  const limiterModule = require.resolve('../../auth/rate-limiter');
  const script = `
    const Database = require('better-sqlite3');
    const { PersistentRateLimiter } = require(${JSON.stringify(limiterModule)});
    const db = new Database(process.argv[1], { timeout: 10000 });
    const limiter = new PersistentRateLimiter(db, { hmacSecret: 'g'.repeat(48) });
    const result = limiter.consume({ scope: 'login', identifier: 'multi-process', limit: 5, windowMs: 60000 });
    process.stdout.write(JSON.stringify(result));
    db.close();
  `;
  const runChild = () => new Promise((resolve, reject) => {
    const child = spawn(process.execPath, ['-e', script, fixture.filename], {
      cwd: path.resolve(__dirname, '../..'), windowsHide: true,
    });
    let stdout = '';
    let stderr = '';
    child.stdout.setEncoding('utf8').on('data', (chunk) => { stdout += chunk; });
    child.stderr.setEncoding('utf8').on('data', (chunk) => { stderr += chunk; });
    child.on('error', reject);
    child.on('close', (code) => code === 0 ? resolve(JSON.parse(stdout)) : reject(new Error(stderr || `child exited ${code}`)));
  });
  const outcomes = await Promise.all(Array.from({ length: 12 }, runChild));
  assert.equal(outcomes.filter((outcome) => outcome.allowed).length, 5);
  assert.equal(fixture.db.prepare('SELECT COUNT(*) AS n FROM auth_rate_limits').get().n, 1);
  assert.equal(fixture.db.prepare('SELECT attempt_count FROM auth_rate_limits').get().attempt_count, 5);
});
