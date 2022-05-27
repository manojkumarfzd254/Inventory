const bcrypt = require("bcryptjs/dist/bcrypt");
const express = require("express");
const app = express();
const auth = require("../middleware/auth");
const Admin = express.Router();
const types = require("../controllers/Types");
const toastr = require("express-toastr");
const Type = require("../models/Type");
const sub_type = require("../controllers/Sub_type");
const Sub_Type = require("../models/Sub_type");
const products = require("../controllers/Products");
const Product = require("../models/Product");
const Admin_login = require("../models/Admin_login");


Admin.get("/dashboard", auth,async (req,res)=>{
    const data = {
        data:req.admin,
        title : "Dashboard",
        req: req
    };
    res.render("admin/home",data);
}) 

Admin.post("/create", async (req,res)=>{
    try
    {
        const d =  Admin_login({
            username : req.body.username,
            password : req.body.password
        });
        let result = await d.save();
        res.send(result);

    }
    catch(err)
    {
        res.send(err);
    }
});

Admin.get("/", auth,async (req,res)=>{
    const data = {
        data:req.admin,
        title : "Dashboard", 
        req: req
    };
    res.render("admin/home",data);
}) 

Admin.get("/types", auth,async (req,res)=>{
    const list = await Type.find({admin_id:req.admin._id});
    const data = {
        data:req.admin,
        title : "Types",
        req: req,
        list : list
    };
    // req.toastr.error("Menu Style Upload Successfully");toLocaleDateString
    //const temp = new Date("Sun Jan 09 2022 15:00:40 GMT+0530 (India Standard Time)").toJSON();
    //console.log(temp);
    res.render("admin/types",data);
});

Admin.post("/types", auth, types.create);

Admin.get("/delete_type/:_id", auth, types.type_delete);

Admin.get("/edit_type/:_id", auth, async (req,res) =>{
    const row = await Type.find({admin_id:req.admin._id,_id:req.params._id});
    const data = {
        data:req.admin,
        title : "Types",
        req: req,
        row : row[0]
    };
    res.render("admin/edit_type",data);
});


Admin.post("/edit_type", auth, types.updateType);


Admin.get("/sub_type", auth, async (req,res)=>{
    const types = await Type.find({admin_id:req.admin._id});
    const list = await Sub_Type.find({admin_id:req.admin._id}).populate('type_id');
    const data = {
        data:req.admin,
        title : "Sub Types",
        req: req,
        types : types,
        list : list
    };
    res.render("admin/sub_types",data);
})

Admin.post("/sub_types",auth, sub_type.create_sub_type);


Admin.get("/edit_sub_type/:_id", auth, async (req,res) =>{
    const row = await Sub_Type.find({admin_id:req.admin._id,_id:req.params._id});
    const types = await Type.find({admin_id:req.admin._id});
    const data = {
        data:req.admin,
        title : "Edit Sub Type",
        req: req,
        row : row[0],
        types:types
    };
    res.render("admin/edit_sub_type",data);
});

Admin.post("/edit_sub_type", auth, sub_type.updateSubType);

Admin.get("/delete_sub_type/:_id", auth, sub_type.sub_type_delete);

Admin.get("/products", auth, async (req,res)=>{
    const types = await Type.find({admin_id:req.admin._id});
    const list = await Product.find({admin_id:req.admin._id}).populate('type_id').populate('sub_type_id');
    const data = {
        data:req.admin,
        title : "Add Product ",
        req: req, 
        types : types,
        list : list
    };
    res.render("admin/products",data);
});

Admin.post("/get_type_by_ajax", auth, sub_type.get_type_by_ajax);


Admin.post("/create_product",auth,products.create_product);

Admin.get("/delete_product/:_id",auth,products.delete_product);

Admin.get("/edit_product/:_id",auth, async (req,res) =>{
    const types = await Type.find({admin_id:req.admin._id});
    const list = await Product.find({_id:req.params._id});
    const sub_types = await Sub_Type.find({admin_id:req.admin._id,type_id:list[0].type_id});
    
    const data = {
        data:req.admin,
        title : "Edit Product",
        req: req, 
        types : types,
        sub_types: sub_types,
        row : list[0]
    };
    res.render("admin/edit_product",data);
});

Admin.post("/update_product",auth,products.updateProduct);















Admin.get("/logout", auth, async (req, res) => {
    try {
        // req.user.tokens = req.user.tokens.filter((currElement) =>{
        //     return currElement.token != req.token;
        // });
         req.admin.tokens = []; 
        res.clearCookie("jwt");
        console.log("logout successfully.");

        await req.admin.save();
        res.redirect("/login/admin-login");
    } catch (error) {
        res.status(500).send(error);
    }
})

module.exports = Admin;
