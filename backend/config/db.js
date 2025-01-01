const { Sequelize } = require('sequelize');
require('dotenv').config();

const dbHost = process.env.DB_HOST === 'db' ? 'db' : 'localhost';

const db = new Sequelize({
  dialect: 'postgres',
  host: dbHost,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  logging: console.log,
});

module.exports = db;
