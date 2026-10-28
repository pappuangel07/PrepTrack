
const express = require('express');

const app = express();
const PORT = 5000;

app.use(express.json());

// Home route
app.get('/', (req, res) => {
  res.json({
    message: 'PrepTrack backend is running!'
  });
});

// Placement preparation roadmap API
app.get('/api/roadmap', (req, res) => {
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

  res.json(roadmap);
});

app.listen(PORT, () => {
  console.log(`PrepTrack server running on http://localhost:${PORT}`);
});
