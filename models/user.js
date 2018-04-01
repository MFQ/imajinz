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
      generatePasswordHash: () => {
        this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync(8), null);
      },
      validPassword: (password) => {
        return bcrypt.compareSync(password, this.local.password);
      },
    },
    hooks: {
      beforeCreate: (instance, options) => {},
    },
  });
  return User;
};
