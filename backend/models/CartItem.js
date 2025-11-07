const mongoose = require('mongoose');
    
const CartItemSchema = new mongoose.Schema({
    productId: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    // === YEH NAYA ADD KIYA HAI ===
    image: {
        type: String,
        required: false // Hum ise zaroori nahi banayenge
    },
    // ============================
    quantity: {
        type: Number,
        required: true,
        default: 1
    }
});

module.exports = mongoose.model('CartItem', CartItemSchema);