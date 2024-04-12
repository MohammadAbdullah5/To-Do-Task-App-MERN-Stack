/* 
   This is a React Router DOM Router component. It is used to wrap the application and provide routing 
   capabilities. It is also used to create a router context that is available to all other components in the 
   application. Router is used to wrap the application and provide routing capabilities. Routes is used to define 
   the routes in the application. Route is used to define a route in the application.
*/
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Importing individual components used for different routes
import Dashboard from './Components/Dashboard';
import Login from './Components/Login';
import Register from './Components/Register';
import Header from './Components/Header';
import TaskList from './Components/TaskList';

/* we will first import ToastContainer from react-toastify. And will also import a corresponding css file.
We now need to add the ToastContainer component after the Routing is
done, which is after the <Router> tag. */
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

// Main App component
function App() {
  // Returning the JSX structure for the App component
  return (
    // Using the React Router DOM Router component to enable routing in the application
    <>
    <Router>
      {/* Main container div for the application */}
      <div className='container'>
        {/* Header component rendered at the top of the application */}
        <Header />
        
        {/* Routes component used to define different routes in the application */}
        <Routes>
          {/* Route for the dashboard, mapped to the '/' path */}
          <Route path='/' element={<Dashboard />} />
          
          {/* Route for the login page, mapped to the '/login' path */}
          <Route path='/login' element={<Login />} />
          
          {/* Route for the registration page, mapped to the '/register' path */}
          <Route path='/register' element={<Register />} />

          <Route path='/alltasks' element={<TaskList />} />
        </Routes>
      </div>
    </Router>
    <ToastContainer />
    </>
  );
}

// Exporting the App component as the default export for the file
export default App;
