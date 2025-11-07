import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const slides = [
    {
        id: 1,
        type: "image",
        title: "SUMMER VIBES",
        subtitle: "Up to 70% Off on Premium Fashion",
        cta: "Explore Collection",
        image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1200&q=80",
        textColor: "text-white",
        buttonBg: "bg-white",
        buttonText: "text-black",
        buttonHover: "hover:bg-gray-100",
        overlayOpacity: "bg-gradient-to-r from-black/60 via-black/40 to-transparent",
    },
    {
        id: 2,
        type: "text_with_product",
        tagline: "New Arrivals 2024",
        title: "Style Revolution",
        subtitle: "Discover Trending Fashion",
        description: "Redefine your wardrobe with latest collection",
        cta: "Shop Now",
        image: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=800&q=80",
        textColor: "text-gray-900",
        buttonBg: "bg-gradient-to-r from-blue-600 to-blue-700",
        buttonText: "text-white",
        buttonHover: "hover:from-blue-700 hover:to-blue-800",
    },
    {
        id: 3,
        type: "image",
        title: "MEGA CLEARANCE",
        subtitle: "Final Sale - Everything Must Go!",
        cta: "Shop Deals",
        image: "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=1200&q=80",
        textColor: "text-white",
        buttonBg: "bg-red-600",
        buttonText: "text-white",
        buttonHover: "hover:bg-red-700",
        overlayOpacity: "bg-gradient-to-t from-black/70 via-black/50 to-black/30",
    },
];

const slideVariants = {
    enter: (direction) => ({
        x: direction > 0 ? 1000 : -1000,
        opacity: 0
    }),
    center: {
        zIndex: 1,
        x: 0,
        opacity: 1
    },
    exit: (direction) => ({
        zIndex: 0,
        x: direction < 0 ? 1000 : -1000,
        opacity: 0
    })
};

const textVariants = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
};

