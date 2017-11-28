'use strict';
module.exports = (sequelize, DataTypes) => {
  var Comment = sequelize.define('Comment', {
    content: {type: DataTypes.STRING, allowNull: false, unique: true, min: 5},
    owner: {type: DataTypes.STRING, allowNull: false},
    formTitle: {type: DataTypes.STRING, allowNull: false, min: 5},
    college: {type: DataTypes.STRING, allowNull: false}
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Comment;
};