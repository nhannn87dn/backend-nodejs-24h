var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {

  console.log('2');
  res.render('index', { title: 'Express.JS', schoolName: 'Aptech' });
});

module.exports = router;
