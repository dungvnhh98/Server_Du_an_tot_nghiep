const mongoose = require('mongoose');

const promotionSchema = new mongoose.Schema({
    title: {type: String, required: true},
    content: {type: String, required: false},
    startDate: {type: Date, required: true},
    endDate: {type: Date, required: true},
    discountType: {type: String, enum: ['percent', 'amount'], required: true},
    discountValue: {type: Number, required: true},
    orderValueCondition: {type: Number, required: true},
    createdAt: { type: Date, default: Date.now }
});

const Promotion = mongoose.model('Promotion', promotionSchema);

module.exports = Promotion;
