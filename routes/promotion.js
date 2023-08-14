const express = require('express');
const Promotion = require('../models/promotion');

const router = express.Router();

router.post('/create', async (req, res) => {
    try {
        const {title, startDate, endDate, discountType, discountValue, orderValueCondition, content} = req.body;

        const newPromotion = new Promotion({
            title,
            startDate,
            endDate,
            discountType,
            discountValue,
            orderValueCondition,
            content,
        });

        await newPromotion.save();

        res.status(201).json({message: 'Khuyến mãi đã được tạo thành công', result: true});
    } catch (error) {
        res.status(500).json({message: 'Đã có lỗi xảy ra', result: false});
    }
});

// Lấy danh sách tất cả các khuyến mãi
router.get('/list', async (req, res) => {
    try {
        const promotions = await Promotion.find();
        res.status(200).json({promotions, result: true});
    } catch (error) {
        res.status(500).json({message: 'Đã có lỗi xảy ra', result: false});
    }
});

// Sửa thông tin khuyến mãi theo ID
router.put('/update/:id', async (req, res) => {
    try {
        const promotionId = req.params.id;
        const {title, startDate, endDate, discountType, discountValue, orderValueCondition, content} = req.body;

        const updatedPromotion = await Promotion.findByIdAndUpdate(
            promotionId,
            {
                title,
                startDate,
                endDate,
                discountType,
                discountValue,
                orderValueCondition,
                content,
            },
            {new: true}
        );

        res.status(200).json({updatedPromotion, result: true});
    } catch (error) {
        res.status(500).json({message: 'Đã có lỗi xảy ra', result: false});
    }
});

// Xóa khuyến mãi theo ID
router.delete('/delete/:id', async (req, res) => {
    try {
        const promotionId = req.params.id;

        await Promotion.findByIdAndDelete(promotionId);

        res.status(200).json({message: 'Khuyến mãi đã được xóa thành công', result: true});
    } catch (error) {
        res.status(500).json({message: 'Đã có lỗi xảy ra', result: false});
    }
});

module.exports = router;