const HeroSlider = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [[page, direction], setPage] = useState([0, 0]);

    useEffect(() => {
        const timer = setInterval(() => {
            paginate(1);
        }, 5000);

        return () => clearInterval(timer);
    }, [currentSlide]);

    const paginate = (newDirection) => {
        const newIndex = currentSlide + newDirection;
        if (newIndex >= slides.length) {
            setCurrentSlide(0);
            setPage([0, newDirection]);
        } else if (newIndex < 0) {
            setCurrentSlide(slides.length - 1);
            setPage([slides.length - 1, newDirection]);
        } else {
            setCurrentSlide(newIndex);
            setPage([newIndex, newDirection]);
        }
    };

    const slideData = slides[currentSlide];

    return (
        <div className="relative w-full h-[500px] overflow-hidden bg-gray-900">
            <AnimatePresence initial={false} custom={direction}>
                {slideData.type === "image" ? (
                    // === DESIGN 1: Full Background Image ===
                    <motion.div
                        key={slideData.id}
                        custom={direction}
                        variants={slideVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{
                            x: { type: "spring", stiffness: 300, damping: 30 },
                            opacity: { duration: 0.2 }
                        }}
                        className="absolute inset-0 flex items-center justify-center"
                    >
                        {/* Background Image */}
                        <img
                            src={slideData.image}
                            alt={slideData.title}
                            className="absolute inset-0 w-full h-full object-cover"
                            onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&q=80";
                            }}
                        />
                        
                        {/* Gradient Overlay */}
                        <div className={`absolute inset-0 ${slideData.overlayOpacity}`}></div>

                        {/* Content Container */}
                        <div className="relative z-10 text-center px-8 max-w-4xl">
                            <motion.div
                                className="mb-4"
                                variants={textVariants}
                                initial="initial"
                                animate="animate"
                                transition={{ delay: 0.2, duration: 0.6 }}
                            >
                                <div className="inline-block px-4 py-1 bg-white/20 backdrop-blur-md rounded-full mb-4">
                                    <span className={`text-sm font-semibold ${slideData.textColor} tracking-widest uppercase`}>
                                        Exclusive Offer
                                    </span>
                                </div>
                            </motion.div>

                            <motion.h1
                                className={`text-5xl md:text-7xl lg:text-8xl font-bold ${slideData.textColor} mb-4 leading-tight tracking-tight`}
                                style={{ fontFamily: "'Montserrat', sans-serif" }}
                                variants={textVariants}
                                initial="initial"
                                animate="animate"
                                transition={{ delay: 0.3, duration: 0.6 }}
                            >
                                {slideData.title}
                            </motion.h1>
                            
                            <motion.p
                                className={`text-lg md:text-2xl ${slideData.textColor} mb-8 font-light tracking-wide`}
                                variants={textVariants}
                                initial="initial"
                                animate="animate"
                                transition={{ delay: 0.4, duration: 0.6 }}
                            >
                                {slideData.subtitle}
                            </motion.p>
                            
                            <motion.button
                                className={`${slideData.buttonBg} ${slideData.buttonText} ${slideData.buttonHover} font-bold py-4 px-10 rounded-full shadow-2xl transition-all text-lg backdrop-blur-sm`}
                                variants={textVariants}
                                initial="initial"
                                animate="animate"
                                transition={{ delay: 0.5, duration: 0.6 }}
                                whileHover={{ scale: 1.08, y: -3 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                {slideData.cta}
                            </motion.button>
                        </div>
                    </motion.div>
                ) : (
                    // === DESIGN 2: Split Layout ===
                    <motion.div
                        key={slideData.id}
                        custom={direction}
                        variants={slideVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{
                            x: { type: "spring", stiffness: 300, damping: 30 },
                            opacity: { duration: 0.2 }
                        }}
                        className="absolute inset-0 bg-linear-to-br from-blue-50 via-white to-purple-50"
                    >
                        <div className="absolute inset-0 flex items-center">
                            {/* Left Content Section */}
                            <div className="relative z-10 w-full md:w-1/2 px-8 md:px-16">
                                <motion.div
                                    variants={textVariants}
                                    initial="initial"
                                    animate="animate"
                                    transition={{ delay: 0.2, duration: 0.5 }}
                                >
                                    <span className="inline-block px-4 py-1 bg-red-500 text-white text-xs font-bold rounded-full mb-4 tracking-wider">
                                        {slideData.tagline}
                                    </span>
                                </motion.div>

                                <motion.h1
                                    className={`text-5xl md:text-6xl lg:text-7xl font-bold ${slideData.textColor} mb-3 leading-none`}
                                    style={{ fontFamily: "'Montserrat', sans-serif" }}
                                    variants={textVariants}
                                    initial="initial"
                                    animate="animate"
                                    transition={{ delay: 0.3, duration: 0.5 }}
                                >
                                    {slideData.title}
                                </motion.h1>

                                <motion.p
                                    className={`text-2xl md:text-3xl font-bold ${slideData.textColor} mb-4`}
                                    variants={textVariants}
                                    initial="initial"
                                    animate="animate"
                                    transition={{ delay: 0.4, duration: 0.5 }}
                                >
                                    {slideData.subtitle}
                                </motion.p>

                                <motion.p
                                    className={`text-base md:text-lg ${slideData.textColor} opacity-70 mb-8 max-w-md`}
                                    variants={textVariants}
                                    initial="initial"
                                    animate="animate"
                                    transition={{ delay: 0.5, duration: 0.5 }}
                                >
                                    {slideData.description}
                                </motion.p>

                                <motion.button
                                    className={`${slideData.buttonBg} ${slideData.buttonText} ${slideData.buttonHover} font-bold py-4 px-10 rounded-full shadow-xl transition-all text-lg`}
                                    variants={textVariants}
                                    initial="initial"
                                    animate="animate"
                                    transition={{ delay: 0.6, duration: 0.5 }}
                                    whileHover={{ scale: 1.05, y: -3 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    {slideData.cta}
                                </motion.button>
                            </div>

                            {/* Right Image Section */}
                            <div className="hidden md:flex absolute right-0 top-0 bottom-0 w-1/2 items-center justify-center overflow-hidden">
                                <motion.div
                                    className="relative w-full h-full"
                                    initial={{ opacity: 0, x: 100 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}
                                >
                                    <motion.img
                                        src={slideData.image}
                                        alt={slideData.title}
                                        className="absolute right-0 h-full w-auto object-contain object-right filter drop-shadow-2xl"
                                        initial={{ scale: 0.9 }}
                                        animate={{ scale: 1 }}
                                        transition={{ delay: 0.5, duration: 0.8 }}
                                        onError={(e) => {
                                            e.target.onerror = null;
                                            e.target.src = "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&q=80";
                                        }}
                                    />
                                    <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-96 h-96 bg-blue-200 rounded-full blur-3xl opacity-30 -z-10"></div>
                                </motion.div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Navigation Dots */}
            <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-3 z-20">
                {slides.map((_, index) => (
                    <motion.div
                        key={index}
                        className={`h-2 rounded-full cursor-pointer transition-all duration-500 ${
                            index === currentSlide
                                ? 'bg-white w-12 shadow-lg'
                                : 'bg-white/40 w-2 hover:bg-white/60'
                        }`}
                        onClick={() => {
                            const newDirection = index > currentSlide ? 1 : -1;
                            setCurrentSlide(index);
                            setPage([index, newDirection]);
                        }}
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.9 }}
                    ></motion.div>
                ))}
            </div>

            {/* Arrow Navigation */}
            <button
                className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/20 backdrop-blur-md hover:bg-white/30 text-white p-3 rounded-full transition-all"
                onClick={() => paginate(-1)}
            >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
            </button>
            <button
                className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/20 backdrop-blur-md hover:bg-white/30 text-white p-3 rounded-full transition-all"
                onClick={() => paginate(1)}
            >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
            </button>
        </div>
    );
};

export default HeroSlider;