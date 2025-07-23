const fs = require('fs');
const path = require('path');
const filePath = path.join(__dirname, '../data/todos.json');

const readTodos = () => {
  const data = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(data);
};

const writeTodos = todos => {
  fs.writeFileSync(filePath, JSON.stringify(todos, null, 2), 'utf-8');
};

const getAllTodos = (req, res) => {
  const data = readTodos();
  res.json(data);
};

const createTodo = (req, res) => {
  const todos = readTodos();
  const { task, time, done } = req.body;
  if (!task?.trim() || !time) {
    return res.status(400).json({ error: 'تسک و زمان الزامی است' });
  }

  const newTodo = {
    id: Date.now().toString(),
    task,
    time,
    done: !!done
  };

  todos.push(newTodo);
  writeTodos(todos);
  res.status(201).json(newTodo);
};

const deleteTodo = (req, res) => {
  const todos = readTodos();
  const { id } = req.params;
  const newTodos = todos.filter(t => t.id !== id);
  if (newTodos.length === todos.length) {
    return res.status(404).json({ error: 'تسک پیدا نشد' });
  }
  writeTodos(newTodos);
  res.json(newTodos);
};

const updateTodo = (req, res) => {
  const todos = readTodos();
  const { id } = req.params;
  const { done } = req.body;
  const todo = todos.find(t => t.id === id);
  if (!todo) {
    return res.status(404).json({ error: 'تسک پیدا نشد' });
  }
  todo.done = !!done;
  writeTodos(todos);
  res.json(todo);
};

module.exports = {
  getAllTodos,
  createTodo,
  deleteTodo,
  updateTodo
};
