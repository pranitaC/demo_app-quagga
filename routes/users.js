var express = require('express');
var router = express.Router();
var User = require('models/user');
var jwt = require('jsonwebtoken');
var secret = require('config/secret');
var authenticate = require('authenticate');
var passport = require('passport');

// Requesting all users 
router.get('/', authenticate , function(req, res, next) {
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

/** Login Route for Existing User 
* This route post data for username and password and locally authenticate the user
* And send the response with name and user_id in userInfo with jwt JWT 
**/
router.post('/login', passport.authenticate('local') , function(req, res){
  var user = req.user;
  var userInfo = { name: user.name, id: user._id };
  var token = jwt.sign(userInfo, secret,{ expiresIn: 3600 });
  res.send("JWT " + token);
});


router.get('/logout', authenticate , function(req, res){
  res.send(req.user);
});

module.exports = router;
