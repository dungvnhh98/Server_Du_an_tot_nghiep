const mongoose = require('mongoose');

const bannerSchema = new mongoose.Schema({
    link1: { type: String, required: true },
    link2: { type: String, required: true },
    link3: { type: String, required: true },
    link4: { type: String, required: true }
});

const Banner = mongoose.model('Banner', bannerSchema);

module.exports = Banner;
