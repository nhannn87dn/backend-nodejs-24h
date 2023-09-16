const express = require("express");
const router = express.Router();
const Supplier = require("../models/suppliers.model");
var createError = require("http-errors");

/* Get All Suppliers */
router.get("/", async function (req, res, next) {
  try {
    const suppliers = await Supplier.find();
    console.log(suppliers);
    res.json({ ok: "ok", suppliers });
  } catch (err) {
    //Chuyển tiếp lỗi ra cho app.js xử lý phần response báo lỗi về cho client
    next(err);
  }

  
});

/* Get  Supplier by ID */
router.get("/:id", async function (req, res, next) {
  try {
    const { id } = req.params;
    console.log("<<=== 🚀 id ===>>", id);
    const employee = await Supplier.findById(id);
    console.log(employee);
    /* Kiểm tra có tồn tại reacord với id đó ko */
    if (!employee) {
      throw createError(404, "Supplier not found");
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

/* Tìm Supplier có number phone */
router.get("/phone/:number", async function (req, res, next) {
  try {
    const { number } = req.params;
    console.log("<<=== 🚀 number ===>>", number);
    //Vi dụ: tim where phoneNumber = 123456789
    const employee = await Supplier.findOne({ phoneNumbers: number });
    console.log(employee);

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

/* Thêm mới POST /suppliers */
router.post("/", async function (req, res, next) {
  try {
    const payload = req.body;

    console.log("<<=== 🚀 payload ===>>", payload);

    const employee = await Supplier.create(payload);

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

/* Update 1 record by ID POST /suppliers/:id */
router.put("/:id", async function (req, res, next) {
  try {
    const payload = req.body;
    const { id } = req.params;

    console.log("<<=== 🚀 payload ===>>", payload);

    const employee = await Supplier.findByIdAndUpdate(id, req.body, {
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

/* Update 1 record by ID POST /suppliers/:id */
router.delete("/:id", async function (req, res, next) {
  try {
    const { id } = req.params;

    const employee = await Supplier.findByIdAndDelete(id, {
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
