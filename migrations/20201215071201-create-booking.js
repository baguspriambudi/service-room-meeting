module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Bookings', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      roomId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      total_person: {
        type: Sequelize.INTEGER,
      },
      booking_time: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      noted: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      check_in_time: {
        type: Sequelize.STRING,
      },
      check_out_time: {
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('Bookings');
  },
};
