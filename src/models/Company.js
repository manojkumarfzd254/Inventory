const  mongoose = require("mongoose");
const companySchema = mongoose.Schema({
    company_name : {
        type : String
    },
    service_charge_value:{
        type : Number,
    },
    vat_charge_value:{type:Number},
    address:{type:String},
    phone:{type:String},
    message:{type :String},
    currency:{tyep:String},
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

const Company = mongoose.model('Company', companySchema );
module.exports = Company;

