module.exports = (sequelize, DataTypes) => {
    const Like = sequelize.define('Likes', {
      user_id: DataTypes.INTEGER,
      post_id: DataTypes.INTEGER,
    }, {});
    Like.associate = function(models) {
      Like.belongsTo(models.User, { foreignKey: 'user_id' });
      Like.belongsTo(models.Post, { foreignKey: 'post_id' });
    };
    return Likes;
  };
  