// Authentication middleware
var passport = require('passport');

/**  Returns a function which specify the JWT strategy to authenticate the requests **/
module.exports = function(req,res,next){ 
  passport.authenticate('jwt',{ session: false })(req,res,next);
}
