'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class userSessions extends Model {
    static associate(models) {

      userSessions.belongsTo(models.Seat, {
        foreignKey: 'idSeat', 
        as: 'seat' 
      });

      userSessions.belongsTo(models.User, {
        foreignKey: 'idUser', 
        as: 'user' 
      });

      userSessions.belongsTo(models.Session, {
        foreignKey: 'idSession', 
        as: 'session' 
      });
    }
  }

  userSessions.init({
    idMySession: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    idSession: {
      type: DataTypes.INTEGER, 
      references: {
        model: 'Sessions', 
        key: 'idSession' 
      },
      onUpdate: 'CASCADE', 
      onDelete: 'SET NULL'
    },
    idSeat:  {
      type: DataTypes.INTEGER, 
      references: {
        model: 'Seat', 
        key: 'idSeat' 
      },
      onUpdate: 'CASCADE', 
      onDelete: 'SET NULL'
    },
    idUser:  {
      type: DataTypes.INTEGER, 
      references: {
        model: 'User', 
        key: 'idUser' 
      },
      onUpdate: 'CASCADE', 
      onDelete: 'SET NULL'
    },
    priceTicket: {
      type: DataTypes.FLOAT
    }
  }, {
    sequelize,
    modelName: 'UserSessions'
  });

  return userSessions;
};