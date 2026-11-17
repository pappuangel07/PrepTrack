
'use strict';

const Database = require('better-sqlite3');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const http = require('node:http');
const os = require('node:os');
const path = require('node:path');
const test = require('node:test');

const { createApp } = require('../../server.js');
const { createV3 } = require('../support/database-fixtures');

const tempRoot = fs.mkdtempSync(
  path.join(os.tmpdir(), 'preptrack-auth-test-')
);

test.after(() => {
  fs.rmSync(tempRoot, { recursive: true, force: true });
});

function createTestApp(filename) {
  const db = createV3(filename);

  const app = createApp({
    db,
    sessionSecret: 's'.repeat(48),
    rateLimitSecret: 'r'.repeat(48),
    appOrigin: 'http://localhost:5173',
    env: { NODE_ENV: 'test' },
  });

  return { db, app };
}

function startTestServer(app) {
  return new Promise((resolve, reject) => {
    const server = app.listen(0);

    server.once('error', reject);
    server.once('listening', () => resolve(server));
  });
}

function sendRequest(server, {
  method = 'GET',
  pathname = '/',
  headers = {},
  body,
  cookie,
} = {}) {
  return new Promise((resolve, reject) => {
    const requestHeaders = { ...headers };

    if (cookie) {
      requestHeaders.cookie = cookie;
    }

    let requestBody;

    if (body !== undefined) {
      requestBody = JSON.stringify(body);
      requestHeaders['content-type'] = 'application/json';
      requestHeaders['content-length'] = Buffer.byteLength(requestBody);
    }

    const request = http.request({
      hostname: 'localhost',
      port: server.address().port,
      method,
      path: pathname,
      headers: requestHeaders,
    }, (response) => {
      let responseBody = '';

      response.setEncoding('utf8');
      response.on('data', (chunk) => {
        responseBody += chunk;
      });

      response.on('end', () => {
        let parsedBody;

        try {
          parsedBody = responseBody ? JSON.parse(responseBody) : null;
        } catch {
          parsedBody = responseBody;
        }

        const cookies = response.headers['set-cookie'] || [];

        resolve({
          status: response.statusCode,
          body: parsedBody,
          headers: response.headers,
          cookies: cookies.map((value) => value.split(';')[0]),
        });
      });
    });

    request.on('error', reject);

    if (requestBody !== undefined) {
      request.write(requestBody);
    }

    request.end();
  });
}

function cookieHeader(response) {
  return response.cookies.join('; ');
}


