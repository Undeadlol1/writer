'use strict';
module.exports = function(sequelize, DataTypes) {
  var Projects = sequelize.define('Projects', {
    title: {
        allowNull: false,
        type: DataTypes.STRING,
    },
    slug: {
      allowNull: false,
        type: DataTypes.STRING,
    },
    shortPitch: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    UserId: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
  }, {
    classMethods: {
      tableName: 'projects',
      freezeTableName: true,
      associate: function(models) {
        Projects.belongsTo(models.User, {
          // onDelete: "CASCADE", // TODO implement this?
          foreignKey: {
            allowNull: false
          }
        });
        Projects.hasMany(models.Characters)
        Projects.hasMany(models.Scenes)
      },
      findIdBySlug: function(slug) {
        return Projects
                .findOne({ where: { slug } })
                .then(project => project && project.get('id'))
      }
    }
  });
  return Projects;
};