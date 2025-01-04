const { DataTypes } = require('sequelize');
const sequelize = require('../db.js');
const User = require('./users.js')(sequelize, DataTypes); // Assuming you have the User model defined correctly

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
      references: {
        model: 'Users',  // Ensure this matches the table name in your database
        key: 'user_id'   // Foreign key referencing the User model's primary key
      }
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }
  });

  // Setting up the foreign key relation to Users
  Post.belongsTo(User, {
    foreignKey: 'user_id',
    as: 'user' // Alias for the relationship
  });

  return Post;
};
