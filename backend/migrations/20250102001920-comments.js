module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Comments', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
<<<<<<< HEAD
        references: { model: 'Users', key: 'user_id' }, 
=======
        references: {
          model: 'Users', // Reference the Users table
          key: 'user_id', // Primary key column in the Users table
        },
        onUpdate: 'CASCADE',
>>>>>>> 8c7ca18a8763856340358623c55a60caa04d1bc4
        onDelete: 'CASCADE',
      },
      post_id: { // Updated to 'post_id' for consistency
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'posts', // Reference the Posts table
          key: 'id', // Primary key column in the Posts table
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      comment: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW'),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW'),
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Comments');
  },
};
