var FileStreamRotator = require('file-stream-rotator');
var express = require('express');
var morgan = require('morgan');
var fs = require('fs');
var path = require('path');
var favicon = require('serve-favicon');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var mongoose =require('./config/mongoose.js')
var db = mongoose();

var app = express();

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

var logDirectory = path.join(__dirname, 'log');

fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

var accessLogStream = FileStreamRotator.getStream({
  date_format: 'YYYYMMDD',
  filename: path.join(logDirectory, 'access-%DATE%.log'),
  frequency: 'daily',
  verbose: false
});
app.use(morgan('combined', {stream: accessLogStream}));

//路由组
var index = require('./routes/index.js');
var account = require('./routes/account.js');
var article = require('./routes/article.js');
//注册路由
app.use('/', index);
app.use('/api/account', account);
app.use('/api/article', article);

app.use(function(req, res, next) {
  res.status(404);
  try {
    return res.send('Not Found');
  } catch (e) {
    console.log('404 not found');
  }
});

app.use(function(err, req, res, next) {
  if(err) { return next(); }
  res.status(500);
  try {
    return res.send(err.message || 'server error');
  } catch (e) {
    console.log('500 server error');
  }
});

var port = process.env.PORT || '3000';
app.listen(port);


