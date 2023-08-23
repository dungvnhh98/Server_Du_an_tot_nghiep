const express = require('express');
const Promotion = require('../models/promotion');

const router = express.Router();

router.post('/create', async (req, res) => {
    try {
        const {
            title,
            content,
            startDate,
            endDate,
            discountType,
            discountValue,
            orderValueCondition
        } = req.body;

        const newPromotion = new Promotion({
            title,
            content,
            startDate,
            endDate,
            discountType,
            discountValue,
            orderValueCondition
        });

        await newPromotion.save();

        res.status(201).json({
            message: 'Tạo khuyến mãi thành công',
            promotion: newPromotion,
            result: true
        });
    } catch (error) {
        // Xử lý lỗi nếu có
        res.status(500).json({
            message: 'Đã có lỗi xảy ra',
            error: error.message,
            result: false
        });
    }
});

router.get('/list', async (req, res) => {
    try {
        const promotions = await Promotion.find().sort({ createdAt: -1 });
        res.status(200).json({ promotions, result: true });
    } catch (error) {
        res.status(500).json({ message: 'Đã có lỗi xảy ra', result: false });
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
