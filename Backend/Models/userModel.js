const mongoose = require('mongoose') // Import mongoose module.

/*
Here, in the userSchema we have three fields of name, email, and password.
All of them are strings and required. The email is also unique, which means
we can’t have the same email twice
*/ 

const userSchema = mongoose.Schema({ // Create a user schema.
    name: {
        type: String, // The name field will be a string.
        required: [true, 'Name is required'] // The name field is required and the error message if it is not provided.
    },
    email: {
        type: String, // The email field will be a string.
        required: [true, 'Email is required'], // The email field is required and the error message if it is not provided.
        unique: true // The email field must be unique.
    },
    password: {
        type: String, // The password field will be a string.
        required: [true, 'Password is required'] // The password field is required and the error message if it is not provided.
    },
},
{
    timestamps: true // This will automatically create a createdAt and updatedAt field.
});

module.exports = mongoose.model('User', userSchema); // Export the userSchema as a model called User.