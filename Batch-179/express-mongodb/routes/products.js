const express = require("express");
const router = express.Router();
const Product = require("../models/products.model");
var createError = require("http-errors");

/* Get All Products */
router.get("/", async function (req, res, next) {
  try {
    const products = await Product.find().populate('category');
    console.log(products);
    res.json({ ok: "ok", products });
  } catch (err) {
    //Chuyển tiếp lỗi ra cho app.js xử lý phần response báo lỗi về cho client
    next(err);
  }
 
});

/* Get  Product by ID */
router.get("/:id", async function (req, res, next) {
  try {
    const { id } = req.params;
    console.log("<<=== 🚀 id ===>>", id);
    const employee = await Product.findById(id)
    .populate('category')
    .populate('supplier').lean({ virtuals: true });
    console.log(employee);
    /* Kiểm tra có tồn tại reacord với id đó ko */
    if (!employee) {
      throw createError(404, "Product not found");
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


/* Thêm mới POST /products */
router.post("/", async function (req, res, next) {
  try {
    const payload = req.body;

    console.log("<<=== 🚀 payload ===>>", payload);

    const employee = await Product.create(payload);

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

/* Update 1 record by ID POST /products/:id */
router.put("/:id", async function (req, res, next) {
  try {
    const payload = req.body;
    const { id } = req.params;

    console.log("<<=== 🚀 payload ===>>", payload);

    const employee = await Product.findByIdAndUpdate(id, req.body, {
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

/* Update 1 record by ID POST /products/:id */
router.delete("/:id", async function (req, res, next) {
  try {
    const { id } = req.params;

    const employee = await Product.findByIdAndDelete(id, {
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
