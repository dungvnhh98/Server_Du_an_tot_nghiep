const mongoose = require('mongoose');

const promotionSchema = new mongoose.Schema({
    title: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    discountType: { type: String, enum: ['percent', 'amount'], required: true }, // kiểu giảm giá(theo phần trăm hoặc trừ thẳng)
    discountValue: { type: Number, required: true },
    orderValueCondition: { type: Number, required: true },
    content: { type: String },
});

const Promotion = mongoose.model('Promotion', promotionSchema);

module.exports = Promotion;
