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
    return queryInterface.bulkInsert('roles', [
    {
      name: 'admin',
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      name: 'user',
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      name: 'moderator',
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
     return queryInterface.bulkDelete('roles', null, {});
  }
};
