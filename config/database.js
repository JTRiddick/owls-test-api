//https://www.djamware.com/post/58eba06380aca72673af8500/node-express-mongoose-and-passportjs-rest-api-authentication

//
var dbLocation = process.env.MONGODB_URI || 'mongodb://localhost:27017/owls-api';

module.exports = {
  'secret' : 'hereComeMySpecialPosts',
  'database' : dbLocation
}
