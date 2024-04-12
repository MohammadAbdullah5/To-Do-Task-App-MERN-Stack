// Importing necessary dependencies from React and other modules
import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './app/store';
import App from './App';

// Importing styles for the application
import './index.css';

// Getting the root container element with the id 'root' from the HTML document
const container = document.getElementById('root');

// Creating a root for the React application using the createRoot function
const root = createRoot(container);

// Rendering the main application component wrapped with the Redux Provider
root.render(
  // React Fragment. It is a way to group a list of children without adding extra nodes to the DOM.
  <>
    {/* Redux Provider component, providing the Redux store to the entire application */}
    <Provider store={store}>
      {/* Main application component */}
      <App />
    </Provider>
  </>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// (Note: The code provided is incomplete at this point, and the remaining code is not shown.)
