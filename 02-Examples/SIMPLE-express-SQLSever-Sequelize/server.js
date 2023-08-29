require('dotenv').config();
const app = require("./src/app");
const PORT = process.env.PORT || 9000;
const models = require('./src/models');


// Đồng bộ hóa cơ sở dữ liệu và khởi tạo các bảng nếu chưa tồn tại
models.sequelize.sync().then(() => {
  console.log('Database synced');
}).catch((error) => {
  console.error('Error syncing database:', error);
});


app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
