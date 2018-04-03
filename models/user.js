const bcrypt = require('bcrypt-nodejs');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    user_name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
  }, {});

  User.generatePasswordHash = password => bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);

  User.prototype.validPassword = function validPassword(passwordKey) {
    return bcrypt.compareSync(passwordKey, this.password);
  };

  return User;
};
