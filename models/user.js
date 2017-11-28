const bcrypt = require("bcrypt");
'use strict';
module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('User', {
    id: {autoIncrement: true, primaryKey: true, type: DataTypes.INTEGER},
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
    },
    classMethods: {
      validPassword: function(password, passwd, done, user) {
        bcrypt.compare(password, passwd, function(err, isMatch){
          if (err) console.log(err);
          if (isMatch) {
            return done(null, user);
          } else {
            return done(null, false);
          }
        });
      },
      validUserName: function(theUserName){
        return this.findAndCountAll({where: {userName: theUserName}});
      },
      validEmail: function(theEmail){
        return this.findAndCountAll({where: {email: theEmail}});
      },
      associate: function(models) {
        // associations can be defined here
      }
    }
  });

  User.generateHash = function(password){
    return bcrypt.hash(password, bcrypt.genSaltSync(10));
  };

  User.validUserName = function(theUserName){
    return this.findAndCountAll({where: {userName: theUserName}});
  };

  User.validEmail = function(theEmail){
    return this.findAndCountAll({where: {email: theEmail}});
  };

  return User;
};