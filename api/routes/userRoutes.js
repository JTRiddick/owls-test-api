'use strict';
module.exports = function(app) {
  var postUser = require('../controllers/userController');


  // user Routes
  app.route('/api/users')
    .get(postUser.list_all_users)
    .post(postUser.create_a_user);

  app.route('/api/users/:userId')
    .get(postUser.read_a_user)
    .put(postUser.update_a_user)
    .delete(postUser.delete_a_user);
};
