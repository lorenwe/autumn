var mongoose = require('mongoose');
var config = require('./config.js');


module.exports = function(){
  mongoose.Promise = global.Promise;
  mongoose.connect(config.mongodburi);
  var db = mongoose.connection;
  db.on('error', function(){
    console.log("------数据库连接失败！------"); 
  });
  db.once('open', function(){
    console.log("------数据库连接成功！------"); 
  });
  require('../models/account.model.js')
  require('../models/article.model.js')
  return db;
};

