const { Model, DataTypes } = require("sequelize");
const db = require("../config/db");

class Notification extends Model {}

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
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "users", // Referencë për tabelën e përdoruesve
        key: "id",
      },
      onDelete: "CASCADE", // Fshirja e njoftimeve kur përdoruesi fshihet
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    read: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false, // Vlera default për fushën 'read'
    },
  },
  {
    sequelize: db,
    modelName: "Notification",
  }
);

module.exports = Notification;
