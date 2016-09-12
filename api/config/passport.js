var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongoose = require('mongoose');
var User = mongoose.model('User');

passport.use(new LocalStrategy({
        usernameField: 'email'
    },
    function (username, password, done) {
        User.findOne({email: username}, function (err, user) {
            if (err) {
                return done(err)
            } else if (!user) {
                // Return if user not found in database
                return done(null, false, {
                    message: 'User not found'
                });
            } else if (!user.validPassword(password)) {
                // Return if password is wrong
                return done(null, false, {
                    message: 'Password is wrong'
                });
            } else {
                // If credentials are correct, return the user object
                return done(null, user);
            }
        })
    }
));