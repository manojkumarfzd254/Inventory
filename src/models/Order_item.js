const  mongoose = require("mongoose");
const Order_itemSchema = mongoose.Schema({
    order_id:{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Order',
        required : true,
    },
    product_id:{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Product',
        required : true,
    },
    qty:{
        type : String,
        required:true
    },
    rate:{
        type : String,
        required:true,
    },
    amount:{
        type : String,
        required:true,
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

const Order_item = mongoose.model('Order_item', Order_itemSchema );
module.exports = Order_item;

