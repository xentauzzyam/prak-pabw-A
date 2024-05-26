import React, { useState } from 'react';
import api from '../api';


function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/auth/member/login', { email, password });
      setMessage(response.data.message);
    } catch (error) {
      setMessage(error.response.data.message);
    }
  };
  return (
  <div className="flex flex-col items-center justify-center w-screen h-screen gap-4 ">
    <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
        <h1 className="text-xl font-semibold mb-4">Login</h1>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-600">Email</label>
            <input
              type="email"
              className="w-full px-3 py-2 border border-gray-300 rounded bg-white"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-600">Password</label>
            <input
              type="password"
              className="w-full px-3 py-2 border border-gray-300 rounded bg-white"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
        <p className="text-center mt-4">
          Belum punya akun? <a href="/register" style={{ color: "blue" }}>Buat Akun</a>
        </p>
        <button type="submit" className="w-full px-3 py-2 bg-blue-500 text-white rounded">
            Login
          </button>
        </form>
        {message && <p className="mt-4 text-center">{message}</p>}
    </div>
  </div>
);
}

export default Login;
