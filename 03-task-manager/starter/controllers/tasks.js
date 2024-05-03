const Task = require("../models/Task");

console.log(Task);

const getAllTasks = async (req, res) => {
  try {
    // const task = await Task.find({ completed: true });
    const task = await Task.find();
    res.status(200).json({ task: task });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

const createTask = async (req, res) => {
  try {
    const task = await Task.create({ name: req.body.name });

    res.status(201).json({ task: task });
  } catch (error) {
    res.status(500).json({ msg: error.name });
    console.log(error.message, "Error has occured");
  }
};

const getTask = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findOne({ _id: id });

    if (!task) {
      return res.status(404).json({ msg: `No task with id: ${id}` });
    }

    res.status(200).json({ task });
  } catch (error) {
    res.status(500).json({ msg: error.name });
  }
};

const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    // must add new property to make sure the data is update to date on the next
    // request, i.e when i send the task to the frontend
    // Must also run validators to make sure user enters correct validators i.e:
    // completed must be a boolean, name must not be empty, etc.
    const task = await Task.findByIdAndUpdate({ _id: id }, req.body, {
      new: true,
      runValidators: true

    });

    if (!task) {
      return res.status(404).json({ msg: `No task to update` });
    }

    res.status(200).json({ task: task });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findByIdAndDelete({ _id: id });

    if (!task) {
      return res.status(404).json({ msg: `No task to delete: ${id}` });
    }

    res.status(200).json({ task: task, status: "success" });
  } catch (error) {
    res.status(500).json({ msg: error.name });
  }
};

module.exports = {
  getAllTasks,
  createTask,
  deleteTask,
  updateTask,
  getTask,
};
