'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return  queryInterface.addColumn('projects', 'image', {
      allowNull: true,
      type: Sequelize.STRING,
    })
  },

  down: function (queryInterface, Sequelize) {
    return  queryInterface.removeColumn('projects', 'image')
  }
};
