'use client';
import React, { useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';

export default function ProfilePage() {
    const router = useRouter();
    const [data, setData] = useState("nothing");
    const getUserDetails = async () => {
        try {
            const response = await axios.post('/api/users/me');
            setData(response.data.data._id);
        } catch (error: any) {
            console.error(error);
            toast.error(error.message);
        }
    };
    const logout = async () => {
        try {
            await axios.get('/api/users/logout');
            toast.success('Logged out successfully');
            router.push('/login');
        } catch (error: any) {
            console.error(error);
            toast.error(error.message);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center">
            <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <h1 className="text-xl text-black font-bold mb-2">Profile Page</h1>
                <hr className="mb-4" />
                <h2 className="text-lg text-black mb-4">
                    {data === "nothing" ? "Nothing" : (
                        <Link href={`/profile/${data}`} passHref>
                            <span className="text-blue-500 hover:text-blue-700 cursor-pointer">{data}</span>
                        </Link>
                    )}
                </h2>
                <hr className="mb-4" />
                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2"
                    onClick={logout}>Logout</button>
                <button
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    onClick={getUserDetails}>Get User Details</button>
            </div>
        </div>
    );
}