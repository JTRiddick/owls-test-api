var mongoose = require("mongoose");
var bcrypt = require("bcrypt-nodejs");

const SALT_FACTOR = 10;

var userSchema = mongoose.Schema({
  username: { type: String, required: true, unique: true},
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  displayName: String,
  bio: String,
  score: Number
});


var noop = () => {};

userSchema.pre("save", function(done) {
  var user = this;
  if (!user.isModified("password")) {
    return done();
  }
  bcrypt.genSalt(SALT_FACTOR, (err,salt) => {
    if (err) { return done(err); }
    bcrypt.hash(user.password, salt, noop, (err,hashedPassword) => {
      if (err) { return done(err); }
      user.password = hashedPassword;
      done();
    });
  });
});

userSchema.methods.checkPassword = (guess,done) => {
  bcrypt.compare(guess, this.password, (err, isMatch) => {
    done(err, isMatch);
  });
};

userSchema.methods.name = function(){
  return this.displayName || this.username;
}

var User = mongoose.model("User", userSchema);
module.exports = User;
