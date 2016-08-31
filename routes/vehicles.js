var express = require('express');
var router = express.Router();
var Vehicle = require('models/vehicle');
var Schema = require('mongoose').Schema;
var authenticate = require('authenticate');

/** Requesting vehicle details of the logged in user  
*   This authenticate the user with JWT and 
*   Find the vehicles of the user using user_id
*   And send the vehicles to the client
**/
router.get('/', authenticate , function(req, res, next) {
  Vehicle.find({ user_id: req.user._id },function(err, vehicles){
    res.send(vehicles);
  })
});

/**Creating new vehicle details of the logged in user 
*  This authenticate the user with JWT and 
*   And save the vehicle of the user using user_id
**/
router.post('/', authenticate , function(req, res){
  var vehicle = new Vehicle(req.body.vehicle);
  vehicle.user_id = req.user._id;
  
  vehicle.save(function(err, vehicle){
    if(err){
      return res.send(err);
    }
    return res.send(vehicle);
  });
});

module.exports = router;
