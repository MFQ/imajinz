
module.exports = (sequelize, DataTypes) => {
  const Image = sequelize.define('Image', {
    name: DataTypes.STRING,
  }, {});
  return Image;
};
