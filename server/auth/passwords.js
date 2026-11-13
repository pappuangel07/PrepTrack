'use strict';

const argon2 = require('argon2');

const PASSWORD_POLICY = Object.freeze({ minCodePoints: 12, maxBytes: 1024 });
const ARGON2_OPTIONS = Object.freeze({
  type: argon2.argon2id,
  memoryCost: 19_456,
  timeCost: 2,
  parallelism: 1,
  hashLength: 32,
});

function validatePassword(password) {
  if (typeof password !== 'string') throw new TypeError('Password must be a string.');
  const bytes = Buffer.byteLength(password, 'utf8');
  const codePoints = Array.from(password).length;
  if (codePoints < PASSWORD_POLICY.minCodePoints || bytes > PASSWORD_POLICY.maxBytes) {
    throw new RangeError(`Password must contain at least ${PASSWORD_POLICY.minCodePoints} Unicode code points and no more than ${PASSWORD_POLICY.maxBytes} UTF-8 bytes.`);
  }
}

async function hashPassword(password) {
  validatePassword(password);
  return argon2.hash(password, ARGON2_OPTIONS);
}

async function verifyPassword(encodedHash, password) {
  if (typeof encodedHash !== 'string' || typeof password !== 'string') return false;
  if (Buffer.byteLength(password, 'utf8') > PASSWORD_POLICY.maxBytes) return false;
  try {
    return await argon2.verify(encodedHash, password, { type: argon2.argon2id });
  } catch {
    return false;
  }
}

module.exports = { ARGON2_OPTIONS, PASSWORD_POLICY, hashPassword, validatePassword, verifyPassword };
