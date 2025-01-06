const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Likes = sequelize.define('Likes', {
  post_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'posts', 
      key: 'id',
    },
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Users',
      key: 'user_id', 
    },
  },
}, {
  tableName: 'Likes', 
  timestamps: true, 
});

module.exports = Likes;
