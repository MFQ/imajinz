const sessionController = {
  login: (req, res) => {
    res.render('sessions/login', { message: req.flash('loginMessage') });
  },
  signup: (req, res) => {
    res.render('sessions/signup', { message: req.flash('signupMessage') });
  },
  logout: (req, res) => {
    req.logout();
    res.redirect('/');
  },
};

module.exports = sessionController;
