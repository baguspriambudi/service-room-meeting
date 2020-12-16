const { DataTypes } = require('sequelize');
const sequelize = require('../connection/connection');

module.exports = sequelize.define('User', {
  room_name: { type: DataTypes.STRING, allowNull: false },
  room_capacity: { type: DataTypes.INTEGER, allowNull: false },
  photo: { type: DataTypes.STRING, allowNull: false },
});
