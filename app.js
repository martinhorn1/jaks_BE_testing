const express = require('express');
const cors = require('cors');
const path = require('path');
const favicon = require("serve-favicon");
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const methodOverride = require("method-override");

// Require routes
const userRouter = require('./routes/user');
const clientRouter = require('./routes/client');
const clientsRouter = require('./routes/clients');
const calendarRouter = require('./routes/calendar');

const app = express();

// Connect database
mongoose.connect("mongodb://localhost:27017/jaks", { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log("we're connected!");
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


app.use(cors());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride("_method"));

// Mount routes
app.use('/user', userRouter);
app.use('/client', clientRouter);
app.use('/clients', clientsRouter);
app.use('/calendar', calendarRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  const err = new Error("Not found");
  err.status = 404;
  next(err);
});

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
