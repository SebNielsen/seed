/**
 * Created by sebastiannielsen on 07/04/2016.
 */
var express = require('express');
var app = express();

var bodyParser = require('body-parser');
var morgan = require('morgan');

var passport = require('passport');
var passportConfig = require("./config/passport");
passportConfig(passport);


// get our request parameters
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE, CONNECT');
    res.header("Access-Control-Allow-Headers", "Origin, Authorization, X-Requested-With, Content-Type, Accept");
    next();
});

// log to console
app.use(morgan('dev'));

// Use the passport package in our application
app.use(passport.initialize());

app.use('/api', require('./routes/users'));

app.use('/api', function (req, res, next) {
    passport.authenticate('jwt', {session: false}, function (err, user, info) {
        if (err) {
            res.status(403).json({mesage: "Token could not be authenticated", fullError: err})
        }
        if (user) {
            return next();
        }
        return res.status(403).json({mesage: "Token could not be authenticated", fullError: info});
    })(req, res, next);
});

app.use('/api', require('./routes/api'));

module.exports = app;