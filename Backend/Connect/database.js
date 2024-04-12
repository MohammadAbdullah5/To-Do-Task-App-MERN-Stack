const mongoose = require("mongoose"); // Import mongoose module that will be used to connect to MongoDB.

const monogURI = process.env.MONGO_URI || "mongodb+srv://admin:admin@abdullahcluster.rn7sfb0.mongodb.net/taskApp"; // Create a variable called mongoURI that will store the MongoDB connection string.

const connectDB = async () => { // Create a new function called connectDB that will connect to database.
  try {
    const connect = await mongoose.connect(monogURI); // Connect to MongoDB using mongoose.connect() method.
    console.log(`MongoDB Connected: ${connect.connection.host}`); // If connection is successful, print the host name.
  } catch (err) { // If connection is unsuccessful, print the error message and exit the process.
    console.log(err); // Print the error message.
    process.exit(1); // Exit the process.
  }
};
module.exports = connectDB; // Export the connectDB function.
