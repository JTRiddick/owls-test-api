'use strict';
module.exports = function(app) {
  console.log('app is: ',app);
  var passport = require('passport');
  var posts = require('../controllers/postController');
  var authController = require('../controllers/jwtAuth');
  require('../../config/passport')(passport);
  var config = require('../../config/database');

  // posting Routes
  app.route('/api/posts')
    .get(posts.list_all_posts)
    .post(authController.isAuthenticated,posts.create_a_post);

  app.route('/api/posts/:postId')
    .get(posts.read_a_post)
    .put(authController.isAuthenticated,posts.edit_a_post)
    .delete(authController.isAuthenticated,posts.delete_a_post);
};
