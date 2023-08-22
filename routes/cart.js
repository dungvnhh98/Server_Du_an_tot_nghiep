const express = require('express');
const router = express.Router();
const Cart = require('../models/cart');
const Product = require('../models/product');


router.post('/add', async (req, res) => {
    try {
        const { username, idproduct, quantity } = req.body;

        let cart = await Cart.findOne({ username, idproduct });

        if (!cart) {
            cart = new Cart({
                username,
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
router.get('/get/:username', async (req, res) => {
    try {
        const username = req.params.username;

        const cartItems = await Cart.find({ username });

        res.status(200).json({ cartItems, result: true });
    } catch (error) {
        console.error('Error fetching cart:', error);
        res.status(500).json({ message: 'An error occurred while fetching cart', result: false });
    }
});

module.exports = router;
