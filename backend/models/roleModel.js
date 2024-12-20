const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/db'); // Ensure this is your Sequelize instance

class Role extends Model {}

Role.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  },
  {
    sequelize,
    modelName: 'Role',
    tableName: 'roles',  // Ensure this matches the actual table name
    timestamps: true,    // Sequelize will automatically handle created_at and updated_at
    underscored: true,   // Ensures snake_case column names in the database
  }
);

module.exports = Role;
