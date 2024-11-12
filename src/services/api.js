import axios from 'axios';

const api = axios.create({
    baseURL: 'https://ia04-jwtauthentication-backend.onrender.com',
});

api.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

export default api;
