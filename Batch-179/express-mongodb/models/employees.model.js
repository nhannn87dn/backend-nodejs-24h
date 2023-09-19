const mongoose = require('mongoose');
const { Schema } = mongoose;
const bcrypt = require('bcrypt');
const SALT_WORK_FACTOR = 10;

//Tạo Schema
const employeeSchema = new Schema(
    {
     firstName: String,
     lastName: String,
     email: String,
     phoneNumber: String,
     address: String,
     birthday: Date,
     password: String
    },
    { timestamps: true }
);



employeeSchema.pre('save', function (next) {
    var user = this;
  
    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();
  
    // generate a salt
    bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
      if (err) return next(err);
      // hash the password using our new salt
      bcrypt.hash(user.password, salt, function (err, hash) {
        if (err) return next(err);
        // override the cleartext password with the hashed one
        user.password = hash;
        next();
      });
    });
  });
  
employeeSchema.methods.comparePassword = function (req_password) {
    return bcrypt.compare(req_password, this.password);
};

const Employee = new mongoose.model('Employee', employeeSchema);
module.exports = Employee;