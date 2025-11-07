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
    image: {
        type: String,
        required: false
    },
    quantity: {
        type: Number,
        required: true,
        default: 1
    }
});

module.exports = mongoose.model('CartItem', CartItemSchema);
