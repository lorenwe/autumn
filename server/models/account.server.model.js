var mongoose = require('mongoose');

var  AccountSchema = new mongoose.Schema({
  id: Number,
  name: String,
  createTime: Date,
  lastLogin: Date
});

mongoose.model('Account',AccountSchema);