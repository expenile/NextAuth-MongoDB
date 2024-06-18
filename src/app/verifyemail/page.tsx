'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import Link from 'next/link';

export default function VerifyEmailPage() {
  const [token, setToken] = useState('');
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(false);

  const verifyUserEmail = async () => {
    try {
      await axios.post('/api/users/verifyemail', { token });
      setVerified(true);
      setError(false);
    } catch (error: any) {
      console.error(error.response.data);
      setError(true);
    }
  };

  useEffect(() => {
    setError(false);
    const urlToken = window.location.search.split('=')[1];
    setToken(urlToken || '');
  }, []);

  useEffect(() => {
    setError(false);
    if (token.length > 0) {
      verifyUserEmail();
    }
  }, [token]);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-4 text-black">Verify Email</h1>
        {/* Token display with ellipsis for overflow */}
        <h2 className="text-lg text-center mb-4 text-black overflow-hidden text-ellipsis whitespace-nowrap">
          {token ? `Token: ${token}` : "No token provided"}
        </h2>
        {verified && (
          <div className="text-center">
            <h3 className="text-green-500">Verified</h3>
            <Link href='/login' passHref>
              <button className="text-indigo-600 hover:text-indigo-800 focus:outline-none">Login</button>
            </Link>
          </div>
        )}
        {error && (
          <div className="text-center">
            <h3 className="text-red-500">Error</h3>
          </div>
        )}
      </div>
    </div>
  );
}