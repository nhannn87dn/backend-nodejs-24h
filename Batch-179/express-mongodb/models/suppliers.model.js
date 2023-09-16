const mongoose = require("mongoose");
const { Schema } = mongoose;

//Tạo Schema
const supplierSchema = new Schema(
  {
    name: {
      type: String,
      require: true,
      unique: true,
    },
    email: {
      type: String,
      require: true,
      unique: true,
    },
    phoneNumber: String,
    address: String,
  },
  { timestamps: true }
);

const Supplier = new mongoose.model("Supplier", supplierSchema);
module.exports = Supplier;
