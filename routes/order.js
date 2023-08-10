const express = require('express');
const Order = require('../models/order');
const SubOrder = require('../models/suborder');
const router = express.Router();

// thêm đơn hàng mới
router.post('/create', async (req, res) => {
    try {
        const { iduser, idproduct, idpromotion, status, originalPrice, discountedPrice } = req.body;

        const newOrder = new Order({
            iduser,
            idproduct,
            idpromotion,
            status,
            originalPrice,
            discountedPrice,
        });

        await newOrder.save();

        res.status(201).send('Đơn hàng đã được tạo thành công');
    } catch (error) {
        res.status(500).send('Đã có lỗi xảy ra');
    }
});


// lấy danh sách tất cả các đơn hàng
router.get('/list', async (req, res) => {
    try {
        const orders = await Order.find();
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).send('Đã có lỗi xảy ra');
    }
});

// lấy đơn hàng theo id của user
router.get('/listByUser/:iduser', async (req, res) => {
    try {
        const userId = req.params.iduser;

        // Tìm tất cả các đơn hàng có iduser trùng với userId
        const orders = await Order.find({ iduser: userId });

        res.status(200).json(orders);
    } catch (error) {
        res.status(500).send('Đã có lỗi xảy ra');
    }
});

// sửa thông tin đơn hàng theo Id(sửa trạng thái)
router.put('/update/:id', async (req, res) => {
    try {
        const orderId = req.params.id;
        const { iduser, idproduct, idpromotion, status, originalPrice, discountedPrice } = req.body;

        const updatedOrder = await Order.findByIdAndUpdate(
            orderId,
            {
                iduser,
                idproduct,
                idpromotion,
                status,
                originalPrice,
                discountedPrice,
            },
            { new: true }
        );

        res.status(200).json(updatedOrder);
    } catch (error) {
        res.status(500).send('Đã có lỗi xảy ra');
    }
});

// xóa đơn hàng theo ID
router.delete('/delete/:id', async (req, res) => {
    try {
        const orderId = req.params.id;

        await Order.findByIdAndDelete(orderId);

        res.status(200).send('Đơn hàng đã được xóa thành công');
    } catch (error) {
        res.status(500).send('Đã có lỗi xảy ra');
    }
});

module.exports = router;
