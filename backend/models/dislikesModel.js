module.exports = (sequelize, DataTypes) => {
    const Dislike = sequelize.define('Dislikes', {
      user_id: DataTypes.INTEGER,
      post_id: DataTypes.INTEGER,
    }, {});
    Dislike.associate = function(models) {
      Dislike.belongsTo(models.User, { foreignKey: 'user_id' });
      Dislike.belongsTo(models.Post, { foreignKey: 'post_id' });
    };
    return Dislikes;
  };
  