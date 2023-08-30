# Session 6

Trong bài học này chúng ta tìm hiểu cách kết nối SQL Server với NodeJS

Qua 2 hình thức: Thuần và ORM

## Connect to SQLServer

Doc: <https://github.com/tediousjs/node-mssql>
### Cài đặt

Thư viện SQL Server cho NodeJS

```bash
yarn add mssql
```

### Setup kết nối

Trong folder config tạo file dbPool.js tạo kết nối và tái sử dụng kết nối rãnh

```js
const sql = require('mssql');

// Cấu hình kết nối
const dbConfig = {
  user: 'nhan',
  password: '123456789',
  server: 'NHAN2', // Thay thế bằng địa chỉ server của bạn
  database: 'myStore',
  options: {
    encrypt: false, // Tùy chọn bảo mật (tuỳ theo cấu hình của SQL Server)
  },
  pool: {
    max: 10, // Số lượng kết nối tối đa trong pool
    min: 0, // Số lượng kết nối tối thiểu trong pool
    idleTimeoutMillis: 30000, // Thời gian tối đa để kết nối trong pool ở trạng thái chờ
  },
};

// Tạo global pool
const pool = new sql.ConnectionPool(dbConfig);
const poolConnect = pool.connect();

// Xử lý lỗi kết nối
poolConnect.catch(err => {
  console.error('Error connecting to SQL Server:', err);
});

// Đảm bảo rằng pool đã kết nối trước khi xuất module
poolConnect.then(() => {
  console.log('Connected to SQL Server');
}).catch(err => {
  console.error('Error connecting to SQL Server:', err);
});

module.exports = {
    pool,
    sql
};

```

### Sử dụng kết nối

Trong các routes bạn dùng nó như sau:

```js
const {pool,sql} = require('../configs/dbPool');

// Get all users
// localhost:8686/api/v1/users
router.get('/users', async (req, res,next) => {
  try {
    /**
     * Sử dụng cú pháp SQL server thuần tùy ở đây
     */
    const result = await pool.request().query('SELECT * FROM employees');
    
    res.status(200).json({
      codeStatus: 200,
      message: 'Success',
      data: result.recordset
    });
    
  } catch (err) {
    next(err);
  }

});
```
###  Data Types

Xem: https://github.com/tediousjs/node-mssql#data-types

## Connect to SQLServer Using ORM Tools

### ORM là gì ?

ORM viết tắt của "Object-Relational Mapping", là một mô hình lập trình được sử dụng để ánh xạ dữ liệu giữa hệ quản trị cơ sở dữ liệu (Relational Database Management System - RDBMS) và các đối tượng trong các ngôn ngữ lập trình hướng đối tượng (như Java, Python, C#, TypeScript, và nhiều ngôn ngữ khác). Mục tiêu chính của ORM là giúp đơn giản hóa việc làm việc với cơ sở dữ liệu bằng cách biến đổi dữ liệu được lưu trữ trong các bảng cơ sở dữ liệu thành các đối tượng có thể được truy cập và quản lý bằng mã lập trình.

Trong bài học này chúng ta làm quen với [Sequelize](https://sequelize.org/docs/v6/getting-started/)


### Step 1: install

Doc: https://sequelize.org/docs/v6/getting-started/#installing

```bash
npm install --save sequelize
yarn add sequelize
```

Cài đặt Drivers cho loại DATABASE

```bash
npm install --save tedious # Microsoft SQL Server
yarn add tedious # Microsoft SQL Server
```

### Step 2: Tạo Models

Tạo một tệp user.model.js (hoặc user.model.ts nếu bạn đang sử dụng TypeScript) để định nghĩa User Entity (Model):

```js
const { DataTypes } = require('sequelize');
/**
 * Data Types
 * https://sequelize.org/docs/v6/core-concepts/model-basics/#data-types
 * 
 */
module.exports = (sequelize) => {
  const User = sequelize.define('User', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      firstName: {
        type: DataTypes.STRING(20),
        allowNull: false,
      },
      lastName: {
        type: DataTypes.STRING(20),
        allowNull: false,
      },
      numberPhone: {
        type: DataTypes.STRING(120),
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      address: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      birthday: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      password: {
        type: DataTypes.STRING(255),
        allowNull: false,
      }
    },
    {
      //tableName: 'Users', //Nếu không khai báo thì tên table = tên Model (thêm s số nhiều)
      timestamps: true, //https://sequelize.org/docs/v6/core-concepts/model-basics/#timestamps
    }
  );

  return User;
};

```

Xem thêm tài liệu:

- https://sequelize.org/docs/v6/core-concepts/model-basics/

- https://sequelize.org/docs/v6/core-concepts/model-basics/#data-types


### Kết nối với SQL Server

Trong folder src/models tạo file index.js

```js
const { Sequelize } = require('sequelize');
//Import thông tin cấu hình database server
const dbConfig = require('../configs/db')
const sequelize = new Sequelize(dbConfig);

const models = {};

models.Sequelize = Sequelize;
models.sequelize = sequelize;

//Kết nối các Models (Bảng) tại đây
models.User = require('./user.model')(sequelize, Sequelize);
//... thêm vào sau

module.exports = models;

```

file db.js

Bạn cần chuẩn bị một account xác thực SQL Authentication

```js
const dbConfig = {
    dialect: 'mssql',
    host: 'NHAN2',
    port: 1433,
    username: 'nhan',
    password: '123456789',
    database: 'myStore',
    dialectOptions: {
        options: {
          encrypt: false, 
        },
    },
}

module.exports = dbConfig;
```

file server.js sửa lại như sau

```js
require('dotenv').config();
const app = require("./src/app");
const PORT = process.env.PORT || 9000;
const models = require('./src/models');


/**
 * Tạo hàm kiểm tra db kết nối thành công chưa
 * Kết nối Database server OK --> start server express
 */
const initApp = async () => {
  console.log("Testing the database connection..");

  try {
     //test kết nối
     await models.sequelize.authenticate();
     console.log("Connection has been established successfully.");

     
    // Đồng bộ hóa cơ sở dữ liệu và khởi tạo các bảng nếu chưa tồn tại
    /**
     * sync() , tạo mới nếu chưa, còn rồi thì thôi
     * sync({ force: true }), xóa cũ tạo mới lại
     * sync({ alter: true }), check và đồng bộ thay đổi
     */
    models.sequelize.sync({ alter: true }).then(() => {
      console.log('Database synced');
    }).catch((error) => {
      console.error('Error syncing database:', error);
    });

    //Khởi tạo server Express
    app.listen(PORT, () => {
      console.log(`Server is running at: http://localhost:${PORT}`);
    });

    
  } catch (error) {
     console.error("Unable to connect to the database:", error.original);
  }
};

initApp();

```

Sau khi tạo xong, bạn thử chạy server lên

```bash
yarn dev
```

Check xem trong Database server có được đồng bộ không, nếu chưa tạo tables thì sẽ được tạo mới.



## Deployment