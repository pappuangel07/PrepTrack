'use strict';

const express = require('express');
const path = require('path');
const { assertSchemaReady } = require('./auth/schema-readiness');

function createApp({ db } = {}) {
  if (!db || typeof db.prepare !== 'function' || typeof db.pragma !== 'function') {
    throw new TypeError('createApp requires an open better-sqlite3 database connection.');
  }
  db.pragma('foreign_keys = ON');
  if (db.pragma('foreign_keys')[0]?.foreign_keys !== 1) {
    throw new Error('SQLite foreign-key enforcement could not be enabled.');
  }
  assertSchemaReady(db);

  const app = express();
  app.use(express.json());
// Allowed task priorities
const allowedPriorities = ['High', 'Medium', 'Low'];

 // ======================================
// JAVA TOPICS API
// ======================================

// Get all Java topics
app.get('/api/java-topics', (req, res) => {
  const topics = db.prepare(`
    SELECT id, title, category, description, status, sort_order
    FROM java_topics
    ORDER BY sort_order
  `).all();

  res.json(topics);
});

// Update a Java topic's status
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

  db.prepare(
    'UPDATE java_topics SET status = ? WHERE id = ?'
  ).run(status, id);

  const updatedTopic = db.prepare(
    'SELECT id, title, category, description, status, sort_order FROM java_topics WHERE id = ?'
  ).get(id);

  res.json({
    message: 'Java topic status updated successfully',
    topic: updatedTopic
  });
});


 // ======================================
 // DSA TOPICS API
 // ======================================

 // Get all DSA topics
 app.get('/api/dsa-topics', (req, res) => {
   const topics = db.prepare(`
     SELECT id, title, category, description, status, sort_order
     FROM dsa_topics
     ORDER BY sort_order
   `).all();

   res.json(topics);
 });

 // Update a DSA topic's status
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

   db.prepare(
     'UPDATE dsa_topics SET status = ? WHERE id = ?'
   ).run(status, id);

   const updatedTopic = db.prepare(`
     SELECT id, title, category, description, status, sort_order
     FROM dsa_topics
     WHERE id = ?
   `).get(id);

   res.json({
     message: 'DSA topic status updated successfully',
     topic: updatedTopic
   });
 });

 
/* ======================================
   APTITUDE TOPICS API
====================================== */

// Get all Aptitude topics
app.get('/api/aptitude-topics', (req, res) => {
  const topics = db.prepare(`
    SELECT id, title, category, description, status, sort_order
    FROM aptitude_topics
    ORDER BY sort_order
  `).all();

  res.json(topics);
});

// Update an Aptitude topic's status
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

  db.prepare(
    'UPDATE aptitude_topics SET status = ? WHERE id = ?'
  ).run(status, id);

  const updatedTopic = db.prepare(`
    SELECT id, title, category, description, status, sort_order
    FROM aptitude_topics
    WHERE id = ?
  `).get(id);

  res.json({
    message: 'Aptitude topic status updated successfully',
    topic: updatedTopic
  });
});

// Home route
app.get('/', (req, res) => {
  res.json({
    message: 'PrepTrack backend is running!'
  });
});

// ======================================
// ROADMAP API
// ======================================

// Get all roadmap items
app.get('/api/roadmap', (req, res) => {
  const roadmap = db.prepare(
    'SELECT * FROM roadmap ORDER BY id'
  ).all();

  res.json(roadmap);
});

// Update a roadmap item's status
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

  db.prepare(
    'UPDATE roadmap SET status = ? WHERE id = ?'
  ).run(status, id);

  const updatedItem = db.prepare(
    'SELECT * FROM roadmap WHERE id = ?'
  ).get(id);

  res.json({
    message: 'Progress updated successfully',
    item: updatedItem
  });
});

// ======================================
// TASK MANAGEMENT API
// ======================================
// Get all active tasks
app.get('/api/tasks', (req, res) => {
  const tasks = db.prepare(
    'SELECT * FROM tasks WHERE deleted = 0 ORDER BY id DESC'
  ).all();

  res.json(tasks);
});

