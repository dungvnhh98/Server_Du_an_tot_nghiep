const express = require('express');
const Product = require('../models/product');

const router = express.Router();

// Tạo sản phẩm mới
router.post('/create', async (req, res) => {
    try {
        const { name, link_avt, link_img1, link_img2, link_img3, quantity, status, size, color, price, category } = req.body;

        const newProduct = new Product({
            name,
            link_avt,
            link_img1,
            link_img2,
            link_img3,
            quantity,
            status,
            size,
            color,
            price,
            category,
        });

        await newProduct.save();

        res.status(201).send('Sản phẩm đã được tạo thành công');
    } catch (error) {
        res.status(500).send('Đã có lỗi xảy ra');
    }
});

// Cập nhật thông tin sản phẩm
router.put('/update/:id', async (req, res) => {
    try {
        const productId = req.params.id;
        const { name, link_avt, link_img1, link_img2, link_img3, quantity, status, size, color, price, category } = req.body;

        const updatedProduct = await Product.findByIdAndUpdate(
            productId,
            {
                name,
                link_avt,
                link_img1,
                link_img2,
                link_img3,
                quantity,
                status,
                size,
                color,
                price,
                category,
            },
            { new: true }
        );

        res.status(200).send(updatedProduct);
    } catch (error) {
        res.status(500).send('Đã có lỗi xảy ra');
    }
});

// Xóa sản phẩm
router.delete('/delete/:id', async (req, res) => {
    try {
        const productId = req.params.id;

        await Product.findByIdAndDelete(productId);

        res.status(200).send('Xóa sản phẩm thành công');
    } catch (error) {
        res.status(500).send('Đã có lỗi xảy ra');
    }
});

module.exports = router;
