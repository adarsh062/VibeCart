import React from 'react';
import logoImage from '../assets/logo.svg';
import { motion } from 'framer-motion';

const Footer = () => {
    return (
        <motion.footer 
            className="w-full mt-14 py-4 flex justify-center bg-[#5AA8D6] items-center border-t border-blue-200"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
        >
            <img 
                className="h-14" 
                src={logoImage} 
                alt="Vibe Commerce" 
            />
        </motion.footer>
    );
};

export default Footer;