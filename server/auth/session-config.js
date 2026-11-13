'use strict';

const { DEFAULT_IDLE_TIMEOUT_MS } = require('./sqlite-session-store');

function createSessionOptions({ secret, store, env = process.env, appOrigin } = {}) {
  if (typeof secret !== 'string' || Buffer.byteLength(secret, 'utf8') < 32) {
    throw new TypeError('Session secret must contain at least 32 UTF-8 bytes.');
  }
  if (!store) throw new TypeError('A persistent session store is required.');
  const production = env.NODE_ENV === 'production';
  if (typeof appOrigin !== 'string') throw new TypeError('appOrigin must be configured.');
  let origin;
  try { origin = new URL(appOrigin); } catch { throw new TypeError('appOrigin must be a valid absolute origin.'); }
  if (origin.origin !== appOrigin.replace(/\/$/, '')) throw new TypeError('appOrigin must not include a path, query, or fragment.');
  if (production && origin.protocol !== 'https:') throw new Error('Production session cookies require an HTTPS app origin.');
  if (!production && (origin.protocol !== 'http:' || !['localhost', '127.0.0.1', '[::1]'].includes(origin.hostname))) {
    throw new Error('Development appOrigin must use HTTP on localhost or loopback.');
  }
  return {
    name: production ? '__Host-preptrack.sid' : 'preptrack.sid',
    secret,
    store,
    resave: false,
    saveUninitialized: false,
    rolling: true,
    // Omitted intentionally: express-session then consults req.secure, which
    // respects only the narrowly configured Express trust-proxy policy.
    genid: (req) => store.generateSidForRequest(req),
    cookie: {
      httpOnly: true,
      secure: production,
      sameSite: 'lax',
      path: '/',
      maxAge: DEFAULT_IDLE_TIMEOUT_MS,
    },
  };
}

function createSessionProvenanceMiddleware(store) {
  if (!store || typeof store.bindGeneratedSession !== 'function') {
    throw new TypeError('A PrepTrack SQLite session store is required.');
  }
  return function bindPrepTrackSessionProvenance(req, res, next) {
    try {
      store.bindGeneratedSession(req);
      next();
    } catch (error) { next(error); }
  };
}

module.exports = { createSessionOptions, createSessionProvenanceMiddleware };
