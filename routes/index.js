const express = require('express');

const router = express.Router();

const homeController = require('../controllers/home-controller');
const imagesController = require('../controllers/image-controller');

const fileUploadMiddleware = require('../middleware/file-upload');

router.get('/', homeController.home);
router.post('/images', fileUploadMiddleware, imagesController.create);
router.get('/images/:url', imagesController.getImage);

module.exports = router;
