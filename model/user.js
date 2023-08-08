const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    email: { type: String, required: true },
    fullname: { type: String, required: true },
    numberphone: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    sessionID: { type: String, default: null } // Thêm check id từ máy khách tránh 1 tk đăng nhập 2 nơi
});

const User = mongoose.model('User', userSchema);

module.exports = User;
