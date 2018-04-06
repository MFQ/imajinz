const model = require('../models');

const { User } = model;

module.exports = {
  up: (queryInterface, Sequelize) => {
    const timeStamp = Sequelize.literal('CURRENT_TIMESTAMP');
    return Promise.all([
      queryInterface.bulkInsert('Users', [{
        email: 'admin@admin.com',
        password: User.generatePasswordHash('admin'),
        createdAt: timeStamp,
        updatedAt: timeStamp,
        admin: true,
      }]),
    ]);
  },

  down: queryInterface => Promise.all([queryInterface.bulkDelete('Users', [{ email: 'admin@admin.com' }])]),
};
