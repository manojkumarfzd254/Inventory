const  mongoose = require("mongoose");
const SubtypeSchema = mongoose.Schema({
    type_id : {
        type : mongoose.Schema.Types.ObjectId,
        required : true,
        ref : "Type"
    },
    admin_id : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Admin',
        required : true,
    },
    sub_type_name :{
        type : String,
        required :true
    },
    created_on : {
        type:Date,
        default:Date.now(),
    }
});

const Sub_Type = mongoose.model('Sub_Type', SubtypeSchema );
module.exports = Sub_Type;

