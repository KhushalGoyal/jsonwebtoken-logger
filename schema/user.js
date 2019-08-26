var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userschema = new Schema({
  firstname:  String,
  lastname: String,
  role:   String,
  password: String,
  username: String,
  date: { type: Date, default: Date.now },
  hidden: Boolean
});

module.exports = userschema;