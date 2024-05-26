import React, { useState } from 'react';
import api from '../api';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/auth/forgot-password', { email, password, confirmPassword });
      setMessage(response.data.message);
    } catch (error) {
      setMessage(error.response.data.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen gap-4 ">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
        <h1 className="text-xl font-semibold mb-4">Forgot Password</h1>
        <form onSubmit={handleForgotPassword}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded bg-white" />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">New Password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded bg-white" />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Confirm Password</label>
            <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded bg-white" />
          </div>
          <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded">Reset Password</button>
        </form>
        {message && <p className="mt-4 text-center">{message}</p>}
      </div>
    </div>
  );
}

export default ForgotPassword;
