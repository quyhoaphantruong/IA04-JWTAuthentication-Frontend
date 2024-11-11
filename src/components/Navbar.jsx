import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
  const { token, logout } = useContext(AuthContext);

  return (
    <nav className="bg-indigo-600 text-white px-6 py-4">
      <div className="container mx-auto flex items-center justify-between">
        <div className="text-2xl font-bold">
          <Link to="/">21127574</Link>
        </div>
        <div className="flex items-center space-x-4">
          {!token ? (
            <>
              <Link to="/register" className="hover:underline">
                Register
              </Link>
              <Link to="/login" className="hover:underline">
                Login
              </Link>
            </>
          ) : (
            <>
              <Link to="/profile" className="hover:underline">
                Profile
              </Link>
              <button
                onClick={logout}
                className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded focus:outline-none"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
