const sessionController = {
  login: (req, res) => {
    res.render('sessions/login');
  },
  signup: (req, res) => {
    res.render('sessions/signup');
  },
  logout: (req, res) => {
    req.logout();
    res.redirect('/');
  },
};

module.exports = sessionController;
