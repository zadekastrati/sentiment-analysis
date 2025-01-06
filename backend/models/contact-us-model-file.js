const { Model, DataTypes } = require('sequelize');
const db = require('../config/db');

class ContactUs extends Model {}

ContactUs.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
<<<<<<< HEAD
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
=======
    {
      tableName: "contact_us", 
      timestamps: false,
    }
  );

  return ContactUs;
};
>>>>>>> 8c7ca18a8763856340358623c55a60caa04d1bc4