// Create a new task
app.post('/api/tasks', (req, res) => {
  console.log('Incoming task data:', req.body);
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

  if (
    due_date !== null &&
    (typeof due_date !== 'string' ||
      !/^\d{4}-\d{2}-\d{2}$/.test(due_date))
  ) {
    return res.status(400).json({
      message: 'Due date must use YYYY-MM-DD format'
    });
  }

  if (!allowedPriorities.includes(priority)) {
    return res.status(400).json({
      message: 'Priority must be High, Medium, or Low'
    });
  }

  const result = db.prepare(`
    INSERT INTO tasks (title, description, due_date, priority)
    VALUES (?, ?, ?, ?)
  `).run(
    title.trim(),
    description.trim(),
    due_date,
    priority
  );

  const newTask = db.prepare(
    'SELECT * FROM tasks WHERE id = ?'
  ).get(result.lastInsertRowid);

  res.status(201).json({
    message: 'Task created successfully',
    task: newTask
  });
});

// Update task details and/or completion status
app.patch('/api/tasks/:id', (req, res) => {
  const id = Number(req.params.id);
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

  const task = db.prepare(
    'SELECT * FROM tasks WHERE id = ?'
  ).get(id);

  if (!task) {
    return res.status(404).json({
      message: 'Task not found'
    });
  }

  // Validate completion status if provided
  if (completed !== undefined && typeof completed !== 'boolean') {
    return res.status(400).json({
      message: 'Completed must be true or false'
    });
  }

  // Validate priority if provided
  if (
    priority !== undefined &&
    !allowedPriorities.includes(priority)
  ) {
    return res.status(400).json({
      message: 'Priority must be High, Medium, or Low'
    });
  }

  // Validate and update task details if provided
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

    if (
      newDueDate !== null &&
      (typeof newDueDate !== 'string' ||
        !/^\d{4}-\d{2}-\d{2}$/.test(newDueDate))
    ) {
      return res.status(400).json({
        message: 'Due date must use YYYY-MM-DD format'
      });
    }

    db.prepare(`
      UPDATE tasks
      SET title = ?, description = ?, due_date = ?, priority = ?
      WHERE id = ?
    `).run(
      newTitle.trim(),
      newDescription.trim(),
      newDueDate,
      newPriority,
      id
    );
  }

  // Update completion status if provided
  if (completed !== undefined) {
    db.prepare(
      'UPDATE tasks SET completed = ? WHERE id = ?'
    ).run(completed ? 1 : 0, id);
  }

  const updatedTask = db.prepare(
    'SELECT * FROM tasks WHERE id = ?'
  ).get(id);

  res.json({
    message: 'Task updated successfully',
    task: updatedTask
  });
});

// Soft delete a task
app.delete('/api/tasks/:id', (req, res) => {
  const id = Number(req.params.id);

  if (!Number.isInteger(id) || id < 1) {
    return res.status(400).json({
      message: 'Invalid task ID'
    });
  }

  const result = db.prepare(
    'UPDATE tasks SET deleted = 1 WHERE id = ? AND deleted = 0'
  ).run(id);

  if (result.changes === 0) {
    return res.status(404).json({
      message: 'Task not found'
    });
  }

  res.json({
    message: 'Task deleted successfully'
  });
});
// Restore a deleted task
app.patch('/api/tasks/:id/restore', (req, res) => {
  const id = Number(req.params.id);

  if (!Number.isInteger(id) || id < 1) {
    return res.status(400).json({
      message: 'Invalid task ID'
    });
  }

  const result = db.prepare(
    'UPDATE tasks SET deleted = 0 WHERE id = ? AND deleted = 1'
  ).run(id);

  if (result.changes === 0) {
    return res.status(404).json({
      message: 'Deleted task not found'
    });
  }

  const task = db.prepare(
    'SELECT * FROM tasks WHERE id = ?'
  ).get(id);

  res.json({
    message: 'Task restored successfully',
    task
  });
});

// ======================================
// STUDY PLANNER API
// ======================================

const allowedSubjects = ['Java', 'DSA', 'Aptitude'];

// Get all study sessions
app.get('/api/study-sessions', (req, res) => {
  const sessions = db.prepare(`
    SELECT *
    FROM study_sessions
    ORDER BY study_date, start_time
  `).all();

  res.json(sessions);
});

