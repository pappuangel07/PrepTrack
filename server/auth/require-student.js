'use strict';

function requireStudent(req, res, next) {
  const studentId = req.session?.studentId;
  if (!Number.isSafeInteger(studentId) || studentId <= 0) {
    return res.status(401).json({ error: 'Authentication required.' });
  }
  req.student = Object.freeze({ id: studentId });
  return next();
}

module.exports = { requireStudent };
