module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Dislikes', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
<<<<<<< HEAD
        references: { model: 'Users', key: 'user_id' }, // Use 'Users' here
=======
        references: {
          model: 'Users', // Table name
          key: 'user_id', // Primary key column of the Users table
        },
        onUpdate: 'CASCADE',
>>>>>>> 8c7ca18a8763856340358623c55a60caa04d1bc4
        onDelete: 'CASCADE',
      },
      post_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'posts', // Table name
          key: 'id', // Primary key column of the Posts table
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
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
    await queryInterface.dropTable('Dislikes');
  },
};
