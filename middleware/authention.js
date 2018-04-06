const authentication = {
  isLoggedIn: (req, res, next) => {
    if (req.isAuthenticated()) {
      return next();
    }
    return res.redirect('/');
  },
  isNotLoggedIn: (req, res, next) => {
    if (req.user) {
      return res.redirect('/');
    }
    return next();
  },
};

module.exports = authentication;
