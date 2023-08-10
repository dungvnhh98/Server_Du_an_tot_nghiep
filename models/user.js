const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    email: { type: String, required: true },
    fullname: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    sessionID: { type: String, default: null },
    status: { type: String, enum: ['pending', 'active', 'limited', 'locked'], default: 'pending' },
    numberphone: { type: String, required: false },
    address: {
        latitude: { type: Number, required: false },
        longitude: { type: Number, required: false },
        exactAddress: { type: String, required: false }
    },
    verificationCode: { type: String, required: false }
});


const User = mongoose.model('User', userSchema);

module.exports = User;
