const model = require('../models');

const Images = model.Image;

const imagesController = {

  create: (req, res) => {
    Images.create({
      name: req.body.name,
      url: req.file.filename,
    }).then(() => {
      res.redirect('/');
    });
  },

  getImage: (req, res, next) => {
    const options = {
      root: `${__dirname}/../`,
      dotfiles: 'deny',
      headers: {
        'x-timestamp': Date.now(),
        'x-sent': true,
      },
    };

    Images.find({
      where: {
        url: req.params.url,
      },
    }).then((image) => {
      res.sendFile(`uploads/${image.url}`, options, (err) => {
        if (err) {
          next(err);
        }
      });
    }).catch((err) => {
      res.send(err);
    });
  },
};

module.exports = imagesController;
