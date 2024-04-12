const express = require("express"); // Import the express module.
const router = express.Router(); // Create a new router object using the express.Router() method.
const { getTasks, createTask,  updateTask, deleteTask} = require("../Controllers/taskControllers"); // Import the getTasks function from the taskControllers.js file.
const {protect} = require('../Middleware/authMiddleware'); // Import the protect middleware function from the authMiddleware.js file for protecting routes that require authentication.

// This is the route handler for the GET /api/tasks route.
router.get("/", protect, getTasks);

// This is the route handler to CREATE /api/tasks/.
router.post("/", protect, createTask);

// This is the route handle to UPDATE /api/tasks/:id route. id is a route parameter.
router.put("/:id", protect, updateTask);
 
// This is the route handler for the DELETE /api/tasks/:id route. id is a route parameter.
router.delete("/:id", protect, deleteTask);

module.exports = router; // Export the router object.
// This is a common pattern used in Node.js to export objects from a module.
