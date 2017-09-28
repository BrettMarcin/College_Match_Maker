'use strict';
module.exports = (sequelize, DataTypes) => {
  var College = sequelize.define('College', {
    name: DataTypes.STRING,
    state: DataTypes.STRING,
    tuition: DataTypes.INTEGER,
    rank: DataTypes.INTEGER,
    students: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        
      }
    }
  });
  return College;
};