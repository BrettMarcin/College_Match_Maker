var models = require('../models/index');
const bCrypt = require("bcrypt");

module.exports = function(passport, user) {

    //var passport = require('passport')
    var LocalStrategy = require('passport-local').Strategy;
    var User = user;

// Serialize Sessions
    passport.serializeUser(function (user, done) {
        done(null, user);
    });

//Deserialize Sessions
    passport.deserializeUser(function (user, done) {
        User.findOne({where: {id: user.id}}).then(function (user) {
            done(null, user);
        }).error(function (err) {
            done(err, null)
        });
    });

    passport.use('local-signin', new LocalStrategy({
            usernameField : 'username',
            passwordField : 'password',
            passReqToCallback: true
        },
        function (req, username, password, done) {
            User.findOne({
            where: {userName: username}
            }).then(function (user) {
                if (!user) {
                    return done(null, false, {message: 'Username does not exist'});
                }
                password = bCrypt.hash(password, bCrypt.genSaltSync(10));

                if (user.password === password) {
                    return done(null, false, {message: 'Incorrect password.'});
                }
                console.log('Success!');
                return done(null, user);
            }).catch(function (err) {
                console.log("Error:", err);
                return done(null, false, {message: 'Something went wrong with your Signin'});
            });
        }
    ));

};

