
const express = require('express');
const Database = require('better-sqlite3');
const path = require('path');

const app = express();
const PORT = 5000;

app.use(express.json());

// Open the SQLite database
const dbPath = path.join(__dirname, 'preptrack.db');
const db = new Database(dbPath);

// Create the roadmap table
db.exec(`
  CREATE TABLE IF NOT EXISTS roadmap (
    id INTEGER PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'Not Started'
  )
`);

// Insert initial roadmap items only when the table is empty
const roadmapCount = db.prepare(
  'SELECT COUNT(*) AS count FROM roadmap'
).get();

if (roadmapCount.count === 0) {
  const insertRoadmap = db.prepare(`
    INSERT INTO roadmap (id, title, description, status)
    VALUES (?, ?, ?, ?)
  `);

  const initialItems = [
    [
      1,
      'Java',
      'Learn programming fundamentals and OOP.',
      'Not Started'
    ],
    [
      2,
      'Data Structures and Algorithms',
      'Learn DSA concepts and solve coding problems.',
      'Not Started'
    ],
    [
      3,
      'Aptitude',
      'Practice quantitative, logical and verbal reasoning.',
      'Not Started'
    ]
  ];

  const insertMany = db.transaction((items) => {
    for (const item of items) {
      insertRoadmap.run(...item);
    }
  });

  insertMany(initialItems);
}

// Create the tasks table
db.exec(`
  CREATE TABLE IF NOT EXISTS tasks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    description TEXT NOT NULL DEFAULT '',
    due_date TEXT,
    completed INTEGER NOT NULL DEFAULT 0
  )
`);

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

// Get all tasks
app.get('/api/tasks', (req, res) => {
  const tasks = db.prepare(
    'SELECT * FROM tasks ORDER BY id DESC'
  ).all();

  res.json(tasks);
});

// Create a new task
app.post('/api/tasks', (req, res) => {
  const { title, description = '', due_date = null } = req.body;

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

  const result = db.prepare(`
    INSERT INTO tasks (title, description, due_date)
    VALUES (?, ?, ?)
  `).run(title.trim(), description.trim(), due_date);

  const newTask = db.prepare(
    'SELECT * FROM tasks WHERE id = ?'
  ).get(result.lastInsertRowid);

  res.status(201).json({
    message: 'Task created successfully',
    task: newTask
  });
});

// Mark a task as completed or incomplete
app.patch('/api/tasks/:id', (req, res) => {
  const id = Number(req.params.id);
  const { completed } = req.body;

  if (!Number.isInteger(id) || id < 1) {
    return res.status(400).json({
      message: 'Invalid task ID'
    });
  }

  if (typeof completed !== 'boolean') {
    return res.status(400).json({
      message: 'Completed must be true or false'
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

  db.prepare(
    'UPDATE tasks SET completed = ? WHERE id = ?'
  ).run(completed ? 1 : 0, id);

  const updatedTask = db.prepare(
    'SELECT * FROM tasks WHERE id = ?'
  ).get(id);

  res.json({
    message: 'Task updated successfully',
    task: updatedTask
  });
});

// Delete a task
app.delete('/api/tasks/:id', (req, res) => {
  const id = Number(req.params.id);

  if (!Number.isInteger(id) || id < 1) {
    return res.status(400).json({
      message: 'Invalid task ID'
    });
  }

  const result = db.prepare(
    'DELETE FROM tasks WHERE id = ?'
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

// Start the backend server
app.listen(PORT, () => {
  console.log(
    `PrepTrack server running on http://localhost:${PORT}`
  );
});
