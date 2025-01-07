const { Model, DataTypes } = require("sequelize");
const db = require("../config/db");

<<<<<<< HEAD
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("notifications", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      message: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Users", // referencë për tabelën e përdoruesve
          key: "user_id",
        },
        onDelete: "CASCADE", // fshirja e njoftimeve kur fshihet përdoruesi
      },
      type: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      read: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false, // për të treguar nëse njoftimi është lexuar
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
    });
  },
=======
class Notification extends Model {}
>>>>>>> 3df9ba2b52f3f04b7a8a1525a143ce9cd6fac075

Notification.init(
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    message: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    user_id: {  
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Users", 
        key: "user_id", 
      },
      onDelete: "CASCADE",
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    read: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false, 
    },
  },
  {
    sequelize: db,
    modelName: "Notification",
    timestamps: true, 
  }
);

module.exports = Notification;
