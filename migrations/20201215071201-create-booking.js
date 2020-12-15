module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Bookings', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      room_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      total_person: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      booking_time: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      noted: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      check_in_time: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      check_out_time: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      deletedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('Bookings');
  },
};
