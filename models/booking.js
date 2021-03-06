const { DataTypes } = require('sequelize');
const sequelize = require('../connection/connection');

module.exports = sequelize.define('Booking', {
  userId: { type: DataTypes.INTEGER, allowNull: false },
  roomId: { type: DataTypes.INTEGER, allowNull: false },
  total_person: { type: DataTypes.INTEGER, defaultValue: 0 },
  booking_time: { type: DataTypes.DATE, allowNull: false },
  noted: { type: DataTypes.TEXT, allowNull: false },
  check_in_time: { type: DataTypes.DATE },
  check_out_time: { type: DataTypes.DATE },
});
