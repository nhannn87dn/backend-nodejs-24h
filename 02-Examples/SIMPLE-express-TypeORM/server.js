require('dotenv').config();
const { createConnection } = require('typeorm');

const app = require('./src/app');

const { PORT } = process.env || 8686;


createConnection({
  type: 'mmsql',
  host: 'ten_may_chu',
  port: 3306,
  username: 'ten_nguoi_dung',
  password: 'mat_khau',
  database: 'ten_cSDL',
  entities: [User],
  synchronize: true,
})
  .then(() => {
    console.log('Kết nối cơ sở dữ liệu thành công');
  })
  .catch((error) => {
    console.log('Lỗi kết nối cơ sở dữ liệu:', error);
  });

  //should listen app here
const server = app.listen(PORT, () => {
  console.log(`WSV start with port ${PORT} - Link: localhost:8686/api`);
});