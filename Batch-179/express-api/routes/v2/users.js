var express = require('express');
var router = express.Router();

const {pool,sql} = require('../../db');

// GET /users
//Hiểu ngầm định là res All Users
router.get('/', async function(req, res, next) {
  
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

router.post('/', async function(req, res, next) {
  
  try {

    const { firstName, lastName, email, numberPhone, birthday, address } = req.body;

    const result = await pool
      .request()
      .input('firstName', sql.NVarChar, firstName)
      .input('lastName', sql.NVarChar, lastName)
      .input('email', sql.NVarChar, email)
      .input('numberPhone', sql.NVarChar, numberPhone)
      .input('birthday', sql.NVarChar, birthday)
      .input('address', sql.NVarChar, address)
      .query('INSERT INTO employees (firstName, lastName, email, numberPhone, birthday, address) VALUES (@firstName, @lastName, @email, @numberPhone, @birthday, @address)');
    
    res.status(200).json({
      codeStatus: 200,
      message: 'Success',
      data: result.rowsAffected[0]
    });
    
  } catch (err) {
    next(err);
  }
});

module.exports = router;


