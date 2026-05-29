const express = require('express');

const app = express();
const port = 3000;

// In-memory student data
let students = [
  { id: 1, name: 'Alice Johnson', email: 'alice@example.com' },
  { id: 2, name: 'Bob Smith', email: 'bob@example.com' },
  { id: 3, name: 'Charlie Brown', email: 'charlie@example.com' },
];

// Middleware
app.use(express.json());

// API: Get all students (JSON)
app.get('/api/students', (req, res) => {
  res.json(students);
});

// API: Get single student
app.get('/api/students/:id', (req, res) => {
  const student = students.find(s => s.id === parseInt(req.params.id));
  if (student) {
    res.json(student);
  } else {
    res.status(404).json({ error: 'Student not found' });
  }
});

// API: Create student
app.post('/api/students', (req, res) => {
  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).json({ error: 'Name and email are required' });
  }

  const newStudent = {
    id: Math.max(...students.map(s => s.id), 0) + 1,
    name,
    email,
  };

  students.push(newStudent);
  res.status(201).json(newStudent);
});

// API: Update student
app.put('/api/students/:id', (req, res) => {
  const student = students.find(s => s.id === parseInt(req.params.id));

  if (!student) {
    return res.status(404).json({ error: 'Student not found' });
  }

  if (req.body.name) student.name = req.body.name;
  if (req.body.email) student.email = req.body.email;

  res.json(student);
});

// API: Delete student
app.delete('/api/students/:id', (req, res) => {
  const index = students.findIndex(s => s.id === parseInt(req.params.id));

  if (index === -1) {
    return res.status(404).json({ error: 'Student not found' });
  }

  const deleted = students.splice(index, 1);
  res.json(deleted[0]);
});

// Start server (only if not being tested)
if (require.main === module) {
  app.listen(port, () => {
    console.log(`✅ Server running at http://localhost:${port}`);
    console.log('📚 API: GET /api/students');
  });
}

module.exports = app;
