// Import packages
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config(); 

const CartItem = require('./models/CartItem');

// App setup
const app = express();
const PORT = process.env.PORT || 8080;

// Middleware
app.use(cors());
app.use(express.json());

// --- Database Connection ---
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB connected successfully!"))
.catch((err) => console.error("MongoDB connection error:", err));

// --- API Routes ---

// API 1: GET /api/products
const mockProducts = [ 
    { id: 1, name: 'Classic T-Shirt', price: 25.99 }
];
app.get('/api/products', (req, res) => {
    try {
        res.status(200).json(mockProducts);
    } catch (error) {
        res.status(500).json({ message: "Error fetching products", error: error.message });
    }
});


// === API 2: 
app.post('/api/cart', async (req, res) => {
    try {
        // 1. Image ko body se receive kiya
        const { productId, name, price, image } = req.body; 
        
        let item = await CartItem.findOne({ productId: productId });

        if (item) {
            item.quantity++;
            await item.save();
            res.status(200).json(item);
        } else {
            const newItem = new CartItem({
                productId,
                name,
                price,
                image, 
                quantity: 1 
            });
            await newItem.save();
            res.status(201).json(newItem);
        }

    } catch (error) {
        res.status(500).json({ message: "Error adding/incrementing item", error: error.message });
    }
});

// API 3: GET /api/cart
app.get('/api/cart', async (req, res) => {
    try {
        const items = await CartItem.find();
        const total = items.reduce((acc, item) => acc + (item.price * item.quantity), 0);
        res.status(200).json({ items, total });
    } catch (error) {
        res.status(500).json({ message: "Error fetching cart", error: error.message });
    }
});

// API 4: DELETE /api/cart/:id
app.delete('/api/cart/:id', async (req, res) => {
    try {
        const itemId = req.params.id;
        await CartItem.findByIdAndDelete(itemId);
        res.status(200).json({ message: "Item removed successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error removing item", error: error.message });
    }
});

// API 5: POST /api/checkout
app.post('/api/checkout', async (req, res) => {
    try {
        const { cartItems, total } = req.body; 
        await CartItem.deleteMany({});
        res.status(200).json({
            success: true,
            message: "Checkout successful!",
            total: total,
            timestamp: new Date()
        });
    } catch (error) {
        res.status(500).json({ message: "Error during checkout", error: error.message });
    }
});

// API 6: POST /api/cart/decrease
app.post('/api/cart/decrease', async (req, res) => {
    try {
        const { productId } = req.body;
        let item = await CartItem.findOne({ productId: productId });

        if (item) {
            if (item.quantity > 1) {
                item.quantity--;
                await item.save();
                res.status(200).json(item);
            } else {
                await CartItem.findByIdAndDelete(item._id);
                res.status(200).json({ message: "Item removed as quantity reached 0" });
            }
        } else {
            res.status(404).json({ message: "Item not found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Error decreasing quantity", error: error.message });
    }
});

// --- Server Start ---
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
