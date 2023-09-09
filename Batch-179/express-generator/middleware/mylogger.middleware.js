//Tạo và export luôn
module.exports = function (req, res, next) {
    console.log('1');
    // //Logic Here
    // console.log('LOGGED', req);
  
    // //Có thể gắn Thêm vào request một biến
    // req.aptech = { name: 'Softech', add: '38 yen bai' };
  
    //End with next() -> chuyển tiếp sang middleware khác nếu có
    next();
  };