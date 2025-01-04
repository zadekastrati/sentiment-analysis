module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Likes', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
<<<<<<< HEAD:backend/migrations/20241217230428-create-post.js
        references: {
          model: 'Users', // Name of the table you are referencing
          key: 'user_id',
        },
        onUpdate: 'CASCADE',
=======
        references: { model: 'Users', key: 'id' }, // Use 'Users' here
>>>>>>> 63e407ab0fd35e9990461016423c8f443796fc65:backend/migrations/20250102001401-create-likes.js
        onDelete: 'CASCADE',
      },
      post_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'Posts', key: 'id' },
        onDelete: 'CASCADE',
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Likes');
  },
};
