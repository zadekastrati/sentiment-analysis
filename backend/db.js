const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("sentimentanalysis", "postgres", "1234", {
  host: "localhost",
  dialect: "postgres", // Use PostgreSQL dialect
});

module.exports = sequelize;


