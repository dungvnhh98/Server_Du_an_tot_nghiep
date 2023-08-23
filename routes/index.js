var express = require('express');
var router = express.Router();
const Order = require('../models/order');
var socketapi = require("../socketapi");

const callbackonchange = Order.watch()
callbackonchange.on('change', change => {
    console.log("Order thay đổi" + JSON.stringify(change))
    socketapi.io.emit("change",change)
})
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Dự án tốt nghiệp' });
});

const validUser = {
    username: 'admin',
    password: 'admin'
};
router.post('/login', (req, res) => {
    const { username, password } = req.body;

    if (username === validUser.username && password === validUser.password) {
        // Đăng nhập thành công
        res.status(200).json({ message: 'Đăng nhập thành công' , result: true});
    } else {
        // Đăng nhập thất bại
        res.status(401).json({ message: 'Tên người dùng hoặc mật khẩu không đúng', result: false });
    }
});

module.exports = router;




