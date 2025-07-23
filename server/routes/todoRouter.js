const express = require('express');
const router = express.Router();
const {
  getAllTodos,
  createTodo,
  deleteTodo,
  updateTodo
} = require('../controllers/todoController');

router.get('/', getAllTodos);
router.post('/', createTodo);
router.delete('/:id', deleteTodo);
router.patch('/:id', updateTodo);

module.exports = router;
