import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="bg-indigo-600 p-4 text-white shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">
          <Link to="/">DocWave</Link>
        </h1>
        <div className="space-x-4">
          <Link to="/dashboard" className="hover:underline">Dashboard</Link>
          <Link to="/login" className="hover:underline">Login</Link>
          <Link to="/signup" className="hover:underline">Signup</Link>
        </div>
      </div>
    </nav>
  );
}