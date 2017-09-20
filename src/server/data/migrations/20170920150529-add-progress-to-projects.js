'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return  queryInterface.addColumn('projects', 'progress', {
      defaultValue: 0,
      allowNull: false,
      type: Sequelize.INTEGER,
    })
  },

  down: function (queryInterface, Sequelize) {
    return  queryInterface.removeColumn('projects', 'progress')
  }
};
