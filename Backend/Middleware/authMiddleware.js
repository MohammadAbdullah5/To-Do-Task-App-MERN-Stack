// Import the jsonwebtoken module, which is used to create, sign, and verify JWTs (JSON Web Tokens)
const jwt = require("jsonwebtoken");

// Import the express-async-handler module. This is a middleware for handling exceptions inside of async express routes and passing them to your express error handlers.
const asyncHandler = require("express-async-handler");

// Import the User model from our models directory. This model represents the structure of our user data in the MongoDB database.
const User = require("../Models/userModel");

// Define a middleware function named 'protect'. This function will be used to protect routes that require 
// authentication. req is the request object, res is the response object, and next is the next middleware function in the stack.
const protect = asyncHandler(async (req, res, next) => {
  let token; // This variable will be used to store the token.

  // Check if the request has an 'Authorization' header and if it starts with 'Bearer'
  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    try {
      // If the 'Authorization' header is present and correctly formatted, we extract the token part of the header.
      token = req.headers.authorization.split(" ")[1];

      // We then verify the token using jsonwebtoken's verify method. This method will throw an error if the token is not valid.
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // If the token is valid, we find the user associated with this token and attach it to the request object.
      req.user = await User.findById(decoded.id).select("-password");

      // Call the next middleware function in the stack. It is important to call next() so that the next middleware function in the stack is called.
      // If we don't call next(), the request will be left hanging and the client will not receive a response.
      next();
    } catch (error) {
      // If there was an error verifying the token, we log the error and send a 401 status code with a message.
      console.log(error);
      res.status(401);
      throw new Error("Not authorized");
    }
  }

  // If no token was sent in the 'Authorization' header, we send a 401 status code with a message.
  if (!token) {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
});

// Export the 'protect' middleware function so it can be used in other parts of our application.
module.exports = { protect };