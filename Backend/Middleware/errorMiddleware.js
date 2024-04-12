const errorHandler = (err, req, res, next) => { // This is a custom error handler middleware function that will be used to handle errors in our application.
  const statusCode = res.statusCode ? res.statusCode : 500; // If the response object has a status code, use that. Otherwise, use 500 (internal server error).
  res.status(statusCode); // Set the status code on the response object.
  res.json({ message: err.message }); // Send a JSON response with the error message.
};
module.exports = { errorHandler };
