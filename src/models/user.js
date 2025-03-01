'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {

    static associate(models) {

    }
  }
  User.init({
    idUser: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    nameUser: {
      type:DataTypes.STRING,
      allowNull: false,
    },
    emailUser: {
      type:DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    passwordUser: {
      type:DataTypes.STRING,
      allowNull: false, 
    },
    cpfUser: {
      type:DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    dataNasc: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};