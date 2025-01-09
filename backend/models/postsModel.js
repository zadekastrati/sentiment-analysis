  const { Model, DataTypes } = require('sequelize');
  const db = require('../config/db');

  class Post extends Model {}

  Post.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      imgPath: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      author: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize: db,
      modelName: 'Post',
    }
  );

  module.exports = Post;
