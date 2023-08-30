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
