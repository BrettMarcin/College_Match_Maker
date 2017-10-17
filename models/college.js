'use strict';
module.exports = (sequelize, DataTypes) => {
  var College = sequelize.define('College', {
    name: {type: DataTypes.STRING, allowNull: false, unique: true},
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