const jwt = require('jsonwebtoken');
const {JWT_SECRET} =  process.env;
const createError = require('http-errors');
const sql = require('mssql');
const dbConfig = require('../data/db');

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
      const decoded = jwt.verify(token, JWT_SECRET);
      console.log(decoded);

      //Kiểm tra xem có tồn tại user với userId lấy được từ token không
      //Để tránh token giả mạo
      const pool = await sql.connect(dbConfig);
      const result = await pool
        .request()
        .input('id', sql.Int, decoded._id)
        .query('SELECT * FROM employees WHERE id = @id');
  
      if (result.recordset.length === 0) {
        return next(createError(401, 'Unauthorized'));
      }

      req.user = result.recordset;

      next();
    } catch (err) {
      console.log(err)
      return next(createError(403, 'Forbidden'));
    }
};

const authorize = (roles = []) => {
    // roles param can be a single role string (e.g. Role.User or 'User') 
    // or an array of roles (e.g. [Role.Admin, Role.User] or ['Admin', 'User'])
    if (typeof roles === 'string') {
        roles = [roles];
    }

    return (req, res, next) => {
        if (roles.length && !roles.includes(req.user.role)) {
            return next(createError(403, 'Forbidden'));
        }
        // authentication and authorization successful
        next();
    }
}

module.exports = {
    authorize,
    authenticateToken,
};