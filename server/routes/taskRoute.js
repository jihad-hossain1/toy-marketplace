const express = require("express");
const {
  searchTaskByTitle,
  getPaginatedTasks,
  getTasks,
  createTask,
  deleteTask,
  getTaskById,
  updateTask,
} = require("../controller/tasks");

const router = express.Router();

router.get("/tasks", getTasks);

router.get("/tasks/:taskId", getTaskById);

router.post("/tasks", createTask);

router.delete("/task", deleteTask);

router.patch("/task", updateTask);

router.get("/search/:title", searchTaskByTitle);

router.get("/paginatedTask", getPaginatedTasks);

module.exports = router;
