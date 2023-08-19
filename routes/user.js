const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

const router = express.Router();

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'dungnmph18838@fpt.edu.vn',
        pass: 'qmvzootmqqdxswiw'
    }
});

router.post('/register', async (req, res) => {
    try {
        const {username, password, email, fullname} = req.body;
        console.log(req.body)
        const existingUser = await User.findOne({username});

        if (existingUser) {
            return res.status(409).json({message: 'Tên người dùng đã tồn tại', result: false});
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const verificationCode = Math.floor(100000 + Math.random() * 900000);

        const newUser = new User({
            username,
            password: hashedPassword,
            email,
            fullname,
            verificationCode, // Lưu mã xác thực vào user
            status: 'pending' // Đặt trạng thái thành 'pending' cho việc xác thực qua email
        });

        await newUser.save();

        // Gửi email xác thực
        const mailOptions = {
            from: 'dungnmph18838@fpt.edu.vn',
            to: email,
            subject: 'Xác thực tài khoản',
            text: `Mã xác thực của bạn là: ${verificationCode}`
        };


        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });

        res.status(201).json({
            message: 'Đăng ký thành công. Vui lòng kiểm tra email để xác thực tài khoản.',
            result: true
        });
    } catch (error) {
        res.status(500).json({message: 'Đã có lỗi xảy ra', result: false});
    }
});

router.post('/verify', async (req, res) => {
    try {
        const {username, verificationCode} = req.body;

        const user = await User.findOne({username, verificationCode});

        if (!user) {
            return res.status(400).json({message: 'Mã xác thực không chính xác', result: false});
        }

        user.status = 'active';
        await user.save();

        res.status(200).json({message: 'Xác thực thành công', result: true});
    } catch (error) {
        res.status(500).json({message: 'Đã có lỗi xảy ra', result: false});
    }
});

router.post('/login', async (req, res) => {
    try {
        const {username, password, sessionID} = req.body;

        const user = await User.findOne({username});
        if (!user) {
            return res.status(401).json({message: 'Tên người dùng không tồn tại', result: false});
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(401).json({message: 'Mật khẩu không chính xác', result: false});
        }

        if (user.status === 'pending') {
            return res.status(401).json({message: 'Tài khoản chưa được xác thực', result: false});
        } else if (user.status === 'locked') {
            return res.status(401).json({message: 'Tài khoản đã bị khóa', result: false});
        }

        if (user.sessionID) {
            if (sessionID == undefined || user.sessionID !== sessionID) {
                return res.status(401).json({message: 'SessionID không hợp lệ cho người dùng này', result: false});
            }
        } else {
            // user chưa có sessionID, tạo mới và lưu
            const token = jwt.sign({username: user.username}, 'mysecretkey');
            user.sessionID = token;
            await user.save();
        }

        res.status(200).json({message: 'Đăng nhập thành công', user, result: true});
    } catch (error) {
        console.error('Đã có lỗi xảy ra:', error);
        res.status(500).json({message: 'Đã có lỗi xảy ra', result: false});
    }
});

router.post('/logout', async (req, res) => {
    const {username} = req.body;

    try {
        const user = await User.findOne({username});

        if (!user) {
            return res.status(401).json({message: 'Tài khoản không tồn tại', result: false});
        }

        // Xóa sessionID của user để đăng xuất
        user.sessionID = null;
        await user.save();

        res.status(200).json({message: 'Đăng xuất thành công', result: true});
    } catch (error) {
        console.error('Lỗi khi đăng xuất:', error);
        res.status(500).json({message: 'Lỗi khi đăng xuất', result: false});
    }
});


router.put('/change-password', async (req, res) => {
    try {
        const {username, oldPassword, newPassword} = req.body;

        const user = await User.findOne({username});
        if (!user) {
            return res.status(404).json({message: 'Tên người dùng không tồn tại', result: false});
        }

        const isPasswordCorrect = await bcrypt.compare(oldPassword, user.password);
        if (!isPasswordCorrect) {
            return res.status(401).json({message: 'Mật khẩu cũ không chính xác', result: false});
        }

        const hashedNewPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedNewPassword;
        await user.save();

        res.status(200).json({message: 'Đổi mật khẩu thành công', result: true});
    } catch (error) {
        res.status(500).json({message: 'Đã có lỗi xảy ra', result: false});
    }
});

router.put('/change-info', async (req, res) => {
    try {
        const {username, password, email, fullname, numberphone} = req.body;

        const user = await User.findOne({username});
        if (!user) {
            return res.status(404).json({message: 'Tên người dùng không tồn tại', result: false});
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(401).json({message: 'Mật khẩu không chính xác', result: false});
        }

        user.email = email;
        user.fullname = fullname;
        user.numberphone = numberphone;
        await user.save();

        res.status(200).json({message: 'Đổi thông tin người dùng thành công', result: true});
    } catch (error) {
        res.status(500).json({message: 'Đã có lỗi xảy ra', result: false});
    }
});

router.get('/getall', async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json({users, result: true});
    } catch (error) {
        res.status(500).json({message: 'Đã có lỗi xảy ra', error: error.message, result: false});
    }
});

router.put('/updateStatus/:username', async (req, res) => {
    try {
        const username = req.params.username;
        const newStatus = req.body.status;

        const user = await User.findOne({username});
        if (!user) {
            return res.status(404).json({message: 'Không tìm thấy người dùng', result: false});
        }

        user.status = newStatus;
        await user.save();

        res.status(200).json({message: 'Trạng thái người dùng đã được cập nhật', user, result: true});
    } catch (error) {
        res.status(500).json({message: 'Đã có lỗi xảy ra', error: error.message, result: false});
    }
});
module.exports = router;
