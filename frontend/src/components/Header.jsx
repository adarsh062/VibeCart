import React from 'react';
import { Link } from 'react-router-dom';
import logoImage from '../assets/logo.svg'; 
import { motion } from 'framer-motion';

const CartIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
    </svg>
);

const Header = ({ cartItemCount }) => {
    return (
        <header 
            className="w-full h-14 bg-[#5AA8D6] shadow-md sticky top-0 z-50"
        >
            <div className="container mx-auto max-w-7xl h-full flex items-center justify-between px-4">

                <Link to="/">
                    <motion.img 
                        className="h-12 filter brightness-0 invert" 
                        src={logoImage} 
                        alt="Vibe Commerce" 
                        whileHover={{ scale: 1.05 }}
                        transition={{ type: "spring", stiffness: 400 }}
                    />
                </Link>

                <nav className="flex items-center space-x-6">
                    <div 
                    >
                        <Link 
                            to="/"
                            className="text-white text-lg font-semibold hover:text-white transition-colors relative group">Home
                            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
                        </Link>
                    </div>
                    <motion.div 
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <Link 
                            to="/cart"
                            className="relative h-10 px-5 bg-white rounded-full flex items-center justify-center space-x-2 shadow-md hover:shadow-xl transition-all group"
                        >
                            <div
                                className="text-blue-700"
                            >
                                <CartIcon />
                            </div>
                            <span className="text-blue-700 text-lg font-bold">
                                Cart
                            </span>
                            {cartItemCount > 0 && (
                                <span 
                                    className="absolute -top-2 -right-2 bg-linear-to-r from-red-500 to-red-600 text-white text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center shadow-lg"
                                >
                                    {cartItemCount}
                                </span>
                            )}
                        </Link>
                    </motion.div>
                </nav>
            </div>
        </header>
    );
};

export default Header;