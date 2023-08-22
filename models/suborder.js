const mongoose = require('mongoose');

const subOrderSchema = new mongoose.Schema({
    idorder: { type: mongoose.Schema.Types.ObjectId, ref: 'Order', required: true },
    idproduct: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
    size: { type: String, required: true },
});

const SubOrder = mongoose.model('SubOrder', subOrderSchema);

module.exports = SubOrder;






