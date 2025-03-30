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
      Session.belongsTo(models.Movie, {
        foreignKey: 'idMovie',
        as: 'movie'
      })

      Session.hasMany(models.Seat, {
        foreignKey: 'idSession',
        as: 'seats'
      });
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
    hourSession: DataTypes.STRING,
    priceTicket: DataTypes.FLOAT,
    qtdSeatsOn: {
      type: DataTypes.VIRTUAL,
      get() {
        if (this.seats) {
          return this.seats.filter(seat => seat.statusSeat === 1).length;
        }
        return 0; 
      }
    }

  },
   {
    sequelize,
    modelName: 'Session',
  });
  return Session;
};