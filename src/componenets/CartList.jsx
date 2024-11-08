// CartList.js
import React from 'react';

const CartList = ({ cart, handleIncrement, handleDecrement, totalPrice }) => {
    return (
        <div className="mt-6">
            <h2 className="text-2xl font-bold mb-4">Cart</h2>
            {cart.length > 0 ? (
                <>
                    <ul>
                        {cart.map(item => (
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
                    <div className="mt-4 text-xl font-bold">Total Price: ${totalPrice.toFixed(2)}</div>
                </>
            ) : (
                <p className="text-gray-600">Your cart is empty</p>
            )}
        </div>
    );
};

export default CartList;