// Create a study session
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
      (subject, topic, study_date, start_time, duration_minutes)
    VALUES (?, ?, ?, ?, ?)
  `).run(
    subject,
    topic.trim(),
    study_date,
    start_time,
    duration_minutes
  );

  const newSession = db.prepare(`
    SELECT * FROM study_sessions WHERE id = ?
  `).get(result.lastInsertRowid);

  res.status(201).json({
    message: 'Study session created successfully',
    session: newSession
  });
});

// Update a study session
app.patch('/api/study-sessions/:id', (req, res) => {
  const id = Number(req.params.id);

  if (!Number.isInteger(id) || id < 1) {
    return res.status(400).json({
      message: 'Invalid session ID'
    });
  }

  const session = db.prepare(
    'SELECT * FROM study_sessions WHERE id = ?'
  ).get(id);

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

  db.prepare(`
    UPDATE study_sessions
    SET subject = ?,
        topic = ?,
        study_date = ?,
        start_time = ?,
        duration_minutes = ?,
        completed = ?
    WHERE id = ?
  `).run(
    newSubject,
    newTopic.trim(),
    newDate,
    newTime,
    newDuration,
    newCompleted ? 1 : 0,
    id
  );

  const updatedSession = db.prepare(
    'SELECT * FROM study_sessions WHERE id = ?'
  ).get(id);

  res.json({
    message: 'Study session updated successfully',
    session: updatedSession
  });
});

// Delete a study session
app.delete('/api/study-sessions/:id', (req, res) => {
  const id = Number(req.params.id);

  if (!Number.isInteger(id) || id < 1) {
    return res.status(400).json({
      message: 'Invalid session ID'
    });
  }

  const result = db.prepare(
    'DELETE FROM study_sessions WHERE id = ?'
  ).run(id);

  if (result.changes === 0) {
    return res.status(404).json({
      message: 'Study session not found'
    });
  }

  res.json({
    message: 'Study session deleted successfully'
  });
});


 // Get all completed Pomodoro sessions
app.get('/api/pomodoro-sessions', (req, res) => {
  const sessions = db.prepare(`
    SELECT *
    FROM pomodoro_sessions
    ORDER BY completed_at DESC, id DESC
  `).all();

  res.json(sessions);
});

// Get all bookmarks
app.get('/api/bookmarks', (req, res) => {
  try {
    const bookmarks = db.prepare(`
      SELECT *
      FROM bookmarks
      ORDER BY updated_at DESC, id DESC
    `).all();

    res.json(bookmarks);
  } catch (error) {
    console.error('Get bookmarks error:', error);

    res.status(500).json({
      message: 'Failed to fetch bookmarks',
    });
  }
});

// Create a new bookmark
app.post('/api/bookmarks', (req, res) => {
  try {
    const { title, url, subject, description } = req.body;

    if (!title || !title.trim()) {
      return res.status(400).json({
        message: 'Bookmark title is required',
      });
    }

    if (!url || !url.trim()) {
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

    const result = db.prepare(`
      INSERT INTO bookmarks (title, url, subject, description)
      VALUES (?, ?, ?, ?)
    `).run(
      title.trim(),
      parsedUrl.href,
      subject,
      description || ''
    );

    const bookmark = db.prepare(`
      SELECT * FROM bookmarks WHERE id = ?
    `).get(result.lastInsertRowid);

    res.status(201).json(bookmark);
  } catch (error) {
    console.error('Create bookmark error:', error);

    res.status(500).json({
      message: 'Failed to create bookmark',
    });
  }
});

// Update an existing bookmark
app.put('/api/bookmarks/:id', (req, res) => {
  try {
    const { title, url, subject, description } = req.body;
    const bookmarkId = Number(req.params.id);

    if (!Number.isInteger(bookmarkId) || bookmarkId <= 0) {
      return res.status(400).json({
        message: 'Invalid bookmark ID',
      });
    }

    if (!title || !title.trim()) {
      return res.status(400).json({
        message: 'Bookmark title is required',
      });
    }

    if (!url || !url.trim()) {
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

    const result = db.prepare(`
      UPDATE bookmarks
      SET title = ?,
          url = ?,
          subject = ?,
          description = ?,
          updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `).run(
      title.trim(),
      parsedUrl.href,
      subject,
      description || '',
      bookmarkId
    );

    if (result.changes === 0) {
      return res.status(404).json({
        message: 'Bookmark not found',
      });
    }

    const updatedBookmark = db.prepare(`
      SELECT * FROM bookmarks WHERE id = ?
    `).get(bookmarkId);

    res.json(updatedBookmark);
  } catch (error) {
    console.error('Update bookmark error:', error);

    res.status(500).json({
      message: 'Failed to update bookmark',
    });
  }
});

// Delete a bookmark
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
      WHERE id = ?
    `).run(bookmarkId);

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

