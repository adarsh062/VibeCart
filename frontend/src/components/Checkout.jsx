import React, { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';

const Checkout = ({ cartItems, total, onCheckoutSuccess, isShowing, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
  });
  const [isProcessing, setIsProcessing] = useState(false);

  const TAX_RATE = 0.175;
  const tax = total * TAX_RATE;
  const finalTotal = total + tax;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsProcessing(true);
      const res = await axios.post('http://localhost:8080/api/checkout', {
        ...formData,
        cartItems,
        total: finalTotal,
      });
      toast.success('Order placed successfully!');
      onCheckoutSuccess(res.data);
      setFormData({ name: '', email: '' }); // Reset form
    } catch (err) {
      toast.error('Something went wrong. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  if (!isShowing) return null;

  return (
    <AnimatePresence>
      {isShowing && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          >
            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="bg-[#7ac8f2] px-6 py-5 flex items-center justify-between">
                <h2 className="text-2xl font-playfair font-bold text-white">
                  Checkout
                </h2>
                <button
                  className="text-white hover:text-gray-200 text-3xl leading-none transition-colors"
                  onClick={onClose}
                >
                  &times;
                </button>
              </div>

              {/* Content */}
              <div className="p-6 space-y-5">
                {/* Order Summary */}
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                  <h3 className="font-semibold text-gray-700 mb-3 font-playfair">Order Summary</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between text-gray-600">
                      <span>Subtotal:</span>
                      <span className="font-semibold">${total.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                      <span>Tax ({TAX_RATE * 100}%):</span>
                      <span className="font-semibold">${tax.toFixed(2)}</span>
                    </div>
                    <div className="border-t border-blue-200 pt-2 mt-2">
                      <div className="flex justify-between font-bold text-lg text-gray-800">
                        <span>Total:</span>
                        <span className="text-blue-600">${finalTotal.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Checkout Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter your full name"
                      required
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Enter your email"
                      required
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
                    />
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3 pt-2">
                    <button
                      type="button"
                      onClick={onClose}
                      className="flex-1 border-2 border-gray-300 text-gray-700 font-semibold py-3 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      Cancel
                    </button>
                    <motion.button
                      type="submit"
                      className="flex-1 bg-[#61bbeb] hover:bg-blue-300 text-white font-bold py-3 rounded-lg font-playfair transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      whileHover={!isProcessing ? { scale: 1.02 } : {}}
                      whileTap={!isProcessing ? { scale: 0.98 } : {}}
                      disabled={isProcessing}
                    >
                      {isProcessing ? (
                        <span className="flex items-center justify-center">
                          <svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                          </svg>
                          Processing...
                        </span>
                      ) : (
                        `Confirm Order`
                      )}
                    </motion.button>
                  </div>
                </form>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Checkout;