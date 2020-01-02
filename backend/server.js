var express = require('express');
require('dotenv').config();
const PORT = process.env.PORT || 5003;

var flash = require('connect-flash');
var cors = require('cors')
var passport = require("passport");
var request = require('request');
var bodyParser = require('body-parser');
var session = require("express-session");
var MY_IP = require('./lib/config').MY_IP;
var app = express();

app.use(express.cookieParser('secret'));
app.use(express.cookieSession());
app.use(express.cookieParser())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({credentials: true,
  origin: `http://${MY_IP}:3000`
}));
app.use(passport.initialize());
app.use(passport.session());

var path = require('path');

app.use(flash());
app.use(express.session({
  secret: '1723918723987',
  resave: false,
  saveUninitialized: true,
}));
app.set('view engine', 'pug');
app.set('view options', { layout: false });


require('./lib/routes.js')(app);

app.listen(PORT);
console.log('Node listening on port %s', PORT);
