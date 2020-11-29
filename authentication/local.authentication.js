// Authentication using email and password
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const users = require('../users-list');

passport.use(new LocalStrategy({
        usernameField: 'email',
    }, function (email, password, done) {
        const user = users.find((user) => {
            return user.email === email && user.password === password;
        })
        if (users) {
            done(null, user);
        }else {
            done(null,false);
        }
    }
))
