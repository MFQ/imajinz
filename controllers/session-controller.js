const sessionController = {
  login: (req, res) => {
    res.render('sessions/login', { message: req.flash('loginMessage') });
  },
  signup: (req, res) => {
    res.render('sessions/signup', { message: req.flash('signupMessage') });
  },
  logout: (req, res, next) => {
    // req.session.destroy()
    req.logout();
    // res.redirect('/')
    req.session.destroy((err) => {
      if (err) {
        next(err);
      }
      req.user = null;
      res.redirect('/');
    });
  },
};

module.exports = sessionController;
