'use strict';
module.exports = (sequelize, DataTypes) => {
  var form = sequelize.define('form', {
    title: {type: DataTypes.STRING, allowNull: false, unique: true, min: 5},
    college: {type: DataTypes.STRING, allowNull: false, min: 5},
    owner: {type: DataTypes.STRING, allowNull: false, min: 5}
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return form;
};