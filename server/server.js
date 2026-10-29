
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
    [1, 'Java', 'Learn programming fundamentals and OOP.', 'Not Started'],
    [2, 'Data Structures and Algorithms', 'Learn DSA concepts and solve coding problems.', 'Not Started'],
    [3, 'Aptitude', 'Practice quantitative, logical and verbal reasoning.', 'Not Started']
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

// Safely add priority to existing databases
const taskColumns = db.prepare('PRAGMA table_info(tasks)').all();
const hasPriority = taskColumns.some(
  (column) => column.name === 'priority'
);

if (!hasPriority) {
  db.exec(`
    ALTER TABLE tasks
    ADD COLUMN priority TEXT NOT NULL DEFAULT 'Medium'
  `);
}
// Safely add deleted flag to existing databases
const taskColumnsAfterPriority = db.prepare(
  'PRAGMA table_info(tasks)'
).all();

const hasDeleted = taskColumnsAfterPriority.some(
  (column) => column.name === 'deleted'
);

if (!hasDeleted) {
  db.exec(`
    ALTER TABLE tasks
    ADD COLUMN deleted INTEGER NOT NULL DEFAULT 0
  `);
}

// Allowed task priorities
const allowedPriorities = ['High', 'Medium', 'Low'];

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

// Start the backend server
app.listen(PORT, () => {
  console.log(
    `PrepTrack server running on http://localhost:${PORT}`
  );
});
