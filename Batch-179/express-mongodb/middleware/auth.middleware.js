const jwt = require('jsonwebtoken');
require('dotenv').config();
const createError = require('http-errors');
const Employee = require('../models/employees.model');
const {JWT_SECURE_KEY} =  process.env;

const authenticateToken = async (req, res, next) => {
    //Lấy thông tin authorization từ trong header request ra
    const authHeader = req.headers['authorization'];
     //trích xuất token từ trong chuỗi authorization vừa lấy được
    const token = authHeader && authHeader.split(' ')[1];

    //Kiểm tra token có tồn tại không
    if (!token) {
      return next(createError(401, 'Unauthorized'));
    }

    //Nếu token tồn tại thì kiểm tra tính hợp lệ
    try {
      //Giải mã token để lấy thông tin
      const decoded = jwt.verify(token, JWT_SECURE_KEY);
      console.log(decoded);

      //Kiểm tra xem có tồn tại user với userId lấy được từ token không
      //Để tránh token giả mạo
      const user =  await Employee.findById(decoded.id)
     
      if (!user) {
        return next(createError(401, 'Unauthorized'));
      }

      req.user = user;
      next();
    } catch (err) {
      return next(createError(403, 'Forbidden'));
    }
};

module.exports = {
    authenticateToken
};