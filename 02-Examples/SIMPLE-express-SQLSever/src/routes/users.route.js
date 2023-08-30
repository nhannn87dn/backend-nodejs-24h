const express = require('express');
const createError = require('http-errors');
const router = express.Router();
const validateSchema = require('../middleware/validateSchema.middleware')
const userValidation = require('../validations/users.validation')
const {authenticateToken} = require('../middleware/auth.middleware')
const {pool,sql} = require('../configs/dbPool');
//const sql = require('mssql');
// Get all users
// localhost:8686/api/v1/users
router.get('/users', async (req, res,next) => {
  try {
    //const pool = await sql.connect(dbConfig);
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

// Create a new user
// localhost:8686/api/v1/users
router.post('/users', authenticateToken, async (req, res, next) => {
  console.log('Create a new user');
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

// Get a user by ID
// localhost:8686/api/v1/users/1
router.get('/users/:id', validateSchema(userValidation.getUserById), async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await pool
      .request()
      .input('id', sql.Int, id)
      .query('SELECT * FROM employees WHERE id = @id');

    if (result.recordset.length === 0) {
      throw createError(404, 'User not found');
    }

    res.status(200).json({
      codeStatus: 200,
      message: 'Success',
      data: result.recordset[0]
    });
    
  } catch (err) {
    next(err);
  }
});

// Update a user
// localhost:8686/api/v1/users/1
router.put('/users/:id', authenticateToken, async (req, res, next) => {
  try {
    const { id } = req.params;
    const { firstName, lastName, email, numberPhone, birthday, address } = req.body;
    const request = pool.request();
    let updateQuery = 'UPDATE employees SET';

    if (firstName) {
      request.input('firstName', sql.NVarChar, firstName);
      updateQuery += ' firstName = @firstName,';
    }

    if (lastName) {
      request.input('lastName', sql.NVarChar, lastName);
      updateQuery += ' lastName = @lastName,';
    }

    if (email) {
      request.input('email', sql.NVarChar, email);
      updateQuery += ' email = @email,';
    }

    if (numberPhone) {
      request.input('numberPhone', sql.NVarChar, numberPhone);
      updateQuery += ' numberPhone = @numberPhone,';
    }

    if (birthday) {
      request.input('birthday', sql.NVarChar, birthday);
      updateQuery += ' birthday = @birthday,';
    }

    if (address) {
      request.input('address', sql.NVarChar, address);
      updateQuery += ' address = @address,';
    }

    updateQuery = updateQuery.slice(0, -1); // Loại bỏ dấu ',' cuối cùng
    updateQuery += ' WHERE id = @id';

    request.input('id', sql.Int, id);
    const result = await request.query(updateQuery);
    
    res.status(200).json({
      codeStatus: 200,
      message: 'Success',
      data: result.rowsAffected[0]
    });
    
  } catch (err) {
    next(err);
  }
});

// Delete a user
// localhost:8686/api/v1/users/1
router.delete('/users', authenticateToken, async (req, res, next) => {
  try {
    const { id } = req.body;
    const result = await pool
      .request()
      .input('id', sql.Int, id)
      .query('DELETE FROM employees WHERE id = @id');
    
    if (result.rowsAffected[0] === 0) {
      throw createError(404, `Employees not found with ID ${id}`);
    }

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