const { Model, DataTypes } = require('sequelize');
const db = require('../config/db');

class ContactUs extends Model {}

ContactUs.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    message: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    sequelize: db,
    modelName: 'ContactUs',
  }
);

module.exports = ContactUs;
