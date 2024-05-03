const Task = require("../models/Task");
const asyncwrapper = require("../middleware/async");
const { createCustomError } = require("../errors/custom-error");

// this works just commented it out bc of asyncwrappers
// const getAllTasks = async (req, res) => {
//   try {
//     // const task = await Task.find({ completed: true });
//     const task = await Task.find();

//     // because the frontend is not setup for the res under this, we can just
//     // use this way to send task
//     res.status(200).json({ task: task });
//     // common api call, if you do this tho you must keep the same structure for
//     // everything releated to this data too
//     // res
//     //   .status(200)
//     //   .json({ success: true, data: { amount: task.length, tasks: task } });
//   } catch (error) {
//     res.status(500).json({ msg: error });
//   }
// };

const getAllTasks = asyncwrapper(async (req, res) => {
  const task = await Task.find();
  res.status(200).json({ task: task });
});

const createTask = asyncwrapper(async (req, res) => {
  const task = await Task.create({ name: req.body.name });
  res.status(201).json({ task: task });
});

const getTask = asyncwrapper(async (req, res, next) => {
  const { id } = req.params;
  const task = await Task.findOne({ _id: id });

  if (!task) {
    return next(createCustomError(`No task with id: ${id}`, 404));
  }
  res.status(200).json({ task });
});

const updateTask = asyncwrapper(async (req, res) => {
  const { id } = req.params;
  // must add new property to make sure the data is update to date on the next
  // request, i.e when i send the task to the frontend
  // Must also run validators to make sure user enters correct validators i.e:
  // completed must be a b oolean, name must not be empty, etc.
  const task = await Task.findByIdAndUpdate({ _id: id }, req.body, {
    new: true,
    runValidators: true,
  });

  if (!task) {
    return next(createCustomError(`No task to update`, 404));
  }

  res.status(200).json({ task: task });
});

const deleteTask = asyncwrapper(async (req, res) => {
  const { id } = req.params;
  const task = await Task.findByIdAndDelete({ _id: id });

  if (!task) {
    return next(createCustomError(`No task to delete: ${id}`, 404));
  }

  res.status(200).json({ task: task, status: "success" });
});

module.exports = {
  getAllTasks,
  createTask,
  deleteTask,
  updateTask,
  getTask,
};
