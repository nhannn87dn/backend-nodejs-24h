const express = require('express');
const createError = require('http-errors');
const router = express.Router();
const validateSchema = require('../middleware/validateSchema.middleware')
const userValidation = require('../validations/users.validation')
const {authenticateToken} = require('../middleware/auth.middleware')
const { getRepository } = require('typeorm');
const User = require('../models/user.model');
const userRepository = getRepository(User);

// Get all users
// localhost:8686/api/v1/users
router.get('/users', async (req, res) => {
  try {
    const users = await userRepository.find();
    
    res.status(200).json({
      codeStatus: 200,
      message: 'Success',
      data: users
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

    const user = userRepository.create(req.body);
    const results = await userRepository.save(user);

    res.status(200).json({
      codeStatus: 200,
      message: 'Success',
      data: results
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
    const user = await userRepository.findOne(id);

    if (!user) {
      throw createError(404, 'User not found');
    }

    res.status(200).json({
      codeStatus: 200,
      message: 'Success',
      data: user
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
    const user = await userRepository.findOne(id);

    if (!user) {
      throw createError(404, 'User not found');
    }

    userRepository.merge(user, req.body);
    const results = await userRepository.save(user);
    
    res.status(200).json({
      codeStatus: 200,
      message: 'Success',
      data: results
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

    const result = await userRepository.delete(id);

    res.status(200).json({
      codeStatus: 200,
      message: 'Success',
      data: result.affected
    });
    
  } catch (err) {
    next(err);
  }
});

module.exports = router;