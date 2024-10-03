import { toDoModel } from '../models/to-do-list.js'
import { asyncHandler } from '../middlewares/asyncHandler.js';

export const createTodo = asyncHandler(async (req, res) => {
  const createdTodo = await toDoModel.create(req.body);
  if (!createdTodo) {
    return res.status(500).json({ message: 'Unable to create to-do' });
  }
  res.status(201).json(createdTodo);
});

export const getTodos = asyncHandler(async (req, res) => {
  const toDoList = await toDoModel.find();
  res.status(200).json({ toDoList, length: toDoList.length });
});

export const getTodoById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const selectedTodo = await toDoModel.findById(id);
  if (!selectedTodo) {
    return res.status(404).json({ message: 'To-Do item not found' });
  }
  res.status(200).json(selectedTodo);
});

export const updateTodo = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const updatedTodo = await toDoModel.findByIdAndUpdate(id, req.body, { new: true });
  if (!updatedTodo) {
    return res.status(404).json({ message: 'To-Do item not found' });
  }
  res.status(200).json({ message: 'Updated successfully', updatedTodo });
});

export const updateTodoStatus = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!['pending', 'completed'].includes(status)) {
    return res.status(400).json({ message: 'Invalid status value.' });
  }

  const updatedTodo = await toDoModel.findByIdAndUpdate(id, { status }, { new: true });
  if (!updatedTodo) {
    return res.status(404).json({ message: 'To-Do item not found' });
  }

  res.status(200).json({ message: 'Status updated successfully', updatedTodo });
});

export const deleteTodo = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const deletedTodo = await toDoModel.findByIdAndDelete(id);
  if (!deletedTodo) {
    return res.status(404).json({ message: 'To-Do item not found' });
  }
  res.status(200).json({ message: 'Deleted successfully', deletedTodo });
});
