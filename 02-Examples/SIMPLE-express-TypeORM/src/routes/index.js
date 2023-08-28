const express = require('express');
const router = express.Router();

const users = [
  { id: 1, name: 'Jonh', email: 'jonh@gmail.com' },
  { id: 2, name: 'Dara', email: 'dara@gmail.com' },
  { id: 3, name: 'Tim', email: 'tim@gmail.com' },
];

//Response version API
router.get('/', async (req, res) => {
  res.status(200).json({ version: '1.0' });
});

// Get all users
router.get('/users', async (req, res) => {
  res.status(200).json(users);
});

module.exports = router;