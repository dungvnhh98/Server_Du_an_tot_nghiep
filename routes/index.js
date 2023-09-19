var express = require('express');
var router = express.Router();
const Order = require('../models/order');
const User = require('../models/user');
var socketapi = require("../socketapi");

const callbackonchange = Order.watch()
callbackonchange.on('change', change => {
    console.log("Order thay đổi" + change.documentKey._id)
    getUsernameForOrder(change.documentKey._id)
        .then(username => {
            if (username) {
                console.log(`Username cho đơn hàng: ${username}`);
                socketapi.io.emit("change", username)
            } else {
                console.log('Không tìm thấy đơn hàng hoặc người dùng.');
            }
        })
        .catch(err => {
            console.error('Lỗi:', err);
        });

})

async function getUsernameForOrder(orderId) {
    try {
        // Tìm đơn hàng với _id cụ thể và populate trường 'iduser' để lấy thông tin người dùng
        const order = await Order.findById(orderId).populate('iduser').exec();
        if (!order) {
            return null; // Không tìm thấy đơn hàng
        }

        // Lấy 'username' của người dùng từ thông tin đã được populate
        const username = order.iduser.username;
        if (order.status === "confirmed") {
            return username;
        } else {
            return null
        }
    } catch (error) {
        console.error("Lỗi khi lấy username cho đơn hàng:", error);
        return null;
    }
}

router.get('/', function (req, res, next) {
    res.render('index', {title: 'Dự án tốt nghiệp'});
});

const validUser = {
    username: 'admin',
    password: 'admin'
};
router.post('/login', (req, res) => {
    const {username, password} = req.body;

    if (username === validUser.username && password === validUser.password) {
        // Đăng nhập thành công
        res.status(200).json({message: 'Đăng nhập thành công', result: true});
    } else {
        // Đăng nhập thất bại
        res.status(401).json({message: 'Tên người dùng hoặc mật khẩu không đúng', result: false});
    }
});

module.exports = router;




