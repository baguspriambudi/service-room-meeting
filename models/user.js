const { DataTypes } = require('sequelize');
const sequelize = require('../connection/connection');

module.exports = sequelize.define('User', {
  email: { type: DataTypes.STRING, allowNull: false },
  password: { type: DataTypes.STRING, allowNull: false },
  photo: { type: DataTypes.STRING, allowNull: false },
  role: { type: DataTypes.ENUM('admin', 'guest'), defaultValue: 'guest' },
});
