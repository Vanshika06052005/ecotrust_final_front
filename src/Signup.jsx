// src/pages/Signup.jsx
import React from 'react';
import { Link } from 'react-router-dom';

export default function  Signup() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center px-4 py-12">
            <div className="w-full max-w-md p-8 space-y-6 bg-white/5 backdrop-blur-md rounded-2xl shadow-2xl border border-white/10">
                {/* Header */}
                <div className="text-center">
                    <div className="w-32 h-14 mx-auto bg-gradient-to-br from-orange-500 to-green-500 rounded-2xl flex items-center justify-center shadow-md mb-4">
                        <span className="text-xl font-bold text-white tracking-wide">EcoTrust</span>
                    </div>
                    <h2 className="text-3xl font-bold text-white">Create Account</h2>
                    <p className="text-sm text-gray-400">Sign up for a new EcoTrust account</p>
                </div>

                {/* Form */}
                <form className="space-y-5">
                    <div>
                        <label className="block mb-1 text-sm font-medium text-gray-300">Name</label>
                        <input type="text" className="w-full px-4 py-2.5 bg-white/10 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-green-500" placeholder="Your Name" required />
                    </div>

                    <div>
                        <label className="block mb-1 text-sm font-medium text-gray-300">Email</label>
                        <input type="email" className="w-full px-4 py-2.5 bg-white/10 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-green-500" placeholder="you@example.com" required />
                    </div>

                    <div>
                        <label className="block mb-1 text-sm font-medium text-gray-300">Password</label>
                        <input type="password" className="w-full px-4 py-2.5 bg-white/10 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-green-500" placeholder="••••••••" required />
                    </div>

                    <button type="submit" className="w-full bg-gradient-to-r from-orange-500 to-green-500 text-white font-bold py-2.5 rounded-xl hover:scale-105 transition duration-300">
                        ✨ Sign Up
                    </button>
                </form>

                <p className="text-sm text-gray-400 text-center">
                    Already have an account?{" "}
                    <Link to="/login" className="text-orange-400 hover:underline">Log in</Link>
                </p>
            </div>
        </div>
    );
}
