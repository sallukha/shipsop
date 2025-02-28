import axios from 'axios';
import React, { useState, useEffect } from 'react';

const CartList = ({ cart, handleIncrement, handleDecrement, totalPrice, clearCart }) => {
    const [isProcessing, setIsProcessing] = useState(false); // Track payment status
    const [isRazorpayLoaded, setIsRazorpayLoaded] = useState(false);

    useEffect(() => {
        if (window.Razorpay) {
            setIsRazorpayLoaded(true);
        } else {
            const script = document.createElement('script');
            script.src = 'https://checkout.razorpay.com/v1/checkout.js';
            script.onload = () => setIsRazorpayLoaded(true);
            script.onerror = () => console.error('Failed to load Razorpay script.');
            document.body.appendChild(script);
        }
    }, []);

    const handleClickPayment = async () => {
        if (isProcessing || !isRazorpayLoaded) {
            alert('Payment system not ready. Please try again.');
            return;
        }

        setIsProcessing(true); // Disable the button while processing
        try {
            const res = await axios.post('http://localhost:5000/payment/checkout', {
                name: 'Product Checkout',
                amount: totalPrice * 100, // Convert to the smallest currency unit (paise for INR)
            });

            const { order } = res.data;

            const options = {
                key: 'rzp_test_YbBZ9UxIkaF0Pf', // Replace with your Razorpay Test Key
                amount: order.amount,
                currency: order.currency,
                name: 'E-Commerce App',
                description: 'Product Checkout',
                order_id: order.id,
                callback_url: 'http://localhost:5000/payment/payment-verification',
                prefill: {
                    name: 'Sallu Khan',
                    email: 'sallu.khan@example.com',
                    contact: '9000090000',
                },
                theme: {
                    color: '#3399cc',
                },
                handler: function (response) {
                    alert('Payment successful! Payment ID: ' + response.razorpay_payment_id);
                    // Clear the cart after successful payment
                },
                modal: {
                    ondismiss: function () {
                        console.log('Payment modal dismissed by user.');
                        alert('Payment process was cancelled.');
                    },
                },
            };

            const rzp1 = new window.Razorpay(options);
            rzp1.open();
        } catch (error) {
            console.error('Payment Error:', error);
            alert('Payment failed. Please try again.');
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <div className="mt-6">
            <h2 className="text-2xl font-bold mb-4">Cart</h2>
            {cart.length > 0 ? (
                <>
                    <ul>
                        {cart.map((item) => (
                            <li key={item.id} className="flex items-center gap-2 mb-2">
                                <span>{item.title}</span>
                                <div className="flex items-center">
                                    <button
                                        className="bg-gray-300 p-1 rounded-md"
                                        onClick={() => handleDecrement(item.id)}
                                    >
                                        -
                                    </button>
                                    <span className="mx-2">{item.quantity}</span>
                                    <button
                                        className="bg-gray-300 p-1 rounded-md"
                                        onClick={() => handleIncrement(item.id)}
                                    >
                                        +
                                    </button>
                                    <span className="text-blue-600 font-bold ml-4">
                                        ${item.price * item.quantity}
                                    </span>
                                </div>
                            </li>
                        ))}
                    </ul>
                    <div className="mt-4 text-xl font-bold">
                        Total Price: ${totalPrice.toFixed(2)}
                    </div>
                </>
            ) : (
                <p className="text-gray-600">Your cart is empty</p>
            )}
            <div className="div">
                <button
                    className={`bg-green-700 rounded p-2 mt-5 ${isProcessing ? 'opacity-50 cursor-not-allowed' : ''}`}
                    onClick={handleClickPayment}
                    disabled={cart.length === 0 || isProcessing || !isRazorpayLoaded}
                >
                    {isProcessing ? 'Processing...' : 'Pay'}
                </button>
            </div>
        </div>
    );
};

export default CartList;
