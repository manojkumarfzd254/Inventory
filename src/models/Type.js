const  mongoose = require("mongoose");
const typeSchema = mongoose.Schema({
    type_name : {
        type : String,
        required : true
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

const Type = mongoose.model('Type', typeSchema );
module.exports = Type;

