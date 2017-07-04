var express = require("express");
var url = require("url");
var http = require("http");

var fs = require("fs");
var path = require("path");
var logger = require("morgan");
var bodyParser = require("body-parser");
var methodOverride = require('method-override');
var mongoose = require("mongoose");
var passport = require("passport");
var session = require("express-session");
var flash = require("connect-flash");

var passportSetup = require("./passportsetup");
var authController = require('./api/controllers/auth');


var app = express();
//https://stackoverflow.com/questions/7067966/how-to-allow-cors

mongoose.Promise = global.Promise;

Task = require('./api/models/todoListModel');
Post = require('./api/models/postModel');

var routes = require("./routes");
var apiPostRoutes = require("./api/routes/postRoutes");
var apiTodoRoutes = require('./api/routes/todoListRoutes');
var apiUserRouters = require("./api/routes/userRoutes");

var dbLocation = process.env.MONGODB_URI || 'mongodb://localhost:27017/owls-api';


mongoose.connect(dbLocation);
passportSetup();

const PORT = process.env.PORT || 3000;

app.use(logger("short"));
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(express.static(path.join('__dirname', 'static')));
app.use(bodyParser.json());
app.use(methodOverride());
app.use(session({
  secret:"Qtypnaspoij40593$%^$asdb111213",
  resave: true,
  saveUninitialized:true
}));

app.use(flash());

app.use(passport.initialize());
app.use(passport.session());

app.use(routes);
apiPostRoutes(app);
apiTodoRoutes(app);
apiUserRouters(app);

app.all('/*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});

app.set("views", path.join(__dirname,"views"));
app.set("view engine","ejs");

app.use(function(req,res,next){
  console.log("In comes a " + req.method + " to " + req.url);
  next();
});

app.get("/", (req,res,next) => {
  res.render("index");
});

app.use(function(err,req,res,next){
  console.error(err);
  next(err);
})

app.use(function(req, res) {
  res.status(404).send({url: req.originalUrl + ' not found'})
});


app.use(function(err,req,res,next){
  res.status(500).send("Internal Server Error\n",err);
});


app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`);
});
