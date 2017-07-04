'use strict';
module.exports = function(app) {
  var postUser = require('../controllers/userController');
  var authController = require('../controllers/auth');

  // user Routes
  app.route('/api/users')
    .get(authController.isAuthenticated,postUser.list_all_users)
    .post(authController.isAuthenticated,postUser.create_a_user);

  app.route('/api/users/:userId')
    .get(authController.isAuthenticated,postUser.read_a_user)
    .put(authController.isAuthenticated,postUser.update_a_user)
    .delete(authController.isAuthenticated,postUser.delete_a_user);
};
