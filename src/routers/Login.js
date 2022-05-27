const bcrypt = require("bcryptjs/dist/bcrypt");
const express = require("express");
const app = express();
const Login = express.Router();
const Admin_login = require("../models/Admin_login");

Login.get("/admin-login", async(req,res)=>{
    res.render("admin_login");
});

Login.post("/admin-login",async (req,res)=>{
  try{
    const admin =  await Admin_login.findOne({username:req.body.username});
    const isMatch = await bcrypt.compare(req.body.password,admin.password);


     const token = await admin.generateAuthToken();
     console.log("the token part : " + token);

     if(isMatch)
     {
          let options = {
            maxAge: 1000 * 60 * 60*24, // would expire after 15 minutes
            httpOnly: true,// Indicates if the cookie should be signed
        }

        // Set cookie
        res.cookie('jwt', token, options);
       res.status(201).redirect('/admin/dashboard');
     }
     else
     {
      res.status(201).redirect('/login/admin-login');
     }
     //const data = await admin.save();
    //console.log(req.body);
    //res.send(req.body);
  }
  catch(err){
    console.log(err);
    res.status(501).send(err);
  }
})
module.exports = Login;