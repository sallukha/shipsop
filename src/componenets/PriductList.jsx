import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ReactPaginate from 'react-paginate';
import CartList from './CartList';
import { useNavigate } from 'react-router-dom';
import { useFilter } from './context/filtercOntext';
import { Tally3 } from 'lucide-react';

const Navbar = () => {
    const { searchQuery, selectedCategory, minPrice, maxPrice, keyWord } = useFilter();
    const [cart, setCart] = useState([]);
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [sortOption, setSortOption] = useState("");
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const navigate = useNavigate();
    const itemsPerPage = 8;

    useEffect(() => {
        let url = 'https://dummyjson.com/products';
        if (keyWord) {
            url = `https://dummyjson.com/products/search?q=${keyWord}`;
        }
        axios
            .get(url)
            .then((response) => setProducts(response.data.products))
            .catch((error) => console.error('Error fetching products', error));
    }, [keyWord]);

    const getFilteredProducts = () => {
        let filteredProducts = [...products];
        if (selectedCategory) {
            filteredProducts = filteredProducts.filter(product => product.category === selectedCategory);
        }
        if (minPrice) {
            filteredProducts = filteredProducts.filter(product => product.price >= minPrice);
        }
        if (maxPrice) {
            filteredProducts = filteredProducts.filter(product => product.price <= maxPrice);
        }
        if (searchQuery) {
            filteredProducts = filteredProducts.filter(product =>
                product.title.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }
        if (keyWord) {
            filteredProducts = filteredProducts.filter(product =>
                product.title.toLowerCase().includes(keyWord.toLowerCase())
            );
        }

        if (sortOption === "Expensive") {
            filteredProducts.sort((a, b) => b.price - a.price);
        } else if (sortOption === "Cheap") {
            filteredProducts.sort((a, b) => a.price - b.price);
        } else if (sortOption === "Popular") {
            filteredProducts.sort((a, b) => b.popularity - a.popularity);
        }

        return filteredProducts;
    };
    const offset = currentPage * itemsPerPage;
    const filteredProducts = getFilteredProducts();
    const currentProducts = filteredProducts.slice(offset, offset + itemsPerPage);
    const pageCount = Math.ceil(filteredProducts.length / itemsPerPage);

    const handlePageClick = ({ selected }) => {
        setCurrentPage(selected);
    };

    const handleProductClick = (productId) => {
        navigate(`/product/${productId}`);
    };

    const handleAddCart = (product) => {
        setCart(prevCart => {
            const itemInCart = prevCart.find(item => item.id === product.id);
            if (itemInCart) {
                return prevCart.map(item =>
                    item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
                );
            }
            return [...prevCart, { ...product, quantity: 1 }];
        });
    };

    const handleIncrement = (productId) => {
        setCart(prevCart =>
            prevCart.map(item =>
                item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
            )
        );
    };
    const handleDecrement = (productId) => {
        setCart(prevCart =>
            prevCart.map(item =>
                item.id === productId && item.quantity > 1
                    ? { ...item, quantity: item.quantity - 1 }
                    : item
            ).filter(item => item.quantity > 0)
        );
    };

    const totalPrice = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const applyFilter = (option) => {
        setSortOption(option);
        setIsDropdownOpen(false); // Close dropdown after selection
    };

    return (
        <div className="p-12">
            <h1 className="fixed top-0 left-0 right-0 text-3xl font-bold justify-center text-center mb-8 text-green-400 mt-7">ShipShop</h1>
            <div className="fixed top-0 right-0 mt-4 mr-4">
                <button className="bg-yellow-600 p-2 rounded-md mb-3" onClick={toggleDropdown}>
                    <Tally3 />
                </button>
            </div>

            {isDropdownOpen && (
                <div className="absolute top-12 right-0 bg-white border shadow-md rounded-md mt-2 z-10">
                    <button className="block px-4 py-2 hover:bg-gray-100" onClick={() => applyFilter('Cheap')}>
                        Cheap
                    </button>
                    <button className="block px-4 py-2 hover:bg-gray-100" onClick={() => applyFilter('Expensive')}>
                        Expensive
                    </button>
                    <button className="block px-4 py-2 hover:bg-gray-100" onClick={() => applyFilter('Popular')}>
                        Popular
                    </button>
                </div>
            )}
            <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-10 p-5">
                {currentProducts.map(product => (
                    <div
                        key={product.id}
                        className="border rounded-lg p-4 shadow-lg bg-white cursor-pointer"
                        onClick={() => handleProductClick(product.id)}
                    >
                        <img src={product.thumbnail} alt={product.title} className="w-full h-48 object-cover rounded-md mb-4" />
                        <h2 className="text-lg font-semibold mb-2">{product.title}</h2>
                        <p className="text-gray-600 mb-4">{product.description}</p>
                        <button
                            className="bg-green-400 p-2 rounded-md font-bold"
                            onClick={(e) => { e.stopPropagation(); handleAddCart(product); }}
                        >
                            Add to cart
                        </button>
                        <p className="font-bold text-blue-600 mt-2">${product.price}</p>
                    </div>
                ))}
            </div>
            <div className="flex justify-center mt-6">
                <ReactPaginate
                    previousLabel={'Previous'}
                    nextLabel={'Next'}
                    breakLabel={'...'}
                    pageCount={pageCount}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={3}
                    onPageChange={handlePageClick}
                    containerClassName={'pagination flex gap-2'}
                    pageClassName={'px-3 py-1 rounded bg-gray-200'}
                    activeClassName={'bg-blue-700 text-white'}
                    previousClassName={'px-4 py-2 bg-blue-500 text-white rounded'}
                    nextClassName={'px-4 py-2 bg-blue-500 text-white rounded'}
                    disabledClassName={'opacity-50 cursor-not-allowed'}
                />
            </div>

            <CartList
                cart={cart}
                handleIncrement={handleIncrement}
                handleDecrement={handleDecrement}
                totalPrice={totalPrice}
            />
        </div>
    );
};

export default Navbar;
