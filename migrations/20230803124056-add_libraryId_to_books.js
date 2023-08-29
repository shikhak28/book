'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('books', 'libraryId', {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: 'libraries',
        key: 'libraryId',
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    });
  },

  async down (queryInterface, Sequelize) {
    
    await queryInterface.removeColumn('books', 'libraryId');

  }
};
