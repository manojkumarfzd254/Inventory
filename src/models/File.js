const  mongoose = require("mongoose");
const fileSchema = mongoose.Schema({
    title : {
        type : String
    },
    file_url:{
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

const File = mongoose.model('File', fileSchema );
module.exports = File;

