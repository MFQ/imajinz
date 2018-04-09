const model = require('../../../models');

const Images = model.Image;

module.exports = {
  getAll: (req, res) => {
    Images.findAll({
      attributes: ['id', 'name', 'url'],
    }).then((images) => {
      res.json({ result: images, status: 200 });
    }).catch((err) => {
      console.log(err);
      res.json({
        err,
        status: 500,
      });
    });
  },
  create: (req, res) => {
    Images.create({
      name: req.body.name,
      url: req.file.filename,
    }).then(() => {
      res.json({ status: 200 });
    }).catch((err) => {
      console.log(err);
      res.json({
        err,
        status: 500,
      });
    });
  },
};
