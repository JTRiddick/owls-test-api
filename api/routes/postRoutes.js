'use strict';
module.exports = function(app) {
  var posts = require('../controllers/postController');
  var authController = require('../controllers/jwtAuth');


  // posting Routes
  app.route('/api/posts')
    .get(posts.list_all_posts)
    .post(authController.isAuthenticated,posts.create_a_post);

  app.route('/api/posts/:postId')
    .get(posts.read_a_post)
    .put(authController.isAuthenticated,posts.edit_a_post)
    .delete(authController.isAuthenticated,posts.delete_a_post);
};
