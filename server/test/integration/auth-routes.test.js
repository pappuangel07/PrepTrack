
'use strict';

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
