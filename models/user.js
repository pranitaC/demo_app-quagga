var mongoose = require("../db/connection");
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

// User Schema
var User = new Schema({
  name: { type: String, required: true, min: 3, max: 64 },
  username: { type: String, required: true, min: 3, max: 64 },
  password: { type: String, required: true, min: 4, max: 8 }
});

/**The plugin simplifies building username and password login with passport 
    it also add some methods to Schema
    e.g. register
         authenticate
         serialize                   **/
User.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', User);
