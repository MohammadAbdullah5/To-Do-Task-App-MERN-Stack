/* import createAsyncThunk and createSlice. CreateSlice is a function that takes an object as an argument.
This object will contain the initial state and reducers for the slice. It will be used to create the slice 
used for reducer and action. createAsyncThunk will be used for asynchronous actions, which is an API call 
in our case */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./authService";

/* A variable localuser which uses local storage to get a user variable*/
const localUser = JSON.parse(localStorage.getItem('user'));

/* initialState of our slice is an object. Here, we have the user key first, which is equal to the 
localuser initially or null if localuser is not present. We also have values for isError, isSuccess, 
and isLoading, which are set as false. These will be used when we do the API call. Lastly, we have a 
message as an empty string */

const initialState = {
  user: localUser ? localUser : null, // user is null if localUser is not present else localUser
  isError: false, // isError is false
  isSuccess: false, // isSuccess is false
  isLoading: false, // isLoading is false
  message: '', // message is an empty string
};

/* The first parameter is the auth/register, which means from the auth folder, take the register
function. Next, the parameter is an async function which takes the user and thunkAPI as parameter.
the try block, we are calling the register function from the authService.js file with the user and
returning it. In the catch part, we are simply catching different kinds of errors and returning them.*/
export const register = createAsyncThunk(
  'auth/register',
  async (user, thunkAPI) => {
    // user is the user data
    try {
      return await authService.register(user); // Calling the register function from authService.js
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
          error.message ||
        error.toString(); // Getting the error message
      return thunkAPI.rejectWithValue(message); // Returning the error message
    }
  }
);


export const login = createAsyncThunk('auth/login', async (user, thunkAPI) => {
  try {
    await authService.login(user);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

/* The first parameter is the auth/login, which means from the auth folder, take the logout function 
from the authService.js file. Next, the parameter is an async function which takes the user and thunkAPI
as parametet and performing the function */
export const logout = createAsyncThunk(
  'auth/logout',
  async () => await authService.logout()
);

/* Here, we are first giving the name of the slice as auth. Then we are taking the initialState. 
After that, we have a reducers value, which has a reset. This reset can be used to make the state
back to the initial state. Next, we have an extraReducers value*/

export const authSlice = createSlice({
  name: 'auth', // name of the slice
  initialState, // initial state of the slice
  reducers: {
    // reducers of the slice that can be used to change the state of the slice
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state, actions) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = actions.payload;
      })
      .addCase(register.rejected, (state, actions) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.user = null;
        state.message = actions.payload;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
      })
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
  }
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;
