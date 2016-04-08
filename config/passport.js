/**
 * Created by sebastiannielsen on 07/04/2016.
 */
var JwtStrategy = require("passport-jwt").Strategy;
ExtractJwt = require("passport-jwt").ExtractJwt;
var jwt = require("jwt-simple");
var User = require("../models/user");
var jwtConfig = require("../config/jwtConfig").jwtConfig;

module.exports = function(passport) {

    var opts = {};
    opts.secretOrKey = jwtConfig.secret;
    opts.issuer = jwtConfig.issuer;
    opts.audience = jwtConfig.audience;
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme("Bearer");
    passport.use(new JwtStrategy(opts, function(jwt_payload,done) {
        User.findOne({username: jwt_payload.sub}, function(err, user) {
            if(err) {
                return done(err,false);
            }
            if(user) {
                done(null, user);
            }
            else{
                done(null,false,"User found in token not fount");
            }
        })
    }))
};
