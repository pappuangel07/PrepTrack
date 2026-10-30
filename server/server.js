
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

// Create the study sessions table
db.exec(`
  CREATE TABLE IF NOT EXISTS study_sessions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    subject TEXT NOT NULL
      CHECK (subject IN ('Java', 'DSA', 'Aptitude')),
    topic TEXT NOT NULL,
    study_date TEXT NOT NULL,
    start_time TEXT NOT NULL,
    duration_minutes INTEGER NOT NULL
      CHECK (duration_minutes > 0),
    completed INTEGER NOT NULL DEFAULT 0
      CHECK (completed IN (0, 1)),
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
  )
`);

 // Create the Java topics table
db.exec(`
  CREATE TABLE IF NOT EXISTS java_topics (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL UNIQUE,
    category TEXT NOT NULL,
    description TEXT NOT NULL DEFAULT '',
    status TEXT NOT NULL DEFAULT 'Not Started'
      CHECK (status IN ('Not Started', 'In Progress', 'Completed')),
    sort_order INTEGER NOT NULL UNIQUE
  )
`);
db.exec(`
  CREATE TABLE IF NOT EXISTS dsa_topics (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL UNIQUE,
    category TEXT NOT NULL,
    description TEXT NOT NULL DEFAULT '',
    status TEXT NOT NULL DEFAULT 'Not Started'
      CHECK (status IN ('Not Started', 'In Progress', 'Completed')),
    sort_order INTEGER NOT NULL UNIQUE
  )
`);

db.exec(`
  CREATE TABLE IF NOT EXISTS aptitude_topics (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL UNIQUE,
    category TEXT NOT NULL,
    description TEXT NOT NULL DEFAULT '',
    status TEXT NOT NULL DEFAULT 'Not Started'
      CHECK (status IN ('Not Started', 'In Progress', 'Completed')),
    sort_order INTEGER NOT NULL UNIQUE
  )
`);


const aptitudeTopics = [
  ['Number System', 'Quantitative Aptitude', 'Natural numbers, integers, divisibility, factors and multiples.', 1],
  ['HCF and LCM', 'Quantitative Aptitude', 'Find HCF and LCM and solve related problems.', 2],
  ['Simplification', 'Quantitative Aptitude', 'BODMAS, fractions, decimals and basic calculations.', 3],
  ['Percentages', 'Quantitative Aptitude', 'Percentage conversions, increase, decrease and applications.', 4],
  ['Ratio and Proportion', 'Quantitative Aptitude', 'Ratios, proportions and direct or inverse variation.', 5],
  ['Averages', 'Quantitative Aptitude', 'Calculate averages and solve missing-value problems.', 6],
  ['Profit and Loss', 'Quantitative Aptitude', 'Cost price, selling price, profit, loss and discount.', 7],
  ['Simple Interest', 'Quantitative Aptitude', 'Principal, rate, time and simple interest calculations.', 8],
  ['Compound Interest', 'Quantitative Aptitude', 'Compound interest, growth and depreciation basics.', 9],
  ['Time and Work', 'Quantitative Aptitude', 'Work rates, combined work and efficiency.', 10],
  ['Pipes and Cisterns', 'Quantitative Aptitude', 'Inlet, outlet and combined filling or emptying problems.', 11],
  ['Time, Speed and Distance', 'Quantitative Aptitude', 'Speed, distance, time and relative motion.', 12],
  ['Problems on Trains', 'Quantitative Aptitude', 'Train speed, crossing poles and crossing platforms.', 13],
  ['Boats and Streams', 'Quantitative Aptitude', 'Upstream, downstream and stream speed problems.', 14],
  ['Mixtures and Alligation', 'Quantitative Aptitude', 'Mixing quantities at different prices or concentrations.', 15],
  ['Permutations and Combinations', 'Quantitative Aptitude', 'Counting arrangements and selections.', 16],
  ['Probability', 'Quantitative Aptitude', 'Basic probability rules and common problems.', 17],
  ['Data Interpretation', 'Quantitative Aptitude', 'Tables, bar charts, pie charts and line graphs.', 18],
  ['Logical Reasoning', 'Logical Reasoning', 'Patterns, deductions and analytical reasoning.', 19],
  ['Number and Letter Series', 'Logical Reasoning', 'Identify patterns in numerical and alphabetical sequences.', 20],
  ['Coding and Decoding', 'Logical Reasoning', 'Recognize letter, number and symbol coding patterns.', 21],
  ['Blood Relations', 'Logical Reasoning', 'Solve family relationship questions.', 22],
  ['Directions and Distance', 'Logical Reasoning', 'Track directions, turns and relative positions.', 23],
  ['Seating Arrangements', 'Logical Reasoning', 'Solve linear and circular arrangement problems.', 24],
  ['Verbal Ability', 'Verbal Ability', 'Grammar, vocabulary, sentence correction and reading comprehension.', 25]
];

