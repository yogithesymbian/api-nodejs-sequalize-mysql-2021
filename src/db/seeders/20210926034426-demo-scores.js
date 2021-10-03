'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    return await queryInterface.bulkInsert('scores', [
     {
       id: 1,
       user_id: 1,
       question_id: 1,
       score: 75.5,
       created_at: new Date(),
       updated_at: new Date()
     },
     {
       id: 2,
       user_id: 2,
       question_id: 1,
       score: 75.2,
       created_at: new Date(),
       updated_at: new Date()
     },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     return await queryInterface.bulkDelete('scores', null, {});
  }
};
