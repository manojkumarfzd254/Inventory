const  mongoose = require("mongoose");
const ProductSchema = mongoose.Schema({
    type_id : {
        type : mongoose.Schema.Types.ObjectId,
        required : true,
        ref : "Type"
    },
    sub_type_id:{
        type : mongoose.Schema.Types.ObjectId,
        required : true,
        ref : "Sub_Type"
    },
    serial_no:{
            type : String,
            required:true
    },
    product_name :{
        type : String,
        required:true
    },
    rate :{
        type:Number,
        required:true
    },
    admin_id : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Admin',
        required : true,
    },
    created_on : {
        type:Date,
        default:Date.now(),
    }
});

const Product = mongoose.model('Product', ProductSchema );
module.exports = Product;

