var mongoose = require('mongoose');

var  AccountSchema = new mongoose.Schema({
  email: String,
  phone: String,
  password: String,
  create_time: Date
});

mongoose.model('Account',AccountSchema);