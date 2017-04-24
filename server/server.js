var FileStreamRotator = require('file-stream-rotator');
var express = require('express');
var morgan = require('morgan');
var fs = require('fs');
var path = require('path');
var favicon = require('serve-favicon');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

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
var users = require('./routes/users.js');
//注册路由
app.use('/', index);
app.use('/users', users);

app.use(function(req, res, next) {
  res.send('404');
});

var port = process.env.PORT || '3000';
app.listen(port);