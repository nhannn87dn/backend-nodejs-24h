const { Sequelize } = require('sequelize');
//Import thông tin cấu hình database server
const dbConfig = require('../configs/db')
const sequelize = new Sequelize(dbConfig);

const models = {};

models.Sequelize = Sequelize;
models.sequelize = sequelize;

//Kết nối các Models (Bảng) tại đây
models.User = require('./users.model')(sequelize, Sequelize);
models.Category = require('./categories.model')(sequelize, Sequelize);
//... thêm vào sau

module.exports = models;
