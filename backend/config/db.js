const { Sequelize } = require("sequelize");
require("dotenv").config();

<<<<<<< HEAD
const dbHost = process.env.DB_HOST === "db" ? "db" : "localhost";

const db = new Sequelize({
  dialect: "postgres",
  host: "db",
  username: "postgres",
  password: "1234",
  database: "sentimentanalysis",
=======
const dbHost = process.env.DB_HOST || 'localhost';
const dbUser = process.env.DB_USER || 'postgres';
const dbPassword = process.env.DB_PASSWORD || '1234';
const dbName = process.env.DB_NAME || 'sentimentanalysis';

const db = new Sequelize(dbName, dbUser, dbPassword, {
  dialect: 'postgres',
  host: dbHost,
>>>>>>> 8c7ca18a8763856340358623c55a60caa04d1bc4
  logging: false,
});

module.exports = db;
