'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('scores', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      user_id: {
       type: Sequelize.INTEGER,
       allowNull: false,
       references: {
         model: "users",
         key: "id"
       },
       onDelete: "CASCADE"
      },
      question_id: {
       type: Sequelize.INTEGER,
       allowNull: false,
       references: {
         model: "questions",
         key: "id"
       },
       onDelete: "CASCADE"
      },
      score: {
        type: Sequelize.DOUBLE
      },
      delete_flag: {
        type: Sequelize.INTEGER
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('scores');
  }
};