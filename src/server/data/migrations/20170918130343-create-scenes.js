'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('scenes', {
      name: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      description: {
          allowNull: true,
          type: Sequelize.STRING,
      },
      text: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      isUntouched: {
        allowNull: true,
        type: Sequelize.BOOLEAN,
      },
      isPlotPoint: {
        allowNull: true,
        type: Sequelize.BOOLEAN,
      },
      step: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      UserId: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('scenes');
  }
};