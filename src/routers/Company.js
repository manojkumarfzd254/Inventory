const bcrypt = require("bcryptjs/dist/bcrypt");
const express = require("express");
const app = express();
const auth = require("../middleware/auth");
const Route = express.Router();
const types = require("../controllers/Types");
const toastr = require("express-toastr");
const Type = require("../models/Type");
const companyController = require("../controllers/companyController");
const Sub_Type = require("../models/Sub_type");
const products = require("../controllers/Products");
const Company = require("../models/Company");



Route.get("/",auth, async (req,res) =>{
    const num_data = await Company.countDocuments({admin_id:req.admin._id});
    console.log(num_data);
    if(num_data>0)
    {
        const list = await Company.find({admin_id:req.admin._id});
        const data = {
            data:req.admin,
            title : "Comapny",
            req: req,
            list:list[0]
        };
        res.render("company/show",data);
    }
    else{
        res.render("company/create",{data:req.admin,title:"Company",req:req});
    }
        
        
    

});

 Route.post("/", auth, companyController.update);
 Route.post("/create", auth, companyController.create);
// Orders.post("/getProductValueById", auth, products.get_product_by_id);



module.exports = Route;