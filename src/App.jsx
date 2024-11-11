// App.js
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { AuthContext } from './context/AuthContext';
import Login from './components/Login';
import Register from './components/Register';
import Profile from './components/Profile';
import Navbar from './components/Navbar';
import { useContext } from 'react';

const ProtectedRoute = ({ children }) => {
  const { token } = useContext(AuthContext);
  return token ? children : <Navigate to="/login" />;
};

const App = () => {
  const { token } = useContext(AuthContext);

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/"
          element={token ? <Navigate to="/profile" /> : <Navigate to="/login" />}
        />
      </Routes>
    </Router>
  );
};

export default App;
