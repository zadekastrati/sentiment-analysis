const { Sequelize } = require('sequelize');
require('dotenv').config();

const dbHost = process.env.DB_HOST === 'db' ? 'db' : 'localhost';

const db = new Sequelize({
  dialect: 'postgres',
  host: 'db', 
  username: 'postgres',
  password: '1234',
  database: 'sentimentanalysis',
  logging: false,
});

module.exports = db;
