const  mongoose = require("mongoose");

const OrderSchema = mongoose.Schema({
    
    bill_no:{
        type : String,
        required:true,
    },
    vendor_id:{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Vendor',
        required : true,
    },
    gross_amount:{
        type:String,
        required:true
    },
    service_charge_rate:{
        type : String,
        required:true
    },
    service_charge:{
        type : String,
        required:true
    },
    vat_charge_rate:{
        type : String,
        required:true
    },
    vat_charge:{
        type : String,
        required:true
    },
    net_amount:{
        type : String,
        required:true
    },
    discount:{
        type :String
    },
    paid_status:{
        type:String,
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

const Order = mongoose.model('Order', OrderSchema );
module.exports = Order;

