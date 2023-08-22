const express = require('express');
const router = express.Router();
const Cart = require('../models/cart');

// Thêm sản phẩm vào giỏ hàng
router.post('/add', async (req, res) => {
    try {
        const { iduser, idproduct, quantity } = req.body;

        // Kiểm tra xem cart đã tồn tại hay chưa
        let cart = await Cart.findOne({ iduser, idproduct });

        if (!cart) {
            cart = new Cart({
                iduser,
                idproduct,
                quantity
            });
        } else {
            cart.quantity += quantity;
        }

        await cart.save();

        res.status(201).json({ message: 'Thêm sản phẩm vào giỏ hàng thành công', result: true });
    } catch (error) {
        res.status(500).json({ message: 'Đã có lỗi xảy ra', result: false });
    }
});

// Xóa sản phẩm khỏi giỏ hàng
router.delete('/remove/:id', async (req, res) => {
    try {
        const cartId = req.params.id;

        const cart = await Cart.findByIdAndRemove(cartId);

        if (!cart) {
            return res.status(200).json({ message: 'Không tìm thấy giỏ hàng', result: false });
        }

        res.status(200).json({ message: 'Xóa sản phẩm khỏi giỏ hàng thành công', result: true });
    } catch (error) {
        res.status(500).json({ message: 'Đã có lỗi xảy ra', result: false });
    }
});

module.exports = router;
