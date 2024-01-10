const mongoose = require("mongoose");
const Task = require("../models/Task");

const createTask = async (req, res) => {
  const isReq = await req.body;

  try {
    const { price, name } = isReq;
    let isCreate = await Task.create(isReq);
    res.status(201).json(isCreate);
  } catch (error) {
    res.status(404).json({ message: "failed to create task", error: error });
  }
};

const searchTaskByTitle = async (req, res) => {
  const queryTittle = new RegExp(req.params?.title, "i");

  if (queryTittle !== "") {
    try {
      const search_results = await Task.find({ title: queryTittle });
      res.status(200).json(search_results);
    } catch (error) {
      console.log(error);
      res.status(404).json({ message: "no matched task found" });
    }
  } else {
    res.status(404).json({ message: "no query title !" });
  }
};

const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({});
    res.json(tasks);
    // const
  } catch (error) {
    res
      .status(401)
      .json({ message: "problem wiht geting blogs from server", error: error });
  }
};

const getPaginatedTasks = async (req, res) => {
  const { page } = req.query;

  try {
    const LIMIT = 5;

    const startIndex = (Number(page) - 1) * LIMIT;

    const total = await Task.countDocuments({});

    const tasks = await Task.find()
      .sort({ _id: -1 })
      .limit(LIMIT)
      .skip(startIndex);

    res.status(200).json({
      data: tasks,
      currentPage: Number(page),
      numberOfPages: Math.ceil(total / LIMIT),
    });
  } catch (error) {
    res
      .status(401)
      .json({ message: "problem wiht geting blogs from server", error: error });
  }
};

const getTaskById = async (req, res) => {
  const tid = req.params?.taskId;
  try {
    if (mongoose.Types.ObjectId.isValid(tid)) {
      const task = await Task.findById(tid);
      res.json(task);
    } else {
      res.status(404).json({ message: "task not found" });
    }
  } catch (error) {
    throw new Error("Task not found");
  }
};

const updateTask = async (req, res) => {
  const tid = req.body?.id;
  let { details } = req.body;
  try {
    if (mongoose.Types.ObjectId.isValid(tid)) {
      if (tid) {
        const upTask = await Task.findByIdAndUpdate(tid, {
          $set: { details: details },
        });
        res.status(201).json(upTask);
      } else {
        res
          .status(404)
          .json({ message: "task not updated: not found task id!" });
      }
    } else {
      res.status(404).json({ message: "task not updated" });
    }
  } catch (error) {
    throw new Error("Task not found");
  }
};

const deleteTask = async (req, res) => {
  const tid = req.body?.id;
  try {
    const _f = await Task.findById(tid);
    if (mongoose.Types.ObjectId.isValid(tid)) {
      await Task.deleteOne(_f);
      res.json({ message: "Task has deleted" });
    } else {
      res.status(404).json({ message: "task not delete" });
    }
  } catch (error) {
    throw new Error("Task not found");
  }
};

module.exports = {
  searchTaskByTitle,
  getPaginatedTasks,
  getTasks,
  createTask,
  getTaskById,
  deleteTask,
  updateTask,
};
