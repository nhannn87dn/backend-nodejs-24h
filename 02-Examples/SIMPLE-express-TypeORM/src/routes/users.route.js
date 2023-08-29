const express = require('express');
const createError = require('http-errors');
const router = express.Router();
const validateSchema = require('../middleware/validateSchema.middleware')
const userValidation = require('../validations/users.validation')
const {authenticateToken} = require('../middleware/auth.middleware')
const dataSource = require('../entities/index')
const userRepository = dataSource.getRepository("User")
// Get all users
// localhost:8686/api/v1/users
router.get('/', async (req, res,next) => {
  try {
    
    const users = await userRepository.find();
    
    res.status(200).json({
      codeStatus: 200,
      message: 'Success',
      data: users
    });
   
  } catch (err) {
    console.log(err);
    next(err);
  }

});


module.exports = router;