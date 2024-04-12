// Importing the 'useState' hook from React for managing component state
import { useEffect, useState } from 'react';

// Importing an icon from the 'react-icons/fa' library for the register heading
import { FaUser } from 'react-icons/fa';

// These hooks are used to get the global state of redux and also to dispatch the action creator
// inside a slice. 
import { useSelector, useDispatch } from 'react-redux';

// This custom hook is used to navigate easily to different routes.
import { useNavigate } from 'react-router-dom'

// It will be used to show the toast message. It will be shown when the user successfully registers.
import { toast } from 'react-toastify';

// These will be used to call the register and reset action creators.
import { register, reset } from '../features/auth/authSlice';

import Spinner from './Spinner';

// Functional component for the Register page
const Register = () => {
    // State hook to manage form data (name, email, password, password2)
    const [formData, setFormData] = useState({ name: '', email: '', password: '', password2: '' });

    // Destructuring form data for easier access
    const { name, email, password, password2 } = formData;

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user, isLoading, isError, isSuccess, message } = useSelector(state => state.auth);

    // Event handler for input changes in the form
    const onChange = e => {
        // Updating form data using the spread operator to maintain previous state
        setFormData(prevState => ({ ...prevState, [e.target.name]: e.target.value }));
    }

// This useEffect will be called whenever the value of any of the variables in the dependency array changes.
    useEffect(() => { 
        if(isError) { // If isError is true, then show the error message.
            toast.error(message);
        }

        if(isSuccess) { // If isSuccess is true or user is not null, 
            navigate('/login'); // then navigate to the login page.
        }
        dispatch(reset()); // and reset the auth state.

    }, [user, isError, isSuccess, message, navigate, dispatch] ); // Dependency array
    
    
    
    // Event handler for form submission
    const onSubmit = e => {
        e.preventDefault();
        
        if (password !== password2)
        {
            toast.error("Passwords do not match");
        }

        else
        {
            const userData = {name, email, password};
            dispatch(register(userData));
        }
    }

    // JSX structure for the Register component
    return (
        isLoading ? <Spinner /> : (
        <>
            {/* Heading section for the register page */}
            <section className='heading'>
                {/* Register heading with an icon */}
                <h1><FaUser />Register</h1>
                {/* Subtitle for the register page */}
                <p>Register account</p>
            </section>

            {/* Form section for the register page */}
            <section className='form'>
                {/* Form for user registration with onSubmit event handler */}
                <form onSubmit={onSubmit}>
                    {/* Name input field with corresponding form group */}
                    <div className='form-group'>
                        <input
                            type='text'
                            className='form-control'
                            id='name'
                            name='name'
                            value={name}
                            onChange={onChange}
                            placeholder='Enter your Name'
                        />
                    </div>

                    {/* Email input field with corresponding form group */}
                    <div className='form-group'>
                        <input
                            type='email'
                            className='form-control'
                            id='email'
                            name='email'
                            value={email}
                            onChange={onChange}
                            placeholder='Enter your E-mail'
                        />
                    </div>

                    {/* Password input field with corresponding form group */}
                    <div className='form-group'>
                        <input
                            type='password'
                            className='form-control'
                            id='password'
                            name='password'
                            value={password}
                            onChange={onChange}
                            placeholder='Enter password'
                        />
                    </div>

                    {/* Confirm Password input field with corresponding form group */}
                    <div className='form-group'>
                        <input
                            type='password'
                            className='form-control'
                            id='password2'
                            name='password2'
                            value={password2}
                            onChange={onChange}
                            placeholder='Confirm password'
                        />
                    </div>

                    {/* Submit button with corresponding form group */}
                    <div className='form-group'>
                        <button type='submit' className='btn btn-primary'>Register</button>
                    </div>
                </form>
            </section>
        </>
    ));
};

// Exporting the Register component as the default export for the file
export default Register;
