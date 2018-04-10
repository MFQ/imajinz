const fs = require('fs');
const NodeResque = require('node-resque');
const jobs = require('.././jobs');
const connectionDetails = require('.././config/redis.js');

const queue = new NodeResque.Queue({ connection: connectionDetails }, jobs);
queue.on('error', (error) => { console.log(error); });

module.exports = (sequelize, DataTypes) => {
  const Image = sequelize.define('Image', {
    name: DataTypes.STRING,
    url: {
      type: DataTypes.STRING,
      unique: true,
    },
    tags: DataTypes.STRING,
    processed: DataTypes.BOOLEAN,
    flagged: DataTypes.BOOLEAN,
  }, {});

  Image.findByUrl = url => Image.find({ where: { url } });
  Image.findById = id => Image.find({ where: { id } });
  Image.prototype.getURL = function getURL() {
    if (this.processed) {
      return `processed-assets/${this.url}`;
    }
    return `uploads/${this.url}`;
  };

  Image.addHook('beforeDestroy', image => fs.unlinkSync(image.getURL()));
  Image.addHook('beforeCreate', (image) => {
    // //////////////////////
    // CONNECT TO A QUEUE //
    // //////////////////////
    if (!image.processed) {
      queue.connect();
      queue.enqueue('images', 'resizeImage', [image]);
    }
  });

  Image.addHook('afterUpdate', (image) => {
    if (image.processed && image.flagged === null) {
      queue.connect();
      queue.enqueue('images', 'enhancingVision', [image]);
    }
  });

  return Image;
};
