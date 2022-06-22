const bcrypt = require("bcryptjs/dist/bcrypt");
const express = require("express");
const app = express();
const auth = require("../middleware/auth");
const Vendors = express.Router();
const toastr = require("express-toastr");
const Vendor = require("../models/Vendor");
const vendorController = require("../controllers/vendorController");



Vendors.get("/create",auth, async (req,res) =>{
   // const data2 = await Vendor.find({admin_id:req.admin._id});
    const data = {
        data:req.admin,
        title : "Create Vendor",
        req: req,
       // date:data2,
    };
    res.render("vendors/create",data);
});

Vendors.post("/save_data", auth, vendorController.create);

Vendors.get("/list",auth, async (req,res) =>{
     const list = await Vendor.find({admin_id:req.admin._id});
     const data = {
         data:req.admin,
         title : "List Vendor",
         req: req,
         list:list,
     };
     res.render("vendors/list",data);
 });
Vendors.get("/delete/:_id", auth, vendorController.vendor_delete);

Vendors.get("/edit/:_id",auth, async (req,res) =>{
    const row = await Vendor.find({_id:req.params._id});
     const data = {
         data:req.admin,
         title : "List Vendor",
         req: req,
         row:row[0],
     };
     res.render("vendors/edit",data);
});

Vendors.post("/update_data", auth, vendorController.update);

module.exports = Vendors;