
'use strict';

const express = require('express');
const path = require('path');
const session = require('express-session');

const { assertSchemaReady } = require('./auth/schema-readiness');
const { SQLiteSessionStore } = require('./auth/sqlite-session-store');
const {
  createSessionOptions,
  createSessionProvenanceMiddleware,
} = require('./auth/session-config');
const {
  createCsrfMiddleware,
  issueCsrfToken,
} = require('./auth/csrf');
const { PersistentRateLimiter } = require('./auth/rate-limiter');
const { createAuthRouter } = require('./auth/auth-routes');
const { requireStudent } = require('./auth/require-student');

function createApp({
  db,
  sessionSecret,
  rateLimitSecret,
  appOrigin,
  env = process.env,
} = {}) {
  if (
    !db ||
    typeof db.prepare !== 'function' ||
    typeof db.pragma !== 'function'
  ) {
    throw new TypeError(
      'createApp requires an open better-sqlite3 database connection.'
    );
  }

  db.pragma('foreign_keys = ON');

  if (db.pragma('foreign_keys')[0]?.foreign_keys !== 1) {
    throw new Error('SQLite foreign-key enforcement could not be enabled.');
  }

  assertSchemaReady(db);

  const app = express();

  app.use(express.json());

  // Persistent SQLite-backed sessions.
  const sessionStore = new SQLiteSessionStore(db);

  const sessionOptions = createSessionOptions({
    secret: sessionSecret,
    store: sessionStore,
    env,
    appOrigin,
  });

  app.use(session(sessionOptions));

  // Bind generated session IDs to their request provenance.
  app.use(createSessionProvenanceMiddleware(sessionStore));

  // Protect all unsafe HTTP requests against CSRF.
  app.use(createCsrfMiddleware({
    expectedOrigin: appOrigin,
  }));

  // Issue a CSRF token for the current browser session.
  app.get('/api/csrf-token', (req, res) => {
    return res.json({
      csrfToken: issueCsrfToken(req),
    });
  });

  // Authentication endpoints.
  const rateLimiter = new PersistentRateLimiter(db, {
    hmacSecret: rateLimitSecret,
  });

  app.use('/api/auth', createAuthRouter({
    db,
    rateLimiter,
    env,
  }));

  // Public backend health endpoint
app.get('/', (req, res) => {
  res.json({ message: 'PrepTrack backend is running!' });
});

  // All remaining API endpoints require an authenticated student.
  app.use('/api', requireStudent);

  // Allowed task priorities
  const allowedPriorities = ['High', 'Medium', 'Low'];

  // Validate that a date is a real calendar date in YYYY-MM-DD format.
  const isValidDateOnly = (date) => {
    if (
      typeof date !== 'string' ||
      !/^\d{4}-\d{2}-\d{2}$/.test(date)
    ) {
      return false;
    }

    const parsedDate = new Date(`${date}T00:00:00.000Z`);

    return (
      Number.isFinite(parsedDate.getTime()) &&
      parsedDate.toISOString().slice(0, 10) === date
    );
  };


 // ======================================
// JAVA TOPICS API
// ======================================

// Get all Java topics

app.get('/api/java-topics', (req, res) => {
  const topics = db.prepare(`
    SELECT
      topics.id,
      topics.title,
      topics.category,
      topics.description,
      COALESCE(progress.status, 'Not Started') AS status,
      topics.sort_order
    FROM java_topics AS topics
    LEFT JOIN java_topic_progress AS progress
      ON progress.topic_id = topics.id
      AND progress.student_id = ?
    ORDER BY topics.sort_order
  `).all(req.student.id);

  res.json(topics);
});

// Update a Java topic's status for the current student
app.patch('/api/java-topics/:id', (req, res) => {
  const id = Number(req.params.id);
  const { status } = req.body;

  const allowedStatuses = [
    'Not Started',
    'In Progress',
    'Completed'
  ];

  if (!Number.isInteger(id) || id < 1) {
    return res.status(400).json({
      message: 'Invalid Java topic ID'
    });
  }

  if (!allowedStatuses.includes(status)) {
    return res.status(400).json({
      message: 'Invalid status'
    });
  }

  const topic = db.prepare(
    'SELECT * FROM java_topics WHERE id = ?'
  ).get(id);

  if (!topic) {
    return res.status(404).json({
      message: 'Java topic not found'
    });
  }

  db.prepare(`
    INSERT INTO java_topic_progress (
      student_id,
      topic_id,
      status,
      updated_at
    )
    VALUES (?, ?, ?, CURRENT_TIMESTAMP)
    ON CONFLICT(student_id, topic_id)
    DO UPDATE SET
      status = excluded.status,
      updated_at = CURRENT_TIMESTAMP
  `).run(req.student.id, id, status);

  const updatedTopic = db.prepare(`
    SELECT
      topics.id,
      topics.title,
      topics.category,
      topics.description,
      COALESCE(progress.status, 'Not Started') AS status,
      topics.sort_order
    FROM java_topics AS topics
    LEFT JOIN java_topic_progress AS progress
      ON progress.topic_id = topics.id
      AND progress.student_id = ?
    WHERE topics.id = ?
  `).get(req.student.id, id);

  res.json(updatedTopic);
});



 // ======================================
 // DSA TOPICS API
 // ======================================

 // Get all DSA topics

app.get('/api/dsa-topics', (req, res) => {
  const topics = db.prepare(`
    SELECT
      topics.id,
      topics.title,
      topics.category,
      topics.description,
      COALESCE(progress.status, 'Not Started') AS status,
      topics.sort_order
    FROM dsa_topics AS topics
    LEFT JOIN dsa_topic_progress AS progress
      ON progress.topic_id = topics.id
      AND progress.student_id = ?
    ORDER BY topics.sort_order
  `).all(req.student.id);

  res.json(topics);
});

// Update a DSA topic's status for the current student
app.patch('/api/dsa-topics/:id', (req, res) => {
  const id = Number(req.params.id);
  const { status } = req.body;

  const allowedStatuses = [
    'Not Started',
    'In Progress',
    'Completed'
  ];

  if (!Number.isInteger(id) || id < 1) {
    return res.status(400).json({
      message: 'Invalid DSA topic ID'
    });
  }

  if (!allowedStatuses.includes(status)) {
    return res.status(400).json({
      message: 'Invalid status'
    });
  }

  const topic = db.prepare(
    'SELECT * FROM dsa_topics WHERE id = ?'
  ).get(id);

  if (!topic) {
    return res.status(404).json({
      message: 'DSA topic not found'
    });
  }

  db.prepare(`
    INSERT INTO dsa_topic_progress (
      student_id,
      topic_id,
      status,
      updated_at
    )
    VALUES (?, ?, ?, CURRENT_TIMESTAMP)
    ON CONFLICT(student_id, topic_id)
    DO UPDATE SET
      status = excluded.status,
      updated_at = CURRENT_TIMESTAMP
  `).run(req.student.id, id, status);

  const updatedTopic = db.prepare(`
    SELECT
      topics.id,
      topics.title,
      topics.category,
      topics.description,
      COALESCE(progress.status, 'Not Started') AS status,
      topics.sort_order
    FROM dsa_topics AS topics
    LEFT JOIN dsa_topic_progress AS progress
      ON progress.topic_id = topics.id
      AND progress.student_id = ?
    WHERE topics.id = ?
  `).get(req.student.id, id);

  res.json(updatedTopic);
});

 
/* ======================================
   APTITUDE TOPICS API
====================================== */

// Get all Aptitude topics

app.get('/api/aptitude-topics', (req, res) => {
  const topics = db.prepare(`
    SELECT
      topics.id,
      topics.title,
      topics.category,
      topics.description,
      COALESCE(progress.status, 'Not Started') AS status,
      topics.sort_order
    FROM aptitude_topics AS topics
    LEFT JOIN aptitude_topic_progress AS progress
      ON progress.topic_id = topics.id
      AND progress.student_id = ?
    ORDER BY topics.sort_order
  `).all(req.student.id);

  res.json(topics);
});

// Update an Aptitude topic's status for the current student
app.patch('/api/aptitude-topics/:id', (req, res) => {
  const id = Number(req.params.id);
  const { status } = req.body;

  const allowedStatuses = [
    'Not Started',
    'In Progress',
    'Completed'
  ];

  if (!Number.isInteger(id) || id < 1) {
    return res.status(400).json({
      message: 'Invalid Aptitude topic ID'
    });
  }

  if (!allowedStatuses.includes(status)) {
    return res.status(400).json({
      message: 'Invalid status'
    });
  }

  const topic = db.prepare(
    'SELECT * FROM aptitude_topics WHERE id = ?'
  ).get(id);

  if (!topic) {
    return res.status(404).json({
      message: 'Aptitude topic not found'
    });
  }

  db.prepare(`
    INSERT INTO aptitude_topic_progress (
      student_id,
      topic_id,
      status,
      updated_at
    )
    VALUES (?, ?, ?, CURRENT_TIMESTAMP)
    ON CONFLICT(student_id, topic_id)
    DO UPDATE SET
      status = excluded.status,
      updated_at = CURRENT_TIMESTAMP
  `).run(req.student.id, id, status);

  const updatedTopic = db.prepare(`
    SELECT
      topics.id,
      topics.title,
      topics.category,
      topics.description,
      COALESCE(progress.status, 'Not Started') AS status,
      topics.sort_order
    FROM aptitude_topics AS topics
    LEFT JOIN aptitude_topic_progress AS progress
      ON progress.topic_id = topics.id
      AND progress.student_id = ?
    WHERE topics.id = ?
  `).get(req.student.id, id);

  res.json(updatedTopic);
});



// ======================================
// ROADMAP API
// ======================================

// Get all roadmap items

app.get('/api/roadmap', (req, res) => {
  const roadmap = db.prepare(`
    SELECT
      items.id,
      items.title,
      items.description,
      COALESCE(progress.status, 'Not Started') AS status
    FROM roadmap AS items
    LEFT JOIN roadmap_progress AS progress
      ON progress.roadmap_id = items.id
      AND progress.student_id = ?
    ORDER BY items.id
  `).all(req.student.id);

  res.json(roadmap);
});

// Update a roadmap item's status for the current student
app.patch('/api/roadmap/:id', (req, res) => {
  const id = Number(req.params.id);
  const { status } = req.body;

  const allowedStatuses = [
    'Not Started',
    'In Progress',
    'Completed'
  ];

  if (!Number.isInteger(id) || id < 1) {
    return res.status(400).json({
      message: 'Invalid roadmap item ID'
    });
  }

  if (!allowedStatuses.includes(status)) {
    return res.status(400).json({
      message: 'Invalid status'
    });
  }

  const item = db.prepare(
    'SELECT * FROM roadmap WHERE id = ?'
  ).get(id);

  if (!item) {
    return res.status(404).json({
      message: 'Roadmap item not found'
    });
  }

  db.prepare(`
    INSERT INTO roadmap_progress (
      student_id,
      roadmap_id,
      status,
      updated_at
    )
    VALUES (?, ?, ?, CURRENT_TIMESTAMP)
    ON CONFLICT(student_id, roadmap_id)
    DO UPDATE SET
      status = excluded.status,
      updated_at = CURRENT_TIMESTAMP
  `).run(req.student.id, id, status);

  const updatedItem = db.prepare(`
    SELECT
      items.id,
      items.title,
      items.description,
      COALESCE(progress.status, 'Not Started') AS status
    FROM roadmap AS items
    LEFT JOIN roadmap_progress AS progress
      ON progress.roadmap_id = items.id
      AND progress.student_id = ?
    WHERE items.id = ?
  `).get(req.student.id, id);

  res.json(updatedItem);
});


// ======================================

// ======================================
// TASK MANAGEMENT API
// ======================================

// Get all active tasks belonging to the logged-in student
app.get('/api/tasks', (req, res) => {
  const tasks = db.prepare(`
    SELECT *
    FROM tasks
    WHERE student_id = ? AND deleted = 0
    ORDER BY id DESC
  `).all(req.student.id);

  res.json(tasks);
});

// Create a new task for the logged-in student
app.post('/api/tasks', (req, res) => {
  const {
    title,
    description = '',
    due_date = null,
    priority = 'Medium'
  } = req.body;

  if (typeof title !== 'string' || !title.trim()) {
    return res.status(400).json({
      message: 'Task title is required'
    });
  }

  if (typeof description !== 'string') {
    return res.status(400).json({
      message: 'Description must be text'
    });
  }

  if (due_date !== null && !isValidDateOnly(due_date)) {
    return res.status(400).json({
      message: 'Due date must be a valid date in YYYY-MM-DD format'
    });
  }

  if (!allowedPriorities.includes(priority)) {
    return res.status(400).json({
      message: 'Priority must be High, Medium, or Low'
    });
  }

  const result = db.prepare(`
    INSERT INTO tasks (
      student_id,
      title,
      description,
      due_date,
      priority
    )
    VALUES (?, ?, ?, ?, ?)
  `).run(
    req.student.id,
    title.trim(),
    description.trim(),
    due_date,
    priority
  );

  const newTask = db.prepare(`
    SELECT *
    FROM tasks
    WHERE id = ? AND student_id = ?
  `).get(Number(result.lastInsertRowid), req.student.id);

  res.status(201).json({
    message: 'Task created successfully',
    task: newTask
  });
});

// Update task details and/or completion status
app.patch('/api/tasks/:id', (req, res) => {
  const id = Number(req.params.id);
  const studentId = req.student.id;

  const {
    completed,
    title,
    description,
    due_date,
    priority
  } = req.body;

  if (!Number.isInteger(id) || id < 1) {
    return res.status(400).json({
      message: 'Invalid task ID'
    });
  }

  // Only find tasks owned by this student
  const task = db.prepare(`
    SELECT *
    FROM tasks
    WHERE id = ? AND student_id = ?
  `).get(id, studentId);

  if (!task) {
    return res.status(404).json({
      message: 'Task not found'
    });
  }

  if (completed !== undefined && typeof completed !== 'boolean') {
    return res.status(400).json({
      message: 'Completed must be true or false'
    });
  }

  if (
    priority !== undefined &&
    !allowedPriorities.includes(priority)
  ) {
    return res.status(400).json({
      message: 'Priority must be High, Medium, or Low'
    });
  }

  if (
    title !== undefined ||
    description !== undefined ||
    due_date !== undefined ||
    priority !== undefined
  ) {
    const newTitle = title !== undefined ? title : task.title;
    const newDescription =
      description !== undefined ? description : task.description;
    const newDueDate =
      due_date !== undefined ? due_date : task.due_date;
    const newPriority =
      priority !== undefined ? priority : task.priority;

    if (typeof newTitle !== 'string' || !newTitle.trim()) {
      return res.status(400).json({
        message: 'Task title is required'
      });
    }

    if (typeof newDescription !== 'string') {
      return res.status(400).json({
        message: 'Description must be text'
      });
    }

    if (newDueDate !== null && !isValidDateOnly(newDueDate)) {
      return res.status(400).json({
        message: 'Due date must be a valid date in YYYY-MM-DD format'
      });
    }
    db.prepare(`
      UPDATE tasks
      SET title = ?, description = ?, due_date = ?, priority = ?
      WHERE id = ? AND student_id = ?
    `).run(
      newTitle.trim(),
      newDescription.trim(),
      newDueDate,
      newPriority,
      id,
      studentId
    );
  }

  if (completed !== undefined) {
    db.prepare(`
      UPDATE tasks
      SET completed = ?
      WHERE id = ? AND student_id = ?
    `).run(completed ? 1 : 0, id, studentId);
  }

  const updatedTask = db.prepare(`
    SELECT *
    FROM tasks
    WHERE id = ? AND student_id = ?
  `).get(id, studentId);

  res.json({
    message: 'Task updated successfully',
    task: updatedTask
  });
});

// Soft-delete a task belonging to the logged-in student
app.delete('/api/tasks/:id', (req, res) => {
  const id = Number(req.params.id);

  if (!Number.isInteger(id) || id < 1) {
    return res.status(400).json({
      message: 'Invalid task ID'
    });
  }

  const result = db.prepare(`
    UPDATE tasks
    SET deleted = 1
    WHERE id = ?
      AND student_id = ?
      AND deleted = 0
  `).run(id, req.student.id);

  if (result.changes === 0) {
    return res.status(404).json({
      message: 'Task not found'
    });
  }

  res.json({
    message: 'Task deleted successfully'
  });
});

// Restore a deleted task belonging to the logged-in student
app.patch('/api/tasks/:id/restore', (req, res) => {
  const id = Number(req.params.id);

  if (!Number.isInteger(id) || id < 1) {
    return res.status(400).json({
      message: 'Invalid task ID'
    });
  }

  const result = db.prepare(`
    UPDATE tasks
    SET deleted = 0
    WHERE id = ?
      AND student_id = ?
      AND deleted = 1
  `).run(id, req.student.id);

  if (result.changes === 0) {
    return res.status(404).json({
      message: 'Deleted task not found'
    });
  }

  const task = db.prepare(`
    SELECT *
    FROM tasks
    WHERE id = ? AND student_id = ?
  `).get(id, req.student.id);

  res.json({
    message: 'Task restored successfully',
    task
  });
});



// ======================================
// STUDY PLANNER API
// ======================================

const allowedSubjects = ['Java', 'DSA', 'Aptitude'];

// Get study sessions belonging to the logged-in student
app.get('/api/study-sessions', (req, res) => {
  const sessions = db.prepare(`
    SELECT *
    FROM study_sessions
    WHERE student_id = ?
    ORDER BY study_date, start_time
  `).all(req.student.id);

  res.json(sessions);
});

// Create a study session for the logged-in student
app.post('/api/study-sessions', (req, res) => {
  const {
    subject,
    topic,
    study_date,
    start_time,
    duration_minutes
  } = req.body;

  if (!allowedSubjects.includes(subject)) {
    return res.status(400).json({
      message: 'Invalid subject'
    });
  }

  if (typeof topic !== 'string' || !topic.trim()) {
    return res.status(400).json({
      message: 'Topic is required'
    });
  }

  if (
    typeof study_date !== 'string' ||
    !/^\d{4}-\d{2}-\d{2}$/.test(study_date) ||
    !Number.isFinite(Date.parse(study_date)) ||
    new Date(study_date).toISOString().slice(0, 10) !== study_date
  ) {
    return res.status(400).json({
      message: 'Invalid study date. Use YYYY-MM-DD'
    });
  }

  if (
    typeof start_time !== 'string' ||
    !/^([01]\d|2[0-3]):[0-5]\d$/.test(start_time)
  ) {
    return res.status(400).json({
      message: 'Invalid start time. Use HH:MM'
    });
  }

  if (
    !Number.isInteger(duration_minutes) ||
    duration_minutes < 1 ||
    duration_minutes > 1440
  ) {
    return res.status(400).json({
      message: 'Duration must be between 1 and 1440 minutes'
    });
  }

  const result = db.prepare(`
    INSERT INTO study_sessions
      (student_id, subject, topic, study_date, start_time, duration_minutes)
    VALUES (?, ?, ?, ?, ?, ?)
  `).run(
    req.student.id,
    subject,
    topic.trim(),
    study_date,
    start_time,
    duration_minutes
  );

  const newSession = db.prepare(`
    SELECT *
    FROM study_sessions
    WHERE id = ? AND student_id = ?
  `).get(Number(result.lastInsertRowid), req.student.id);

  res.status(201).json({
    message: 'Study session created successfully',
    session: newSession
  });
});

// Update a study session belonging to the logged-in student
app.patch('/api/study-sessions/:id', (req, res) => {
  const id = Number(req.params.id);
  const studentId = req.student.id;

  if (!Number.isInteger(id) || id < 1) {
    return res.status(400).json({
      message: 'Invalid session ID'
    });
  }

  const session = db.prepare(`
    SELECT *
    FROM study_sessions
    WHERE id = ? AND student_id = ?
  `).get(id, studentId);

  if (!session) {
    return res.status(404).json({
      message: 'Study session not found'
    });
  }

  const {
    subject,
    topic,
    study_date,
    start_time,
    duration_minutes,
    completed
  } = req.body;

  const newSubject = subject ?? session.subject;
  const newTopic = topic ?? session.topic;
  const newDate = study_date ?? session.study_date;
  const newTime = start_time ?? session.start_time;
  const newDuration = duration_minutes ?? session.duration_minutes;
  const newCompleted = completed ?? Boolean(session.completed);

  if (!allowedSubjects.includes(newSubject)) {
    return res.status(400).json({
      message: 'Invalid subject'
    });
  }

  if (typeof newTopic !== 'string' || !newTopic.trim()) {
    return res.status(400).json({
      message: 'Topic is required'
    });
  }

  if (
    typeof newDate !== 'string' ||
    !/^\d{4}-\d{2}-\d{2}$/.test(newDate) ||
    !Number.isFinite(Date.parse(newDate)) ||
    new Date(newDate).toISOString().slice(0, 10) !== newDate
  ) {
    return res.status(400).json({
      message: 'Invalid study date'
    });
  }

  if (
    typeof newTime !== 'string' ||
    !/^([01]\d|2[0-3]):[0-5]\d$/.test(newTime)
  ) {
    return res.status(400).json({
      message: 'Invalid start time'
    });
  }

  if (
    !Number.isInteger(newDuration) ||
    newDuration < 1 ||
    newDuration > 1440
  ) {
    return res.status(400).json({
      message: 'Invalid duration'
    });
  }

  if (typeof newCompleted !== 'boolean') {
    return res.status(400).json({
      message: 'Completed must be true or false'
    });
  }

  const today = new Intl.DateTimeFormat('en-CA', {
  timeZone: 'Asia/Kolkata',
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
}).format(new Date());

if (newCompleted && newDate > today) {
  return res.status(400).json({
    message: 'Future study sessions cannot be marked as completed',
  });
}

  db.prepare(`
    UPDATE study_sessions
    SET subject = ?,
        topic = ?,
        study_date = ?,
        start_time = ?,
        duration_minutes = ?,
        completed = ?
    WHERE id = ? AND student_id = ?
  `).run(
    newSubject,
    newTopic.trim(),
    newDate,
    newTime,
    newDuration,
    newCompleted ? 1 : 0,
    id,
    studentId
  );

  const updatedSession = db.prepare(`
    SELECT *
    FROM study_sessions
    WHERE id = ? AND student_id = ?
  `).get(id, studentId);

  res.json({
    message: 'Study session updated successfully',
    session: updatedSession
  });
});

// Delete a study session belonging to the logged-in student
app.delete('/api/study-sessions/:id', (req, res) => {
  const id = Number(req.params.id);

  if (!Number.isInteger(id) || id < 1) {
    return res.status(400).json({
      message: 'Invalid session ID'
    });
  }

  const result = db.prepare(`
    DELETE FROM study_sessions
    WHERE id = ? AND student_id = ?
  `).run(id, req.student.id);

  if (result.changes === 0) {
    return res.status(404).json({
      message: 'Study session not found'
    });
  }

  res.json({
    message: 'Study session deleted successfully'
  });
});

 // Get completed Pomodoro sessions belonging to the logged-in student
app.get('/api/pomodoro-sessions', (req, res) => {
  const sessions = db.prepare(`
    SELECT *
    FROM pomodoro_sessions
    WHERE student_id = ?
    ORDER BY completed_at DESC, id DESC
  `).all(req.student.id);

  res.json(sessions);
});

// Get bookmarks belonging to the logged-in student
app.get('/api/bookmarks', (req, res) => {
  try {
    const bookmarks = db.prepare(`
      SELECT *
      FROM bookmarks
      WHERE student_id = ?
      ORDER BY updated_at DESC, id DESC
    `).all(req.student.id);

    res.json(bookmarks);
  } catch (error) {
    console.error('Get bookmarks error:', error);

    res.status(500).json({
      message: 'Failed to fetch bookmarks',
    });
  }
});

// Create a bookmark for the logged-in student
app.post('/api/bookmarks', (req, res) => {
  try {
    const { title, url, subject, description } = req.body;

    if (typeof title !== 'string' || !title.trim()) {
      return res.status(400).json({
        message: 'Bookmark title is required',
      });
    }

    if (typeof url !== 'string' || !url.trim()) {
      return res.status(400).json({
        message: 'Bookmark URL is required',
      });
    }

    let parsedUrl;

    try {
      parsedUrl = new URL(url.trim());
    } catch {
      return res.status(400).json({
        message: 'Invalid bookmark URL',
      });
    }

    if (!['http:', 'https:'].includes(parsedUrl.protocol)) {
      return res.status(400).json({
        message: 'Only HTTP and HTTPS URLs are allowed',
      });
    }

    if (!allowedSubjects.includes(subject)) {
      return res.status(400).json({
        message: 'Invalid subject',
      });
    }

    if (description !== undefined && typeof description !== 'string') {
      return res.status(400).json({
        message: 'Invalid bookmark description',
      });
    }

    const result = db.prepare(`
      INSERT INTO bookmarks
        (student_id, title, url, subject, description)
      VALUES (?, ?, ?, ?, ?)
    `).run(
      req.student.id,
      title.trim(),
      parsedUrl.href,
      subject,
      description || ''
    );

    const bookmark = db.prepare(`
      SELECT *
      FROM bookmarks
      WHERE id = ? AND student_id = ?
    `).get(Number(result.lastInsertRowid), req.student.id);

    res.status(201).json(bookmark);
  } catch (error) {
    console.error('Create bookmark error:', error);

    res.status(500).json({
      message: 'Failed to create bookmark',
    });
  }
});

// Update a bookmark belonging to the logged-in student
app.put('/api/bookmarks/:id', (req, res) => {
  try {
    const { title, url, subject, description } = req.body;
    const bookmarkId = Number(req.params.id);

    if (!Number.isInteger(bookmarkId) || bookmarkId <= 0) {
      return res.status(400).json({
        message: 'Invalid bookmark ID',
      });
    }

    if (typeof title !== 'string' || !title.trim()) {
      return res.status(400).json({
        message: 'Bookmark title is required',
      });
    }

    if (typeof url !== 'string' || !url.trim()) {
      return res.status(400).json({
        message: 'Bookmark URL is required',
      });
    }

    let parsedUrl;

    try {
      parsedUrl = new URL(url.trim());
    } catch {
      return res.status(400).json({
        message: 'Invalid bookmark URL',
      });
    }

    if (!['http:', 'https:'].includes(parsedUrl.protocol)) {
      return res.status(400).json({
        message: 'Only HTTP and HTTPS URLs are allowed',
      });
    }

    if (!allowedSubjects.includes(subject)) {
      return res.status(400).json({
        message: 'Invalid subject',
      });
    }

    if (description !== undefined && typeof description !== 'string') {
      return res.status(400).json({
        message: 'Invalid bookmark description',
      });
    }

    const result = db.prepare(`
      UPDATE bookmarks
      SET title = ?,
          url = ?,
          subject = ?,
          description = ?,
          updated_at = CURRENT_TIMESTAMP
      WHERE id = ? AND student_id = ?
    `).run(
      title.trim(),
      parsedUrl.href,
      subject,
      description || '',
      bookmarkId,
      req.student.id
    );

    if (result.changes === 0) {
      return res.status(404).json({
        message: 'Bookmark not found',
      });
    }

    const updatedBookmark = db.prepare(`
      SELECT *
      FROM bookmarks
      WHERE id = ? AND student_id = ?
    `).get(bookmarkId, req.student.id);

    res.json(updatedBookmark);
  } catch (error) {
    console.error('Update bookmark error:', error);

    res.status(500).json({
      message: 'Failed to update bookmark',
    });
  }
});

// Delete a bookmark belonging to the logged-in student
app.delete('/api/bookmarks/:id', (req, res) => {
  try {
    const bookmarkId = Number(req.params.id);

    if (!Number.isInteger(bookmarkId) || bookmarkId <= 0) {
      return res.status(400).json({
        message: 'Invalid bookmark ID',
      });
    }

    const result = db.prepare(`
      DELETE FROM bookmarks
      WHERE id = ? AND student_id = ?
    `).run(bookmarkId, req.student.id);

    if (result.changes === 0) {
      return res.status(404).json({
        message: 'Bookmark not found',
      });
    }

    res.json({
      message: 'Bookmark deleted successfully',
    });
  } catch (error) {
    console.error('Delete bookmark error:', error);

    res.status(500).json({
      message: 'Failed to delete bookmark',
    });
  }
});


// Get notes belonging to the logged-in student
app.get('/api/notes', (req, res) => {
  try {
    const notes = db.prepare(`
      SELECT *
      FROM notes
      WHERE student_id = ?
      ORDER BY updated_at DESC, id DESC
    `).all(req.student.id);

    res.json(notes);
  } catch (error) {
    console.error('Get notes error:', error);

    res.status(500).json({
      message: 'Failed to fetch notes',
    });
  }
});

// Create a note for the logged-in student
app.post('/api/notes', (req, res) => {
  try {
    const { title, subject, content } = req.body;

    if (typeof title !== 'string' || !title.trim()) {
      return res.status(400).json({
        message: 'Note title is required',
      });
    }

    if (!allowedSubjects.includes(subject)) {
      return res.status(400).json({
        message: 'Invalid subject',
      });
    }

    if (content !== undefined && typeof content !== 'string') {
      return res.status(400).json({
        message: 'Invalid note content',
      });
    }

    const result = db.prepare(`
      INSERT INTO notes (student_id, title, subject, content)
      VALUES (?, ?, ?, ?)
    `).run(
      req.student.id,
      title.trim(),
      subject,
      content || ''
    );

    const note = db.prepare(`
      SELECT *
      FROM notes
      WHERE id = ? AND student_id = ?
    `).get(Number(result.lastInsertRowid), req.student.id);

    res.status(201).json(note);
  } catch (error) {
    console.error('Create note error:', error);

    res.status(500).json({
      message: 'Failed to create note',
    });
  }
});

// Update a note belonging to the logged-in student
app.put('/api/notes/:id', (req, res) => {
  try {
    const { title, subject, content } = req.body;
    const noteId = Number(req.params.id);

    if (!Number.isInteger(noteId) || noteId <= 0) {
      return res.status(400).json({
        message: 'Invalid note ID',
      });
    }

    if (typeof title !== 'string' || !title.trim()) {
      return res.status(400).json({
        message: 'Note title is required',
      });
    }

    if (!allowedSubjects.includes(subject)) {
      return res.status(400).json({
        message: 'Invalid subject',
      });
    }

    if (content !== undefined && typeof content !== 'string') {
      return res.status(400).json({
        message: 'Invalid note content',
      });
    }

    const result = db.prepare(`
      UPDATE notes
      SET title = ?,
          subject = ?,
          content = ?,
          updated_at = CURRENT_TIMESTAMP
      WHERE id = ? AND student_id = ?
    `).run(
      title.trim(),
      subject,
      content || '',
      noteId,
      req.student.id
    );

    if (result.changes === 0) {
      return res.status(404).json({
        message: 'Note not found',
      });
    }

    const updatedNote = db.prepare(`
      SELECT *
      FROM notes
      WHERE id = ? AND student_id = ?
    `).get(noteId, req.student.id);

    res.json(updatedNote);
  } catch (error) {
    console.error('Update note error:', error);

    res.status(500).json({
      message: 'Failed to update note',
    });
  }
});

// Delete a note belonging to the logged-in student
app.delete('/api/notes/:id', (req, res) => {
  try {
    const noteId = Number(req.params.id);

    if (!Number.isInteger(noteId) || noteId <= 0) {
      return res.status(400).json({
        message: 'Invalid note ID',
      });
    }

    const result = db.prepare(`
      DELETE FROM notes
      WHERE id = ? AND student_id = ?
    `).run(noteId, req.student.id);

    if (result.changes === 0) {
      return res.status(404).json({
        message: 'Note not found',
      });
    }

    res.json({
      message: 'Note deleted successfully',
    });
  } catch (error) {
    console.error('Delete note error:', error);

    res.status(500).json({
      message: 'Failed to delete note',
    });
  }
});

// Save a completed Pomodoro focus session
app.post('/api/pomodoro-sessions', (req, res) => {
  const { subject, duration_minutes } = req.body;

  if (!allowedSubjects.includes(subject)) {
    return res.status(400).json({
      message: 'Invalid subject'
    });
  }

  if (
    !Number.isInteger(duration_minutes) ||
    duration_minutes < 1 ||
    duration_minutes > 25
  ) {
    return res.status(400).json({
      message: 'Duration must be between 1 and 25 minutes'
    });
  }

  const result = db.prepare(`
    INSERT INTO pomodoro_sessions
      (student_id, subject, duration_minutes)
    VALUES (?, ?, ?)
  `).run(
    req.student.id,
    subject,
    duration_minutes
  );

  const session = db.prepare(`
    SELECT *
    FROM pomodoro_sessions
    WHERE id = ? AND student_id = ?
  `).get(Number(result.lastInsertRowid), req.student.id);

  res.status(201).json({
    message: 'Pomodoro session saved successfully',
    session
  });
});


// Get study streak statistics
app.get('/api/study-streak', (req, res) => {
  try {
   const studyDates = db.prepare(`
  SELECT DISTINCT study_date AS study_date
  FROM study_sessions
  WHERE completed = 1
    AND student_id = ?

  UNION

  SELECT DISTINCT
    date(completed_at, '+5 hours', '+30 minutes') AS study_date
  FROM pomodoro_sessions
  WHERE student_id = ?
`).all(req.student.id, req.student.id)
  .map((row) => row.study_date);

    const today = new Intl.DateTimeFormat('en-CA', {
  timeZone: 'Asia/Kolkata',
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
}).format(new Date());

    const dates = [...new Set(studyDates)]
      .filter((date) => isValidDateOnly(date) && date <= today)
      .sort();


    const dateSet = new Set(dates);

    let currentStreak = 0;
    let longestStreak = 0;
    let streak = 0;

    const checkDate = (dateString) => {
      const date = new Date(`${dateString}T00:00:00Z`);
      date.setUTCDate(date.getUTCDate() - 1);
      return date.toISOString().slice(0, 10);
    };

    let previousDate = null;

    dates.forEach((date) => {
      if (previousDate && checkDate(date) === previousDate) {
        streak++;
      } else {
        streak = 1;
      }

      longestStreak = Math.max(longestStreak, streak);
      previousDate = date;
    });

    const yesterday = checkDate(today);
    let currentDate = dateSet.has(today) ? today : yesterday;

    while (dateSet.has(currentDate)) {
      currentStreak++;
      currentDate = checkDate(currentDate);
    }

    res.json({
      currentStreak,
      longestStreak,
      totalStudyDays: dates.length,
      studiedToday: dateSet.has(today),
      studyDates: dates,
    });
  } catch (error) {
    console.error('Study streak error:', error);

    res.status(500).json({
      message: 'Failed to calculate study streak',
    });
  }
});
  return app;
}

