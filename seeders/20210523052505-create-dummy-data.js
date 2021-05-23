'use strict'

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
    await queryInterface.bulkInsert(
      'users',
      [
        {
          uuid: '57a97da9-b2d0-4e86-a194-3c13576d9c91',
          name: 'maulia',
          email: 'adads@gmail.com',
          role: 'admin',
          createdAt: '2021-05-23T05:12:42.796Z',
          updatedAt: '2021-05-23T05:12:42.796Z',
        },
        {
          uuid: '57a97da9-b2d0-4e86-a194-3c13576d9c92',
          name: 'farsiko',
          email: 'gama@gmail.com',
          role: 'admin',
          createdAt: '2021-05-23T05:12:42.796Z',
          updatedAt: '2021-05-23T05:12:42.796Z',
        },
      ],
      {}
    )
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('users', null, {})
  },
}
