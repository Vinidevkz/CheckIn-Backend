'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {

    static associate(models) {
      User.hasMany(models.usersessions, {
        foreignKey: 'idUser',
        as: 'user'
      })
    }
  }
  User.init({
    idUser: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    nomeUser: DataTypes.STRING,
    emailUser: DataTypes.STRING,
    passwordUser: DataTypes.STRING,
    cpfUser: DataTypes.STRING,
    dataNasc: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};