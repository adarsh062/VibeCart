import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const modalBackdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
};

const modalContentVariants = {
    hidden: { opacity: 0, scale: 0.7 },
    visible: { opacity: 1, scale: 1, transition: { type: "spring", stiffness: 300, damping: 20 } }
};

const ReceiptModal = ({ receipt, onClose }) => {
    return (
        <AnimatePresence>
            {receipt && (
                <motion.div 
                    className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50 p-4"
                    onClick={onClose}
                    variants={modalBackdropVariants}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                >
                    <motion.div 
                        className="bg-white p-8 rounded-xl shadow-2xl text-center max-w-md w-full font-playfair border-4 border-blue-100"
                        onClick={(e) => e.stopPropagation()}
                        variants={modalContentVariants}
                    >
                        <div className="w-16 h-16 bg-[#dceef9] text-blue-400 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                        </div>
                        <h2 className="text-3xl font-extrabold text-[#57b3e4] mb-3">Checkout Successful!</h2>
                        <p className="text-gray-600 mb-6 text-lg">Thank you for your purchase.</p>
                        <div className="space-y-2 text-left bg-blue-50 p-4 rounded-lg border border-blue-200">
                            <p className="text-gray-800 text-lg">
                                <strong>Total Paid:</strong> 
                                <span className="font-bold text-xl ml-2 text-black">${receipt.total.toFixed(2)}</span>
                            </p>
                            <p className="text-gray-800 text-lg">
                                <strong>Order Time:</strong> 
                                <span className="font-medium ml-2">{new Date(receipt.timestamp).toLocaleString()}</span>
                            </p>
                        </div>
                        <motion.button 
                            className="mt-8 w-full bg-[#62bff2] hover:bg-[#94c2db] text-white font-bold py-3 px-5 rounded-lg text-lg transition-colors"
                            onClick={onClose}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            Close
                        </motion.button>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default ReceiptModal;