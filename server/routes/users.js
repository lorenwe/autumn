var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Account = mongoose.model('Account');

router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
router.get('/test', function(req, res, next) {
  var account = new Account({
    id: 1,
    name: 'Loren'
  });
  account.save(function(err){
    if(err){
      res.end('Error');
      return next();
    }
    Account.find({}, function(err, docs){
      if(err){
        res.end('Error');
        return next();
      }
      res.json(docs);
    });
  });
});

module.exports = router;
