const jwt = require("jsonwebtoken");
const Admin_login = require("../models/Admin_login");


const auth = async (req,res,next) =>{
    try
    {
        const token = req.cookies.jwt;
        const verifyUser = jwt.verify(token,'mynameismanojkumarshankhwarfirozabad');
        const admin = await Admin_login.findOne({_id:verifyUser._id});
        req.token = token;
        req.admin = admin;
        next();
    }
    catch(err)
    {
       res.status(401).redirect("/login/admin-login");
    }
}

module.exports = auth;