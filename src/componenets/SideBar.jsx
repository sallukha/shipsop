import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useFilter } from './context/filterContext'
import { Link, useLocation } from 'react-router-dom'
const SideBar = () => {
    const [products, setProducts] = useState([])
    const [categories, setCategories] = useState([])
    const [isSidebarOpen, setIsSidebarOpen] = useState(false)
    const keyWords = ["apple", "watch", "fashion", "trend", "shoes", "shirt"]
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
    } = useFilter()

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get("https://dummyjson.com/products")
                setProducts(res.data.products)

                const filterCategory = Array.from(new Set(res.data.products.map(product => product.category)))
                setCategories(filterCategory)
            } catch (error) {
                console.log("Error fetching products:", error)
            }
        }
        fetchData()
    }, [])

    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen)

    const handleMinPrice = (e) => {
        let value = parseFloat(e.target.value)
        setMinPrice(value)
    }

    const handleMaxPrice = (e) => {
        let value = parseFloat(e.target.value)
        setMaxPrice(value)
    }

    const handleCategoryChange = (category) => {
        setSelectedCategory(category)
    }

    const handleKeyWordChange = (keyword) => {
        setKeyWord(keyword)
    }

    const ResetFilter = () => {
        setSearchQuery("")
        setSelectedCategory("")
        setMaxPrice("")
        setMinPrice("")
        setKeyWord("")
    }
    if (location.pathname === "/login" || location.pathname === "/signup") {
        return null;
    }
    return (
        <>
            <button
                onClick={toggleSidebar}
                className="md:hidden fixed top-4 left-4 z-40 bg-yellow-600 text-white p-3 rounded-full "
            >
                ☰
            </button>

            <div className={`fixed inset-0 z-40 transition-transform transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:relative md:translate-x-0`}>

                {isSidebarOpen && (
                    <div
                        onClick={toggleSidebar}
                        className="fixed inset-0 bg-black opacity-50 z-30 md:hidden"
                    ></div>
                )}

                <div className="bg-gray-50 w-72 md:w-full h-full md:h-auto fixed z-40 top-0 left-0 p-6 md:static shadow-lg transition-all duration-300 ease-in-out">

                    <button
                        onClick={toggleSidebar}
                        className="md:hidden absolute top-3 right-3 text-gray-500 hover:text-gray-700"
                    >
                        ✕
                    </button>

                   
                    <div className="flex justify-between mb-5">
                        <button className="border border-yellow-600 text-yellow-600 hover:bg-yellow-600 hover:text-white rounded p-2 w-24 text-sm font-medium">
                            <Link to="/login"> Login</Link>
                        </button>
                        <button className="border border-yellow-600 text-yellow-600 hover:bg-yellow-600 hover:text-white rounded p-2 w-24 text-sm font-medium">
                            <Link to="/signup">SingUp</Link>
                        </button>
                    </div>

                    <section className="mt-12">
                        <div className="mx-auto w-full max-w-xs md:max-w-full ">
                            <input
                                className="border border-gray-300 p-2 w-full mb-4 rounded-md placeholder-gray-400"
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="🔍 Search products..."
                            />
                            <div className="flex flex-col sm:flex-row gap-4 mt-3">
                                <input
                                    className="border border-gray-300 p-2 w-full sm:w-28 rounded-md"
                                    type="number"
                                    value={minPrice}
                                    onChange={handleMinPrice}
                                    placeholder="Min price"
                                />
                                <input
                                    className="border border-gray-300 p-2 w-full sm:w-28 rounded-md"
                                    type="number"
                                    placeholder="Max price"
                                    value={maxPrice}
                                    onChange={handleMaxPrice}
                                />
                            </div>
                            <div className="mt-8">
                                <h1 className="font-semibold text-lg text-gray-700">Categories</h1>
                                <ul className="mt-3 space-y-2">
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
                            <div className="mt-8">
                                <h1 className="font-semibold text-lg text-gray-700">Popular Searches</h1>
                                <div className="mt-3 grid grid-cols-2 gap-2">
                                    {keyWords.map((keyword, index) => (
                                        <button
                                            key={index}
                                            onClick={() => handleKeyWordChange(keyword)}
                                            className="border border-gray-300 p-2 rounded text-center hover:bg-yellow-100 w-full text-sm font-medium text-gray-700"
                                        >
                                            {keyword.toUpperCase()}
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <div className="mt-3 flex justify-center">
                                <button onClick={ResetFilter} className="border border-yellow-600 text-yellow-600 hover:bg-yellow-600 hover:text-white rounded p-2 w-full sm:w-auto">
                                    Reset Filters
                                </button>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </>
    )
}

export default SideBar
