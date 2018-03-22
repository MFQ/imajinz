
module.exports = (sequelize, DataTypes) => {
  const Image = sequelize.define('Image', {
    name: DataTypes.STRING,
    url: {
      type: DataTypes.STRING,
      unique: true,
    },
    tags: DataTypes.STRING,
  }, {});
  return Image;
};
