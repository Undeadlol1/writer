'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return  queryInterface.addColumn('projects', 'dilemma', Sequelize.STRING)
  },

  down: function (queryInterface, Sequelize) {
    return  queryInterface.removeColumn('projects', 'dilemma')
  }
};
