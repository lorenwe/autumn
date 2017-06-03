var mongoose = require('mongoose');
var moment = require('moment');
var createToken = require('../token/createToken');

var Account = mongoose.model('Account');

module.exports = {
	login: function (req, res, next) {
		Account.findOne({email: req.body.email}, function(err, doc){
			if(err) console.log(err);
			if(!doc) {
				console.log("账号不存在");
				res.json({
					State: false,
					Message: '账号不存在'
				});
			} else if(req.body.password === doc.password) {
				console.log('登录成功');
				var name = req.body.email;
				var token = createToken(name);
				var UserInfo = {
				 	email: doc.email,
				 	phone: doc.phone,
				 	token: token
				};
				res.json({
					State: true,
					Data: UserInfo
				});
			} else {
				console.log('密码错误');
				res.json({
					State: false,
					Message: '密码错误'
				});
			}
		})
	},
	regist: function (req, res, next) {
		let userRegister = new Account({
			email: req.body.email,
			phone: req.body.phone,
			password: req.body.password
		});

		userRegister.create_time = moment().format('YYYY-MM-DD HH:mm:ss');

		Account.findOne({email: userRegister.email}, (err, doc) => {
			if(err) console.log(err);
			// 用户名已存在，不能注册
			if(doc) {
				res.json({
					State: false,
					Message: '用户名已存在'
				});
			} else {
				userRegister.save(err => {
					if(err) console.log(err);
					console.log('register success');
					res.json({
						State: true,
						Data: userRegister
					});
				});
			}
		})
	}
}