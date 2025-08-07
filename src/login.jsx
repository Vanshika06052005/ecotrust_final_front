import React from 'react';
import { Link } from 'react-router-dom';

export default function Login() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center px-4 py-12">
            <div className="w-full max-w-md p-8 space-y-6 bg-white/5 backdrop-blur-md rounded-2xl shadow-2xl border border-white/10">
                {/* Header */}
                <div className="text-center">
                    <div className="w-32 h-14 mx-auto bg-gradient-to-br from-orange-500 to-green-500 rounded-2xl flex items-center justify-center shadow-md mb-4">
                        <span className="text-xl font-bold text-white tracking-wide">EcoTrust</span>
                    </div>
                    <h2 className="text-3xl font-bold text-white">Welcome back</h2>
                    <p className="text-sm text-gray-400">Login to your EcoTrust account</p>
                </div>

                {/* Form */}
                <form className="space-y-5">
                    <div>
                        <label htmlFor="email" className="block mb-1 text-sm font-medium text-gray-300">Email or Username</label>
                        <input
                            type="email"
                            id="email"
                            className="w-full px-4 py-2.5 bg-white/10 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all duration-300"
                            placeholder="you@example.com"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="block mb-1 text-sm font-medium text-gray-300">Password</label>
                        <input
                            type="password"
                            id="password"
                            className="w-full px-4 py-2.5 bg-white/10 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-300"
                            placeholder="••••••••"
                            required
                        />
                    </div>

                    <div className="flex items-center justify-between">
                        <label className="flex items-center text-sm text-gray-300">
                            <input type="checkbox" className="mr-2 accent-orange-500" />
                            Remember me
                        </label>
                        <Link to="/forgot-password" className="text-sm text-orange-400 hover:underline">
                            Forgot password?
                        </Link>
                    </div>

                    <button
                        type="submit"
                        className="w-full relative bg-gradient-to-r from-orange-500 to-green-500 text-white font-bold py-2.5 rounded-xl transition-all duration-300 hover:scale-105 shadow-lg overflow-hidden group"
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                        <span className="relative z-10"> Log In</span>
                    </button>
                </form>

                {/* Bottom Text */}
                <p className="text-sm text-gray-400 text-center">
                    Don't have an account?{" "}
                    <Link to="/Signup" className="text-green-400 hover:underline">Create new account</Link>
                </p>
            </div>
        </div>
    );
}

