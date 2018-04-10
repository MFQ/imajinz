module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.addColumn('Images', 'flagged', { type: Sequelize.BOOLEAN, defaultValue: null }),
  down: queryInterface => queryInterface.removeColumn('Images', 'flagged'),
};
