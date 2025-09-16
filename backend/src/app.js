import express from "express";
import cors from "cors";

import healthRoutes from "../routes/healthRoutes.js";
import todoRoutes from "../routes/todoRoutes.js";

const app = express();

app.use(cors({ origin: "*" }));
app.use(express.json());

app.use("/api/health", healthRoutes);
app.use("/api/todos", todoRoutes);

// 404
app.use((req, res) => res.status(404).json({ message: "Not Found" }));

// Error handler
app.use((err, req, res, next) => {
  console.error("Error:", err);
  res.status(500).json({ message: "Internal Server Error" });
});

export default app;
