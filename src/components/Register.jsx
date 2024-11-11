import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import api from '../services/api';

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: 'onChange' });
  const [message, setMessage] = useState('');

  const handleRegister = async (data) => {
    try {
      const response = await api.post('/api/auth/register', data);
      setMessage('Registration successful!');
    } catch (error) {
      setMessage(error.response?.data?.message || 'Registration failed.');
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
        <form onSubmit={handleSubmit(handleRegister)}>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="username"
            >
              Username
            </label>
            <input
              id="username"
              type="text"
              placeholder="Username"
              {...register('username', {
                required: 'Username is required',
                minLength: {
                  value: 3,
                  message: 'Username must be at least 3 characters',
                },
                maxLength: {
                  value: 20,
                  message: 'Username cannot exceed 20 characters',
                },
              })}
              className={`w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                errors.username ? 'border-red-500' : ''
              }`}
            />
            {errors.username && (
              <p className="text-red-500 text-sm">{errors.username.message}</p>
            )}
          </div>
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
              placeholder="Email"
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
              placeholder="Password"
              {...register('password', {
                required: 'Password is required',
                minLength: {
                  value: 6,
                  message: 'Password must be at least 6 characters',
                },
                maxLength: {
                  value: 30,
                  message: 'Password cannot exceed 30 characters',
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
            Register
          </button>
          {message && (
            <p
              className={`mt-4 text-sm ${
                message.includes('successful') ? 'text-green-500' : 'text-red-500'
              }`}
            >
              {message}
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default Register;
