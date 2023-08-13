const express = require('express');
const router = express.Router();
const Banner = require('../models/banner');

router.post('/create', async (req, res) => {
    try {
        const {link1, link2, link3, link4} = req.body;
        const newBanner = new Banner({
            link1,
            link2,
            link3,
            link4
        });
        await newBanner.save();
        res.status(201).json({message: 'Banner đã được tạo thành công', banner: newBanner});
    } catch (error) {
        res.status(500).json({message: 'Đã có lỗi xảy ra', error: error.message});
    }
});

router.get('/get', async (req, res) => {
    try {
        const banner = await Banner.findOne();
        res.status(200).json(banner);
    } catch (error) {
        res.status(500).json({message: 'Đã có lỗi xảy ra', error: error.message});
    }
});
router.put('/update', async (req, res) => {
    try {
        const {link1, link2, link3, link4} = req.body;

        let banner = await Banner.findOne();
        if (!banner) {
            banner = new Banner({
                link1,
                link2,
                link3,
                link4
            });
        } else {
            banner.link1 = link1;
            banner.link2 = link2;
            banner.link3 = link3;
            banner.link4 = link4;
        }

        await banner.save();

        res.status(200).json({message: 'Thông tin banner đã được cập nhật', banner});
    } catch (error) {
        res.status(500).json({message: 'Đã có lỗi xảy ra', error: error.message});
    }
});
module.exports = router;
