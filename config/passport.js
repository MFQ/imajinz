const LocalStrategy = require('passport-local').Strategy;

const model = require('../models');

const { User } = model;

module.exports = (passport) => {
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    User.findOne({ where: { id } }).then((user) => {
      done(null, user);
    }).catch((err) => {
      done(null, err);
    });
  });

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
    }).catch((err) => {
      done(err);
    });
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
      } else {
        return done(null, req.user);
      }
    });
  }));
};
