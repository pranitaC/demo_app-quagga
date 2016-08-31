/* Passport Imports */
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
/* Passport Imports end*/
var JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
var secret = require('config/secret');
var User = require('models/user');
var Schema = require('mongoose').Schema;

/* User Authentication using Passport strategy with JWT 
   fromAuthHeader creates a new extractor that looks for JWT in authorization header
   jwtFromRequest accepts a request and returns either the JWT as a string or null
   secretOrKey is a required string containing a key to verify a token 
   Using Jwt and secret JwtStrategy decrypts the user id and store it in jwt_payload using which user is verified
   and send response as a user else error
*/
module.exports = function(app) {
  app.use(passport.initialize());
  passport.use(User.createStrategy());
  var opts = {}
  opts.jwtFromRequest = ExtractJwt.fromAuthHeader('Authorization');
  opts.secretOrKey = secret;
  passport.use(new JwtStrategy(opts, function(jwt_payload, done) { 
    User.findOne({ _id: jwt_payload.id }, function(err, user) {
      console.log(user);
      if (err) {
        return done(err, false);
      }
      if (user) {
        done(null, user);
      } else {
        done(null, false);
      }
    });
  }));

  passport.serializeUser(User.serializeUser());
  passport.deserializeUser(User.deserializeUser());

}   
