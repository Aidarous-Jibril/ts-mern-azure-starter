import { Router } from "express";
import { listTodos, createTodo, toggleDone, removeTodo } from "../controllers/TodoControllers.js";

const router = Router();

router.get("/", listTodos);
router.post("/", createTodo);
router.patch("/:id/toggle", toggleDone);
router.delete("/:id", removeTodo);

export default router;
