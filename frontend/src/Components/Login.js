// Importing React for building the component
import React from "react";

// Importing an icon from the 'react-icons/fa' library for the login heading
import { FaSignInAlt } from "react-icons/fa";

// Importing the 'useState' and 'useEffect' hook from React for managing component state
import { useState, useEffect } from "react";

// Importing useSelctor and useDispatch for accessing the Redux store
import { useSelector, useDispatch } from "react-redux";

// Importing the 'useHistory' hook from 'react-router-dom' for programmatic navigation
import { useNavigate } from "react-router-dom";

// Importing the 'login' and 'reset' action creators from the 'authSlice' slice
import { login, reset } from "../features/auth/authSlice";

// Importing toast for showing error messages
import { toast } from "react-toastify";

// Importing the 'Spinner' component for rendering a loading spinner
import Spinner from "./Spinner";

// Functional component for the Login page
const Login = () => {
  // State hook to manage form data (email and password)
  const [formData, setFormData] = useState({ email: "", password: "" });

  // Destructuring form data for easier access
  const { email, password } = formData;

  // Constants for navigation and dispatch
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Accessing the 'isLoading', 'isSuccess', 'isError', and 'errorMessage' state from the Redux store
  const { user, isLoading, isSuccess, isError, errorMessage } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) toast.error(errorMessage);
    if (isSuccess || user) {
      navigate("/");
    } else {
      dispatch(reset());
    }
  }, [user, isSuccess, isError, errorMessage, navigate, dispatch]);

  // Event handler for input changes in the form
  const onChange = (e) => {
    // Updating form data using the spread operator to maintain previous state
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  // Event handler for form submission
  const onSubmit = (e) => {
    e.preventDefault();
    const userData = { email, password };
    dispatch(login(userData));
  };

  // JSX structure for the Login component
  return isLoading ? (
    <Spinner />
  ) : (
    <>
      {/* Heading section for the login page */}
      <section className="heading">
        {/* Login heading with an icon */}
        <h1>
          <FaSignInAlt />
          Login
        </h1>
        {/* Subtitle for the login page */}
        <p>Login to the account and start creating tasks</p>
      </section>

      {/* Form section for the login page */}
      <section className="form">
        {/* Form for user login with onSubmit event handler */}
        <form onSubmit={onSubmit}>
          {/* Email input field with corresponding form group */}
          <div className="form-group">
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={email}
              placeholder="Enter your email"
              onChange={onChange}
            />
          </div>

          {/* Password input field with corresponding form group */}
          <div className="form-group">
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              value={password}
              placeholder="Enter password"
              onChange={onChange}
            />
          </div>

          {/* Submit button with corresponding form group */}
          <div className="form-group">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
        </form>
      </section>
    </>
  );
};

// Exporting the Login component as the default export for the file
export default Login;
