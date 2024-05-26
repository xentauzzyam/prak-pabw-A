import React, { useState } from 'react';
import api from '../api';
import { useNavigate } from 'react-router-dom';

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    // Check if the fields are empty
    if (!email || !password) {
      let errorMessage = "Please fill in all required fields:\n";
      if (!email) errorMessage += "- Email\n";
      if (!password) errorMessage += "- Password\n";
      setErrorMessage(errorMessage);
      return;
    }

    try {
      const response = await api.post('/auth/member/register', { email, password });
      setMessage(response.data.status);
      navigate('/login');
      alert("Harap cek email untuk link verifikasi"); // Success message
    } catch (error) {
      if (error.response && error.response.status === 409) {
        setErrorMessage("Email ini sudah terdaftar. Silahkan gunakan email yang lain.");
      } else {
        setErrorMessage("Kesalahan sistem. Hubungi administrator.");
      }
      console.error("Error during registration:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen gap-4">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
        <h1 className="text-xl font-semibold mb-4">Register</h1>
        <form onSubmit={handleRegister}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Email</label>
            <input
              type="email"
              className="w-full px-3 py-2 border border-gray-300 rounded bg-white"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Password</label>
            <input
              type="password"
              className="w-full px-3 py-2 border border-gray-300 rounded bg-white"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
          >
            Register
          </button>
        </form>
        {errorMessage && <p className="mt-4 text-center text-red-500">{errorMessage}</p>}
        {message && <p className="mt-4 text-center text-green-500">{message}</p>}
      </div>
    </div>
  );
}

export default Register;