test('CSRF endpoint issues a token and an HttpOnly session cookie', async (t) => {
  const fixture = createTestApp(
    path.join(tempRoot, 'csrf-token.db')
  );

  t.after(() => fixture.db.close());

  const server = await startTestServer(fixture.app);
  t.after(() => new Promise((resolve) => {
    server.close(resolve);
  }));

  const response = await sendRequest(server, {
    method: 'GET',
    pathname: '/api/csrf-token',
  });

  assert.equal(response.status, 200);
  assert.equal(typeof response.body.csrfToken, 'string');
  assert.match(response.body.csrfToken, /^[A-Za-z0-9_-]{43}$/);

  assert.equal(response.cookies.length > 0, true);

  const sessionCookie = response.headers['set-cookie'].find(
    (cookie) => cookie.startsWith('preptrack.sid=')
  );

  assert.ok(sessionCookie, 'session cookie should be issued');
  assert.match(sessionCookie, /HttpOnly/i);
  assert.match(sessionCookie, /SameSite=Lax/i);
  assert.match(sessionCookie, /Path=\//i);
  assert.doesNotMatch(sessionCookie, /Secure/i);
});


test('personal data endpoints reject unauthenticated requests', async (t) => {
  const fixture = createTestApp(
    path.join(tempRoot, 'unauthenticated.db')
  );

  t.after(() => fixture.db.close());

  const server = await startTestServer(fixture.app);
  t.after(() => new Promise((resolve) => {
    server.close(resolve);
  }));

  const endpoints = [
    '/api/tasks',
    '/api/notes',
    '/api/bookmarks',
    '/api/study-sessions',
    '/api/pomodoro-sessions',
    '/api/study-streak',
  ];

  for (const pathname of endpoints) {
    const response = await sendRequest(server, { pathname });

    assert.equal(
      response.status,
      401,
      `${pathname} should reject unauthenticated requests`
    );
  }
});


test('registration rejects requests without a CSRF token', async (t) => {
  const fixture = createTestApp(
    path.join(tempRoot, 'registration-csrf.db')
  );

  t.after(() => fixture.db.close());

  const server = await startTestServer(fixture.app);
  t.after(() => new Promise((resolve) => {
    server.close(resolve);
  }));

  const csrfResponse = await sendRequest(server, {
    method: 'GET',
    pathname: '/api/csrf-token',
  });

  assert.equal(csrfResponse.status, 200);

  const response = await sendRequest(server, {
    method: 'POST',
    pathname: '/api/auth/register',
    headers: {
      Origin: 'http://localhost:5173',
    },
    cookie: cookieHeader(csrfResponse),
    body: {
      name: 'Test Student',
      email: 'student@example.com',
      password: 'StrongPassword123!',
    },
  });

  assert.equal(response.status, 403);
});


test('registration rejects requests from an untrusted origin', async (t) => {
  const fixture = createTestApp(
    path.join(tempRoot, 'registration-origin.db')
  );

  t.after(() => fixture.db.close());

  const server = await startTestServer(fixture.app);
  t.after(() => new Promise((resolve) => {
    server.close(resolve);
  }));

  const csrfResponse = await sendRequest(server, {
    method: 'GET',
    pathname: '/api/csrf-token',
  });

  assert.equal(csrfResponse.status, 200);

  const response = await sendRequest(server, {
    method: 'POST',
    pathname: '/api/auth/register',
    headers: {
      Origin: 'https://attacker.example',
      'x-csrf-token': csrfResponse.body.csrfToken,
    },
    cookie: cookieHeader(csrfResponse),
    body: {
      name: 'Test Student',
      email: 'student@example.com',
      password: 'StrongPassword123!',
    },
  });

  assert.equal(response.status, 403);
});


test('login rejects requests without a CSRF token', async (t) => {
  const fixture = createTestApp(
    path.join(tempRoot, 'login-csrf.db')
  );

  t.after(() => fixture.db.close());

  const server = await startTestServer(fixture.app);
  t.after(() => new Promise((resolve) => {
    server.close(resolve);
  }));

  const csrfResponse = await sendRequest(server, {
    method: 'GET',
    pathname: '/api/csrf-token',
  });

  assert.equal(csrfResponse.status, 200);

  const response = await sendRequest(server, {
    method: 'POST',
    pathname: '/api/auth/login',
    headers: {
      Origin: 'http://localhost:5173',
    },
    cookie: cookieHeader(csrfResponse),
    body: {
      email: 'student@example.com',
      password: 'StrongPassword123!',
    },
  });

  assert.equal(response.status, 403);
});


test('login rejects requests from an untrusted origin', async (t) => {
  const fixture = createTestApp(
    path.join(tempRoot, 'login-origin.db')
  );

  t.after(() => fixture.db.close());

  const server = await startTestServer(fixture.app);
  t.after(() => new Promise((resolve) => {
    server.close(resolve);
  }));

  const csrfResponse = await sendRequest(server, {
    method: 'GET',
    pathname: '/api/csrf-token',
  });

  assert.equal(csrfResponse.status, 200);

  const response = await sendRequest(server, {
    method: 'POST',
    pathname: '/api/auth/login',
    headers: {
      Origin: 'https://attacker.example',
      'x-csrf-token': csrfResponse.body.csrfToken,
    },
    cookie: cookieHeader(csrfResponse),
    body: {
      email: 'student@example.com',
      password: 'StrongPassword123!',
    },
  });

  assert.equal(response.status, 403);
});


test('registration creates a student with valid CSRF protection', async (t) => {
  const fixture = createTestApp(
    path.join(tempRoot, 'registration-success.db')
  );

  t.after(() => fixture.db.close());

  const server = await startTestServer(fixture.app);
  t.after(() => new Promise((resolve) => {
    server.close(resolve);
  }));

  const csrfResponse = await sendRequest(server, {
    method: 'GET',
    pathname: '/api/csrf-token',
  });

  assert.equal(csrfResponse.status, 200);

  const response = await sendRequest(server, {
    method: 'POST',
    pathname: '/api/auth/register',
    headers: {
      Origin: 'http://localhost:5173',
      'x-csrf-token': csrfResponse.body.csrfToken,
    },
    cookie: cookieHeader(csrfResponse),
    body: {
      name: 'Test Student',
      email: 'newstudent@example.com',
      password: 'StrongPassword123!',
    },
  });

  assert.equal(response.status, 201);
  assert.equal(response.body.student.email, 'newstudent@example.com');
  assert.equal(response.body.student.name, 'Test Student');
  assert.equal('password' in response.body.student, false);
  assert.equal('password_hash' in response.body.student, false);
});


test('registration rejects passwords shorter than 12 characters', async (t) => {
  const fixture = createTestApp(
    path.join(tempRoot, 'registration-weak-password.db')
  );

  t.after(() => fixture.db.close());

  const server = await startTestServer(fixture.app);
  t.after(() => new Promise((resolve) => {
    server.close(resolve);
  }));

  const csrfResponse = await sendRequest(server, {
    method: 'GET',
    pathname: '/api/csrf-token',
  });

  assert.equal(csrfResponse.status, 200);

  const response = await sendRequest(server, {
    method: 'POST',
    pathname: '/api/auth/register',
    headers: {
      Origin: 'http://localhost:5173',
      'x-csrf-token': csrfResponse.body.csrfToken,
    },
    cookie: cookieHeader(csrfResponse),
    body: {
      name: 'Test Student',
      email: 'weakpassword@example.com',
      password: 'weak123',
    },
  });

  assert.equal(response.status, 400);
});


test('registration rejects an email that is already registered', async (t) => {
  const fixture = createTestApp(
    path.join(tempRoot, 'registration-duplicate-email.db')
  );

  t.after(() => fixture.db.close());

  const server = await startTestServer(fixture.app);
  t.after(() => new Promise((resolve) => {
    server.close(resolve);
  }));

  // First browser session
  const firstCsrf = await sendRequest(server, {
    method: 'GET',
    pathname: '/api/csrf-token',
  });

  const firstResponse = await sendRequest(server, {
    method: 'POST',
    pathname: '/api/auth/register',
    headers: {
      Origin: 'http://localhost:5173',
      'x-csrf-token': firstCsrf.body.csrfToken,
    },
    cookie: cookieHeader(firstCsrf),
    body: {
      name: 'First Student',
      email: 'duplicate@example.com',
      password: 'StrongPassword123!',
    },
  });

  assert.equal(firstResponse.status, 201);

  // Second browser session, with a fresh anonymous session and CSRF token
  const secondCsrf = await sendRequest(server, {
    method: 'GET',
    pathname: '/api/csrf-token',
  });

  const secondResponse = await sendRequest(server, {
    method: 'POST',
    pathname: '/api/auth/register',
    headers: {
      Origin: 'http://localhost:5173',
      'x-csrf-token': secondCsrf.body.csrfToken,
    },
    cookie: cookieHeader(secondCsrf),
    body: {
      name: 'Second Student',
      email: 'duplicate@example.com',
      password: 'StrongPassword123!',
    },
  });

  assert.equal(secondResponse.status, 409);
});


test('registration regenerates the session ID', async (t) => {
  const fixture = createTestApp(
    path.join(tempRoot, 'registration-session-rotation.db')
  );

  t.after(() => fixture.db.close());

  const server = await startTestServer(fixture.app);
  t.after(() => new Promise((resolve) => {
    server.close(resolve);
  }));

  const csrfResponse = await sendRequest(server, {
    method: 'GET',
    pathname: '/api/csrf-token',
  });

  assert.equal(csrfResponse.status, 200);

  const oldCookie = cookieHeader(csrfResponse);

  const response = await sendRequest(server, {
    method: 'POST',
    pathname: '/api/auth/register',
    headers: {
      Origin: 'http://localhost:5173',
      'x-csrf-token': csrfResponse.body.csrfToken,
    },
    cookie: oldCookie,
    body: {
      name: 'Test Student',
      email: 'rotation@example.com',
      password: 'StrongPassword123!',
    },
  });

  assert.equal(response.status, 201);

  const newCookie = cookieHeader(response);

  assert.notEqual(
    newCookie,
    oldCookie,
    'registration should issue a new session cookie'
  );
});


test('registration invalidates the previous anonymous session', async (t) => {
  const fixture = createTestApp(
    path.join(tempRoot, 'registration-old-session.db')
  );

  t.after(() => fixture.db.close());

  const server = await startTestServer(fixture.app);
  t.after(() => new Promise((resolve) => {
    server.close(resolve);
  }));

  const csrfResponse = await sendRequest(server, {
    method: 'GET',
    pathname: '/api/csrf-token',
  });

  assert.equal(csrfResponse.status, 200);

  const oldCookie = cookieHeader(csrfResponse);

  const registrationResponse = await sendRequest(server, {
    method: 'POST',
    pathname: '/api/auth/register',
    headers: {
      Origin: 'http://localhost:5173',
      'x-csrf-token': csrfResponse.body.csrfToken,
    },
    cookie: oldCookie,
    body: {
      name: 'Test Student',
      email: 'oldsession@example.com',
      password: 'StrongPassword123!',
    },
  });

  assert.equal(registrationResponse.status, 201);

  const oldSessionResponse = await sendRequest(server, {
    method: 'GET',
    pathname: '/api/tasks',
    cookie: oldCookie,
  });

  assert.equal(oldSessionResponse.status, 401);
});


test('registration invalidates the previous CSRF token', async (t) => {
  const fixture = createTestApp(
    path.join(tempRoot, 'registration-csrf-rotation.db')
  );

  t.after(() => fixture.db.close());

  const server = await startTestServer(fixture.app);
  t.after(() => new Promise((resolve) => {
    server.close(resolve);
  }));

  const initialCsrfResponse = await sendRequest(server, {
    method: 'GET',
    pathname: '/api/csrf-token',
  });

  assert.equal(initialCsrfResponse.status, 200);

  const registrationResponse = await sendRequest(server, {
    method: 'POST',
    pathname: '/api/auth/register',
    headers: {
      Origin: 'http://localhost:5173',
      'x-csrf-token': initialCsrfResponse.body.csrfToken,
    },
    cookie: cookieHeader(initialCsrfResponse),
    body: {
      name: 'Test Student',
      email: 'csrfrotation@example.com',
      password: 'StrongPassword123!',
    },
  });

  assert.equal(registrationResponse.status, 201);

  // Try using the old CSRF token with the new session.
  const oldTokenResponse = await sendRequest(server, {
    method: 'POST',
    pathname: '/api/auth/login',
    headers: {
      Origin: 'http://localhost:5173',
      'x-csrf-token': initialCsrfResponse.body.csrfToken,
    },
    cookie: cookieHeader(registrationResponse),
    body: {
      email: 'csrfrotation@example.com',
      password: 'StrongPassword123!',
    },
  });

  assert.equal(oldTokenResponse.status, 403);
});


test('students cannot access or modify another student tasks', async (t) => {
  const fixture = createTestApp(
    path.join(tempRoot, 'student-task-isolation.db')
  );

  t.after(() => fixture.db.close());

  const server = await startTestServer(fixture.app);

  t.after(() => new Promise((resolve) => {
    server.close(resolve);
  }));

  async function registerStudent(name, email) {
    const csrfResponse = await sendRequest(server, {
      method: 'GET',
      pathname: '/api/csrf-token',
    });

    assert.equal(csrfResponse.status, 200);

    const registrationResponse = await sendRequest(server, {
      method: 'POST',
      pathname: '/api/auth/register',
      headers: {
        Origin: 'http://localhost:5173',
        'x-csrf-token': csrfResponse.body.csrfToken,
      },
      cookie: cookieHeader(csrfResponse),
      body: {
        name,
        email,
        password: 'StrongPassword123!',
      },
    });

    assert.equal(registrationResponse.status, 201);

    return {
      cookie: cookieHeader(registrationResponse),
      csrfToken: registrationResponse.body.csrfToken,
    };
  }

  const studentA = await registerStudent(
    'Student A',
    'student-a-isolation@example.com'
  );

  const studentB = await registerStudent(
    'Student B',
    'student-b-isolation@example.com'
  );

  // Student A creates a task.
  const createResponse = await sendRequest(server, {
    method: 'POST',
    pathname: '/api/tasks',
    headers: {
      Origin: 'http://localhost:5173',
      'x-csrf-token': studentA.csrfToken,
    },
    cookie: studentA.cookie,
    body: {
      title: 'Student A private task',
      description: 'This task belongs only to Student A.',
      priority: 'High',
    },
  });

  assert.equal(createResponse.status, 201);

  const taskId = createResponse.body.task.id;

  // Student B must not see Student A's task.
  const studentBTasks = await sendRequest(server, {
    pathname: '/api/tasks',
    cookie: studentB.cookie,
  });

  assert.equal(studentBTasks.status, 200);
  assert.deepEqual(studentBTasks.body, []);

  // Student B must not be able to edit Student A's task.
  const editResponse = await sendRequest(server, {
    method: 'PATCH',
    pathname: `/api/tasks/${taskId}`,
    headers: {
      Origin: 'http://localhost:5173',
      'x-csrf-token': studentB.csrfToken,
    },
    cookie: studentB.cookie,
    body: {
      title: 'Unauthorized edit',
    },
  });

  assert.equal(editResponse.status, 404);

  // Student B must not be able to delete Student A's task.
  const deleteResponse = await sendRequest(server, {
    method: 'DELETE',
    pathname: `/api/tasks/${taskId}`,
    headers: {
      Origin: 'http://localhost:5173',
      'x-csrf-token': studentB.csrfToken,
    },
    cookie: studentB.cookie,
  });

  assert.equal(deleteResponse.status, 404);

  // Student A must still own and see the original task.
  const studentATasks = await sendRequest(server, {
    pathname: '/api/tasks',
    cookie: studentA.cookie,
  });

  assert.equal(studentATasks.status, 200);
  assert.equal(studentATasks.body.length, 1);
  assert.equal(studentATasks.body[0].title, 'Student A private task');

  // Student A deletes the task.
  const ownerDeleteResponse = await sendRequest(server, {
    method: 'DELETE',
    pathname: `/api/tasks/${taskId}`,
    headers: {
      Origin: 'http://localhost:5173',
      'x-csrf-token': studentA.csrfToken,
    },
    cookie: studentA.cookie,
  });

  assert.equal(ownerDeleteResponse.status, 200);

  // Student B must not restore Student A's deleted task.
  const restoreResponse = await sendRequest(server, {
    method: 'PATCH',
    pathname: `/api/tasks/${taskId}/restore`,
    headers: {
      Origin: 'http://localhost:5173',
      'x-csrf-token': studentB.csrfToken,
    },
    cookie: studentB.cookie,
  });

  assert.equal(restoreResponse.status, 404);

  // Student A can still restore their own task.
  const ownerRestoreResponse = await sendRequest(server, {
    method: 'PATCH',
    pathname: `/api/tasks/${taskId}/restore`,
    headers: {
      Origin: 'http://localhost:5173',
      'x-csrf-token': studentA.csrfToken,
    },
    cookie: studentA.cookie,
  });

  assert.equal(ownerRestoreResponse.status, 200);
  assert.equal(
    ownerRestoreResponse.body.task.title,
    'Student A private task'
  );
});



test('students cannot access or modify another student study sessions', async (t) => {
  const fixture = createTestApp(
    path.join(tempRoot, 'student-study-session-isolation.db')
  );

  t.after(() => fixture.db.close());

  const server = await startTestServer(fixture.app);

  t.after(() => new Promise((resolve) => {
    server.close(resolve);
  }));

  async function registerStudent(name, email) {
    const csrfResponse = await sendRequest(server, {
      method: 'GET',
      pathname: '/api/csrf-token',
    });

    assert.equal(csrfResponse.status, 200);

    const registrationResponse = await sendRequest(server, {
      method: 'POST',
      pathname: '/api/auth/register',
      headers: {
        Origin: 'http://localhost:5173',
        'x-csrf-token': csrfResponse.body.csrfToken,
      },
      cookie: cookieHeader(csrfResponse),
      body: {
        name,
        email,
        password: 'StrongPassword123!',
      },
    });

    assert.equal(registrationResponse.status, 201);

    return {
      cookie: cookieHeader(registrationResponse),
      csrfToken: registrationResponse.body.csrfToken,
    };
  }

  const studentA = await registerStudent(
    'Student A',
    'study-session-a@example.com'
  );

  const studentB = await registerStudent(
    'Student B',
    'study-session-b@example.com'
  );

  // Student A creates a study session.
  const createResponse = await sendRequest(server, {
    method: 'POST',
    pathname: '/api/study-sessions',
    headers: {
      Origin: 'http://localhost:5173',
      'x-csrf-token': studentA.csrfToken,
    },
    cookie: studentA.cookie,
    body: {
      subject: 'Java',
      topic: 'OOP concepts',
      study_date: '2026-11-14',
      start_time: '10:00',
      duration_minutes: 45,
    },
  });

  assert.equal(createResponse.status, 201);
  assert.equal(createResponse.body.session.topic, 'OOP concepts');

  const sessionId = createResponse.body.session.id;

  // Student B must not see Student A's study session.
  const studentBSessions = await sendRequest(server, {
    pathname: '/api/study-sessions',
    cookie: studentB.cookie,
  });

  assert.equal(studentBSessions.status, 200);
  assert.deepEqual(studentBSessions.body, []);

  // Student B must not update Student A's study session.
  const updateResponse = await sendRequest(server, {
    method: 'PATCH',
    pathname: `/api/study-sessions/${sessionId}`,
    headers: {
      Origin: 'http://localhost:5173',
      'x-csrf-token': studentB.csrfToken,
    },
    cookie: studentB.cookie,
    body: {
      topic: 'Modified by Student B',
    },
  });

  assert.equal(updateResponse.status, 404);

  // Student B must not delete Student A's study session.
  const deleteResponse = await sendRequest(server, {
    method: 'DELETE',
    pathname: `/api/study-sessions/${sessionId}`,
    headers: {
      Origin: 'http://localhost:5173',
      'x-csrf-token': studentB.csrfToken,
    },
    cookie: studentB.cookie,
  });

  assert.equal(deleteResponse.status, 404);

  // Student A must still see the original, unchanged study session.
  const studentASessions = await sendRequest(server, {
    pathname: '/api/study-sessions',
    cookie: studentA.cookie,
  });

  assert.equal(studentASessions.status, 200);
  assert.equal(studentASessions.body.length, 1);
  assert.equal(studentASessions.body[0].id, sessionId);
  assert.equal(studentASessions.body[0].topic, 'OOP concepts');
});


test('study streak counts only valid completed dates belonging to the student', async (t) => {
  const fixture = createTestApp(
    path.join(tempRoot, 'study-streak-validation.db')
  );

  t.after(() => fixture.db.close());

  const server = await startTestServer(fixture.app);

  t.after(() => new Promise((resolve) => {
    server.close(resolve);
  }));

  async function registerStudent(name, email) {
    const csrfResponse = await sendRequest(server, {
      method: 'GET',
      pathname: '/api/csrf-token',
    });

    assert.equal(csrfResponse.status, 200);

    const registrationResponse = await sendRequest(server, {
      method: 'POST',
      pathname: '/api/auth/register',
      headers: {
        Origin: 'http://localhost:5173',
        'x-csrf-token': csrfResponse.body.csrfToken,
      },
      cookie: cookieHeader(csrfResponse),
      body: {
        name,
        email,
        password: 'StrongPassword123!',
      },
    });

    assert.equal(registrationResponse.status, 201);

    return {
      cookie: cookieHeader(registrationResponse),
      csrfToken: registrationResponse.body.csrfToken,
    };
  }

  const studentA = await registerStudent(
    'Streak Student A',
    'streak-student-a@example.com'
  );

  const studentB = await registerStudent(
    'Streak Student B',
    'streak-student-b@example.com'
  );

  const studentAId = fixture.db
    .prepare('SELECT id FROM students WHERE email = ?')
    .get('streak-student-a@example.com').id;

  const studentBId = fixture.db
    .prepare('SELECT id FROM students WHERE email = ?')
    .get('streak-student-b@example.com').id;

  const today = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Asia/Kolkata',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(new Date());

  function dateOffset(days) {
    const date = new Date(`${today}T00:00:00.000Z`);
    date.setUTCDate(date.getUTCDate() + days);
    return date.toISOString().slice(0, 10);
  }

  const insertSession = fixture.db.prepare(`
    INSERT INTO study_sessions (
      student_id,
      subject,
      topic,
      study_date,
      start_time,
      duration_minutes,
      completed
    )
    VALUES (?, 'Java', 'Test topic', ?, '10:00', 30, ?)
  `);

  // Valid completed study dates.
  for (const date of [
    dateOffset(-2),
    dateOffset(-1),
    today,
  ]) {
    insertSession.run(studentAId, date, 1);
  }

  // Future and invalid dates must not count.
  insertSession.run(studentAId, dateOffset(1), 1);
  insertSession.run(studentAId, '2026-02-31', 1);
  insertSession.run(studentAId, '2020-99-99', 1);

  // Incomplete sessions must not count.
  insertSession.run(studentAId, dateOffset(-10), 0);

  // Another student's session must not count.
  insertSession.run(studentBId, today, 1);

  const response = await sendRequest(server, {
    pathname: '/api/study-streak',
    cookie: studentA.cookie,
  });

  assert.equal(response.status, 200);

  assert.deepEqual(response.body, {
    currentStreak: 3,
    longestStreak: 3,
    totalStudyDays: 3,
    studiedToday: true,
    studyDates: [
      dateOffset(-2),
      dateOffset(-1),
      today,
    ],
  });
});


test('students have isolated roadmap and topic progress', async (t) => {
  const fixture = createTestApp(
    path.join(tempRoot, 'student-progress-isolation.db')
  );

  t.after(() => fixture.db.close());

  const server = await startTestServer(fixture.app);

  t.after(() => new Promise((resolve) => {
    server.close(resolve);
  }));

  async function registerStudent(name, email) {
    const csrfResponse = await sendRequest(server, {
      method: 'GET',
      pathname: '/api/csrf-token',
    });

    assert.equal(csrfResponse.status, 200);

    const registrationResponse = await sendRequest(server, {
      method: 'POST',
      pathname: '/api/auth/register',
      headers: {
        Origin: 'http://localhost:5173',
        'x-csrf-token': csrfResponse.body.csrfToken,
      },
      cookie: cookieHeader(csrfResponse),
      body: {
        name,
        email,
        password: 'StrongPassword123!',
      },
    });

    assert.equal(registrationResponse.status, 201);

    return {
      cookie: cookieHeader(registrationResponse),
      csrfToken: registrationResponse.body.csrfToken,
    };
  }

  const studentA = await registerStudent(
    'Progress Student A',
    'progress-student-a@example.com'
  );

  const studentB = await registerStudent(
    'Progress Student B',
    'progress-student-b@example.com'
  );

  const progressEndpoints = [
    '/api/roadmap',
    '/api/java-topics',
    '/api/dsa-topics',
    '/api/aptitude-topics',
  ];

  // Student A marks the seeded topic/roadmap as Completed.
  for (const endpoint of progressEndpoints) {
    const response = await sendRequest(server, {
      method: 'PATCH',
      pathname: `${endpoint}/1`,
      headers: {
        Origin: 'http://localhost:5173',
        'x-csrf-token': studentA.csrfToken,
      },
      cookie: studentA.cookie,
      body: {
        status: 'Completed',
      },
    });

    assert.equal(
      response.status,
      200,
      `Student A should update ${endpoint}`
    );
  }

  // Student A should see their own Completed progress.
  for (const endpoint of progressEndpoints) {
    const response = await sendRequest(server, {
      pathname: endpoint,
      cookie: studentA.cookie,
    });

    assert.equal(response.status, 200);
    assert.equal(
      response.body.find((item) => item.id === 1)?.status,
      'Completed',
      `Student A should see Completed status for ${endpoint}`
    );
  }

  // Student B must still see the default Not Started status.
  for (const endpoint of progressEndpoints) {
    const response = await sendRequest(server, {
      pathname: endpoint,
      cookie: studentB.cookie,
    });

    assert.equal(response.status, 200);
    assert.equal(
      response.body.find((item) => item.id === 1)?.status,
      'Not Started',
      `Student B should not see Student A's progress for ${endpoint}`
    );
  }

  // Shared base topic rows must remain unchanged.
  const baseTables = [
    'roadmap',
    'java_topics',
    'dsa_topics',
    'aptitude_topics',
  ];

  for (const table of baseTables) {
    const row = fixture.db.prepare(
      `SELECT status FROM "${table}" WHERE id = 1`
    ).get();

    assert.equal(
      row.status,
      'Not Started',
      `${table} base status must not be changed`
    );
  }
});


test('registration rolls back student creation when bootstrap fails', async (t) => {
  const fixture = createTestApp(
    path.join(tempRoot, 'registration-bootstrap-rollback.db')
  );

  t.after(() => fixture.db.close());

  const server = await startTestServer(fixture.app);
  t.after(() => new Promise((resolve) => {
    server.close(resolve);
  }));

  // Inject a failure at the final bootstrap step.
  // This is added after app startup so schema readiness is unaffected.
  fixture.db.exec(`
    CREATE TRIGGER fail_bootstrap_marker
    BEFORE INSERT ON bootstrap_state
    BEGIN
      SELECT RAISE(ABORT, 'Injected bootstrap failure');
    END;
  `);

  const csrfResponse = await sendRequest(server, {
    method: 'GET',
    pathname: '/api/csrf-token',
  });

  assert.equal(csrfResponse.status, 200);

  const response = await sendRequest(server, {
    method: 'POST',
    pathname: '/api/auth/register',
    headers: {
      Origin: 'http://localhost:5173',
      'x-csrf-token': csrfResponse.body.csrfToken,
    },
    cookie: cookieHeader(csrfResponse),
    body: {
      name: 'Rollback Student',
      email: 'rollback@example.com',
      password: 'StrongPassword123!',
    },
  });

  assert.equal(response.status, 500);

  const studentCount = fixture.db.prepare(
    'SELECT COUNT(*) AS total FROM students'
  ).get().total;

  const bootstrapCount = fixture.db.prepare(
    'SELECT COUNT(*) AS total FROM bootstrap_state'
  ).get().total;

  assert.equal(studentCount, 0, 'student insertion must roll back');
  assert.equal(bootstrapCount, 0, 'bootstrap marker must not remain');
});


test('concurrent registrations assign legacy data to exactly one first student', async (t) => {
  const filename = path.join(tempRoot, 'registration-concurrent.db');

  // Two independent SQLite connections to the same database.
  const first = createTestApp(filename);
  const secondDb = new Database(filename);

  const secondApp = createApp({
    db: secondDb,
    sessionSecret: 's'.repeat(48),
    rateLimitSecret: 'r'.repeat(48),
    appOrigin: 'http://localhost:5173',
    env: { NODE_ENV: 'test' },
  });

  t.after(() => {
    first.db.close();
    secondDb.close();
  });

  // Simulate data created before the first student registers.
  first.db.prepare(`
    INSERT INTO tasks (title, description)
    VALUES ('Legacy task', 'Must belong to the first student')
  `).run();

  const firstServer = await startTestServer(first.app);
  const secondServer = await startTestServer(secondApp);

  t.after(() => Promise.all([
    new Promise((resolve) => firstServer.close(resolve)),
    new Promise((resolve) => secondServer.close(resolve)),
  ]));

  // Give each independent browser session its own CSRF token.
  const [firstCsrf, secondCsrf] = await Promise.all([
    sendRequest(firstServer, {
      method: 'GET',
      pathname: '/api/csrf-token',
    }),
    sendRequest(secondServer, {
      method: 'GET',
      pathname: '/api/csrf-token',
    }),
  ]);

  assert.equal(firstCsrf.status, 200);
  assert.equal(secondCsrf.status, 200);

  // Start both registrations concurrently.
  const [firstResponse, secondResponse] = await Promise.all([
    sendRequest(firstServer, {
      method: 'POST',
      pathname: '/api/auth/register',
      headers: {
        Origin: 'http://localhost:5173',
        'x-csrf-token': firstCsrf.body.csrfToken,
      },
      cookie: cookieHeader(firstCsrf),
      body: {
        name: 'First Concurrent Student',
        email: 'first-concurrent@example.com',
        password: 'StrongPassword123!',
      },
    }),
    sendRequest(secondServer, {
      method: 'POST',
      pathname: '/api/auth/register',
      headers: {
        Origin: 'http://localhost:5173',
        'x-csrf-token': secondCsrf.body.csrfToken,
      },
      cookie: cookieHeader(secondCsrf),
      body: {
        name: 'Second Concurrent Student',
        email: 'second-concurrent@example.com',
        password: 'StrongPassword123!',
      },
    }),
  ]);

  assert.equal(firstResponse.status, 201);
  assert.equal(secondResponse.status, 201);

  const students = first.db.prepare(
    'SELECT id FROM students ORDER BY id'
  ).all();

  assert.equal(students.length, 2);

  const bootstrap = first.db.prepare(`
    SELECT owner_student_id
    FROM bootstrap_state
    WHERE singleton = 1
  `).get();

  assert.ok(bootstrap, 'bootstrap marker must exist');

  const studentIds = students.map((student) => student.id);

  assert.ok(
    studentIds.includes(bootstrap.owner_student_id),
    'bootstrap owner must be one of the registered students'
  );

  const legacyTask = first.db.prepare(`
    SELECT student_id
    FROM tasks
    WHERE title = 'Legacy task'
  `).get();

  assert.equal(
    legacyTask.student_id,
    bootstrap.owner_student_id,
    'legacy task must belong to the bootstrap owner'
  );

  const unassignedTasks = first.db.prepare(
    'SELECT COUNT(*) AS total FROM tasks WHERE student_id IS NULL'
  ).get().total;

  assert.equal(unassignedTasks, 0);
});


test('login, me, and logout complete the authentication lifecycle', async (t) => {
  const fixture = createTestApp(
    path.join(tempRoot, 'auth-lifecycle.db')
  );

  t.after(() => fixture.db.close());

  const server = await startTestServer(fixture.app);

  t.after(() => new Promise((resolve) => {
    server.close(resolve);
  }));

  const credentials = {
    name: 'Lifecycle Student',
    email: 'lifecycle@example.com',
    password: 'StrongPassword123!',
  };

  // Register the student to create an account.
  const registrationCsrf = await sendRequest(server, {
    method: 'GET',
    pathname: '/api/csrf-token',
  });

  assert.equal(registrationCsrf.status, 200);

  const registration = await sendRequest(server, {
    method: 'POST',
    pathname: '/api/auth/register',
    headers: {
      Origin: 'http://localhost:5173',
      'x-csrf-token': registrationCsrf.body.csrfToken,
    },
    cookie: cookieHeader(registrationCsrf),
    body: credentials,
  });

  assert.equal(registration.status, 201);

  // Start a separate anonymous browser session for login.
  const loginCsrf = await sendRequest(server, {
    method: 'GET',
    pathname: '/api/csrf-token',
  });

  assert.equal(loginCsrf.status, 200);

  const anonymousCookie = cookieHeader(loginCsrf);

  // Log in with the registered credentials.
  const login = await sendRequest(server, {
    method: 'POST',
    pathname: '/api/auth/login',
    headers: {
      Origin: 'http://localhost:5173',
      'x-csrf-token': loginCsrf.body.csrfToken,
    },
    cookie: anonymousCookie,
    body: {
      email: credentials.email,
      password: credentials.password,
    },
  });

  assert.equal(login.status, 200);
  assert.equal(login.body.student.email, credentials.email);
  assert.equal(login.body.student.name, credentials.name);
  assert.equal(typeof login.body.csrfToken, 'string');
  assert.notEqual(
    cookieHeader(login),
    anonymousCookie,
    'login must regenerate the session cookie'
  );

  assert.equal('password' in login.body.student, false);
  assert.equal('password_hash' in login.body.student, false);

  const authenticatedCookie = cookieHeader(login);

  // Verify the authenticated user's profile.
  const me = await sendRequest(server, {
    pathname: '/api/auth/me',
    cookie: authenticatedCookie,
  });

  assert.equal(me.status, 200);
  assert.deepEqual(me.body.student, login.body.student);

  // Log out using the authenticated session and its fresh CSRF token.
  const logout = await sendRequest(server, {
    method: 'POST',
    pathname: '/api/auth/logout',
    headers: {
      Origin: 'http://localhost:5173',
      'x-csrf-token': login.body.csrfToken,
    },
    cookie: authenticatedCookie,
  });

  assert.equal(logout.status, 200);
  assert.equal(logout.body.message, 'Logged out.');

  // The old authenticated session must no longer work.
  const meAfterLogout = await sendRequest(server, {
    pathname: '/api/auth/me',
    cookie: authenticatedCookie,
  });

  assert.equal(meAfterLogout.status, 401);
});


test('failed login gives identical errors and does not authenticate the session', async (t) => {
  const fixture = createTestApp(
    path.join(tempRoot, 'failed-login.db')
  );

  t.after(() => fixture.db.close());

  const server = await startTestServer(fixture.app);

  t.after(() => new Promise((resolve) => {
    server.close(resolve);
  }));

  const csrf = await sendRequest(server, {
    method: 'GET',
    pathname: '/api/csrf-token',
  });

  assert.equal(csrf.status, 200);

  const cookie = cookieHeader(csrf);

  // Create a real account first.
  const registration = await sendRequest(server, {
    method: 'POST',
    pathname: '/api/auth/register',
    headers: {
      Origin: 'http://localhost:5173',
      'x-csrf-token': csrf.body.csrfToken,
    },
    cookie,
    body: {
      name: 'Failed Login Student',
      email: 'failed-login@example.com',
      password: 'StrongPassword123!',
    },
  });

  assert.equal(registration.status, 201);

  // Use a fresh anonymous session for failed login attempts.
  const loginCsrf = await sendRequest(server, {
    method: 'GET',
    pathname: '/api/csrf-token',
  });

  const loginCookie = cookieHeader(loginCsrf);

  const headers = {
    Origin: 'http://localhost:5173',
    'x-csrf-token': loginCsrf.body.csrfToken,
  };

  // Existing email, incorrect password.
  const wrongPassword = await sendRequest(server, {
    method: 'POST',
    pathname: '/api/auth/login',
    headers,
    cookie: loginCookie,
    body: {
      email: 'failed-login@example.com',
      password: 'WrongPassword123!',
    },
  });

  // Nonexistent email.
  const unknownEmail = await sendRequest(server, {
    method: 'POST',
    pathname: '/api/auth/login',
    headers,
    cookie: loginCookie,
    body: {
      email: 'unknown-login@example.com',
      password: 'StrongPassword123!',
    },
  });

  assert.equal(wrongPassword.status, 401);
  assert.equal(unknownEmail.status, 401);

  assert.deepEqual(
    wrongPassword.body,
    unknownEmail.body,
    'both failures must return identical responses'
  );

  // Neither failed attempt should authenticate the session.
  const me = await sendRequest(server, {
    pathname: '/api/auth/me',
    cookie: loginCookie,
  });

  assert.equal(me.status, 401);
});


test('login endpoint enforces the per-email rate limit', async (t) => {
  const fixture = createTestApp(
    path.join(tempRoot, 'login-rate-limit.db')
  );

  const server = await startTestServer(fixture.app);

  t.after(async () => {
    await new Promise((resolve) => server.close(resolve));
    fixture.db.close();
  });

  const csrf = await sendRequest(server, {
    method: 'GET',
    pathname: '/api/csrf-token',
  });

  const cookie = cookieHeader(csrf);

  const headers = {
    Origin: 'http://localhost:5173',
    'x-csrf-token': csrf.body.csrfToken,
  };

  const statuses = [];

  for (let attempt = 1; attempt <= 11; attempt += 1) {
    const response = await sendRequest(server, {
      method: 'POST',
      pathname: '/api/auth/login',
      headers,
      cookie,
      body: {
        email: 'rate-limit@example.com',
        password: 'WrongPassword123!',
      },
    });

    statuses.push(response.status);
  }

  assert.deepEqual(
    statuses,
    [
      401, 401, 401, 401, 401,
      401, 401, 401, 401, 401,
      429,
    ]
  );
});


test('logout rejects a request without a CSRF token', async (t) => {
  const fixture = createTestApp(
    path.join(tempRoot, 'logout-csrf.db')
  );

  const server = await startTestServer(fixture.app);

  t.after(async () => {
    await new Promise((resolve) => server.close(resolve));
    fixture.db.close();
  });

  const csrf = await sendRequest(server, {
    method: 'GET',
    pathname: '/api/csrf-token',
  });

  assert.equal(csrf.status, 200);

  const registration = await sendRequest(server, {
    method: 'POST',
    pathname: '/api/auth/register',
    headers: {
      Origin: 'http://localhost:5173',
      'x-csrf-token': csrf.body.csrfToken,
    },
    cookie: cookieHeader(csrf),
    body: {
      name: 'Logout CSRF Student',
      email: 'logout-csrf@example.com',
      password: 'StrongPassword123!',
    },
  });

  assert.equal(registration.status, 201);

  const authenticatedCookie = cookieHeader(registration);

  const rejectedLogout = await sendRequest(server, {
    method: 'POST',
    pathname: '/api/auth/logout',
    headers: {
      Origin: 'http://localhost:5173',
    },
    cookie: authenticatedCookie,
  });

  assert.equal(rejectedLogout.status, 403);

  const me = await sendRequest(server, {
    pathname: '/api/auth/me',
    cookie: authenticatedCookie,
  });

  assert.equal(me.status, 200);
  assert.equal(me.body.student.email, 'logout-csrf@example.com');
});
