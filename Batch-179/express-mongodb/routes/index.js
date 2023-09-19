var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
  //Đăng ký một session từ route này
  //Bạn có thể dùng nó ở route khác
  req.session.views = 1;
  req.session.email = 'nhan@gmail.com';
  req.session.id = '12121212'

  res.json({version: '1.0'})
});


router.get('/getsession', function(req, res, next) {
  //Nhận lại session từ route này
  console.log(req.session.views,req.session.email, req.session.id);
  
  res.json({page: 'getsession'})
});

module.exports = router;
