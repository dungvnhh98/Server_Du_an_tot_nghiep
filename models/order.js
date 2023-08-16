const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    iduser: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    idpromotion: { type: mongoose.Schema.Types.ObjectId, ref: 'Promotion' },
    createdAt: { type: Date, default: Date.now },
    status: {
        type: String,
        enum: ['pending', 'confirmed', 'delivered', 'canceled'],
        required: true,
        default: 'pending'
    },
    originalPrice: { type: Number },// giá trước khi giảm
    discountedPrice: { type: Number },// giá sau khi giảm
    paymentMethod:{type: String, enum:['online', 'cash']}
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
