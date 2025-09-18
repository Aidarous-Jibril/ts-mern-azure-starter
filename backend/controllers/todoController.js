import expressAsyncHandler from "express-async-handler";
import Todo from '../models/todo.js';

// GET /api/todos
export const list = expressAsyncHandler(async (req, res) => {
  const items = await Todo.find().sort({ createdAt: -1 });
  res.json(items);
});

// POST /api/todos  { title }
export const create = expressAsyncHandler(async (req, res) => {
  const { title } = req.body || {};
  if (!title || !title.trim()) {
    return res.status(400).json({ error: "Title is required" });
  }
  const item = await Todo.create({ title: title.trim() });
  res.status(201).json(item);
});

// PATCH /api/todos/:id  { title?, completed? }
export const update = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  const updates = {};
  if (typeof req.body.title === "string") updates.title = req.body.title.trim();
  if (typeof req.body.completed === "boolean") updates.completed = req.body.completed;

  const item = await Todo.findByIdAndUpdate(id, updates, { new: true });
  if (!item) return res.status(404).json({ error: "Not found" });
  res.json(item);
});

// DELETE /api/todos/:id
export const removeItem = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  const item = await Todo.findByIdAndDelete(id);
  if (!item) return res.status(404).json({ error: "Not found" });
  res.json({ ok: true });
});
