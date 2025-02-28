'use strict';
const {
  Model,
  Sequelize
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Seat extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Seat.belongsTo(models.Session, {
        foreignKey: 'idSession',
        as: 'session'
      })
    }
  }
  Seat.init({
    idSeat: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
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
    numberSeat: DataTypes.INTEGER,
    statusSeat: DataTypes.BOOLEAN,
    idUser: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Seat',
  });
  return Seat;
};