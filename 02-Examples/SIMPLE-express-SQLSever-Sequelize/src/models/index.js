const { Sequelize } = require('sequelize');
const sequelize = new Sequelize({
  dialect: 'mssql',
  dialectOptions: {
    options: {
      encrypt: false, // for Microsoft Azure
    },
  },
  host: 'NHAN2',
  username: 'nhan',
  password: '123456789',
  database: 'myStore',
});

const models = {};

models.Sequelize = Sequelize;
models.sequelize = sequelize;

models.User = require('./user.model')(sequelize, Sequelize);

module.exports = models;
