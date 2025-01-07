const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Comments = sequelize.define(
  'Comments',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
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
    comment: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    tableName: 'Comments',
    timestamps: true, 
  }
);

module.exports = Comments;
