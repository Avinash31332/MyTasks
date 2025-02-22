import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import db from "./config/db.js";
db();
import tasksRouter from "./routes/tasks.routes.js";

const PORT = process.env.PORT || 5000;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: "*", // Allow all origins temporarily for testing
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// 🔹 Preflight request handler (CORS fix for `OPTIONS`)
app.options("*", (req, res) => res.sendStatus(200));

app.get("/", (req, res) => {
  res.send("This is homepage");
});

app.use("/api/tasks", tasksRouter);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
