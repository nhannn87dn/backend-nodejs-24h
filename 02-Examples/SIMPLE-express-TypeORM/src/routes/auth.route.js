const express = require('express');
const createError = require('http-errors');
const router = express.Router();
const validateSchema = require('../middleware/validateSchema.middleware')
const authValidation = require('../validations/auth.validation')
const jwt = require('jsonwebtoken');
const {JWT_SECRET} =  process.env;
const sql = require('mssql');
const dbConfig = require('../data/db');

//http://localhost:8686/api/v1/auth/login
router.post('/login', validateSchema(authValidation), async (req, res,next) => {
  console.log(req.body);
  const { email, password } = req.body;
  //Tìm xem có tồn tại user có email không
  const pool = await sql.connect(dbConfig);
  const result = await pool
      .request()
      .input('email', sql.NVarChar, email)
      .query('SELECT * FROM employees WHERE email = @email');

  if (result.recordset.length === 0) {
    throw createError(400, 'Invalid email or password');
  }

  const user = result.recordset[0];


   // So tiếp mật khẩu có đúng không
  if (user.password !== password) {
    throw createError(400, 'Invalid email or password');
  }

   //Tồn tại thì trả lại thông tin user kèm token
  const token = jwt.sign(
    { _id: user.id, email: user.email },
    JWT_SECRET
    );

  res.status(200).json({
        user: { id: user.id, email: user.email },
        token
  });
 

})
  
module.exports = router;