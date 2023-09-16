const express = require("express");
const router = express.Router();
const Category = require("../models/categories.model");
var createError = require("http-errors");
const validateSchema = require("../middleware/validateSchema.middleware")
const categoriesSchema = require("../validations/categories.validation")
/* Get All Categorys */
router.get("/", validateSchema(categoriesSchema.getAll), async function (req, res, next) {
  try {
    const {page} = req.query;
    console.log('page',page);
    const categories = await Category.find();
    console.log(categories);
    res.json({ ok: "ok", categories });
  } catch (err) {
    //Chuyển tiếp lỗi ra cho app.js xử lý phần response báo lỗi về cho client
    next(err);
  }
 
});

/* Get  Category by ID */
router.get("/:id", validateSchema(categoriesSchema.getById), async function (req, res, next) {
  try {
    const { id } = req.params;
    console.log("<<=== 🚀 id ===>>", id);
    const employee = await Category.findById(id);
    console.log(employee);
    /* Kiểm tra có tồn tại reacord với id đó ko */
    if (!employee) {
      throw createError(404, "Category not found");
    }

    res.status(200).json({
      statusCode: 200,
      message: "Success",
      data: employee,
    });
  } catch (err) {
    //Chuyển tiếp lỗi ra cho app.js xử lý phần response báo lỗi về cho client
    next(err);
  }
});


/* Thêm mới POST /categories */
router.post("/", validateSchema(categoriesSchema.create), async function (req, res, next) {
  try {
    const payload = req.body;

    console.log("<<=== 🚀 payload ===>>", payload);

    const employee = await Category.create(payload);

    res.status(201).json({
      statusCode: 201,
      message: "Success",
      data: employee,
    });
  } catch (err) {
    //Chuyển tiếp lỗi ra cho app.js xử lý phần response báo lỗi về cho client
    next(err);
  }
});

/* Update 1 record by ID POST /categories/:id */
router.put("/:id", async function (req, res, next) {
  try {
    const payload = req.body;
    const { id } = req.params;

    console.log("<<=== 🚀 payload ===>>", payload);

    const employee = await Category.findByIdAndUpdate(id, req.body, {
      new: true, //Trả lại thông tin mới sau khi update
    });

    res.status(200).json({
      statusCode: 200,
      message: "Success",
      data: employee,
    });
  } catch (err) {
    //Chuyển tiếp lỗi ra cho app.js xử lý phần response báo lỗi về cho client
    next(err);
  }
});

/* Update 1 record by ID POST /categories/:id */
router.delete("/:id", async function (req, res, next) {
  try {
    const { id } = req.params;

    const employee = await Category.findByIdAndDelete(id, {
      new: true, //trả lại thông tin của record trước khi xóa
    });

    res.status(200).json({
      statusCode: 200,
      message: "Success",
      data: employee,
    });
  } catch (err) {
    //Chuyển tiếp lỗi ra cho app.js xử lý phần response báo lỗi về cho client
    next(err);
  }
});

module.exports = router;
