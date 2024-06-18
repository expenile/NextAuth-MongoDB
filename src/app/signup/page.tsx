'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';

export default function SignupPage() {
  const router = useRouter();
  const [user, setUser] = useState({ email: '', password: '', username: '' });

  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(false);

  const onSignup = async () => {
    try {
      setLoading(true);
      const response = await axios.post('/api/users/signup', user);
      console.log("Signup Success", response.data);
      router.push('/login');
    } catch (error: any) {
      console.error(error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setButtonDisabled(!(user.email && user.password && user.username));
  }, [user]);

  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-md w-full space-y-8'>
        <div>
          <h2 className='mt-6 text-center text-3xl font-extrabold text-gray-900'>{loading ? "Processing..." : "Sign up"}</h2>
        </div>
        <form className='mt-8 space-y-6' action='#' method='POST'>
          <input type='hidden' name='remember' value='true' />
          <div className='rounded-md shadow-sm -space-y-px'>
            <div>
              <label htmlFor='username' className='sr-only'>Username</label>
              <input id='username' name='username' type='text' required className='appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm' placeholder='Username' value={user.username} onChange={(e) => setUser({ ...user, username: e.target.value })} />
            </div>
            <div>
              <label htmlFor='email' className='sr-only'>Email address</label>
              <input id='email' name='email' type='email' autoComplete='email' required className='appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm' placeholder='Email address' value={user.email} onChange={(e) => setUser({ ...user, email: e.target.value })} />
            </div>
            <div>
              <label htmlFor='password' className='sr-only'>Password</label>
              <input id='password' name='password' type='password' autoComplete='current-password' required className='appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm' placeholder='Password' value={user.password} onChange={(e) => setUser({ ...user, password: e.target.value })} />
            </div>
          </div>

          <div>
            <button type='button' onClick={onSignup} className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white ${buttonDisabled ? 'bg-gray-500' : 'bg-indigo-600 hover:bg-indigo-700'} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`} disabled={buttonDisabled}>
              {loading ? "Processing..." : "Sign up"}
            </button>
          </div>
        </form>
        <div className='text-sm text-center'>
          <Link 
          className='font-medium text-indigo-600 hover:text-indigo-500'
          href="/login">
           Visit Login Page
          </Link>
        </div>
      </div>
    </div>
  );
}