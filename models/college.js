'use strict';
module.exports = (sequelize, DataTypes) => {
  var College = sequelize.define('College', {
    name: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return College;
};