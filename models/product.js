const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    link_avt: { type: String, required: true },
    link_img1: { type: String, required: true },
    link_img2: { type: String, required: true },
    link_img3: { type: String, required: true },
    quantity: { type: Number, required: true },
    status: {
        type: String,
        enum: ['in stock', 'out of business', 'out of stock'],
        required: true
    },
    size: [{ type: String, required: true }],
    color: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: false },
    soldCount: { type: Number, default: 0 },
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
