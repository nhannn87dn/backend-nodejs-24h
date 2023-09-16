const dbConfig = {
    dialect: 'mssql',
    host: 'NHAN2',
    port: 1433,
    username: 'nhan',
    password: '123456789',
    database: 'myStore', //Bạn phải tạo Database trước
    dialectOptions: {
        options: {
          encrypt: false, 
        },
    },
}

module.exports = dbConfig;