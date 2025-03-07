'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Sessions', {
      idSession: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      idMovie: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Movies', 
          key: 'idMovie' 
        },
        onUpdate: 'CASCADE', 
        onDelete: 'SET NULL'
      },
      cinemaSession: {
        type: Sequelize.STRING
      },
      dateSession: {
        type: Sequelize.DATE
      },
      hourSession: {
        type: Sequelize.STRING
      },
      priceTicket: {
        type: Sequelize.FLOAT
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Sessions');
  }
};