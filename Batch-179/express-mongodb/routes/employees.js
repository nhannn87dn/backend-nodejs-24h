const express = require("express");
const router = express.Router();
const Employee = require("../models/employees.model");
var createError = require("http-errors");
const {authenticateToken} =  require('../middleware/auth.middleware');

/* Get All Employees */
router.get("/", async function (req, res, next) {
  try {
    const employees = await Employee.find();
    console.log(employees);
    res.json({ ok: "ok", employees });
  } catch (err) {
    //Chuyển tiếp lỗi ra cho app.js xử lý phần response báo lỗi về cho client
    next(err);
  }

  
});

/* Get  Employee by ID */
router.get("/:id", authenticateToken, async function (req, res, next) {
  // console.log("authorization",req.headers['authorization']);
  try {
    const { id } = req.params;
    console.log("<<=== 🚀 id ===>>", id);
    const employee = await Employee.findById(id);
    console.log(employee);
    /* Kiểm tra có tồn tại reacord với id đó ko */
    if (!employee) {
      throw createError(404, "Employee not found");
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

/* Tìm Employee có number phone */
router.get("/phone/:number", async function (req, res, next) {
  try {
    const { number } = req.params;
    console.log("<<=== 🚀 number ===>>", number);
    //Vi dụ: tim where phoneNumber = 123456789
    const employee = await Employee.findOne({ phoneNumbers: number });
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

/* Thêm mới POST /employees */
router.post("/", async function (req, res, next) {
  try {
    const payload = req.body;

    console.log("<<=== 🚀 payload ===>>", payload);

    const employee = await Employee.create(payload);

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

/* Update 1 record by ID POST /employees/:id */
router.put("/:id", async function (req, res, next) {
  try {
    const payload = req.body;
    const { id } = req.params;

    console.log("<<=== 🚀 payload ===>>", payload);

    const employee = await Employee.findByIdAndUpdate(id, req.body, {
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

/* Update 1 record by ID POST /employees/:id */
router.delete("/:id", async function (req, res, next) {
  try {
    const { id } = req.params;

    const employee = await Employee.findByIdAndDelete(id, {
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
