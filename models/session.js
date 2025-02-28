'use strict';
const {
  Model,
  Sequelize
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Session extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Session.hasOne(models.Movie, {
        foreignKey: 'idMovie',
        as: 'movie'
      })
    }
  }
  Session.init({
    idSession: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    idMovie: {
      type: Sequelize.NUMBER,
      references: {
        model: 'Movies',
        key: 'idMovie'
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL'
    },
    cinemaSession: DataTypes.STRING,
    dateSession: DataTypes.DATE,
    priceTicket: DataTypes.FLOAT
  }, {
    sequelize,
    modelName: 'Session',
  });
  return Session;
};