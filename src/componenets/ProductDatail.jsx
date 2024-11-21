import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Star } from 'lucide-react';
const ProductDetail = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    useEffect(() => {
        axios
            .get(`https://dummyjson.com/products/${id}`)
            .then((response) => setProduct(response.data))
            .catch((error) => console.error('Error fetching product details', error));
    }, [id]);
    if (!product) return <p>Loading...</p>;
    return (
        <div className="container mx-auto p-6 max-w-lg bg-white shadow-lg rounded-lg mt-20 md:mt-10 md:max-w-2xl lg:max-w-3xl transition-all">
            <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">{product.title}</h2>

            <div className="flex flex-col md:flex-row gap-6">

                <div className="w-full md:w-1/2 flex justify-center">
                    <img src={product.thumbnail} alt={product.title} className="w-full h-64 object-cover rounded-lg mb-4" />
                </div>


                <div className="w-full md:w-1/2 flex flex-col">

                    <div className="flex items-center mb-2">
                        {[...Array(5)].map((_, i) => (
                            <Star key={i} className={`w-5 h-5 ${i < Math.round(product.rating) ? 'text-yellow-400' : 'text-gray-300'}`} />
                        ))}
                        <span className="text-gray-500 ml-2">({product.rating} / 5)</span>
                    </div>


                    <p className="text-lg font-bold text-blue-600">${product.price}</p>
                    <p className="text-gray-600 mt-2 mb-4">{product.description}</p>


                </div>
            </div>

            <div className="mt-8">
                <h3 className="text-xl font-semibold mb-4">Customer Reviews</h3>
                <div className="space-y-4">
                    {product.reviews && product.reviews.length ? (
                        product.reviews.map((review, index) => (
                            <div key={index} className="border-t pt-4">
                                <div className="flex items-center mb-1">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} className={`w-4 h-4 ${i < review.rating ? 'text-yellow-400' : 'text-gray-300'}`} />
                                    ))}
                                    <span className="ml-2 text-gray-600">by {review.user}</span>
                                </div>
                                <p className="text-gray-700">{review.comment}</p>
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-500">No reviews yet. Be the first to review!</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
