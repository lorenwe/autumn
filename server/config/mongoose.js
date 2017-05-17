var mongoose = require('mongoose');
var config = require('./config.js');


module.exports = function(){
  mongoose.connect(config.mongodburi);
  var db = mongoose.connection;
  db.on('error', function(){
    console.log("------数据库连接失败！------"); 
  });
  db.once('open', function(){
    console.log("------数据库连接成功！------"); 
  });
  require('../models/account.server.model.js')
  return db;
};