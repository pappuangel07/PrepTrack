
const express = require('express');
const Database = require('better-sqlite3');
const path = require('path');

const app = express();
const PORT = 5000;

app.use(express.json());

// Create/open the SQLite database file
const dbPath = path.join(__dirname, 'preptrack.db');
const db = new Database(dbPath);

// Create the roadmap table if it does not exist
db.exec(`
  CREATE TABLE IF NOT EXISTS roadmap (
    id INTEGER PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'Not Started'
  )
`);

// Add initial roadmap items only when the table is empty
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

// Home route
app.get('/', (req, res) => {
  res.json({
    message: 'PrepTrack backend is running!'
  });
});

// Get all roadmap items from the database
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

// Start the backend server
app.listen(PORT, () => {
  console.log(`PrepTrack server running on http://localhost:${PORT}`);
});
