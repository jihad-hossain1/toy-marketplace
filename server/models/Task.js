const mongoose = require("mongoose");

const taskSchema = mongoose.Schema(
  {
    name: String,
    details: String,
    email: String,
  },
  {
    timestamps: true,
  }
);

const Task = mongoose.models.Task || mongoose.model("Task", taskSchema);

module.exports = Task;
