const model = require('../models');

const Images = model.Image;

const homeController = {
  home: (req, res) => {
    Images.findAll().then((images) => {
      res.render('index', { title: 'Image Upload', images });
    });
  },
};

module.exports = homeController;
