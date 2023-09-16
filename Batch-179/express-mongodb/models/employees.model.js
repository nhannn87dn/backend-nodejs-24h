const mongoose = require('mongoose');
const { Schema } = mongoose;

//Tạo Schema
const employeeSchema = new Schema(
    {
     firstName: String,
     lastName: String,
     email: String,
     phoneNumber: String,
     address: String,
     birthday: Date
    },
    { timestamps: true }
);

const Employee = new mongoose.model('Employee', employeeSchema);
module.exports = Employee;