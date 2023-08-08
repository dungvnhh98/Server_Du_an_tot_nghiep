var express = require('express');
var router = express.Router();
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Dự án tốt nghiệp' });
});
module.exports = router;




