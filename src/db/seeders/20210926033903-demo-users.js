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
    return await queryInterface.bulkInsert('users', [
     {
       id: 1,
       username: 'yogi',
       first_name: 'yogi',
       last_name: 'arif widodo',
       email: 'yogirenbox33@gmail.com',
       password: '123',
       image_profile: 'https://storage.googleapis.com/kaggle-avatars/images/3736113-kg.jpg',
       created_at: new Date(),
       updated_at: new Date()
     },
     {
       id: 2,
       username: 'user',
       first_name: 'user',
       last_name: 'user',
       email: 'a@a.com',
       password: 'a',
       image_profile: 'https://storage.googleapis.com/kaggle-avatars/images/3736113-kg.jpg',
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
     return await queryInterface.bulkDelete('users', null, {});
  }
};
