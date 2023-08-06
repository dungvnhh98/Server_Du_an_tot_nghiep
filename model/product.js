const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    link_avt: { type: String, required: true },
    link_img1: { type: String, required: true },
    link_img2: { type: String, required: true },
    link_img3: { type: String, required: true },
    quantity: { type: Number, required: true },
    status: { type: String, required: true },
    size: { type: String, required: true },
    color: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true }, // thêm trường phân loại (category)
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
