const mongoose = require('mongoose');
const { Schema } = mongoose;
// const mongooseLeanVirtuals = require('mongoose-lean-virtuals');


//Tạo Schema
const productSchema = new Schema(
    {
    name: {
        type: String,
        required: true,
        unique: true,
        minLength: 4,
        maxLength: [50, 'Chỉ chó phép 50 kí tự']
    },
    price: {
        type: Number,
        min: 0,
        required: true,
        default: 0
    },
    discount: {
        type: Number,
        min: 0,
        max: 90,
        default: 0
    },
    stock: {
        type: Number,
        min: 0,
        default: 1
    },
    description: {
        type: String,
        maxLength: 500
    },
    thumbnail: {
        type: String
    },
    
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true,
    },
    supplierId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Supplier',
        required: true,
    },
    },
    //Tự động sinh ra 2 trường createAt, updateAt
    { timestamps: true }
);
// productSchema.plugin(mongooseLeanVirtuals);
// Virtual with Populate
productSchema.virtual('supplier', {
    ref: 'Supplier',
    localField: 'supplierId',
    foreignField: '_id',
    justOne: true,
  });

productSchema.set('toJSON', { virtuals: true });
productSchema.set('toObject', { virtuals: true });

const Product = new mongoose.model('Product', productSchema);
module.exports = Product;

/*
Nếu đặt tên trường là categoryID
thì thiết lập quan hệ giữa các collection theo link sau
https://documents.aptech.io/docs/aptech-mern/nodejs/session-04#virtuals-with-populate
*/
