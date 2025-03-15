'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Movie extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Movie.hasMany(models.Session, {
        foreignKey: 'idMovie',
        as: 'session'
      })
    }
  }
  Movie.init({
    idMovie: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    moviePoster: DataTypes.STRING,
    titleMovie: DataTypes.STRING,
    descMovie: DataTypes.STRING,
    dateLanc: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Movie',
  });
  return Movie;
};