const express = require("express");
const passport = require("passport");

var User = require("./api/models/user");

const router = express.Router();

router.use( function(req,res,next){
  res.locals.currentUser = req.user;
  res.locals.errors = req.flash("error");
  res.locals.infos = req.flash("info");
  next();
});

router.get("/users", (req,res,next) => {

  User.find()
  .sort({ createdAt: "descending" })
  .exec((err,users)=>{
    if (err) { return next(err); }
    res.render("users", {users: users});
  });
});



router.get("/login",function(req,res){
  res.render("login");
});

router.post("/login", passport.authenticate("login", {
  successRedirect: "/",
  failureRedirect: "/login",
  failureFlash: true
}));

router.get("/logout",(req,res)=>{
  req.logout();
  res.redirect("/");
});

router.get("/signup",(req,res)=>{
  res.render("signup");
});

router.post("/signup",(req,res,next)=>{

  var username = req.body.username;
  var password = req.body.password;

  User.findOne({ username: username }, (err,user) => {
    if (err) { return next(err); }
    if (user) {
      req.flash("error", "User already exists");
      return res.redirect("/signup");
    }

    var newUser = new User({
      username: username,
      password: password
    });
    newUser.save(next);
  });
}, passport.authenticate("login", {
  successRedirect: "/",
  failureRedirect: "/signup",
  failureFlash: true
}));

function ensureAuthenticated(req,res,next){
  if (req.isAuthenticated()){
    next();
  } else {
    req.flash("info", "You must be logged in to see this page.");
    res.redirect("/login");
  }
}

router.get("/edit", ensureAuthenticated, function(req,res){
  res.render("edit");
});

router.post("/edit", ensureAuthenticated, function(req,res,next){
  req.user.displayName = req.body.displayname;
  req.user.bio = req.body.bio;
  req.user.save(function(err) {
    if (err) {
      next(err);
      return;
    }
    req.flash("info", "Profile updated!");
    res.redirect("/edit");
  });
});


module.exports = router;
