import dotenv from "dotenv";
import express from "express";
import cors from "cors";

import healthRoutes from "./routes/healthRoutes.js";
import todoRoutes from "./routes/todoRoutes.js";
import { connectDB } from "./config/db.js";

dotenv.config();

const app = express();

// middleware
app.use(cors({ origin: "*" }));
app.use(express.json());

// routes
app.use("/api/health", healthRoutes);
app.use("/api/todos", todoRoutes);

// 404
app.use((req, res) => res.status(404).json({ message: "Not Found" }));

// error handler
app.use((err, req, res, next) => {
  console.error("Error:", err);
  res.status(500).json({ message: "Internal Server Error" });
});

// boot
const PORT = process.env.PORT || 8080;
const MONGO_URI = process.env.MONGO_URI;

(async () => {
  try {
    await connectDB(MONGO_URI);
    app.listen(PORT, () => console.log(`API listening on :${PORT}`));
  } catch (err) {
    console.error("Startup error:", err.message);
    process.exit(1);
  }
})();
