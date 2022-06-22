const  mongoose = require("mongoose");
const VendorSchema = mongoose.Schema({
    vendor_name:{
        type : String,
        required:true,
    },
    vendor_email:{
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        required: 'Email address is required',
       // validate: [validateEmail, 'Please fill a valid email address'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    vendor_mobile:{
        type:String,
        trim:true,
        unique:true,
        required:'Mobile No. is required',
        min: 10,
        max: 12
    },
    vendor_address:{
        type:String,
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

const Vendor = mongoose.model('Vendor', VendorSchema );
module.exports = Vendor;

