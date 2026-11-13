'use strict';

const crypto = require('node:crypto');

const SAFE_METHODS = new Set(['GET', 'HEAD', 'OPTIONS']);

function issueCsrfToken(req) {
  if (!req?.session) throw new TypeError('A session is required to issue a CSRF token.');
  if (typeof req.session.csrfToken !== 'string' || !/^[A-Za-z0-9_-]{43}$/.test(req.session.csrfToken)) {
    req.session.csrfToken = crypto.randomBytes(32).toString('base64url');
  }
  return req.session.csrfToken;
}

function originMatches(actual, expectedOrigin) {
  if (typeof actual !== 'string' || typeof expectedOrigin !== 'string') return false;
  try { return new URL(actual).origin === new URL(expectedOrigin).origin && actual === new URL(actual).origin; }
  catch { return false; }
}

function createCsrfMiddleware({ expectedOrigin, headerName = 'x-csrf-token' } = {}) {
  if (typeof expectedOrigin !== 'string') throw new TypeError('expectedOrigin is required.');
  return function csrfProtection(req, res, next) {
    if (SAFE_METHODS.has(String(req.method).toUpperCase())) return next();
    if (!originMatches(req.get?.('origin') ?? req.headers?.origin, expectedOrigin)) {
      return res.status(403).json({ error: 'Invalid request origin.' });
    }
    const expected = req.session?.csrfToken;
    const supplied = req.get?.(headerName) ?? req.headers?.[headerName];
    if (typeof expected !== 'string' || typeof supplied !== 'string') {
      return res.status(403).json({ error: 'Invalid CSRF token.' });
    }
    const left = Buffer.from(expected);
    const right = Buffer.from(supplied);
    if (left.length !== right.length || !crypto.timingSafeEqual(left, right)) {
      return res.status(403).json({ error: 'Invalid CSRF token.' });
    }
    return next();
  };
}

module.exports = { SAFE_METHODS, createCsrfMiddleware, issueCsrfToken, originMatches };
