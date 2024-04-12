const mongoose = require('mongoose') // Import mongoose module that will be used to 
const taskSchema = mongoose.Schema( // Create a new mongoose schema called taskSchema.
    {
        text: { // This is the schema for the task text.
            type: String, // The type of the task text is a string.
            required: [true, 'Please enter a task'], // The task text is required.
        },

        user: { // This is the schema for the user.
            type: mongoose.Schema.Types.ObjectId,  // The type of the user is an ObjectId.
            required : true, // The user is required.
            ref: 'User'  // The user is referenced to the User model.
        }
    },
    { // This is the second parameter for the mongoose.Schema() method.
        timestamps: true, // This will create a timestamp for when the task was created. 
    }
)

module.exports = mongoose.model('Task', taskSchema); // Export the taskSchema as a model called Task.