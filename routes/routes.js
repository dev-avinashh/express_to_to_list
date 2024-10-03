import express from 'express';
import { createTodo, deleteTodo, getTodoById, getTodos, updateTodo, updateTodoStatus } from '../controllers/controller.js';

 

const router = express.Router();

// Define the routes
router.post('/create', createTodo);
router.get('/', getTodos);
router.get('/:id', getTodoById);
router.put('/:id', updateTodo);
router.put('/change-status/:id', updateTodoStatus);
router.delete('/:id', deleteTodo);

export default router;
