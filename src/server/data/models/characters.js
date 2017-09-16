'use strict';
module.exports = function(sequelize, DataTypes) {
  var Characters = sequelize.define('Characters', {
    name: {
        allowNull: false,
        type: DataTypes.STRING,
    },
    role: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    image: {
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
      tableName: 'characters',
      freezeTableName: true,
      associate: function(models) {
        Characters.belongsTo(models.Projects, {
          // onDelete: "CASCADE", // TODO implement this?
          foreignKey: {
            allowNull: false
          }
        });
      },
    }
  });
  return Characters;
};