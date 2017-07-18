
var passport =  require('passport');
var JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
var config = require('../../config/database');
var User = require('../models/user');

// getToken = function (headers) {
//   if (headers && headers.authorization) {
//     var parted = headers.authorization.split(' ');
//     if (parted.length === 2) {
//       return parted[1];
//     } else {
//       return null;
//     }
//   } else {
//     return null;
//   }
// };
  // var token = getToken(req.headers);

var opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeader();
opts.secretOrKey = config.secret;
// opts.issuer = 'docowls.herokuapp.com';

passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
  console.log("JWT Route authenticator called, ",opts, jwt_payload, done)
    User.findOne({id: jwt_payload.sub}, function(err, user) {
        if (err) {
            return done(err, false);
        }
        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
            // or you could create a new account
        }
    });
}));

exports.isAuthenticated = passport.authenticate('jwt', { session : false });
