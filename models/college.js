'use strict';
module.exports = (sequelize, DataTypes) => {
  var College = sequelize.define('College', {
    name: DataTypes.STRING,
    state : DataTypes.STRING,
    students : DataTypes.STRING,
    tuition : DataTypes.INTEGER,
    rank : DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return College;
};