// Get all notes
app.get('/api/notes', (req, res) => {
  try {
    const notes = db.prepare(`
      SELECT *
      FROM notes
      ORDER BY updated_at DESC, id DESC
    `).all();

    res.json(notes);
  } catch (error) {
    console.error('Get notes error:', error);

    res.status(500).json({
      message: 'Failed to fetch notes',
    });
  }
});

// Create a new note
app.post('/api/notes', (req, res) => {
  try {
    const { title, subject, content } = req.body;

    if (!title || !title.trim()) {
      return res.status(400).json({
        message: 'Note title is required',
      });
    }

    if (!allowedSubjects.includes(subject)) {
      return res.status(400).json({
        message: 'Invalid subject',
      });
    }

    const result = db.prepare(`
      INSERT INTO notes (title, subject, content)
      VALUES (?, ?, ?)
    `).run(title.trim(), subject, content || '');

    const note = db.prepare(`
      SELECT * FROM notes WHERE id = ?
    `).get(result.lastInsertRowid);

    res.status(201).json(note);
  } catch (error) {
    console.error('Create note error:', error);

    res.status(500).json({
      message: 'Failed to create note',
    });
  }
});

// Update an existing note
app.put('/api/notes/:id', (req, res) => {
  try {
    const { title, subject, content } = req.body;
    const noteId = Number(req.params.id);

    if (!Number.isInteger(noteId) || noteId <= 0) {
      return res.status(400).json({
        message: 'Invalid note ID',
      });
    }

    if (!title || !title.trim()) {
      return res.status(400).json({
        message: 'Note title is required',
      });
    }

    if (!allowedSubjects.includes(subject)) {
      return res.status(400).json({
        message: 'Invalid subject',
      });
    }

    const result = db.prepare(`
      UPDATE notes
      SET title = ?,
          subject = ?,
          content = ?,
          updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `).run(title.trim(), subject, content || '', noteId);

    if (result.changes === 0) {
      return res.status(404).json({
        message: 'Note not found',
      });
    }

    const updatedNote = db.prepare(`
      SELECT * FROM notes WHERE id = ?
    `).get(noteId);

    res.json(updatedNote);
  } catch (error) {
    console.error('Update note error:', error);

    res.status(500).json({
      message: 'Failed to update note',
    });
  }
});

// Delete a note
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
      WHERE id = ?
    `).run(noteId);

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

  if (!['Java', 'DSA', 'Aptitude'].includes(subject)) {
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
    INSERT INTO pomodoro_sessions (subject, duration_minutes)
    VALUES (?, ?)
  `).run(subject, duration_minutes);

  const session = db.prepare(`
    SELECT *
    FROM pomodoro_sessions
    WHERE id = ?
  `).get(result.lastInsertRowid);

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

      UNION

      SELECT DISTINCT
        date(completed_at, '+5 hours', '+30 minutes') AS study_date
      FROM pomodoro_sessions
    `).all().map((row) => row.study_date);

    const dates = [...new Set(studyDates)].sort();

    const today = new Intl.DateTimeFormat('en-CA', {
      timeZone: 'Asia/Kolkata',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    }).format(new Date());

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

function startServer({ databasePath = path.join(__dirname, 'preptrack.db'), port = 5000, DatabaseClass } = {}) {
  let db;
  try {
    const Database = DatabaseClass || require('better-sqlite3');
    db = new Database(databasePath);
    const app = createApp({ db });
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

if (require.main === module) startServer();

module.exports = { createApp, startServer };
