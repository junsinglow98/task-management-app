const express = require("express");
const { v4: uuidv4 } = require('uuid');
const cors = require('cors'); 
const bodyParser = require('body-parser');

const PORT = process.env.PORT || 3001;

const app = express();

let tasks = []

app.use(bodyParser.json());
app.use(express.json());

app.use(cors({ origin: "*" }));


app.get('/tasks', (req, res) => {
  res.json(tasks);
});

// POST a new task
app.post("/tasks", (req, res) => {
  // Initialize task
  const date = req.body.date;
  const name = 'New Task';
  const completed = false;
  const editing = true;
  const priority = 1;
  const id = uuidv4();
  const task = { id, name, completed, editing, priority, date };

  // Push the task to the tasks array
  tasks.push(task);
  res.json(tasks);
});

// PUT a task by ID
app.put("/tasks/:id", (req, res) => {
  const { id } = req.params;

  // Find the task with the given ID
  const taskIndex = tasks.findIndex(task => task.id === id);

  // Update task 
  const { name, completed, priority } = req.body;
  if (taskIndex !== -1) {
    tasks[taskIndex].name = name;
    tasks[taskIndex].completed = completed;
    tasks[taskIndex].priority = priority;
    tasks[taskIndex].editing = !tasks[taskIndex].editing;
    res.json(tasks);
  } else {
    res.status(404).json({ message: 'Task not found' });
  }
});

// PUT a task complete status by ID
app.put("/tasks/completed/:id", (req, res) => {
  const { id } = req.params;

  // Find the task with the given ID
  const taskIndex = tasks.findIndex(task => task.id === id);
  const { completed } = req.body;

  // Update task status
  if (taskIndex !== -1) {
    tasks[taskIndex].completed = completed;
    res.json(tasks);
  } else {
    res.status(404).json({ message: 'Task not found' });
  }
});

// DELETE a task by ID
app.delete("/tasks/:id", (req, res) => {
  const { id } = req.params;

  // Find the index of the task with the given ID
  const taskIndex = tasks.findIndex(task => task.id === id);

  // Remove the task from the tasks array
  if (taskIndex !== -1) {
    tasks.splice(taskIndex, 1);
    res.json(tasks);
  } else {
    res.status(404).json({ error: "Task not found" });
  }
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
