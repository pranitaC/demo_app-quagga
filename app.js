var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

var users = require('routes/users');
var vehicles = require('routes/vehicles');

var User = require('models/user')

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride('_method'));

require('passportsetup')(app);

app.use('/', users);
app.use('/vehicles',vehicles);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});


module.exports = app;
