var express = require('express');
var router = express.Router();

/* GET products listing. */
router.get('/', function(req, res, next) {
  // res.send('respond with a resource');
  //Lấy query parameters
  const queries = req.query;

  console.log('<<=== 🚀 queries ===>>',queries);
  console.log('<<=== 🚀 page ===>>',queries.page);

  const products = [
    {id: 1, name: 'iPhone 14 32GB', price: 300},
    {id: 2, name: 'iPhone 15 Pro Max', price: 600}
  ];
  res.status(200).json({products: products})
  // res.render('products', {  products: products });
});

router.get('/:id', function(req, res, next) {
  //nhận id từ route parameters
  const id = req.params.id;

  console.log('<<=== 🚀 id Product ===>>',id );

  res.status(201).json({id: id})

});


router.post('/', function(req, res, next) {
  // Nhận body từ request gửi lên
    const body = req.body;
    console.log('<<=== 🚀 body ===>>',body);
    //lưu vào database

    res.status(201).json({message: 'Add product successfully'})

});




module.exports = router;
