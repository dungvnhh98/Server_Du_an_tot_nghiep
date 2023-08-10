const express = require('express');
const Product = require('../models/product');

const router = express.Router();
router.post('/create', async (req, res) => {
    try {
        const {
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
            description
        } = req.body;

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
            description
        });

        await newProduct.save();

        res.status(201).json({ message: 'Sản phẩm đã được tạo thành công', product: newProduct });
    } catch (error) {
        res.status(500).json({ message: 'Đã có lỗi xảy ra', error: error.message });
    }
});

router.get('/getall', async (req, res) => {
    try {
        const products = await Product.find();

        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: 'Đã có lỗi xảy ra', error: error.message });
    }
});
router.get('/get/:id', async (req, res) => {
    const productId = req.params.id;

    try {
        // Tìm sản phẩm theo ID
        const product = await Product.findById(productId);

        if (!product) {
            return res.status(404).json({ message: 'Không tìm thấy sản phẩm' });
        }

        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: 'Đã có lỗi xảy ra', error: error.message });
    }
});
router.put('/update/:id', async (req, res) => {
    try {
        const productId = req.params.id;
        const updatedProduct = req.body;

        const product = await Product.findByIdAndUpdate(productId, updatedProduct, {
            new: true
        });

        if (!product) {
            return res.status(404).json({ message: 'Không tìm thấy sản phẩm' });
        }

        res.status(200).json({ message: 'Sản phẩm đã được cập nhật thành công', product });
    } catch (error) {
        res.status(500).json({ message: 'Đã có lỗi xảy ra', error: error.message });
    }
});

router.delete('/delete/:id', async (req, res) => {
    try {
        const productId = req.params.id;

        const deletedProduct = await Product.findByIdAndDelete(productId);

        if (!deletedProduct) {
            return res.status(404).json({ message: 'Không tìm thấy sản phẩm' });
        }

        res.status(200).json({ message: 'Sản phẩm đã được xóa thành công', product: deletedProduct });
    } catch (error) {
        res.status(500).json({ message: 'Đã có lỗi xảy ra', error: error.message });
    }
});


module.exports = router;
