import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion'; 

const CartIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
    </svg>
);

const gridContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.05 
        }
    }
};

const cardVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, borderColor: "#dbeafe", transition: { duration: 0.3, ease: "easeOut" } }
};

// Skeleton Component
const ProductSkeleton = () => (
    <div className="w-full h-auto bg-gray-200 rounded-lg shadow-lg overflow-hidden flex flex-col animate-pulse border-2 border-blue-100">
        <div className="h-64 bg-gray-300 p-4">
            <div className="w-full h-full rounded-lg bg-gray-400"></div>
        </div>
        <div className="p-5 flex flex-col grow justify-between">
            <div>
                <div className="h-4 bg-gray-300 rounded w-full"></div>
                <div className="h-4 bg-gray-300 rounded w-3/4 mx-auto mt-2"></div>
                <div className="h-8 bg-gray-300 rounded w-1/2 mx-auto mt-4"></div>
            </div>
            <div className="mt-2 h-11 flex items-center justify-center">
                <div className="w-full h-11 bg-gray-300 rounded-lg"></div>
            </div>
        </div>
    </div>
);


const Products = ({ onItemAdded, cartItems }) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true); 

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true); 
            try {
                const response = await axios.get('https://fakestoreapi.com/products');
                setProducts(response.data); 
            } catch (error) {
                console.error("Error fetching products:", error);
                toast.error("Could not fetch products. Please try refreshing.");
            } finally {
                setLoading(false); 
            }
        };
        fetchProducts();
    }, []); 

    const handleIncrease = async (product) => {
        const promise = axios.post('http://localhost:8080/api/cart', {
            productId: product.id,
            name: product.title,
            price: product.price,
            image: product.image,
        });

        toast.promise(promise, {
            loading: 'Updating...',
            success: (res) => {
                onItemAdded();
                return `Quantity updated!`;
            },
            error: (err) => {
                console.error("Error adding item:", err);
                return "Could not update quantity.";
            }
        });
    };

    const handleDecrease = async (product) => {
        const promise = axios.post('http://localhost:8080/api/cart/decrease', {
            productId: product.id
        });
        toast.promise(promise, {
            loading: 'Updating...',
            success: (res) => {
                onItemAdded();
                return `Quantity updated!`;
            },
            error: (err) => {
                console.error("Error decreasing item:", err);
                return "Could not update quantity.";
            }
        });
    };

    const getItemInCart = (productId) => {
        return cartItems.find(item => item.productId === String(productId));
    };

    return (
        <section className="my-8 px-4">
            <h2 className="text-center text-black text-4xl font-playfair mb-10">
                Products
            </h2>
            
            {loading ? (
                // Skeleton loading state
                <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-8">
                    {Array.from({ length: 8 }).map((_, index) => (
                        <ProductSkeleton key={index} />
                    ))}
                </div>
            ) : (
                // Product loaded state
                <motion.div 
                    className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-8"
                    variants={gridContainerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    {products.map(product => {
                        
                        const itemInCart = getItemInCart(product.id);
                        const quantityInCart = itemInCart ? itemInCart.quantity : 0;

                        return (
                            <motion.div 
                                key={product.id} 
                                className="w-full h-auto bg-white rounded-lg shadow-xl overflow-hidden flex flex-col border-2"
                                variants={cardVariants}
                                transition={{ type: "spring", stiffness: 400, damping: 17 }}
                                whileHover={{ 
                                    scale: 1.05, 
                                    boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)",
                                    borderColor: "#93c5fd" 
                                }}
                            >
                                <div className="h-64 bg-linear-to-b from-[#CBE3EF] to-[#c1deec] p-4">
                                    <img 
                                        className="w-full h-full rounded-lg object-contain"
                                        src={product.image} 
                                        alt={product.title} 
                                    />
                                </div>
                                
                                <div className="p-5 flex flex-col grow justify-between">
                                    <div>
                                        <h3 className="min-h-56px text-center text-black text-lg font-playfair font-semibold line-clamp-2">
                                            {product.title}
                                        </h3>
                                        <p className="text-center text-black text-xl font-playfair font-bold my-2">
                                            ${product.price.toFixed(2)}
                                        </p>
                                    </div>
                                    
                                    <div className="mt-2 h-11 flex items-center justify-center">
                                        {quantityInCart === 0 ? (
                                            <motion.button 
                                                className="w-full h-11 bg-linear-to-r from-blue-400 to-blue-300 hover:from-blue-400 hover:to-blue-600 rounded-lg flex items-center justify-center gap-2 text-white text-base font-playfair font-semibold shadow-md hover:shadow-lg transition-all"
                                                onClick={() => handleIncrease(product)}
                                                whileHover={{ scale: 1.03, y: -2 }}
                                                whileTap={{ scale: 0.97 }}
                                            >
                                                <CartIcon />
                                                <span>Add to Cart</span>
                                            </motion.button>
                                        ) : (
                                            <div className="flex items-center justify-center w-full h-11 rounded-lg border-2 border-blue-300 bg-white shadow-md overflow-hidden">
                                                <motion.button 
                                                    className="w-12 h-full text-xl font-bold text-blue-400 hover:bg-blue-50 transition-colors flex items-center justify-center"
                                                    onClick={() => handleDecrease(product)}
                                                    whileTap={{ scale: 0.9 }}
                                                >
                                                    -
                                                </motion.button>
                                                <span className="flex-1 text-center text-blue-600 font-bold text-lg font-playfair bg-blue-50 h-full flex items-center justify-center border-x-2 border-blue-300">
                                                    {quantityInCart}
                                                </span>
                                                <motion.button 
                                                    className="w-12 h-full text-xl font-bold text-blue-600 hover:bg-blue-50 transition-colors flex items-center justify-center"
                                                    onClick={() => handleIncrease(product)}
                                                    whileTap={{ scale: 0.9 }}
                                                >
                                                    +
                                                </motion.button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </motion.div>
            )}
        </section>
    );
};

export default Products;