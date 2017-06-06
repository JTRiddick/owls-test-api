'use strict';
module.exports = function(app) {
  var postUser = require('../controllers/postController');


  // todoList Routes
  app.route('/api/users')
    .get(postUser.list_all_users)
    .post(postUser.create_a_user);


  app.route('api/users/:userId')
    .get(postUser.read_a_user);

  app.route('api/users/:userId')
    .put(postUser.update_a_user)
    .delete(postUser.delete_a_user);
};
