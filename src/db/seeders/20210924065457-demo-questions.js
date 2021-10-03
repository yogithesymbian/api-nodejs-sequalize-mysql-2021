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
    return await queryInterface.bulkInsert('questions', [
     {
       id: 1,
       name: 'Buah buahan',
       life: 3,
       path_image: 'assets/images/question_buah.png',
       created_at: new Date(),
       updated_at: new Date()
     },
     {
       id: 2,
       name: 'Hewan',
       life: 3,
       path_image: 'assets/images/question_hewan.png',
       created_at: new Date(),
       updated_at: new Date()
     },
     {
       id: 3,
       name: 'Tumbuhan',
       life: 3,
       path_image: 'assets/images/question_tumbuhan.png',
       created_at: new Date(),
       updated_at: new Date()
     },
     {
       id: 4,
       name: 'Keluarga',
       life: 3,
       path_image: 'assets/images/question_family.png',
       created_at: new Date(),
       updated_at: new Date()
     },
     {
       id: 5,
       name: 'Benda',
       life: 3,
       path_image: 'assets/images/question_benda.jpg',
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
     return await queryInterface.bulkDelete('questions', null, {});
  }
};
