// 监测 token 是否过期
const jwt = require('jsonwebtoken')
module.exports = function (req, res, next) {
	// console.log(req.headers)
	let token = req.headers['oauth'];
	if(token === undefined || token === null){
		res.status(401);
		try {
	    	return res.send('token过期，请重新登录');
	  	} catch (e) {
	    	console.log('token过期');
	  	}
	}
	// 解构 token，生成一个对象 { name: xx, iat: xx, exp: xx }
	let decoded = jwt.decode(token, 'secret')
	// console.log(decoded.exp)
	// console.log(Date.now() / 1000)
	// 监测 token 是否过期
	if(token && decoded.exp <= Date.now() / 1000) {
		res.status(401);
		try {
	    	return res.send('token过期，请重新登录');
	  	} catch (e) {
	    	console.log('token过期');
	  	}
	}
	next();
}
