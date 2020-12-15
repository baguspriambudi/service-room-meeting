const { DataTypes } = require('sequelize');
const sequelize = require('../config/config.json');

module.exports = sequelize.define('User', {
  email: { type: DataTypes.STRING, allowNull: false },
  password: { type: DataTypes.STRING, allowNull: false },
  photo: { type: DataTypes.STRING, allowNull: false },
});
