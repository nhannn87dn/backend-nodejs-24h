var express = require('express');
var router = express.Router();
let users = require('../../data/users.json');
const fs = require('fs');

/* GET users listing. */
const fileName = "./data/users.json"
// GET /users
//Hiểu ngầm định là res All Users
router.get('/', function(req, res, next) {
  
  res.json(users);
});
// GET /users/:id 
//Hiểu là tìm/lấy 1 user có id 
router.get('/:id', function(req, res, next) {
  const id = req.params.id;
  const user = users.find(user => user.id == id)

  res.json(user);
});

// POST localhost:3000/users
//Thêm mới 1 user
router.post('/', function(req, res, next) {
  //nhận được data từ client gửi lên qua Body
  console.log("body",req.body);
  users.push(req.body);
  //Lưu vào nơi mình muốn
  fs.writeFile(fileName, JSON.stringify(users), function (err) {
    if (err) throw err;
    console.log('Saved!');
  });

  res.json(users);
});

// PUT localhost:3000/users
//Sửa/cập nhật một 1 user dựa vào id của nó
router.put('/:id', function(req, res, next) {
  // const id = req.params.id;
  const {id} = req.params;
  //nhận được data từ client gửi lên qua Body
  console.log("body",req.body);
  
  /**
     * Lặp qua mảng, tìm user có id để update
     * trả lại mảng mới sau khi update
     */
  const newUsers = users.map((user) => {
    if (user.id === parseInt(id)) {
      if (req.body.email) user.email = req.body.email;
      if (req.body.name) user.name = req.body.name;
    }
    return user;
  });


  //Lưu vào nơi mình muốn
  fs.writeFile(fileName, JSON.stringify(newUsers), function (err) {
    if (err) throw err;
    console.log('Saved!');
  });

  res.json(newUsers);
});


// DELETE localhost:3000/users
//Xóa một 1 user dựa vào id của nó
router.delete('/:id', function(req, res, next) {
  const {id} = req.params;
  /**
     * Lặp qua mảng, tìm user có id để update
     * trả lại mảng mới sau khi update
     */
  const newUsers = users.filter((user) => user.id !== parseInt(id));

  
  //Lưu vào nơi mình muốn
  fs.writeFile(fileName, JSON.stringify(newUsers), function (err) {
    if (err) throw err;
    console.log('Saved!');
  });

  res.json(newUsers);

})

module.exports = router;


