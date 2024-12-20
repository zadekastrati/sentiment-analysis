const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'postgres',
  host: 'db', 
  username: 'postgres',
  password: '1234',
  database: 'sentimentanalysis',
  logging: console.log,
});

module.exports = sequelize;
