const { DataTypes } = require('sequelize');
const sequelize = require('../config/db'); 

const Dislikes = sequelize.define('Dislikes', {
  post_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Posts', 
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
  tableName: 'Dislikes', 
  timestamps: false, 
});

module.exports = Dislikes;
