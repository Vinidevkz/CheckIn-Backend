'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Seats', {
      idSeat: {
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
      numberSeat: {
        type: Sequelize.STRING
      },
      statusSeat: {
        type: Sequelize.BOOLEAN
      },
      idUser: {
        type: Sequelize.INTEGER
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
    await queryInterface.dropTable('Seats');
  }
};