import axios from 'axios';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = ({ setAuthanticate }) => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [loginError, setLoginError] = useState('');
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        try {
            const response = await axios.post("https://node-backend3-f4vr.vercel.app/login", {
                email: data.email,
                password: data.password,
            });
            console.log("Login successful", response.data);
            setAuthanticate(true);
            toast.success('Log in successful!');
            navigate("/");
        } catch (error) {
            if (error.response && error.response.status === 404) {
                setLoginError("Login failed: User not found.");
            } else {
                setLoginError("Login failed: Please try again later.");
            }
            console.error("Login failed:", error);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-500 via-pink-500 to-red-500">
            {/* Login Form Card */}
            <div className="bg-white bg-opacity-20 backdrop-blur-lg rounded-lg p-8 shadow-2xl w-full max-w-md">
                <h1 className="text-4xl font-bold text-center text-white mb-8">Login</h1>
                {loginError && (
                    <div className="mb-4 text-red-500 text-center">
                        {loginError}
                    </div>
                )}
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    {/* Email Field */}
                    <div>
                        <label className="block text-sm font-medium text-white">Email</label>
                        <input
                            {...register('email', { required: "Email is required" })}
                            type="email"
                            className={`w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300 ${errors.email ? 'border-red-500' : 'border-gray-300'
                                }`}
                        />
                        {errors.email && (
                            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                        )}
                    </div>

                    {/* Password Field */}
                    <div>
                        <label className="block text-sm font-medium text-white">Password</label>
                        <input
                            {...register('password', { required: "Password is required" })}
                            type="password"
                            className={`w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300 ${errors.password ? 'border-red-500' : 'border-gray-300'
                                }`}
                        />
                        {errors.password && (
                            <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
                        )}
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-2 rounded-lg hover:from-blue-600 hover:to-purple-700 transition duration-300"
                    >
                        Login
                    </button>
                </form>

                {/* Signup Link */}
                <div className="mt-6 text-center">
                    <p className="text-white">
                        Don't have an account?{' '}
                        <Link to="/signup" className="text-blue-300 hover:underline">
                            Sign up
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;