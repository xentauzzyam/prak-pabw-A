import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import api from '../api';

function VerifyEmail() {
  const [searchParams] = useSearchParams();
  const [message, setMessage] = useState('');

  useEffect(() => {
    const verifyEmail = async () => {
      const token = searchParams.get('token');
      if (token) {
        try {
          const response = await api.get(`/auth/verify-email?token=${token}`);
          setMessage(response.data.message);
        } catch (error) {
          setMessage(error.response.data.message);
        }
      } else {
        setMessage('Invalid token');
      }
    };

    verifyEmail();
  }, [searchParams]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
        <h1 className="text-xl font-semibold mb-4">Email Verification</h1>
        <p className="text-center">{message}</p>
      </div>
    </div>
  );
}

export default VerifyEmail;
