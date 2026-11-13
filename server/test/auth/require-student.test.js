'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const { requireStudent } = require('../../auth/require-student');

function run(session) {
  const req = { session };
  const result = { statusCode: null, body: null, next: false };
  const res = { status(code) { result.statusCode = code; return this; }, json(body) { result.body = body; return this; } };
  requireStudent(req, res, () => { result.next = true; });
  return { req, result };
}

test('requireStudent accepts only a positive integer from the server-side session', () => {
  const valid = run({ studentId: 42 });
  assert.equal(valid.result.next, true);
  assert.deepEqual(valid.req.student, { id: 42 });
  assert.equal(Object.isFrozen(valid.req.student), true);
  for (const session of [undefined, {}, { studentId: 0 }, { studentId: -1 }, { studentId: '42' }, { studentId: 1.5 }]) {
    const rejected = run(session);
    assert.equal(rejected.result.statusCode, 401);
    assert.equal(rejected.result.next, false);
  }
});
