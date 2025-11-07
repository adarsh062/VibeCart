import React, { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const Cart = ({ items, total, onRemoveItem, onQuantityChange, onOpenCheckout, cartItems }) => {
    const navigate = useNavigate();

    // --- LOGIC (No Change) ---
    const handleRemove = async (itemId, itemName) => {
        const promise = axios.delete(`http://localhost:8080/api/cart/${itemId}`);
        toast.promise(promise, { 
            loading: 'Removing item...', 
            success: (res) => { 
                onRemoveItem(); 
                return `${itemName} was removed!`; 
            }, 
            error: 'Could not remove item.' 
        });
    };

    const handleIncrease = async (item) => {
        const promise = axios.post('http://localhost:8080/api/cart', {
            productId: item.productId, 
            name: item.name, 
            price: item.price, 
            image: item.image
        });
        toast.promise(promise, { 
            loading: 'Adding...', 
            success: (res) => { 
                onQuantityChange(); 
                return `Quantity updated!`; 
            }, 
            error: 'Could not update quantity.' 
        });
    };

    const handleDecrease = async (item) => {
        const promise = axios.post('http://localhost:8080/api/cart/decrease', { 
            productId: item.productId 
        });
        toast.promise(promise, { 
            loading: 'Removing...', 
            success: (res) => { 
                onQuantityChange(); 
                return `Quantity updated!`; 
            }, 
            error: 'Could not update item.' 
        });
    };
    // --- END LOGIC ---

    // === CALCULATION (Frontend Tax) ===
    const TAX_RATE = 0.175;
    const tax = total * TAX_RATE;
    const finalTotal = total + tax;

    return (
        <div className="relative min-h-screen">
            <section className="p-4 md:p-6 rounded-lg shadow-xl border-2 border-blue-100">
                <h2 className="text-3xl md:text-4xl font-playfair text-center mb-6 md:mb-8 text-black">Shopping Cart</h2>
                
                {items.length === 0 ? (
                    <p className="text-center text-gray-600 text-lg font-playfair italic py-10">
                        Your cart is empty.
                    </p>
                ) : (
                    <div>
                        {/* --- TABLE HEADER (Hidden on Mobile) --- */}
                        <div className="hidden md:grid grid-cols-12 font-bold text-lg text-white bg-[#94c2db] rounded-t-md py-3 px-4 shadow-md">
                            <div className="col-span-6 font-playfair">Product</div>
                            <div className="col-span-3 text-center font-playfair">Quantity</div>
                            <div className="col-span-3 text-right font-playfair">Subtotal</div>
                        </div>

                        {/* --- CART ITEMS LIST --- */}
                        <div className="space-y-4 md:space-y-0">
                            <AnimatePresence>
                                {items.map(item => (
                                    <motion.div 
                                        key={item._id} 
                                        layout
                                        initial={{ opacity: 0, x: -50 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: 100, transition: { duration: 0.3 } }}
                                        className="bg-white rounded-lg md:rounded-none p-4 shadow-md md:shadow-none border md:border-0 md:border-b border-gray-200 hover:bg-blue-50 transition-colors"
                                    >
                                        {/* Mobile Layout (Stacked) */}
                                        <div className="md:hidden space-y-3">
                                            {/* Product Image & Info */}
                                            <div className="flex items-start space-x-3">
                                                <img 
                                                    src={item.image} 
                                                    alt={item.name} 
                                                    className="w-20 h-20 object-contain rounded-md border border-blue-100 p-1 flex-shrink-0"
                                                />
                                                <div className="flex-1 min-w-0">
                                                    <strong className="text-base text-gray-900 font-playfair block truncate">{item.name}</strong>
                                                    <p className="text-sm text-gray-500">Price: ${item.price.toFixed(2)}</p>
                                                    <p className="text-sm font-semibold text-gray-800 mt-1">
                                                        Subtotal: ${(item.price * item.quantity).toFixed(2)}
                                                    </p>
                                                </div>
                                            </div>

                                            {/* Quantity Controls & Remove Button */}
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center border border-blue-300 rounded">
                                                    <motion.button 
                                                        className="w-9 h-9 text-lg text-blue-400 hover:bg-blue-100 rounded-l-md"
                                                        onClick={() => handleDecrease(item)}
                                                        whileTap={{ scale: 0.9 }}
                                                    >
                                                        -
                                                    </motion.button>
                                                    <span className="w-12 text-center text-black font-semibold">
                                                        {item.quantity}
                                                    </span>
                                                    <motion.button 
                                                        className="w-9 h-9 text-lg text-blue-400 hover:bg-blue-100 rounded-r-md"
                                                        onClick={() => handleIncrease(item)}
                                                        whileTap={{ scale: 0.9 }}
                                                    >
                                                        +
                                                    </motion.button>
                                                </div>

                                                <button 
                                                    className="text-red-500 hover:text-red-700 text-sm font-semibold transition-colors"
                                                    onClick={() => handleRemove(item._id, item.name)}
                                                >
                                                    Remove
                                                </button>
                                            </div>
                                        </div>

                                        {/* Desktop Layout (Grid) */}
                                        <div className="hidden md:grid grid-cols-12 items-center py-4 px-4">
                                            {/* Column 1: Product Info */}
                                            <div className="col-span-6 flex items-center space-x-4">
                                                <img 
                                                    src={item.image} 
                                                    alt={item.name} 
                                                    className="w-16 h-16 object-contain rounded-md border border-blue-100 p-1"
                                                />
                                                <div>
                                                    <strong className="text-base text-gray-900 font-playfair">{item.name}</strong>
                                                    <p className="text-sm text-gray-500">Price: ${item.price.toFixed(2)}</p>
                                                    <button 
                                                        className="text-red-500 hover:text-red-700 text-xs mt-0.5 transition-colors"
                                                        onClick={() => handleRemove(item._id, item.name)}
                                                    >
                                                        Remove
                                                    </button>
                                                </div>
                                            </div>
                                            
                                            {/* Column 2: Quantity Controls */}
                                            <div className="col-span-3 flex justify-center">
                                                <div className="flex items-center border border-blue-300 rounded">
                                                    <motion.button 
                                                        className="w-7 h-7 text-lg text-blue-400 hover:bg-blue-100 rounded-l-md"
                                                        onClick={() => handleDecrease(item)}
                                                        whileTap={{ scale: 0.9 }}
                                                    >
                                                        -
                                                    </motion.button>
                                                    <span className="w-8 text-center text-black font-semibold">
                                                        {item.quantity}
                                                    </span>
                                                    <motion.button 
                                                        className="w-7 h-7 text-lg text-blue-400 hover:bg-blue-100 rounded-r-md"
                                                        onClick={() => handleIncrease(item)}
                                                        whileTap={{ scale: 0.9 }}
                                                    >
                                                        +
                                                    </motion.button>
                                                </div>
                                            </div>
                                            
                                            {/* Column 3: Item Subtotal */}
                                            <div className="col-span-3 text-right text-base font-semibold text-gray-800 font-playfair">
                                                ${(item.price * item.quantity).toFixed(2)}
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </div>

                        {/* --- TOTALS SUMMARY --- */}
                        <div className="flex justify-end mt-6">
                            <div className="w-full md:max-w-sm bg-gray-50 p-4 border border-blue-100 rounded-lg shadow-inner">
                                <div className="flex justify-between font-playfair text-base md:text-lg text-gray-800 mb-2">
                                    <span>Subtotal</span>
                                    <span>${total.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between font-playfair text-base md:text-lg text-gray-800 mb-2 border-b border-gray-200 pb-2">
                                    <span>Tax ({TAX_RATE * 100}%)</span>
                                    <span>${tax.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between font-playfair text-lg md:text-xl font-bold mt-3">
                                    <span>Total</span>
                                    <span>${finalTotal.toFixed(2)}</span>
                                </div>
                                 
                                {/* Checkout Button */}
                                <motion.button 
                                    className="w-full mt-6 bg-[#94c2db] hover:bg-[#6cb5dd] text-white font-bold py-3 rounded-lg text-base md:text-lg font-playfair flex items-center justify-center space-x-2"
                                    onClick={onOpenCheckout}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    <span>Proceed to checkout</span>
                                    <span className="ml-2">→</span>
                                </motion.button>
                            </div>
                        </div>
                    </div>
                )}
            </section>
        </div>
    );
};

export default Cart;