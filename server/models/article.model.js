var mongoose = require('mongoose');

var  ArticleSchema = new mongoose.Schema({
  id: Number,
  title: String,
  excerpt: String,
  sort: Number,
  create_time: Date
});

mongoose.model('Article',ArticleSchema);