// api passport authentication from
// http://scottksmith.com/blog/2014/05/29/beer-locker-building-a-restful-api-with-node-passport/
var passport =  require('passport');
var BasicStrategy = require('passport-http').BasicStrategy;
var User = require('../models/user');

passport.use(new BasicStrategy(
  function(username, password, callback){
    User.findOne({ username:username }, function (err,user){
      if (err) { return callback(err); }
      if (!user) { return callback(null,false); }

      //check password
      user.checkPassword(password, function(err, isMatch){
        if (err) { return callback(err); }
        //no match
        if (!isMatch) {return callback(null,false); }
        //good match
        return callback(null,user);
      });
    });
  }
));

exports.isAuthenticated = passport.authenticate('basic', { session : false });
