const { Sequelize } = require('sequelize');
require('dotenv').config();

const dbHost = process.env.DB_HOST || 'localhost';
const dbUser = process.env.DB_USER || 'postgres';
const dbPassword = process.env.DB_PASSWORD || '1234';
const dbName = process.env.DB_NAME || 'sentimentanalysis';

const db = new Sequelize(dbName, dbUser, dbPassword, {
  dialect: 'postgres',
  host: dbHost,
  logging: false,
});

module.exports = db;
