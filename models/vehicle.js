var mongoose = require("../db/connection");
var Schema = mongoose.Schema;

var Vehicle = new Schema({
  make: { type: String, required: true, min: 2, max: 64 },
  regno: { type: String, required: true, min: 10, max: 10 },
  user_id: { type: Schema.ObjectId, required: true },
  model: { type: String, required: false },
  trim: { type: String, required: false }
});

module.exports = mongoose.model('Vehicle', Vehicle);
