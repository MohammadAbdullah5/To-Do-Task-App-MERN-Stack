// Import the express module. Express is a minimal and flexible Node.js web application framework 
// that provides a robust set of features for web and mobile applications. 
// The 'require' function is a built-in function in Node.js used to import modules.
const express = require('express');
// Import the dotenv module, which allows us to load environment variables from a .env file into process.env
const dotenv = require('dotenv');
dotenv.config(); // Call the config method on the dotenv module to load the environment variables.
// Import the Error handler middleware function that will be used to handle errors in our application.
const {errorHandler} = require('./Middleware/errorMiddleware');
// Import the connectDB function from the Connect/database.js file.
const connectDB = require('./Connect/database'); 

const cors = require('cors');

// This line is setting the value of the variable 'port' to whatever value is stored in the environment variable 'PORT'.
// If 'PORT' is not defined in the environment variables (i.e., process.env.PORT is undefined), it will default to 8000.
// This is a common pattern used to allow the port the application runs on to be configured via environment variables, 
// which can be useful in certain deployment scenarios where the port needs to be dynamically assigned (like in many cloud hosting environments).
const port = process.env.PORT || 8000;

connectDB(); // Call the connectDB function to connect to the database.

// Create an instance of an Express application. Express is a web application framework for Node.js
const app = express();

app.use(express.json()); // This line tells Express to parse JSON data from the request body.

app.use(express.urlencoded({ extended: false})) // This line tells Express to parse URL-encoded data from the request body.

app.use(cors());
/* Here, we are using the get method from Express. The first parameter is the route path and it can be
 anything. We have given it /api/tasks. The second parameter is a function call with req and res. 
 In this arrow function, we are using res.send() to send back Get All Tasks text. Later
on, we are going to modify this route to get all tasks. */
app.use('/api/tasks', require('./routes/taskRoutes'));
app.use('/api/users', require('./routes/userRoutes'));

app.use(errorHandler); // This line tells Express to use the errorHandler middleware function.

// Tell our Express application to start listening for incoming HTTP requests on the specified port (8000 in this case).
// When the server is ready, it will log "Server is running on port 8000" to the console.
app.listen(port, () => console.log(`Server is running on port ${port}`));