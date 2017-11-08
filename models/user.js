const bcrypt = require("bcrypt");
'use strict';
module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('User', {
    firstName: {type: DataTypes.STRING, allowNull: false},
    lastName: {type: DataTypes.STRING, allowNull: false},
    userName: {type: DataTypes.STRING, allowNull: false, unique: true, min: 5},
    email: {type: DataTypes.STRING, allowNull: false,
    validate:
      {
        isEmail: true
      },
      unique: {
        args: true,
        msg: 'Email address already in use!'
      }
    },
    password: {type: DataTypes.STRING, allowNull: false, min: 5}
  }, {
    instanceMethods: {
      generateHash(password) {
        return bcrypt.hash(password, bcrypt.genSaltSync(10));
      },
      validPassword(password) {
        return bcrypt.compare(password, this.password);
      }
    },
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return User;
};