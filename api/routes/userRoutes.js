'use strict';
module.exports = function(app) {
  var passport = require('passport');
  // var bodyParser = require("body-parser");
  var postUser = require('../controllers/userController');
  var authController = require('../controllers/jwtAuth');
  require('../../config/passport')(passport);
  var jwt = require('jsonwebtoken');
  var User = require('../models/user');
  var config = require('../../config/database');
  // user Routes

  console.log('app is ,', app);

  app.route('/api/users')
    .get(authController.isAuthenticated,postUser.list_all_users)
    .post(authController.isAuthenticated,postUser.create_a_user);

  app.route('/api/users/:userId')
    .get(authController.isAuthenticated,postUser.read_a_user)
    .put(authController.isAuthenticated,postUser.update_a_user)
    .delete(authController.isAuthenticated,postUser.delete_a_user);

  app.post('/api/signup', function(req, res) {
    if (!req.body.username || !req.body.password) {
      res.status(403).send({success: false, msg: 'Please pass username and password.'});
    } else {
      var newUser = new User({
        username: req.body.username,
        password: req.body.password
      });
      // save the user
      newUser.save(function(err) {
        if (err) {
          return res.status(403).send({success: false, msg: 'Username already exists.'});
        }else{
          let token = jwt.sign(newUser, config.secret);
          res.status(200).json({success: true, token: 'JWT ' + token, msg: 'Successful created new user.'});
        }
      });
    }
  });

  app.post('/api/signin', function(req, res) {

    User.findOne({
      username: req.body.username
    }, function(err, user) {
      if (err) throw err;

      if (!user) {
        res.status(403).send({success: false, msg: 'Authentication failed. User not found.'});
      } else {
        // check if password matches
        user.checkPassword(req.body.password, function (err, isMatch) {
          if (isMatch && !err) {
            // if user is found and password is right create a token
            let token = jwt.sign(user, config.secret);
            // return the information including token as JSON
            res.json({success: true, token: 'JWT ' + token});
          } else {
            res.status(403).send({success: false, msg: 'Authentication failed. Wrong password.'});

          }
        });
      }
    });
  });

  app.post('/api/signout', function(req, res) {

  });



};
