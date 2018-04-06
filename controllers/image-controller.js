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

  deleteImage: (req, res) => {
    Images.findByUrl(req.params.url).then((image) => {
      image.destroy().then((err) => {
        if (err.length !== 0) throw err;
        res.send({ status: true });
      });
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

    Images.findByUrl(req.params.url).then((image) => {
      res.sendFile(image.getURL(), options, (err) => {
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
