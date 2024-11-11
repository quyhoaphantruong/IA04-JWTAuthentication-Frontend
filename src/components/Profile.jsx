import  { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';
import api from "../services/api" 

const Profile = () => {
    const { token, logout } = useContext(AuthContext);
    const [userInfo, setUserInfo] = useState(null);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      const fetchProfile = async () => {
        try {
          console.log('fetching profile')
          const response = await api.get('/api/auth/profile');
          setUserInfo(response.data);
        } catch (error) {
          console.error('Failed to fetch profile:', error);
          logout();
        } finally {
          setLoading(false);
        }
      };
  
      if (token) {
        fetchProfile();
      }
    }, [token, logout]);
  
    if (loading) return <p>Loading...</p>;
  
    if (!userInfo) return <Navigate to="/login" />;

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-2xl font-bold mb-6">Profile</h1>
      <div className="bg-white p-6 rounded shadow-md">
        <p className="mb-4">
          <span className="font-semibold">Username:</span> {userInfo.username}
        </p>
        <p>
          <span className="font-semibold">Email:</span> {userInfo.email}
        </p>
      </div>
    </div>
  );
};

export default Profile;
