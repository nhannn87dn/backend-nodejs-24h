var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  // res.send('respond with a resource');

  const users = [
    {id: 1, name: 'Jonh', email: 'jonh@gmail.com'},
    {id: 2, name: 'David', email: 'david@gmail.com'}
  ];

  res.render('users', { name: 'Nhan', users: users });
});

module.exports = router;
