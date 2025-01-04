"use strict";

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
        model: "Users", // Reference to the Users table
        key: "id",
      },
      onDelete: "CASCADE", // Deletes notifications when the user is deleted
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    read: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false, // Indicates if the notification has been read
    },
  },
  {
    sequelize: db,
    modelName: "Notification",
    timestamps: true, // Automatically handles createdAt and updatedAt
  }
);

module.exports = Notification;
