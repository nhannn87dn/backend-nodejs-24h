var express = require('express');
var router = express.Router();
const {findDocuments} = require('../helpers/MongoDbHelper')

/* GET home page. */
router.get('/', async function(req, res, next) {
  try {
    let query = {};
    const results = await findDocuments({ query }, 'users');
    res.json({ ok: true, results });
  } catch (error) {
    next(error)
  }

});

module.exports = router;
