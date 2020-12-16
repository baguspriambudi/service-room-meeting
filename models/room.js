const { DataTypes } = require('sequelize');
const sequelize = require('../connection/connection');

module.exports = sequelize.define('Room', {
  name: { type: DataTypes.STRING, allowNull: false },
  capacity: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
  photo: { type: DataTypes.STRING, allowNull: false },
});
