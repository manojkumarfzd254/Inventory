const Vendor = require("../models/Vendor");

const create = async (req,res)=>{
   
    //res.json(req.body);
    try{
        const ress = Vendor({
                            vendor_name:req.body.vendor_name,
                            vendor_email:req.body.vendor_email,
                            vendor_mobile:req.body.vendor_mobile,
                            vendor_address:req.body.vendor_address,
                            admin_id:req.admin._id
        });
        const result = await ress.save();
        console.log(result);
        req.toastr.success("Vendor Successfully Create.");  
        res.redirect("/vendors/create");
    }
    catch(err)
    {
        req.toastr.error("501 : Server Error :"+err);   
        res.redirect("/vendors/create");
    }
}
const vendor_delete = async (req,res) =>{
    try
    {
        const v_data = await Vendor.findOneAndDelete({_id:req.params._id});
        req.toastr.success("Vendor Successfully Delete.");  
        res.redirect("/vendors/list");
    }  
    catch(err)
    {
        req.toastr.error("501 : Server Error :" +err);   
        res.redirect("/vendors/list");
    }
    // console.log(req.query._id);
    // res.send(req.query._id);
}

const update = async (req,res) => {
    try
    {
        
            const data = await Vendor.findOneAndUpdate({_id:req.body._id},{
                vendor_name:req.body.vendor_name,
                vendor_email:req.body.vendor_email,
                vendor_mobile:req.body.vendor_mobile,
                vendor_address:req.body.vendor_address,
            });
            req.toastr.success("Vendor Successfully Update.");  
            res.redirect("/vendors/list");
       
    }
    catch(err)
    {
        req.toastr.error("501 : Server Error");   
        res.redirect("/vendors/list");
    }
}
const get_by_id = async (req,res) =>{
    try
    {
        
            const data = await Vendor.find({_id:req.body._id});
            //req.toastr.success("Vendor Successfully Update.");  
            res.json(data[0]);
       
    }
    catch(err)
    {
        req.toastr.error("501 : Server Error");   
        res.redirect("/vendors/list");
    }
}
module.exports = {create,vendor_delete,update,get_by_id};