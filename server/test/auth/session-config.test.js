'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const express = require('express');
const session = require('express-session');
const { createSessionOptions, createSessionProvenanceMiddleware } = require('../../auth/session-config');
const { SQLiteSessionStore } = require('../../auth/sqlite-session-store');
const { disposableAuthDatabase } = require('./support');

test('development and production cookies use safe, explicit settings', () => {
  const store = {};
  const dev = createSessionOptions({ secret: 'x'.repeat(32), store, env: { NODE_ENV: 'development' }, appOrigin: 'http://localhost:5173' });
  assert.equal(dev.name, 'preptrack.sid');
  assert.equal(dev.cookie.secure, false);
  assert.equal(dev.cookie.httpOnly, true);
  assert.equal(dev.cookie.sameSite, 'lax');
  assert.equal(dev.cookie.path, '/');
  assert.equal(Object.hasOwn(dev, 'proxy'), false);
  assert.equal(dev.saveUninitialized, false);
  assert.equal(dev.resave, false);
  assert.equal(typeof dev.genid, 'function');
  assert.equal(Object.hasOwn(dev, 'proxy'), false);

  const prod = createSessionOptions({ secret: 'x'.repeat(32), store, env: { NODE_ENV: 'production' }, appOrigin: 'https://prep.example' });
  assert.equal(prod.name, '__Host-preptrack.sid');
  assert.equal(prod.cookie.secure, true);
  assert.equal(prod.cookie.path, '/');
  assert.equal(Object.hasOwn(prod.cookie, 'domain'), false);
  assert.equal(Object.hasOwn(prod, 'proxy'), false);
});

test('express-session 1.19.0 issues Secure cookies through only an Express-trusted TLS proxy', async (t) => {
  const fixture = disposableAuthDatabase();
  const servers = [];
  t.after(async () => {
    await Promise.all(servers.map((server) => new Promise((resolve, reject) =>
      server.close((error) => error ? reject(error) : resolve()))));
    fixture.close();
  });
  const store = new SQLiteSessionStore(fixture.db);

  async function start(trustProxy) {
    const app = express();
    app.set('trust proxy', trustProxy);
    app.use(session(createSessionOptions({
      secret: 'production-session-secret-is-at-least-32-bytes',
      store,
      env: { NODE_ENV: 'production' },
      appOrigin: 'https://prep.example',
    })));
    app.use(createSessionProvenanceMiddleware(store));
    app.get('/', (req, res) => {
      req.session.studentId = fixture.studentId;
      res.end('ok');
    });
    app.post('/regenerate', (req, res, next) => {
      req.session.regenerate((error) => {
        if (error) return next(error);
        req.session.studentId = fixture.studentId;
        return res.end('regenerated');
      });
    });
    const server = await new Promise((resolve) => {
      const instance = app.listen(0, '127.0.0.1', () => resolve(instance));
    });
    servers.push(server);
    return `http://127.0.0.1:${server.address().port}/`;
  }

  const trustedUrl = await start('loopback');
  const trusted = await fetch(trustedUrl, { headers: { 'x-forwarded-proto': 'https' } });
  const trustedCookie = trusted.headers.get('set-cookie');
  assert.match(trustedCookie, /Secure/);
  assert.match(trustedCookie, /HttpOnly/);
  assert.match(trustedCookie, /SameSite=Lax/i);
  const cookiePair = trustedCookie.split(';', 1)[0];
  const restored = await fetch(trustedUrl, {
    headers: { cookie: cookiePair, 'x-forwarded-proto': 'https' },
  });
  assert.match(restored.headers.get('set-cookie'), /Secure/,
    'loaded sessions use createSession provenance and touch without changing identity');
  const regenerated = await fetch(`${trustedUrl}regenerate`, {
    method: 'POST',
    headers: { cookie: cookiePair, 'x-forwarded-proto': 'https' },
  });
  assert.equal(regenerated.status, 200);
  const regeneratedCookie = regenerated.headers.get('set-cookie');
  assert.match(regeneratedCookie, /Secure/);
  assert.notEqual(regeneratedCookie.split(';', 1)[0], cookiePair);

  const untrustedUrl = await start(false);
  const untrusted = await fetch(untrustedUrl, { headers: { 'x-forwarded-proto': 'https' } });
  assert.equal(untrusted.headers.get('set-cookie'), null,
    'an untrusted forwarded-proto header must not make a plaintext request secure');
});

test('session config rejects weak secrets and unsafe origins', () => {
  const store = {};
  assert.throws(() => createSessionOptions({ secret: 'short', store, appOrigin: 'http://localhost' }), /32 UTF-8 bytes/);
  assert.throws(() => createSessionOptions({ secret: 'x'.repeat(32), store, env: { NODE_ENV: 'production' }, appOrigin: 'http://prep.example' }), /HTTPS/);
  assert.throws(() => createSessionOptions({ secret: 'x'.repeat(32), store, env: { NODE_ENV: 'development' }, appOrigin: 'http://example.com' }), /localhost/);
  assert.throws(() => createSessionOptions({ secret: 'x'.repeat(32), store, env: { NODE_ENV: 'production' }, appOrigin: 'https://prep.example/path' }), /path, query, or fragment/);
});
