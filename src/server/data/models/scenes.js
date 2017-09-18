'use strict';
module.exports = function(sequelize, DataTypes) {
  var Scenes = sequelize.define('Scenes', {
    name: {
        allowNull: false,
        type: DataTypes.STRING,
    },
    description: {
        allowNull: true,
        type: DataTypes.STRING,
    },
    text: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    isUntouched: {
      allowNull: true,
      type: DataTypes.BOOLEAN,
    },
    isPlotPoint: {
      allowNull: true,
      type: DataTypes.BOOLEAN,
    },
    step: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    ProjectId: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    UserId: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
  }, {
    classMethods: {
      tableName: 'scenes',
      freezeTableName: true,
      associate: function(models) {
        Scenes.belongsTo(models.User, {
          // onDelete: "CASCADE", // TODO implement this?
          foreignKey: {
            allowNull: false
          }
        });
        Scenes.belongsTo(models.Projects, {
          // onDelete: "CASCADE", // TODO implement this?
          foreignKey: {
            allowNull: false
          }
        });
      }
    }
  });
  return Scenes;
};