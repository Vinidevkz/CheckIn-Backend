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
      type: DataTypes.INTEGER,
      references: {
        model: 'Sessions',
        key: 'idSession'
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL'
    },
    numberSeat: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true
    },
    statusSeat: DataTypes.BOOLEAN,
    idUser: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Seat',
  });
  return Seat;
};