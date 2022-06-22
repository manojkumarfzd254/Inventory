const bcrypt = require("bcryptjs/dist/bcrypt");
const express = require("express");
const app = express();
const auth = require("../middleware/auth");
const Orders = express.Router();

const toastr = require("express-toastr");

const products = require("../controllers/Products");
const Product = require("../models/Product");
const Company = require("../models/Company");
const Vendor = require("../models/Vendor");
const vendorController = require("../controllers/vendorController");
const orderController = require("../controllers/orderController");
const Order = require("../models/Order");
const Order_item = require("../models/Order_item");


Orders.get("/create",auth, async (req,res) =>{
    const products = await Product.find({admin_id:req.admin._id});
    const companyData = await Company.find({admin_id:req.admin._id});
    const vendors = await Vendor.find({admin_id:req.admin._id});
    const data = {
        data:req.admin,
        title : "Create Order",
        req: req,
        products:products,
        charges:companyData[0],
        vendors:vendors
    };
    const num_company = await Company.countDocuments({admin_id:req.admin._id});
    if(num_company>0){
        res.render("orders/create",data);
    }else{
        res.render("company",data);
    }
    
});

Orders.get("/list",auth, async (req,res) =>{
    const orders = await Order.find({admin_id:req.admin._id}).populate("vendor_id");
    const companyData = await Company.find({admin_id:req.admin._id});
    var html = "";
    
    orders.forEach(async function(row){
        html += "<tr>"+
                    "<td>"+row.bill_no+"</td>"+
                    "<td>"+row.vendor_id.vendor_name+"</td>"+
                    "<td>"+row.vendor_id.vendor_mobile+"</td>"+
                    "<td>"+orderController.get_time_am_pm(row.created_on)+"</td>"+
                   
                    "<td><i class='fa fa-inr'></i> "+row.net_amount+" /-</td><td>";
                    if(row.paid_status=="0")
                    {
                       html+=" <label  class='label label-danger'>Unpaid</label>";
                    }
                    else
                    {
                        html+=" <label  class='label label-success'>Paid</label>";
                    }
                    html+="</td><td>"+
                    "<a class='btn btn-default fa fa-edit editOrderClick' data-order_id='"+row._id+"' href='javascript:void(0)'></a>"+
                    "<a class='btn btn-default fa fa-eye viewOrder' data-order_id='"+row._id+"'  href='javascript:void(0)'></a>"+
                    "<a class='btn btn-default fa fa-trash' onclick='return confirm(\"Are you sure to Delete this Order?\")' href='/orders/delete_order/"+row._id+"'></a>"+
                    "</td>";
        html +="</tr>";
        
    });
    //data-toggle='modal' data-target='#exampleModalLong'
    
    const data = {
        data:req.admin,
        title : "Manage Order",
        req: req,
        orders:orders,
        Order_item:Order_item,
        html:html,
        charges:companyData[0],
    };
    const num_company = await Company.countDocuments({admin_id:req.admin._id});
    if(num_company>0){
        res.render("orders/list",data);
    }else{
        res.render("company",data);
    }
});
 


Orders.post("/getTableProductRow", auth, products.get_products);
Orders.post("/getProductValueById", auth, products.get_product_by_id);

Orders.post("/get_vendor_by_id",auth,vendorController.get_by_id);
Orders.post("/submit",auth,orderController.create);
Orders.get("/delete_order/:_id",auth,orderController.order_delete);
Orders.get("/show_items/:_id",auth,orderController.get_item_by_order_id);
Orders.get("/edit_order_form/:_id",auth,orderController.edit_order_form);
Orders.post("/edit_form_submit", auth,orderController.submit_edit_form);
module.exports = Orders;