const res = require("express/lib/response");
const  mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const admin_loginSchema = mongoose.Schema({
    username : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true
    },
    tokens:[{
        token:{
            type : String,
        }
    }]
});
admin_loginSchema.methods.generateAuthToken = async function(){
    try{
        console.log(this._id);
        const token = jwt.sign({_id:this._id.toString()},'mynameismanojkumarshankhwarfirozabad');
        this.tokens = this.tokens.concat({token:token});
        await this.save();
        return token;
    }
    catch(err){
        res.send("the error part :" + err);
        console.log("the error part :" +err);
    }
}

admin_loginSchema.pre("save",async function(next){
    if(this.isModified("password")){
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});

const Admin_login = mongoose.model('Admin', admin_loginSchema );
module.exports = Admin_login;

