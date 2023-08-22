const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    iduser: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    idproduct: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    quantity: { type: Number, required: true }
});

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;