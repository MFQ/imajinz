const LocalStrategy = require('passport-local').Strategy;
const passport = require('passport');

const model = require('../models');

const { User } = model;

// module.exports = () => {
passport.serializeUser((user, done) => done(null, user));

passport.deserializeUser((user, done) => done(null, user));

passport.use('local-login', new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true,
}, (req, email, password, done) => {
  User.findOne({ where: { email } }).then((user) => {
    if (!user) {
      return done(null, false, req.flash('loginMessage', 'No user found.')); // req.flash is the way to set flashdata using connect-flash
    }
    if (!user.validPassword(password)) {
      return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.')); // create the loginMessage and save it to session as flashdata
    }
    return done(null, user);
  }).catch(err => done(err));
}));

passport.use('local-signup', new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true,
}, (req, email, password, done) => {
  if (email) {
    email = email.toLowerCase();
  }

  process.nextTick(() => {
    if (!req.user) {
      User.findOne({ where: { email } }).then((user) => {
        if (user) {
          return done(null, false, req.flash('signupMessage', 'That email is already taken.'));
        }
        const newUser = User.build({
          email,
          password,
        });
        return newUser.save()
          .then(_newUser => done(null, _newUser))
          .catch((err) => {
            console.log(err);
            return done(null, false, req.flash('signupMessage', 'unable to create a user'));
          });
      });
    }
    return done(null, req.user);
  });
}));
// };
