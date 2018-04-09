const model = require('../../../models');
const jobs = require('../../../jobs');
const connectionDetails = require('../../../config/redis.js');
const NodeResque = require('node-resque');

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
  createByUrl: (req, res) => {
    const queue = new NodeResque.Queue({ connection: connectionDetails }, jobs);
    queue.on('error', (error) => { console.log(error); });
    queue.connect();
    queue.enqueue('images', 'uploadImageByUrl', [req.body]);
    res.json({ status: 200, processing: true });
  },
};
