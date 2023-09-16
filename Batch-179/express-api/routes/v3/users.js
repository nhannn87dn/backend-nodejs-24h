var express = require('express');
var router = express.Router();
const {User} = require('../../models');
var createError = require('http-errors');
// GET /users
//Hiểu ngầm định là res All Users
router.get('/', async function(req, res, next) {
  
    try {
        const users = await User.findAll();
        res.status(200).json({
          codeStatus: 200,
          data: users
        });
      } catch (error) {
        next(error);
      }
});

// Lấy danh sách users by ID
router.get('/:id',  async (req, res,next) => {
    try {
      const {id} = req.params;
      const user = await User.findByPk(id);
      if (!user) {
        throw createError(404, 'User not found');
      }
      res.status(200).json({
        codeStatus: 200,
        data: user
      });
    } catch (error) {
      next(error);
    }
  });
//Danh sách các hàm truy vấn
//https://sequelize.org/docs/v6/core-concepts/model-querying-basics/#simple-update-queries
module.exports = router;


