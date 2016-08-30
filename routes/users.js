var express = require('express');
var passport = require('passport');
var router = express.Router();
var User = require('models/user');

var jwt = require('jsonwebtoken');
var secret = require('config/secret');

// Requesting all users
router.get('/', passport.authenticate('jwt',{ session: false }), function(req, res, next) {
  User.find(function(err, users){
    res.send(users);
  })
});

// Sign Up Route for New User
router.post('/register', function(req, res){
  console.log(req.body);
  var user = new User({
    username: req.body.user.username,
    name: req.body.user.name
  });
  
  User.register(user, req.body.user.password, function(user, err){
    if(err){
      return res.send(err);
    }
    return res.send(user)
  });
});

// Login Route for Existing User
router.post('/login', passport.authenticate('local',{}), function(req, res){
  var user = req.user;
  var userInfo = { name: user.name, id: user._id };
  var token = jwt.sign(userInfo, secret,{ expiresIn: 3600 });
  res.send(token);
});

router.get('/logout',passport.authenticate('jwt',{ session: false }), function(req, res){
  res.send(req.user);
});

module.exports = router;
