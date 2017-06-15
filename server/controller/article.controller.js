var mongoose = require('mongoose');
var moment = require('moment');
var marked = require('marked');
var trimHtml = require('trim-html');

var Article = mongoose.model('Article');

module.exports = {
	add: function (req, res, next) {
		Article.find({}).sort({'sort': -1}).limit(1).exec((err, doc) => {
			if (err) {
	            console.log(err);
	        } else {
	        	var maxsort = doc[0].sort;
	        }	
			var article = new Article({
				title: "新的文章标题",
				excerpt: "新的文章内容",
				sort: maxsort+1,
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
		});
	},
	list: function (req, res, next) {
		Article.find({}).sort({'sort':-1}).exec((err, doc) => {
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
	},
	saveSort: function (req, res, next) {
		var data = req.body;
		var bulk = Article.collection.initializeOrderedBulkOp();
		for (var i = 0; i < data.length; i++) {  
		    var id = data[i]._id;
		    bulk.find({
		        '_id': mongoose.Types.ObjectId(id)
		    }).updateOne({
		        $set: {
		            sort: data[i].sort
		        }
		    });
		}
		bulk.execute(function(err, result) {
			if (err) {
	            console.log(err);
	        } else {
				res.json({
					State: true,
					Data: result,
					Message: '更新成功'
				});
			}
		});
	},
	index: function (req, res, next) {
		Article.find({}).sort({'sort':-1}).exec((err, doc) => {
			// marked.setOptions({
			//   gfm: true,
			// });
			var trim = trimHtml(marked(doc[0].excerpt), { limit: 200 });
			// console.log(trim.more);
    		res.render('index',{
    			title: doc[0].title,
    			excerpt: trim.html,
    			more: trim.more
    		});
		});
	},
	info: function (req, res, next) {
		Article.find({}).sort({'sort':-1}).exec((err, doc) => {
			// marked.setOptions({
			//   gfm: true,
			// });
			var trim = trimHtml(marked(doc[0].excerpt), { limit: 200 });
			// console.log(trim.more);
    		res.render('article',{
    			title: doc[0].title,
    			excerpt: trim.html,
    			more: trim.more
    		});
		});
	}
}