module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('Users', [
      {
        email: 'jhon@example.com',
        password: 'jhon',
        photo: 'https://example.com',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('Users', null, {});
  },
};
