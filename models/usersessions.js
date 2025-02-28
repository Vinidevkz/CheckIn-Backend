'use strict';
const {
  Model,
  Sequelize
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class userSessions extends Model {

    static associate(models) {
      userSessions.belongsToMany(models.user, {
        foreignKey: 'idMySession',
        as: 'mysession'
      })
    }
  }
  userSessions.init({
    idMySession: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    idSession: {
      type: Sequelize.NUMBER,
      references: {
        model: 'Sessions',
        key: 'idSession'
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL'
    },
    idSeat: DataTypes.INTEGER,
    priceTicket: DataTypes.FLOAT
  }, {
    sequelize,
    modelName: 'userSessions',
  });
  return userSessions;
};