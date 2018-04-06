module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.addColumn('Images', 'processed', { type: Sequelize.BOOLEAN, defaultValue: false }),
  down: queryInterface => queryInterface.removeColumn('Images', 'processed'),
};
