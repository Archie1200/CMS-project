
const mongoose = require('mongoose');
const Content = require('./Content');
const User = require('./User');

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  headings: [{
    type: String,
    required: true
  }],
  paragraphs: [{
    type: String,
    required: true
  }],
  image: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Content',
    default: null
  },
  video: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Content',
    default: null
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
});

module.exports = mongoose.model('Blog', blogSchema);
