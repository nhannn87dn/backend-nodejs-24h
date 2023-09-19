const express = require('express');
const createError = require('http-errors');
const router = express.Router();
const Employee = require('../models/employees.model');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const validateSchema = require("../middleware/validateSchema.middleware")
const authSchema = require("../validations/auth.validation")

/* Tính năng đăng nhập */
//localhost:9000/auth/login
router.post('/login', validateSchema(authSchema.authLogin), async (req, res,next) => {
    try{
        console.log(req.body);
    //Tìm xem trong DB có tồn tại email không ?
    const user = await Employee.findOne({email: req.body.email});
    // Check nếu không tìm thấy thì trả lại lỗi cho client
    if (!user) {
        throw createError(400, 'Invalid email or password');
    }
   
    //Nếu tìm thấy user có email này trong hệ thống
    // thì đi đối chiếu tiếp password
    // if(user.password !== req.body.password){
    //     throw createError(400, 'Invalid email or password');
    // }

    const invalidPasword = await user.comparePassword(req.body.password);
    if (!invalidPasword) throw new createError(401, 'Invalid email or password');

   

    //Kiểm tra Thành công
    //trả về thông tin cho client ==> token
    const token = jwt.sign(
            { id: user._id, email: user.email },
            process.env.JWT_SECURE_KEY,
            { expiresIn: "14d" } //thời gian hết hiệu lực token
        );

    const freshToken = jwt.sign(
        { id: user._id, email: user.email },
        process.env.JWT_SECURE_KEY,
        { expiresIn: "30d" } //thời gian hết hiệu lực token
    );

    
        //Trả lại token cho client sau khi login thành công
        res.status(200).json({
            token,
            freshToken
        })
    }
    catch(err){
        next(err)
    }
  
})
  
module.exports = router;