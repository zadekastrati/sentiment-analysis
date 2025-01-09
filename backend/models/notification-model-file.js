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
