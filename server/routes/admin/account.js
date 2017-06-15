var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Account = mongoose.model('Account');

var AccountController = require('../../controller/account.controller');

router.post('/login', AccountController.login);
router.post('/regist', AccountController.regist);

module.exports = router;
