'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('userSessions', {
      idMySession: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      idSession: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Sessions', 
          key: 'idSession' 
        },
        onUpdate: 'CASCADE', 
        onDelete: 'SET NULL'
      },
      idSeat: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Seats', 
          key: 'idSeat' 
        },
        onUpdate: 'CASCADE', 
        onDelete: 'SET NULL'
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
    await queryInterface.dropTable('userSessions');
  }
};