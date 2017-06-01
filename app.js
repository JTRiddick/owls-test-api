var express = require("express");
var url = require("url");
var http = require("http");

var fs = require("fs");
var path = require("path");
var logger = require("morgan");
var bodyParser = require("body-parser");

var mongoose = require("mongoose");
var session = require("express-session");
var flash = require("connect-flash");


var app = express();

var routes = require("./routes");

mongoose.connect("mongodb://localhost:27017/test");

const PORT = process.env.PORT || 3000;

app.use(logger("short"));
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(session({
  secret:"Qtypnaspoij40593$%^$asdb111213",
  resave: true,
  saveUninitialized:true
}));

app.use(flash());
app.use(routes);

app.set("views", path.join(__dirname,"views"));
app.set("view engine","ejs");

app.use(function(req,res,next){
  console.log("In comes a " + req.method + " to " + req.url);
  next();
});



// Always return the main index.html, so react-router render the route in the client
// app.get('*', (req, res) => {
//   res.sendFile(path.resolve(__dirname, '..', 'build', 'index.html'));
//
// });

// app.use("/", function(req, res){
//   res.status(200).sendFile(path.resolve(__dirname,'static',"index.html"));
// });
//
// app.use(function(req,res){
//   res.status(404).render("404");
// });
//
// app.use(function(err,req,res,next){
//   console.error(err);
//   next(err);
// })
//
// app.use(function(err,req,res,next){
//   res.status(500).send("Internal Server Error\n",err);
// });


app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`);
});
