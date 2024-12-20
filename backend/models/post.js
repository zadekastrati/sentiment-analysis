const { DataTypes } = require('sequelize');
const sequelize = require('../db.js');
const User = require('./users.js')(sequelize, DataTypes); // Assuming you have a User model

module.exports = (sequelize) => {
const Post = sequelize.define('Post', {
  post_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
});

// Setting up the foreign key relation to Users
Post.belongsTo(User, {
  foreignKey: 'user_id',
  as: 'user'
});

return Post;
};



