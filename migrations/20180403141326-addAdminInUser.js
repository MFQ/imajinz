
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.addColumn('Users', 'admin', { type: Sequelize.BOOLEAN, defaultValue: false }),
  down: queryInterface => queryInterface.removeColumn('Users', 'admin'),
};
