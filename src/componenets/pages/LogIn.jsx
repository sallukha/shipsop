import axios from 'axios';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
const Login = ({ setAuthanticate }) => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [loginError, setLoginError] = useState('');
    const navigate = useNavigate();
    const onSubmit = async (data) => {
        try {
            const response = await axios.post("http://localhost:3000/log_in", {
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
        <div className="   min-h-screen flex flex-col items-center justify-center">
            <span className='text-4xl font-bold mb-10 text-cyan-700'>ShipShop</span>
            {/* Account Dropdown */}
            <div className="absolute top-4 right-4">
                <div className="relative">

                    <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg z-10">
                        <Link to="/login">

                        </Link>
                        <Link to="/signup">


                        </Link>
                    </div>
                </div>
            </div>

            {/* Login Form */}
            <div className="bg-gradient-to-r from-gray-500 via-zinc-100 to-stone-800  p-8 rounded-3xl shadow-md w-96">

                <h1 className="text-2xl font-bold text-center mb-6">Login</h1>
                {loginError && (
                    <div className="mb-4 text-red-500 text-center">
                        {loginError}
                    </div>
                )}
                <form onSubmit={handleSubmit(onSubmit)}>

                    <div className="mb-4">
                        <label className="block text-gray-700">Email</label>
                        <input
                            {...register('email', { required: "Email is required" })}
                            type="email"
                            className={`w-full px-4 py-2 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded focus:outline-none focus:ring focus:ring-blue-300`}
                        />
                        {errors.email && <p className="text-red-500">{errors.email.message}</p>}
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Password</label>
                        <input
                            {...register('password', { required: "Password is required" })}
                            type="password"
                            className={`w-full px-4 py-2 border ${errors.password ? 'border-red-500' : 'border-gray-300'} rounded focus:outline-none focus:ring focus:ring-blue-300`}
                        />
                        {errors.password && <p className="text-red-500">{errors.password.message}</p>}
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition duration-200"
                    >
                        Login
                    </button>
                </form>

                {/* Signup Link */}
                <div className="mt-4 text-center">
                    <p>Don't have an account?
                        <Link to="/signup" className="text-blue-500 hover:underline ml-2">
                            Sign up
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
