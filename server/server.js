
const express = require('express');

const app = express();
const PORT = 5000;

app.use(express.json());

// Roadmap data stored temporarily in server memory
const roadmap = [
  {
    id: 1,
    title: 'Java',
    description: 'Learn programming fundamentals and OOP.',
    status: 'Not Started'
  },
  {
    id: 2,
    title: 'Data Structures and Algorithms',
    description: 'Learn DSA concepts and solve coding problems.',
    status: 'Not Started'
  },
  {
    id: 3,
    title: 'Aptitude',
    description: 'Practice quantitative, logical and verbal reasoning.',
    status: 'Not Started'
  }
];

// Home route
app.get('/', (req, res) => {
  res.json({
    message: 'PrepTrack backend is running!'
  });
});

// Get the complete placement preparation roadmap
app.get('/api/roadmap', (req, res) => {
  res.json(roadmap);
});

// Update the status of a roadmap item
app.patch('/api/roadmap/:id', (req, res) => {
  const id = Number(req.params.id);
  const { status } = req.body;

  const allowedStatuses = [
    'Not Started',
    'In Progress',
    'Completed'
  ];

  // Validate the requested status
  if (!allowedStatuses.includes(status)) {
    return res.status(400).json({
      message: 'Invalid status'
    });
  }

  // Find the roadmap item using its ID
  const item = roadmap.find((entry) => entry.id === id);

  if (!item) {
    return res.status(404).json({
      message: 'Roadmap item not found'
    });
  }

  // Update the item's status
  item.status = status;

  res.json({
    message: 'Progress updated successfully',
    item
  });
});

// Start the backend server
app.listen(PORT, () => {
  console.log(`PrepTrack server running on http://localhost:${PORT}`);
});
