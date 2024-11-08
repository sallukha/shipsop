import axios from 'axios';
import React from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';

const SignUp = ({ setIsAuthenticated }) => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        try {
            const response = await axios.post("http://localhost:3000/sing_up", data);
            console.log("Sign up success:", response.data);
            setIsAuthenticated(true);
            toast.success('singup successful!');
            navigate("/");
        } catch (error) {
            console.log("Error during sign up:", error);
        }
    };

    return (
        <>

            <div className="min-h-screen flex flex-col items-center justify-center">
                <span className='text-4xl font-bold mb-10 text-cyan-700'>ShopFusion</span>

                <div className="absolute top-4 right-4 my-10">
                    <div className="relative">

                        <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg z-10">
                            <Link to="/login">

                            </Link>
                            <Link to="/signup">

                            </Link>
                        </div>
                    </div>
                </div>
                <div className="bg-gradient-to-r from-gray-500 via-zinc-100 to-stone-800 p-8 rounded shadow-md w-96">
                    <h1 className="text-2xl font-bold text-center mb-6">Sign Up</h1>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="mb-4">
                            <label className="block text-gray-700">Username</label>
                            <input
                                {...register('username', { required: true })}
                                type="text"
                                className={`w-full px-4 py-2 border ${errors.username ? 'border-red-500' : 'border-gray-300'} rounded focus:outline-none focus:ring focus:ring-blue-300`}
                            />
                            {errors.username && <span className="text-red-500 text-sm">Username is required</span>}
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700">Email</label>
                            <input
                                {...register("email", { required: true })}
                                type="email"
                                className={`w-full px-4 py-2 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded focus:outline-none focus:ring focus:ring-blue-300`}
                            />
                            {errors.email && <span className="text-red-500 text-sm">Email is required</span>}
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700">Password</label>
                            <input
                                {...register("password", { required: true })}
                                type="password"
                                className={`w-full px-4 py-2 border ${errors.password ? 'border-red-500' : 'border-gray-300'} rounded focus:outline-none focus:ring focus:ring-blue-300`}
                            />
                            {errors.password && <span className="text-red-500 text-sm">Password is required</span>}
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700">Confirm Password</label>
                            <input
                                {...register("cpassword", { required: true })}
                                type="password"
                                className={`w-full px-4 py-2 border ${errors.cpassword ? 'border-red-500' : 'border-gray-300'} rounded focus:outline-none focus:ring focus:ring-blue-300`}
                            />
                            {errors.cpassword && <span className="text-red-500 text-sm">Confirm password is required</span>}
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition duration-200"
                        >
                            Sign Up
                        </button>
                    </form>

                    
                    <div className="mt-4 text-center">
                        <p>Already have an account?
                            <Link to="/login" className="text-blue-500 hover:underline ml-2">
                                Log in
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SignUp;
