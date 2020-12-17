const { DataTypes } = require('sequelize');
const sequelize = require('../connection/connection');

module.exports = sequelize.define('Booking', {
  user_id: { type: DataTypes.INTEGER, allowNull: false },
  room_id: { type: DataTypes.INTEGER, allowNull: false },
  total_person: { type: DataTypes.INTEGER, defaultValue: 0 },
  booking_time: { type: DataTypes.STRING, allowNull: false },
  noted: { type: DataTypes.TEXT, allowNull: false },
  check_in_time: { type: DataTypes.STRING },
  check_out_time: { type: DataTypes.STRING },
});
