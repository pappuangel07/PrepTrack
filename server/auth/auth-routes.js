
'use strict';

const express = require('express');

const { issueCsrfToken } = require('./csrf');
const { bootstrapFirstStudent } = require('./bootstrap-owner');

const {
  DUMMY_PASSWORD_HASH,
  hashPassword,
  validatePassword,
  verifyPassword,
} = require('./passwords');

function createAuthRouter({ db, rateLimiter, env = process.env } = {}) {
  if (!db || !rateLimiter) {
    throw new TypeError('Database and rate limiter are required.');
  }

  const router = express.Router();
  const production = env.NODE_ENV === 'production';
  const cookieName = production
    ? '__Host-preptrack.sid'
    : 'preptrack.sid';

  function checkLimit(options) {
    const result = rateLimiter.consume(options);
    return result.allowed !== false && result.blocked !== true;
  }

  function rateLimitResponse(res) {
    return res.status(429).json({
      error: 'Too many attempts. Please try again later.',
    });
  }

  function regenerateSession(req, studentId) {
    return new Promise((resolve, reject) => {
      req.session.regenerate((error) => {
        if (error) return reject(error);

        req.session.studentId = studentId;
        req.session.csrfToken = undefined;
        issueCsrfToken(req);

        req.session.save((saveError) => {
          if (saveError) return reject(saveError);
          resolve();
        });
      });
    });
  }

  router.post('/register', async (req, res) => {
    const name = typeof req.body?.name === 'string'
      ? req.body.name.trim()
      : '';

    const email = typeof req.body?.email === 'string'
      ? req.body.email.trim().toLowerCase()
      : '';

    const password = req.body?.password;
    const ip = req.ip || req.socket?.remoteAddress || 'unknown';

    if (
      !name ||
      name.length > 100 ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
      email.length > 254
    ) {
      return res.status(400).json({ error: 'Invalid name or email.' });
    }

    try {
      validatePassword(password);
    } catch {
      return res.status(400).json({ error: 'Password does not meet the requirements.' });
    }

    if (!checkLimit({
      scope: 'registration',
      identifier: ip,
      dimension: 'ip',
      limit: 5,
      windowMs: 15 * 60 * 1000,
      blockMs: 15 * 60 * 1000,
    })) {
      return rateLimitResponse(res);
    }

    const existing = db.prepare(
      'SELECT id FROM students WHERE email = ?'
    ).get(email);

    if (existing) {
      return res.status(409).json({ error: 'An account with this email already exists.' });
    }

       const passwordHash = await hashPassword(password);

    let studentId;

    try {
      const createStudentAndBootstrap = db.transaction(() => {
        let result;

        try {
          result = db.prepare(`
            INSERT INTO students (display_name, email, password_hash)
            VALUES (?, ?, ?)
          `).run(name, email, passwordHash);
        } catch (error) {
          if (error.code === 'SQLITE_CONSTRAINT_UNIQUE') {
            return { duplicate: true };
          }

          throw error;
        }

        const newStudentId = Number(result.lastInsertRowid);

        bootstrapFirstStudent(db, newStudentId);

        return {
          duplicate: false,
          studentId: newStudentId,
        };
      });

      const creation = createStudentAndBootstrap.immediate();

      if (creation.duplicate) {
        return res.status(409).json({
          error: 'An account with this email already exists.',
        });
      }

      studentId = creation.studentId;
    } catch (error) {
      throw error;
    }

    await regenerateSession(req, studentId);

    return res.status(201).json({
      student: {
        id: studentId,
        name,
        email,
      },
      csrfToken: req.session.csrfToken,
    });
  });

  router.post('/login', async (req, res) => {
    const email = typeof req.body?.email === 'string'
      ? req.body.email.trim().toLowerCase()
      : '';

    const password = req.body?.password;
    const ip = req.ip || req.socket?.remoteAddress || 'unknown';

    if (!email || typeof password !== 'string') {
      return res.status(400).json({ error: 'Email and password are required.' });
    }

    const emailAllowed = checkLimit({
      scope: 'login',
      identifier: email,
      dimension: 'email',
      limit: 10,
      windowMs: 15 * 60 * 1000,
      blockMs: 15 * 60 * 1000,
    });

    const ipAllowed = checkLimit({
      scope: 'login',
      identifier: ip,
      dimension: 'ip',
      limit: 20,
      windowMs: 15 * 60 * 1000,
      blockMs: 15 * 60 * 1000,
    });

    if (!emailAllowed || !ipAllowed) {
      return rateLimitResponse(res);
    }

    const student = db.prepare(`
      SELECT id, display_name, email, password_hash
      FROM students
      WHERE email = ?
    `).get(email);

    const passwordHash = student
  ? student.password_hash
  : DUMMY_PASSWORD_HASH;

const validPassword = await verifyPassword(
  passwordHash,
  password
);

    if (!student || !validPassword) {
      return res.status(401).json({ error: 'Invalid email or password.' });
    }

    await regenerateSession(req, student.id);

    return res.json({
      student: {
        id: student.id,
        name: student.display_name,
        email: student.email,
      },
      csrfToken: req.session.csrfToken,
    });
  });

  router.get('/me', (req, res) => {
    const studentId = req.session?.studentId;

    if (!Number.isSafeInteger(studentId) || studentId <= 0) {
      return res.status(401).json({ error: 'Authentication required.' });
    }

    const student = db.prepare(`
      SELECT id, display_name, email
      FROM students
      WHERE id = ?
    `).get(studentId);

    if (!student) {
      return res.status(401).json({ error: 'Authentication required.' });
    }

    return res.json({
      student: {
        id: student.id,
        name: student.display_name,
        email: student.email,
      },
    });
  });

  router.post('/logout', (req, res, next) => {
    if (!req.session) {
      res.clearCookie(cookieName, { path: '/' });
      return res.json({ message: 'Logged out.' });
    }

    req.session.destroy((error) => {
      if (error) return next(error);

      res.clearCookie(cookieName, {
        path: '/',
        httpOnly: true,
        sameSite: 'lax',
        secure: production,
      });

      return res.json({ message: 'Logged out.' });
    });
  });

  return router;
}

module.exports = { createAuthRouter };
