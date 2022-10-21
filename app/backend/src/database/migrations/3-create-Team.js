'use strict';
// @ts-check
module.exports = {
      /**
   * 
   * @param {import('sequelize').QueryInterface} queryInterface 
   * @param {import('sequelize').DataTypes} Sequelize 
   */
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('teams', { 
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      } ,
      team_name: {
        type: Sequelize.STRING,
        allowNull: false,
      } ,
    });

  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('teams');
  }
};