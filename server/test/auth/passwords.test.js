'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const { hashPassword, validatePassword, verifyPassword } = require('../../auth/passwords');

test('Argon2id hashes verify without storing or exposing plaintext', async () => {
  const password = 'long, random test password';
  const encoded = await hashPassword(password);
  assert.match(encoded, /^\$argon2id\$/);
  assert.notEqual(encoded, password);
  assert.equal(await verifyPassword(encoded, password), true);
  assert.equal(await verifyPassword(encoded, 'a different password'), false);
  assert.equal(await verifyPassword('malformed hash', password), false);
});

test('password validation enforces minimum length and byte ceiling', () => {
  assert.throws(() => validatePassword('short'), /at least 12 Unicode code points/);
  assert.throws(() => validatePassword('é'.repeat(600)), /UTF-8 bytes/);
  assert.throws(() => validatePassword(null), /must be a string/);
  assert.doesNotThrow(() => validatePassword('a sufficiently long test password'));
});

test('minimum length counts Unicode code points and accepts exactly 12', () => {
  assert.throws(() => validatePassword('a'.repeat(11)), /12 Unicode code points/);
  assert.doesNotThrow(() => validatePassword('a'.repeat(12)));
  assert.throws(() => validatePassword('😀'.repeat(11)), /12 Unicode code points/);
  assert.doesNotThrow(() => validatePassword('😀'.repeat(12)));
  assert.doesNotThrow(() => validatePassword('é'.repeat(12)));
});

test('hashing and verification enforce the 1,024-byte UTF-8 boundary', async () => {
  const atLimit = '😀'.repeat(256);
  assert.equal(Buffer.byteLength(atLimit), 1024);
  assert.doesNotThrow(() => validatePassword(atLimit));
  const encoded = await hashPassword(atLimit);
  assert.equal(await verifyPassword(encoded, atLimit), true);

  const overLimit = `${atLimit}a`;
  assert.equal(Buffer.byteLength(overLimit), 1025);
  assert.throws(() => validatePassword(overLimit), /1024 UTF-8 bytes/);
  assert.equal(await verifyPassword(encoded, overLimit), false);
});
