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
    return await queryInterface.bulkInsert('user_roles', [
     {
       id: 1,
       role_id: 2,
       user_id: 1,
       created_at: new Date(),
       updated_at: new Date()
     },
     {
       id: 2,
       role_id: 2,
       user_id: 2,
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
     return await queryInterface.bulkDelete('user_roles', null, {});
  }
};