function startServer({
  databasePath = path.join(__dirname, 'preptrack.db'),
  port = 5000,
  DatabaseClass,
  sessionSecret = process.env.SESSION_SECRET,
  rateLimitSecret = process.env.RATE_LIMIT_SECRET,
  appOrigin = process.env.APP_ORIGIN,
  env = process.env,
} = {}) {
let db;
  try {
    const Database = DatabaseClass || require('better-sqlite3');
    db = new Database(databasePath);
const app = createApp({
  db,
  sessionSecret,
  rateLimitSecret,
  appOrigin,
  env,
});
    const server = app.listen(port, () => {
      console.log(`PrepTrack server running on http://localhost:${port}`);
    });
    let hasListened = false;
    server.once('listening', () => { hasListened = true; });
    server.on('error', (error) => {
     const message = hasListened
  ? 'PrepTrack server error'
  : 'PrepTrack startup failed';

console.error(`${message}: ${error.message}`);
      process.exitCode = 1;
      if (!hasListened) {
        if (db?.open) db.close();
      } else if (server.listening) {
        server.close();
      }
    });
    server.once('close', () => {
      if (db?.open) db.close();
    });
    return server;
  } catch (error) {
    if (db?.open) db.close();
    console.error(`PrepTrack startup failed: ${error.message}`);
    process.exitCode = 1;
    return null;
  }
}

if (require.main === module) {
  const envPath = path.resolve(__dirname, '..', '.env');

  try {
    process.loadEnvFile(envPath);
  } catch (error) {
    if (error.code !== 'ENOENT') {
      throw error;
    }
  }

  startServer();
}

module.exports = { createApp, startServer };
