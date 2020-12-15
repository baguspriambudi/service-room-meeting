const { DataTypes } = require('sequelize');
const sequelize = require('../config/config.json');

module.exports = sequelize.define('User', {
  user_id: { type: DataTypes.INTEGER, allowNull: false },
  room_id: { type: DataTypes.INTEGER, allowNull: false },
  total_person: { type: DataTypes.INTEGER, allowNull: false },
  booking_time: { type: DataTypes.INTEGER, allowNull: false },
  noted: { type: DataTypes.TEXT, allowNull: false },
  check_in_time: { type: DataTypes.DATE, allowNull: false },
  check_out_time: { type: DataTypes.DATE, allowNull: false },
});
