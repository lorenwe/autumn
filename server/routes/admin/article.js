var express = require('express');
var checkToken = require('../../token/checkToken');
var router = express.Router();

var mongoose = require('mongoose');
var Article = mongoose.model('Article');

var ArticleController = require('../../controller/article.controller');

router.post('/list', checkToken, ArticleController.list);
//router.post('/list', ArticleController.list);
router.post('/save', checkToken, ArticleController.save);
router.post('/save_sort', checkToken, ArticleController.saveSort);
//router.post('/save', ArticleController.save);
router.post('/add', checkToken, ArticleController.add);
//router.post('/add', ArticleController.add);

module.exports = router;