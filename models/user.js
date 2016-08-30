var mongoose = require("../db/connection");
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var User = new Schema({
  name: String,
  username: String,
  password: String
});

User.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', User);
