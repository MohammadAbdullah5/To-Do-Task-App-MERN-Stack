// Importing specific icons from the 'react-icons/fa' library
import { FaSignInAlt, FaSignOutAlt, FaUser } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { reset, logout } from "../features/auth/authSlice";

// Importing the React Router DOM Link component for navigation
import { Link, useNavigate } from "react-router-dom";

// Functional component for the Header
const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const logoutFn = () => {
    dispatch(logout());
    dispatch(reset());
    navigate("/");
  };

  return (
    // Header section with the 'header' class
    <header className="header">
      {/* Logo section with a link to the home page */}
      <div className="logo">
        <Link to="/">Task Creator</Link>
      </div>

      {/* Navigation list for login logout*/}
      <ul>
        {user ? (
          <li>
            <button className="btn" onClick={logoutFn}>
              {/* If the user is logged in then show Logout*/}
              <FaSignOutAlt /> Logout
            </button>
          </li>
        ) : (
          <>
            {/* Else show login and register*/}
            <li>
              {/* Link to the login page with an icon and text */}
              <Link to="/login">
                <FaSignInAlt /> Login
              </Link>
            </li>

            {/* Navigation list for registration */}

            <li>
              {/* Link to the registration page with an icon and text */}
              <Link to="/register">
                <FaUser /> Register
              </Link>
            </li>
          </>
        )}
      </ul>
    </header>
  );
};

// Exporting the Header component as the default export for the file
export default Header;
