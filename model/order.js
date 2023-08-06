const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    iduser: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    idproduct: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    idpromotion: { type: mongoose.Schema.Types.ObjectId, ref: 'Promotion' },
    createdAt: { type: Date, default: Date.now },
    status: { type: String, required: true },
    originalPrice: { type: Number, required: true },// giá trước khi giảm
    discountedPrice: { type: Number, required: true },// giá sau khi giảm
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
