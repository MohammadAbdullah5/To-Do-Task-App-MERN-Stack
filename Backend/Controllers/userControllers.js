const asyncHandler = require('express-async-handler'); // Import express-async-handler module for handling errors.
const jwt = require('jsonwebtoken'); // Import jsonwebtoken module for creating tokens.
const bcrypt = require('bcryptjs'); // Import bcryptjs module for hashing passwords. 
const User = require('../Models/userModel'); // Import the User model.

const registerUser = asyncHandler(async (req, res) => {
    const {name, email, password} = req.body; // Destructure the name, email, and password from req.body.

    if(!name || !email || !password) // If any of the fields are empty, throw an error.
    {
        res.status(400); // Set the status code to 400 (bad request).
        throw new Error('All fields are mandatory'); // Throw an error with the message 'All fields are mandatory'.
    }

    const userExists = await User.findOne({email}); // Check if the user already exists in the database.
    if(userExists)
    {
        res.status(400); // Set the status code to 400 (bad request).
        throw new Error('User already exists'); // Throw an error with the message 'User already exists'.
    }

    const salt = await bcrypt.genSalt(10); // Generate a salt with 10 rounds.
    const hashedPasswords = await bcrypt.hash(password, salt); // Hash the password with the salt.
    const user = await User.create({name, email, password: hashedPasswords}); // Create a new user in the database.
    if(user) 
    {
        res.status(201).json({ 
            _id: user.id, 
            name: user.name,
            email: user.email,
            token: generateJWT(user._id) // Generate a JWT token for the use and send it in the response as the token property. JWT will be genrated by sending the user id.
        });
    }

    else
    {
        res.status(400); // Set the status code to 400 (bad request).
        throw new Error('Invalid user data'); // Throw an error with the message 'Invalid user data'.
    }
    // res.json({message: 'Register User successful'}); // Send a JSON response with the message 'Register User successful'.
});

const loginUser = asyncHandler(async (req, res) => {
    const {email, password} = req.body; // Destructure the email and name from req.body.
    const user = await User.findOne({email}); // Find the user in the database.
    if(user && await bcrypt.compare(password, user.password)) // If the user exists and the password matches the hashed password in the database.
    {
        res.json({ // Send a JSON response with the following data.
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateJWT(user._id) // Generate a JWT token for the use and send it in the response as the token property.
        });
    }
    
    else
    {
        res.status(400); // Set the status code to 400 (bad request).          
        throw new Error('Invalid email or password'); // Throw an error with the message 'Invalid email or password'.
    }
    // res.json({message: 'Login User successful'});
});

const getCurrentUser = asyncHandler(async(req,res)=>{
    const {_id, name, email} = await User.findById(req.user.id);
    res.status(200).json({_id, name, email});
});

/*the function generateJWTtoken is taking an id. And it is using the
jwt.sign() method. Here, it is taking the id and secret from the
environment file as the first two parameters In the third parameter, we are giving the expiresIn parameter. 
Here, we canspecify after how much time our JWT will expire, and we need to generate a
new one.*/
const generateJWT = (id) => jwt.sign(
    {id}, // Payload
    process.env.JWT_SECRET, // Secret key
    {expiresIn: '5d'}
)

module.exports = {registerUser, loginUser, getCurrentUser}; // Export the above functions.