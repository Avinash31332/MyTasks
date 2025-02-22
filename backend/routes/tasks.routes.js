import express from "express";
import taskModel from "../models/tasks.model.js";
const router = express.Router();

router.get("/", async (req, res) => {
  const tasks = await taskModel.find();
  return res.status(200).json(tasks);
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const task = await taskModel.findById(id);
    if (!task)
      return res.status(404).json({
        message: "No data is found with the id",
      });
    return res.status(200).json(task);
  } catch (err) {
    return res.status(500).json({
      message: "error in fetching data",
      err: err.message,
    });
  }
});

router.post("/", async (req, res) => {
  const { title, description } = req.body;
  if (!title || !description)
    return res.status(403).json({
      message: "please provide all the fields",
    });
  try {
    const newTask = await taskModel.create({
      title,
      description,
    });
    return res.status(201).json({
      message: "data created successfully",
      data: newTask,
    });
  } catch (err) {
    return res.status(500).json({
      message: "error in creating data",
      err: err.message,
    });
  }
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { title, description, status } = req.body;
  try {
    const updatedTask = await taskModel.findByIdAndUpdate(
      id,
      { title, description, status },
      { new: true }
    );
    if (!updatedTask)
      return res.status(404).json({
        message: `can't find data with the ID`,
      });
    return res.status(200).json({
      message: "data updated successfully",
      data: updatedTask,
    });
  } catch (err) {
    return res.status(500).json({
      message: "error in updating data",
      err: err.message,
    });
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deleteTask = await taskModel.findByIdAndDelete(id);
    if (!deleteTask)
      return res.status(404).json({
        message: `can't find data with the ID`,
      });
    return res.status(200).json({
      message: "data deleted successfully",
    });
  } catch (err) {
    return res.status(500).json({
      message: "error in deleting data",
      err: err.message,
    });
  }
});

export default router;
