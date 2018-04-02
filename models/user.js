const bcrypt = require('bcrypt-nodejs');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    user_name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
  }, {
    classMethods: {
      associate() {
        // associations can be defined here
      },
    },
    instanceMethods: {
    },
    hooks: {
      beforeCreate: (instance, options) => {},
    },
  });

  User.generatePasswordHash = password => bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);

  User.prototype.validPassword = password => bcrypt.compareSync(password, this.password);

  return User;
};
