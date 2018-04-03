const express = require('express');

const router = express.Router();

const homeController = require('../controllers/home-controller');
const imagesController = require('../controllers/image-controller');
const loginController = require('../controllers/session-controller');

const fileUploadMiddleware = require('../middleware/file-upload');
const authenticationMiddleware = require('../middleware/authention');


module.exports = (passport) => {
  router.get('/', homeController.home);
  router.post('/images', fileUploadMiddleware, imagesController.create);
  router.get('/images/:url', imagesController.getImage);

  router.get('/login', authenticationMiddleware.isNotLoggedIn, loginController.login);
  router.post('/login', passport.authenticate('local-login', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true,
  }));

  router.get('/signup', authenticationMiddleware.isNotLoggedIn, loginController.signup);
  router.get('/logout', authenticationMiddleware.isLoggedIn, loginController.logout);
  router.post('/signup', passport.authenticate('local-signup', {
    successRedirect: '/',
    failureRedirect: '/signup',
    failureFlash: true,
  }));
  return router;
};
