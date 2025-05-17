import axios from 'axios';
import React, { useEffect, useState, useCallback } from 'react';
import { useFilter } from './context/filterContext';
import { Link, useLocation } from 'react-router-dom';

const SideBar = () => {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const keyWords = ["apple", "watch", "fashion", "trend", "shoes", "shirt"];
    const location = useLocation();

    const {
        searchQuery,
        setSearchQuery,
        selectedCategory,
        setSelectedCategory,
        minPrice,
        setMinPrice,
        maxPrice,
        setMaxPrice,
        keyWord,
        setKeyWord,
    } = useFilter();

    // Fetch products and categories
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get("https://dummyjson.com/products");
                setProducts(res.data.products);

                const filterCategory = Array.from(new Set(res.data.products.map(product => product.category)));
                setCategories(filterCategory);
            } catch (error) {
                console.log("Error fetching products:", error);
            }
        };
        fetchData();
    }, []);

    // Toggle sidebar visibility
    const toggleSidebar = useCallback(() => setIsSidebarOpen(!isSidebarOpen), [isSidebarOpen]);

    // Handle price changes
    const handleMinPrice = useCallback((e) => {
        setMinPrice(parseFloat(e.target.value));
    }, [setMinPrice]);

    const handleMaxPrice = useCallback((e) => {
        setMaxPrice(parseFloat(e.target.value));
    }, [setMaxPrice]);

    // Handle category selection
    const handleCategoryChange = useCallback((category) => {
        setSelectedCategory(category);
    }, [setSelectedCategory]);

    // Handle keyword selection
    const handleKeyWordChange = useCallback((keyword) => {
        setKeyWord(keyword);
    }, [setKeyWord]);

    // Reset all filters
    const ResetFilter = useCallback(() => {
        setSearchQuery("");
        setSelectedCategory("");
        setMaxPrice("");
        setMinPrice("");
        setKeyWord("");
    }, [setSearchQuery, setSelectedCategory, setMaxPrice, setMinPrice, setKeyWord]);

    // Hide sidebar on login/signup pages
    if (location.pathname === "/login" || location.pathname === "/signup") {
        return null;
    }

    return (
        <>
            {/* Toggle Button for Mobile */}
            <button
                onClick={toggleSidebar}
                className="md:hidden fixed top-4 left-4 z-50 bg-yellow-600 text-white p-3 rounded-full shadow-lg hover:bg-yellow-700 transition-all duration-300"
            >
                ☰
            </button>

            {/* Sidebar Overlay for Mobile */}
            {isSidebarOpen && (
                <div
                    onClick={toggleSidebar}
                    className="fixed inset-0 bg-black opacity-50 z-40 md:hidden"
                ></div>
            )}

            {/* Sidebar */}
            <div
                className={`fixed inset-y-0 left-0 z-50 w-72 bg-white shadow-xl transform transition-transform duration-300 ease-in-out ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
                    } md:relative md:translate-x-0 md:w-64`}
            >
                {/* Close Button for Mobile */}
                <button
                    onClick={toggleSidebar}
                    className="md:hidden absolute top-4 right-4 text-gray-600 hover:text-gray-800"
                >
                    ✕
                </button>

                {/* Sidebar Content */}
                <div className="h-full overflow-y-auto p-6">
                    {/* Login/Signup Buttons */}
                    <div className="flex justify-between mb-6">
                        <Link
                            to="/login"
                            className="border border-yellow-600 text-yellow-600 hover:bg-yellow-600 hover:text-white rounded px-4 py-2 text-sm font-medium transition-all duration-300"
                        >
                            Login
                        </Link>
                        <Link
                            to="/signup"
                            className="border border-yellow-600 text-yellow-600 hover:bg-yellow-600 hover:text-white rounded px-4 py-2 text-sm font-medium transition-all duration-300"
                        >
                            Sign Up
                        </Link>
                    </div>

                    {/* Search Bar */}
                    <div className="mb-6">
                        <input
                            className="w-full p-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="🔍 Search products..."
                        />
                    </div>

                    {/* Price Range */}
                    <div className="mb-6">
                        <div className="flex gap-4">
                            <input
                                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                                type="number"
                                value={minPrice}
                                onChange={handleMinPrice}
                                placeholder="Min price"
                            />
                            <input
                                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                                type="number"
                                value={maxPrice}
                                onChange={handleMaxPrice}
                                placeholder="Max price"
                            />
                        </div>
                    </div>

                    {/* Categories */}
                    <div className="mb-6">
                        <h1 className="font-semibold text-lg text-gray-700 mb-3">Categories</h1>
                        <ul className="space-y-2">
                            {categories.map((category, index) => (
                                <li key={index} className="flex items-center gap-2">
                                    <input
                                        type="radio"
                                        name="category"
                                        className="form-radio h-4 w-4 text-yellow-600"
                                        onChange={() => handleCategoryChange(category)}
                                        checked={selectedCategory === category}
                                    />
                                    <label className="text-gray-600 hover:text-yellow-600 cursor-pointer">
                                        {category.toUpperCase()}
                                    </label>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Popular Searches */}
                    <div className="mb-6">
                        <h1 className="font-semibold text-lg text-gray-700 mb-3">Popular Searches</h1>
                        <div className="grid grid-cols-2 gap-2">
                            {keyWords.map((keyword, index) => (
                                <button
                                    key={index}
                                    onClick={() => handleKeyWordChange(keyword)}
                                    className="border border-gray-300 p-2 rounded text-center hover:bg-yellow-100 transition-all duration-300 text-sm font-medium text-gray-700"
                                >
                                    {keyword.toUpperCase()}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Reset Filters Button */}
                    <button
                        onClick={ResetFilter}
                        className="w-full border border-yellow-600 text-yellow-600 hover:bg-yellow-600 hover:text-white rounded px-4 py-2 text-sm font-medium transition-all duration-300"
                    >
                        Reset Filters
                    </button>
                </div>
            </div>
        </>
    );
};

export default SideBar;