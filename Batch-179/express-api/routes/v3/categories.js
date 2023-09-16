var express = require('express');
var router = express.Router();
const {Category} = require('../../models');
var createError = require('http-errors');
// GET /users
//Hiểu ngầm định là res All Users
router.get('/', async function(req, res, next) {
  
    try {
        const categories = await Category.findAll();
        res.status(200).json({
          codeStatus: 200,
          data: categories
        });
      } catch (error) {
        next(error);
      }
});

//Danh sách các hàm truy vấn
//https://sequelize.org/docs/v6/core-concepts/model-querying-basics/#simple-update-queries
module.exports = router;


