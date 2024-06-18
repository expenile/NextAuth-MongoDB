import React from 'react';

export default function Page({ params }: any) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="p-4 bg-white rounded shadow">
        <h1 className="text-2xl font-bold text-center text-black">Profile Page</h1>
        <h2 className="mt-2 text-xl text-gray-700 text-center">{params.id}</h2>
      </div>
    </div>
  );
}