const insertAptitudeTopic = db.prepare(`
  INSERT INTO aptitude_topics
    (title, category, description, sort_order)
  VALUES (?, ?, ?, ?)
`);

const insertAptitudeTopics = db.transaction((topics) => {
  for (const topic of topics) {
    insertAptitudeTopic.run(...topic);
  }
});

const existingAptitudeTopics = db
  .prepare('SELECT COUNT(*) AS count FROM aptitude_topics')
  .get().count;

if (existingAptitudeTopics === 0) {
  insertAptitudeTopics(aptitudeTopics);
}

const javaTopicCount = db.prepare(
  'SELECT COUNT(*) AS count FROM java_topics'
).get();

if (javaTopicCount.count === 0) {
  const javaTopics = [
    ['Java Fundamentals', 'Core Java', 'JDK, JRE, JVM, program structure and main method.', 1],
    ['Variables and Data Types', 'Core Java', 'Variables, primitive types, type casting and constants.', 2],
    ['Operators', 'Core Java', 'Arithmetic, relational, logical and assignment operators.', 3],
    ['Input and Output', 'Core Java', 'Scanner, user input and console output.', 4],
    ['Conditional Statements', 'Control Flow', 'if, else if, else and switch.', 5],
    ['Loops', 'Control Flow', 'for, while, do-while, break and continue.', 6],
    ['Methods', 'Core Java', 'Parameters, return values, method overloading and scope.', 7],
    ['Arrays', 'Core Java', 'One-dimensional and multidimensional arrays.', 8],
    ['Strings', 'Core Java', 'String, StringBuilder, immutability and common methods.', 9],
    ['Classes and Objects', 'OOP', 'Classes, objects, fields, methods and constructors.', 10],
    ['Encapsulation', 'OOP', 'Access modifiers, getters, setters and data hiding.', 11],
    ['Inheritance', 'OOP', 'extends, super and types of inheritance supported in Java.', 12],
    ['Polymorphism', 'OOP', 'Method overloading and method overriding.', 13],
    ['Abstraction and Interfaces', 'OOP', 'Abstract classes, interfaces and implementation.', 14],
    ['Exception Handling', 'Core Java', 'try, catch, finally, throw, throws and custom exceptions.', 15],
    ['Collections Framework', 'Collections', 'List, Set, Queue, Map and their common implementations.', 16],
    ['Generics', 'Collections', 'Generic classes, methods and type safety.', 17],
    ['File Handling', 'Core Java', 'Read and write files using Java I/O basics.', 18],
    ['Lambda Expressions', 'Modern Java', 'Functional interfaces and lambda syntax.', 19],
    ['Stream API', 'Modern Java', 'filter, map, sorted, collect and stream operations.', 20],
    ['Multithreading Basics', 'Advanced Java', 'Threads, Runnable and synchronization basics.', 21],
    ['Wrapper Classes and Autoboxing', 'Core Java', 'Wrapper types, boxing and unboxing.', 22],
    ['Recursion', 'Problem Solving', 'Base cases, recursive calls and stack behavior.', 23],
    ['Time and Space Complexity', 'Problem Solving', 'Big O notation and basic complexity analysis.', 24],
    ['Java Coding Practice', 'Problem Solving', 'Solve beginner problems using methods, arrays and strings.', 25]
  ];

  const insertJavaTopic = db.prepare(`
    INSERT INTO java_topics
      (title, category, description, sort_order)
    VALUES (?, ?, ?, ?)
  `);

  const insertJavaTopics = db.transaction((topics) => {
    for (const topic of topics) {
      insertJavaTopic.run(...topic);
    }
  });

  insertJavaTopics(javaTopics);
}

