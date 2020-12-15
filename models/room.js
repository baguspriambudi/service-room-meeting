const { DataTypes } = require('sequelize');
const sequelize = require('../config/config.json');

module.exports = sequelize.define('User', {
  room_name: { type: DataTypes.STRING, allowNull: false },
  room_capacity: { type: DataTypes.INTEGER, allowNull: false },
  photo: { type: DataTypes.STRING, allowNull: false },
});
