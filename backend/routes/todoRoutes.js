import express from "express";
import { list, create, update, removeItem } from "../controllers/todoController.js";

const router = express.Router();

router.get("/", list);
router.post("/", create);
router.patch("/:id", update);
router.delete("/:id", removeItem);

export default router;
