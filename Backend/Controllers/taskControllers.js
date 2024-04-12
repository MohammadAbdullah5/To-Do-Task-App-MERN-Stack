const asyncHandler = require("express-async-handler"); // Import express-async-handler module.
const Task = require("../Models/taskModel"); // Import the Task model.
const User = require("../Models/userModel"); // Import the User model.

const getTasks = asyncHandler(async (req, res) => {
  const tasks = await Task.find({user: req.user.id}); // This code will find tasks in the database of the logged in user.
  res.status(200).json(tasks); // This line will send a JSON response with the tasks.
});

// This is the route handler to CREATE /api/tasks/:id route. id is a route parameter.
const createTask = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400);
    throw new Error("Please enter a task");
  }
  const task = await Task.create({ text: req.body.text, user: req.user.id }); // This line will create a new task in the database.
  res.status(200).json(task);
});

// This is the route handle to UPDATE /api/tasks/:id route. id is a route parameter.
const updateTask = asyncHandler(async (req, res) => {
  const task = await Task.findById(req.params.id); // This line will find the task by id until it finds the task in the database.
  if (!task) {
    // If the task is not found, throw an error.
    res.status(400); // Set the status code to 400 (bad request).
    throw new Error("Task not found");
  }

  const user = await User.findById(req.user.id); // This line will find the user by id until it finds the user in the database.
  if (!user) {
    res.status(401); // Set the status code to 401 (unauthorized).
    throw new Error('User not found'); // Throw an error with the message 'User not found'.
  }

  if(task.user.toString() !== user.id) // If the user id of the task does not match the user id of the logged in user, throw an error.
  {
    res.status(401); // Set the status code to 401 (unauthorized).
    throw new Error('Not authorized to update'); // Throw an error with the message 'Not authorized'.
  }

  // This line will update the task in the database and return the updated task. new: true will return the updated task.
  const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true,}); 
  res.status(200).json(updatedTask); // This line will send a JSON response with the updated task.
});

// This is the route handler for the DELETE /api/tasks/:id route. id is a route parameter.
const deleteTask = asyncHandler(async (req, res) => {
  const task = await Task.findById(req.params.id); // This line will find the task by id until it finds the task in the database.
  if (!task) { // If the task is not found, throw an error.
    res.status(400);
    throw new Error("Task not found");
  }

  const user = await User.findById(req.user.id); // This line will find the user by id until it finds the user in the database.
  if(!user) {
    res.status(401); // Set the status code to 401 (unauthorized).
    throw new Error('User not found'); // Throw an error with the message 'User not found'.
  }

  if(task.user.toString() !== user.id) // If the user id of the task does not match the user id of the logged in user, throw an error.
  {
    res.status(401); // Set the status code to 401 (unauthorized).
    throw new Error('Not authorized to delete'); // Throw an error with the message 'Not authorized'.
  }

  await Task.findByIdAndDelete(req.params.id); // This line will delete the task from the database.
  res.status(200).json({ id: req.params.id }); // This line will send a JSON response with the id of the deleted task.
});

module.exports = { getTasks, createTask, updateTask, deleteTask }; // Export the above function.