const dsaTopics = [
  ['DSA Introduction', 'Fundamentals', 'Understand data structures, algorithms and problem-solving.', 1],
  ['Time and Space Complexity', 'Fundamentals', 'Understand Big O, time complexity and space complexity.', 2],
  ['Arrays', 'Arrays', 'Traversal, insertion, deletion, searching and array problems.', 3],
  ['Strings', 'Strings', 'String traversal, manipulation and common coding problems.', 4],
  ['Searching', 'Searching and Sorting', 'Linear search and binary search.', 5],
  ['Sorting', 'Searching and Sorting', 'Bubble, selection, insertion, merge and quick sort.', 6],
  ['Recursion', 'Recursion and Backtracking', 'Base cases, recursive calls and recursion trees.', 7],
  ['Backtracking', 'Recursion and Backtracking', 'Solve problems by exploring and undoing choices.', 8],
  ['Linked Lists', 'Linked Lists', 'Singly linked lists, doubly linked lists and operations.', 9],
  ['Stacks', 'Stacks and Queues', 'Stack operations and stack-based problems.', 10],
  ['Queues', 'Stacks and Queues', 'Queues, circular queues and deque basics.', 11],
  ['Hashing', 'Hashing', 'Hash maps, hash sets and frequency counting.', 12],
  ['Two Pointers', 'Problem-Solving Patterns', 'Solve array and string problems using two pointers.', 13],
  ['Sliding Window', 'Problem-Solving Patterns', 'Fixed and variable sliding-window techniques.', 14],
  ['Binary Trees', 'Trees', 'Tree traversal, height and basic tree operations.', 15],
  ['Binary Search Trees', 'Trees', 'BST search, insertion and deletion basics.', 16],
  ['Heaps and Priority Queues', 'Trees and Heaps', 'Heap operations and priority queue problems.', 17],
  ['Graphs', 'Graphs', 'Graph representation, BFS and DFS.', 18],
  ['Greedy Algorithms', 'Algorithms', 'Make locally optimal choices and solve greedy problems.', 19],
  ['Dynamic Programming', 'Algorithms', 'Memoization, tabulation and common DP patterns.', 20],
  ['Trie', 'Advanced Data Structures', 'Prefix trees and string-search applications.', 21],
  ['Disjoint Set Union', 'Advanced Data Structures', 'Union-Find, path compression and union by rank.', 22],
  ['Bit Manipulation', 'Advanced Topics', 'Bitwise operators and common bit manipulation problems.', 23],
  ['Monotonic Stack and Queue', 'Advanced Topics', 'Use monotonic structures to solve range problems.', 24],
  ['DSA Coding Practice', 'Problem Solving', 'Practice problems from easy to medium difficulty.', 25]
];

const insertDsaTopic = db.prepare(`
  INSERT INTO dsa_topics
    (title, category, description, sort_order)
  VALUES (?, ?, ?, ?)
`);

const insertDsaTopics = db.transaction((topics) => {
  for (const topic of topics) {
    insertDsaTopic.run(...topic);
  }
});

const existingDsaTopics = db
  .prepare('SELECT COUNT(*) AS count FROM dsa_topics')
  .get().count;

if (existingDsaTopics === 0) {
  insertDsaTopics(dsaTopics);
}

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

// Start the backend server
app.listen(PORT, () => {
  console.log(
    `PrepTrack server running on http://localhost:${PORT}`
  );
});
