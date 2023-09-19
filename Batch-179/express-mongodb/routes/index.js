var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
  req.session.views = 1;

  res.json({version: '1.0'})
});


router.get('/getsession', function(req, res, next) {
  console.log(req.session.views);
  
  res.json({page: 'getsession'})
});

module.exports = router;
