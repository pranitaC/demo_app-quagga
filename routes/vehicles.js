var express = require('express');
var passport = require('passport');
var router = express.Router();
var Vehicle = require('models/vehicle');
var Schema = require('mongoose').Schema;

// Requesting vehicle details of the logged in user
router.get('/', passport.authenticate('jwt',{ session: false }), function(req, res, next) {
  Vehicle.find({ user_id: req.user._id },function(err, vehicles){
    res.send(vehicles);
  })
});

//Creating new vehicle details of the logged in user  
router.post('/', passport.authenticate('jwt',{ session: false }), function(req, res){
  var vehicle = new Vehicle(req.body.vehicle);
  
  vehicle.save(function(err, vehicle){
    if(err){
      return res.send(err);
    }
    return res.send(vehicle);
  });
});

module.exports = router;
