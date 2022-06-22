const  mongoose = require("mongoose");
const Stock_manage_Schema = mongoose.Schema({
    
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

const Stock_manage = mongoose.model('Stock_manage', Stock_manage_Schema );
module.exports = Stock_manage;

