const express = require('express');
const Order = require('../models/order');
const SubOrder = require('../models/suborder');
const router = express.Router();

router.post('/create', async (req, res) => {
    try {
        const {iduser, idpromotion, products} = req.body;

        const newOrder = new Order({
            iduser,
            idpromotion,
            status: 'pending',
        });

        let promotion = null;

        if (idpromotion !== null) {
            promotion = await Promotion.findById(promotionId);
            if (!promotion) {
                return res.status(404).json({message: 'Không tìm thấy khuyến mãi', result: false});
            }
        }

        let totalOriginalPrice = 0;

        // Tạo các đơn hàng nhỏ và tính tổng giá trị
        for (const product of products) {
            const productInfo = await Product.findById(product.idproduct);

            if (!productInfo) {
                return res.status(404).json({
                    message: `Không tìm thấy sản phẩm với id ${product.idproduct}`,
                    result: false,
                });
            }

            const subOrder = new SubOrder({
                idorder: newOrder._id,
                idproduct: product.idproduct,
                price: productInfo.price,
                quantity: product.quantity,
            });

            await subOrder.save();

            totalOriginalPrice += productInfo.price * product.quantity;

            // update lượt bán và số lượng của sản phẩm
            productInfo.soldCount += product.quantity;
            productInfo.quantity -= product.quantity;
            await productInfo.save();
        }

        newOrder.originalPrice = totalOriginalPrice;

        if (promotion !== null && totalOriginalPrice >= promotion.orderValueCondition) {
            if (promotion.discountType === 'percent') {
                newOrder.discountedPrice = totalOriginalPrice - totalOriginalPrice * promotion.discountValue / 100;
            } else {
                newOrder.discountedPrice = totalOriginalPrice - promotion.discountValue;
            }
        } else {
            newOrder.discountedPrice = totalOriginalPrice;
            newOrder.idpromotion = null;
        }

        await newOrder.save();

        res.status(201).json({message: 'Đơn hàng đã được tạo thành công', order: newOrder, result: true});
    } catch (error) {
        res.status(500).json({message: 'Đã có lỗi xảy ra', error: error.message, result: false});
    }
});


module.exports = router;
