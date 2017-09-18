'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return  queryInterface.addColumn('scenes', 'ProjectId', {
      allowNull: false,
      type: Sequelize.INTEGER,
    })
  },

  down: function (queryInterface, Sequelize) {
    return  queryInterface.removeColumn('scenes', 'ProjectId')
  }
};
