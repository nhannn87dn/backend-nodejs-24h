const mongoose = require('mongoose');
const { Schema } = mongoose;

//Tạo Schema
const categoriesSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true,
            minLength: 4,
            maxLength: [50, 'Chỉ chó phép 50 kí tự']
        },
        description: {
            type: String,
            maxLength: 500
        }
    },
    { timestamps: true }
);

const Category = new mongoose.model('Category', categoriesSchema);
module.exports = Category;