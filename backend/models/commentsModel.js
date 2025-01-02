module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define('Comments', {
    user_id: DataTypes.INTEGER,
    post_id: DataTypes.INTEGER,
    comment: DataTypes.TEXT,
  }, {});
  Comment.associate = function(models) {
    Comment.belongsTo(models.User, { foreignKey: 'user_id' });
    Comment.belongsTo(models.Post, { foreignKey: 'post_id' });
  };
  return Comments;
};
