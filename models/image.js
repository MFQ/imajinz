const fs = require('fs');

module.exports = (sequelize, DataTypes) => {
  const Image = sequelize.define('Image', {
    name: DataTypes.STRING,
    url: {
      type: DataTypes.STRING,
      unique: true,
    },
    tags: DataTypes.STRING,
  }, {});

  Image.addHook('beforeDestroy', (image) => {
    console.log('______________I AM CALLED');
    fs.unlinkSync(`uploads/${image.url}`);
  });

  return Image;
};
