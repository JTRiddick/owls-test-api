'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var PostSchema = new Schema({
  title: {
    type: String,
    Required: 'Title your Post'
  },
  Created_date: {
    type: Date,
    default: Date.now
  },
  author: {
    type: String
  },
  body: {
    type: String
  },
  registered: {
    type: Boolean,
    default: false,
  },
  meta:{
    votes: Number,
    favs: Number
  },
  userId: mongoose.Schema.Types.ObjectId,

});

module.exports = mongoose.model('Posts', PostSchema);
