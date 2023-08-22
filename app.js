var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
var bodyParser = require('body-parser');

const mongoose = require('mongoose');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/user');
const productRoutes = require('./routes/product');
const promotionRoutes = require('./routes/promotion');
const orderRoutes = require('./routes/order');
const bannerRoutes = require('./routes/banner');
const cartRoutes = require('./routes/cart');

var app = express();

app.use(cors());

app.use(bodyParser.json({ limit: '50mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 }));
app.use(bodyParser.text({ limit: '200mb' }));

mongoose
  .connect('mongodb+srv://admin:admin@cluster0.yw7opqt.mongodb.net/duantotnghiep')
  .then((error) => {
    if (error == null) {
      console.log('Connect Success');
      isConnected = true;
    }
  });

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/product', productRoutes);
app.use('/promotion', promotionRoutes);
app.use('/order', orderRoutes);
app.use('/banner', bannerRoutes);
app.use('/cart', cartRoutes);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
