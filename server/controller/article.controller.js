var mongoose = require('mongoose');
var moment = require('moment');

var Article = mongoose.model('Article');

module.exports = {
	add: function (req, res, next) {
		var article = new Article({
			title: "新的文章标题",
			excerpt: "新的文章内容",
			create_time: moment().format('YYYY-MM-DD HH:mm:ss')
		});
		article.save((err, doc) => {
	        if (err) {
	            console.log(err);
	        } else {
	        	res.json({
					State: true,
					Data: doc
				});
	        }
    	});
	},
	list: function (req, res, next) {
		Article.find({}).sort({'_id':-1}).exec((err, doc) => {
			if(err) console.log(err);
			if(doc){
				res.json({
					State: true,
					Data: doc
				});
			}else{
				res.json({
					State: false,
					Message: '列表为空'
				});
			}
		});
	},
	save: function (req, res, next) {
    	var updateArticle = {
    		title: req.body.title,
    		excerpt: req.body.excerpt
    	};
    	var _id = req.body._id;
    	Article.findByIdAndUpdate(_id, updateArticle, {new: true}, function(err, doc){
	        if (err) {
	            console.log(err);
	        } else {
	            res.json({
					State: true,
					Message: '更新成功'
				});
	        }
	    })
	}
}