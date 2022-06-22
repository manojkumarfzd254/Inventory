const Product = require("../models/Product");

const create_product = async (req,res)=>{
    //console.log(req.body);
    //res.json(req.body);
    try{
        const d = new Date();
        let time = d.getTime();
        const product = Product({
                            type_id:req.body.type_id,
                            sub_type_id: req.body.sub_type_id,
                            serial_no:time,
                            product_name:req.body.product_name,
                            rate:req.body.rate,
                            admin_id:req.admin._id
        });
        const result = await product.save();
        req.toastr.success("Product Successfully add.");  
        res.redirect("/admin/products");
    }
    catch(err)
    {
        console.log(err);
        req.toastr.error("501 : Server Error : "+err);  
        res.status(501).redirect("/admin/products");
    }
}
const delete_product = async (req,res) =>{
    try
    {
        const product_data = await Product.findOneAndDelete({_id:req.params._id});
        req.toastr.success("Product Successfully Delete.");  
        res.redirect("/admin/products");
    }  
    catch(err)
    {
        req.toastr.error("501 : Server Error");  
        res.status(501).redirect("/admin/products");
    }
    // console.log(req.query._id);
    // res.send(req.query._id);
}

const updateProduct = async (req,res) => {
    try
    {
        const data = await Product.findOneAndUpdate(
            {_id:req.body._id},
            {
                type_id:req.body.type_id,
                sub_type_id: req.body.sub_type_id,
                product_name:req.body.product_name,
                rate:req.body.rate,
            }
            );
        req.toastr.success("Product Successfully Update.");  
        res.redirect("/admin/products");
    }
    catch(err)
    {
        req.toastr.error("501 : Server Error");  
        res.status(501).redirect("/admin/products");
    }
}
const get_products = async (req,res) => {
    try
    {
        const get_data = await Product.find({admin_id:req.admin._id});
        res.json(get_data);
    }
    catch(e)
    {
        req.toastr.error("501 : Server Error" + e);  
        res.status(501).redirect("/orders/create");
    }
    
}
const get_product_by_id = async (req,res) => {
    try
    {
        const get_data = await Product.find({_id:req.body._id});
        res.json(get_data[0]);
    }
    catch(e)
    {
        //req.toastr.error("501 : Server Error" + e);  
        //res.status(501).send("error");
    }
    
}
module.exports = {create_product,delete_product,updateProduct,get_products,get_product_by_id};