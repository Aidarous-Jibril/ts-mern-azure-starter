import Todo from "../models/todo.js"; 

export const listTodos = async (req, res, next) => {
  try {
    const todos = await Todo.find().sort({ createdAt: -1 });
    res.json(todos);
  } catch (err) { next(err); }
};

export const createTodo = async (req, res, next) => {
  try {
    const todo = await Todo.create({ text: req.body.text });
    res.status(201).json(todo);
  } catch (err) { next(err); }
};

export const toggleDone = async (req, res, next) => {
  try {
    const todo = await Todo.findById(req.params.id);
    if (!todo) return res.status(404).json({ message: "Todo not found" });
    todo.done = !todo.done;
    await todo.save();
    res.json(todo);
  } catch (err) { next(err); }
};

export const removeTodo = async (req, res, next) => {
  try {
    const removed = await Todo.findByIdAndDelete(req.params.id);
    if (!removed) return res.status(404).json({ message: "Todo not found" });
    res.json({ message: "Deleted" });
  } catch (err) { next(err); }
};
