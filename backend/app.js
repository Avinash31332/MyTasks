import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import db from "./config/db.js";
db();
import tasksRouter from "./routes/tasks.routes.js";
const PORT = process.env.PORT;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.get("/", (req, res) => {
  res.send("This is homepage");
});

app.use("/api/tasks", tasksRouter);

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
