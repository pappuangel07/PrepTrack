'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const { createCsrfMiddleware, issueCsrfToken, originMatches } = require('../../auth/csrf');

function invoke(middleware, { method = 'POST', origin = 'http://localhost:5173', token, session = {} } = {}) {
  const req = { method, headers: { origin, 'x-csrf-token': token }, session, get(name) { return this.headers[name.toLowerCase()]; } };
  const result = { statusCode: null, body: null, next: false };
  const res = { status(code) { result.statusCode = code; return this; }, json(body) { result.body = body; return this; } };
  middleware(req, res, () => { result.next = true; });
  return result;
}

test('synchronizer token is session-bound and unsafe methods require matching token and Origin', () => {
  const session = {};
  const token = issueCsrfToken({ session });
  assert.equal(issueCsrfToken({ session }), token);
  const middleware = createCsrfMiddleware({ expectedOrigin: 'http://localhost:5173' });
  assert.equal(invoke(middleware, { token, session }).next, true);
  assert.equal(invoke(middleware, { token: 'wrong', session }).statusCode, 403);
  assert.equal(invoke(middleware, { token, session, origin: 'http://evil.test' }).statusCode, 403);
  assert.equal(invoke(middleware, { token, session, origin: null }).statusCode, 403);
});

test('safe methods bypass CSRF validation and Origin comparison is exact', () => {
  const middleware = createCsrfMiddleware({ expectedOrigin: 'http://localhost:5173' });
  assert.equal(invoke(middleware, { method: 'GET', origin: undefined }).next, true);
  assert.equal(invoke(middleware, { method: 'OPTIONS', origin: undefined }).next, true);
  assert.equal(originMatches('http://localhost:5173', 'http://localhost:5173'), true);
  assert.equal(originMatches('http://localhost:5173.attacker.test', 'http://localhost:5173'), false);
  assert.equal(originMatches('null', 'http://localhost:5173'), false);
});
