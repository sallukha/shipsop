import axios from 'axios';
import React from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SignUp = ({ setIsAuthenticated }) => {
    const { register, handleSubmit, formState: { errors }, watch } = useForm();
    const navigate = useNavigate();
    const password = watch("password");

    const onSubmit = async (data) => {
        if (data.password !== data.cpassword) {
            toast.error("Passwords do not match");
            return;
        }

        try {
            const response = await axios.get("https://node-backend3-f4vr.vercel.app/signup", {
                username: data.username,
                email: data.email,
                password: data.password,
            });

            console.log("Sign up success:", response.data);
            setIsAuthenticated(true);
            toast.success('Signup successful!');
            navigate("/");
        } catch (error) {
            console.error("Error during sign up:", error);
            if (error.response) {
                toast.error(error.response.data.message || 'Signup failed. Please try again.');
            } else if (error.request) {
                toast.error('No response from the server. Please check your connection.');
            } else {
                toast.error('An error occurred. Please try again.');
            }
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-500 via-pink-500 to-red-500">
            <div className="bg-white bg-opacity-20 backdrop-blur-lg rounded-lg p-8 shadow-2xl w-full max-w-md">
                <h1 className="text-4xl font-bold text-center text-white mb-8">Sign Up</h1>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    {/* Username Field */}
                    <div>
                        <label className="block text-sm font-medium text-white">Username</label>
                        <input
                            {...register('username', { required: true })}
                            type="text"
                            className={`w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300 ${errors.username ? 'border-red-500' : 'border-gray-300'
                                }`}
                        />
                        {errors.username && (
                            <span className="text-red-500 text-sm mt-1">Username is required</span>
                        )}
                    </div>

                    {/* Email Field */}
                    <div>
                        <label className="block text-sm font-medium text-white">Email</label>
                        <input
                            {...register('email', {
                                required: true,
                                pattern: /^\S+@\S+\.\S+$/,
                            })}
                            type="email"
                            className={`w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300 ${errors.email ? 'border-red-500' : 'border-gray-300'
                                }`}
                        />
                        {errors.email && (
                            <span className="text-red-500 text-sm mt-1">
                                {errors.email.type === 'required' ? 'Email is required' : 'Invalid email format'}
                            </span>
                        )}
                    </div>

                    {/* Password Field */}
                    <div>
                        <label className="block text-sm font-medium text-white">Password</label>
                        <input
                            {...register('password', {
                                required: true,
                                minLength: 6,
                            })}
                            type="password"
                            className={`w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300 ${errors.password ? 'border-red-500' : 'border-gray-300'
                                }`}
                        />
                        {errors.password && (
                            <span className="text-red-500 text-sm mt-1">
                                {errors.password.type === 'required' ? 'Password is required' : 'Password must be at least 6 characters'}
                            </span>
                        )}
                    </div>

                    {/* Confirm Password Field */}
                    <div>
                        <label className="block text-sm font-medium text-white">Confirm Password</label>
                        <input
                            {...register('cpassword', {
                                required: true,
                                validate: (value) => value === password,
                            })}
                            type="password"
                            className={`w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300 ${errors.cpassword ? 'border-red-500' : 'border-gray-300'
                                }`}
                        />
                        {errors.cpassword && (
                            <span className="text-red-500 text-sm mt-1">
                                {errors.cpassword.type === 'required' ? 'Confirm password is required' : 'Passwords do not match'}
                            </span>
                        )}
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-2 rounded-lg hover:from-blue-600 hover:to-purple-700 transition duration-300"
                    >
                        Sign Up
                    </button>
                </form>

                {/* Login Link */}
                <div className="mt-6 text-center">
                    <p className="text-white">
                        Already have an account?{' '}
                        <Link to="/login" className="text-blue-300 hover:underline">
                            Log in
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default SignUp;