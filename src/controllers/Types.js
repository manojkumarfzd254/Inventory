const Type = require("../models/Type");
const toastrController = require("../controllers/toastrController");
const create = async (req,res)=>{
    //console.log(req.body);
    //res.json(req.body);
    try{
        const type = Type({
                            type_name:req.body.type_name,
                            admin_id:req.admin._id
        });
        const result = await type.save();
        toastrController.toastr_success(req,"Type successfully add.");
        //req.toastr.success("Type Successfully add.","Success",{progressBar:true,closeButton:true});  
        res.redirect("/admin/types");
    }
    catch(err)
    {
        res.status(501).send(err);
    }
}
const type_delete = async (req,res) =>{
    try
    {
        const type_data = await Type.findOneAndDelete({_id:req.params._id});
        toastrController.toastr_info(req,"Type successfully Delete."); 
        res.redirect("/admin/types");
    }  
    catch(err)
    {
        toastrController.toastr_error(req,"501 : Server Error");
        res.status(501).redirect("/admin/types");
    }
    // console.log(req.query._id);
    // res.send(req.query._id);
}

const updateType = async (req,res) => {
    try
    {
        const data = await Type.findOneAndUpdate({_id:req.body._id},{type_name:req.body.type_name});
        toastrController.toastr_success(req,"Type successfully Update.");   
        res.redirect("/admin/types");
    }
    catch(err)
    {
        toastrController.toastr_error(req,"501 : Server Error");  
        res.status(501).redirect("/admin/types");
    }
}
module.exports = {create,type_delete,updateType};