require('dotenv').config();
const typeorm = require("typeorm")

const dataSource = new typeorm.DataSource({
    type: "mssql",
    host: "NHAN2",
    port: 1433,
    username: "nhan",
    password: "123456789",
    database: "myStore",
    synchronize: true,
    entities: [require("./User")]
});

module.exports = dataSource 

