var express = require("express");
var url = require("url");
var http = require("http");

var fs = require("fs");
var path = require("path");
var logger = require("morgan");
var bodyParser = require("body-parser");

var app = express();

const PORT = process.env.PORT || 3000;

// app.use(function(req,res,next){
//   console.log("In comes a " + req.method + " to " + req.url);
//   next();
// });

// Always return the main index.html, so react-router render the route in the client
// app.get('*', (req, res) => {
//   res.sendFile(path.resolve(__dirname, '..', 'build', 'index.html'));
//
// });

app.get("/", function(req, res){
  // console.log('locals', app.locals);
  res.sendFile(__dirname,'.','static',"index.html");
});

app.use(function(req,res){
  res.status(404).render("404");
});

app.use(function(err,req,res,next){
  console.error(err);
  next(err);
})

app.use(function(err,req,res,next){
  res.status(500).send("Internal Server Error\n",err);
});


app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`);
});
