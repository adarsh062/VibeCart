// App.jsx - Updated Structure

import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import axios from 'axios';
import { Toaster } from 'react-hot-toast';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';

import Header from './components/Header.jsx'; 
import Products from './components/Products.jsx'; 
import Cart from './components/Cart.jsx'; 
import Checkout from './components/Checkout.jsx';
import ReceiptModal from './components/ReceiptModal.jsx';
import Footer from './components/Footer.jsx';
import HeroSlider from './components/HeroSlider.jsx';

function App() {
  const [cartItems, setCartItems] = useState([]);
  const [cartTotal, setCartTotal] = useState(0);
  const [receipt, setReceipt] = useState(null); 
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);

  const fetchCart = async () => {
    try {
        const response = await axios.get('http://localhost:8080/api/cart');
        setCartItems(response.data.items); 
        setCartTotal(response.data.total); 
    } catch (error) {
        console.error("Error fetching cart:", error);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []); 

  const handleCheckoutSuccess = (receiptData) => {
    setReceipt(receiptData); 
    fetchCart(); 
    setShowCheckoutModal(false);
  };
  
  const handleProceedToCheckout = () => {
    if (cartItems.length > 0) {
        setShowCheckoutModal(true);
    } else {
        toast.error("Your cart is empty! Add items first.");
    }
  };

  return (
    <motion.div layout className="bg-[#EDF3FB] min-h-screen flex flex-col"> 
      <Toaster position="bottom-right" /> 
      <Header cartItemCount={cartItems.length} />
      
      <Routes>
        {/* 1. Home Route */}
        <Route 
          path="/" 
          element={
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
              {/* Hero Slider - No Container */}
              <HeroSlider /> 
              
              {/* Products - With Container */}
              <div className="container mx-auto p-4 max-w-7xl">
                <Products onItemAdded={fetchCart} cartItems={cartItems}/>
              </div>
            </motion.div>
          } 
        />
        
        {/* 2. Cart Route */}
        <Route 
          path="/cart" 
          element={
            <div className="container mx-auto p-4 max-w-7xl grow">
              <Cart 
                  items={cartItems} 
                  total={cartTotal} 
                  onRemoveItem={fetchCart}
                  onQuantityChange={fetchCart}
                  onOpenCheckout={handleProceedToCheckout}
              />
            </div>
          }
        />
      </Routes>
      
      <ReceiptModal 
        receipt={receipt}
        onClose={() => setReceipt(null)} 
      />
      
      <Checkout 
        cartItems={cartItems}
        total={cartTotal}
        onCheckoutSuccess={handleCheckoutSuccess}
        isShowing={showCheckoutModal} 
        onClose={() => setShowCheckoutModal(false)}
      />

      <Footer />
    </motion.div>
  );
}

export default App;