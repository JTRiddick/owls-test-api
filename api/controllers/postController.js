'use strict';


var mongoose = require('mongoose'),
  Post = mongoose.model('Posts');

exports.list_all_posts = function(req, res) {
  Post.find({}, function(err, post) {
    if (err)
      res.send(err);
    res.json(post);
  });
};




exports.create_a_post = function(req, res) {
  var new_post = new Post(req.body);
  console.log('create post req', req);
  console.log('new post ', new_post);
  new_post.save(function(err, post) {
    if (err)
      res.send(err);
    res.json(post);
  });
};


exports.read_a_post = function(req, res) {
  Post.findById(req.params.postId, function(err, post) {
    if (err)
      res.send(err);
    res.json(post);
  });
};


exports.edit_a_post = function(req, res) {
  Post.findOneAndUpdate(req.params.postId, req.body, {new: true}, function(err, post) {
    if (err)
      res.send(err);
    res.json(post);
  });
};


exports.delete_a_post = function(req, res) {

  Post.remove({
    _id: req.params.postId
  }, function(err, post) {
    if (err)
      res.send(err);
    res.json({ message: 'Post successfully deleted' });
  });
};
