// Importing axios to make HTTP requests
import axios from 'axios';

// Defining the API URI as a constant to be used for making API calls
const API_URL = 'https://taskappbackend-1i6w02c7.b4a.run/api/users/';

// Defining the register function to make a POST request to the API. userData is the data that will be sent
const register = async (userData) => {
    const response = await axios.post(API_URL, userData); // Making the POST request to the API

    if(response.data) // If the response is not null, then we will store the user in local storage
    { 
        localStorage.setItem('user', JSON.stringify(response.data)); // Storing the user in local storage
    }

    return response.data; // Returning the response
}

// Defining the login function to delete the user from local storage of the browser
const logout = () => localStorage.removeItem('user');

const login = async (userData) => {
    const response = await axios.post(API_URL + 'login', userData); // Making the POST request to the API
    if(response.data)
    {
        localStorage.setItem('user', JSON.stringify(response.data)); // Storing the user in local storage and returning the response
    }
    return response.data;
}

const authService = { register, logout, login };
export default authService;