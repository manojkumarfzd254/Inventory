const Company = require("../models/Company");

const create = async (req,res)=>{
   
    //res.json(req.body);
    try{
        const company = Company({
                            company_name:req.body.company_name,
                            service_charge_value:req.body.service_charge_value,
                            vat_charge_value:req.body.vat_charge_value,
                            address:req.body.address,
                            phone:req.body.phone,
                            message:req.body.message,
                            admin_id:req.admin._id
        });
        const result = await company.save();
        console.log(result);
        req.toastr.success("Company Successfully Create.");  
        res.redirect("/company");
    }
    catch(err)
    {
        req.toastr.error("501 : Server Error");   
        res.redirect("/company");
    }
}
const type_delete = async (req,res) =>{
    try
    {
        const type_data = await Company.findOneAndDelete({admin_id:req.admin._id});
        req.toastr.success("Company Successfully Delete.");  
        res.redirect("/admin/types");
    }  
    catch(err)
    {
        req.toastr.error("501 : Server Error");   
        res.redirect("/company");
    }
    // console.log(req.query._id);
    // res.send(req.query._id);
}

const update = async (req,res) => {
    try
    {
        
            const data = await Company.findOneAndUpdate({admin_id:req.admin._id},{
                company_name:req.body.company_name,
                service_charge_value:req.body.service_charge_value,
                vat_charge_value:req.body.vat_charge_value,
                address:req.body.address,
                phone:req.body.phone,
                message:req.body.message,
            });
            req.toastr.success("Company Successfully Update.");  
            res.redirect("/company");
       
    }
    catch(err)
    {
        req.toastr.error("501 : Server Error");   
        res.redirect("/company");
    }
}
module.exports = {create,type_delete,update};