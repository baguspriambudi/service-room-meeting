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
        allowNull: true,
      },
      check_in_time: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      check_out_time: {
        type: Sequelize.DATE,
        allowNull: true,
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
