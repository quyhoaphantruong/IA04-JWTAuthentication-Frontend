import { useState, useContext } from 'react';
import { useForm } from 'react-hook-form';
import { AuthContext } from '../context/AuthContext';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: 'onChange' });
  const { login } = useContext(AuthContext);

  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const response = await api.post('/api/auth/login', data);
      login(response.data.token);
      navigate('/profile');
    } catch (err) {
        if (err?.response?.data?.message) {
            setError(err.response.data.message);
        }
      else if (err.response && err.response.status === 400) {
        setError(err?.response.data?.message || 'Invalid email or password.');
      } else if (err.response && err.response.status === 401) {
        setError('Please fill in all required fields correctly.');
      } else {
        setError('An error occurred. Please try again later.');
      }
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: 'Please enter a valid email address',
                },
              })}
              className={`w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                errors.email ? 'border-red-500' : ''
              }`}
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              {...register('password', {
                required: 'Password is required',
                minLength: {
                  value: 6,
                  message: 'Password must be at least 6 characters long',
                },
              })}
              className={`w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                errors.password ? 'border-red-500' : ''
              }`}
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700 focus:outline-none"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
