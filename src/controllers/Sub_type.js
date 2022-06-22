const { response } = require("express");
const Sub_Type = require("../models/Sub_type");

const create_sub_type = async (req,res)=>{
    //console.log(req.body);
    //res.json(req.body);
    try{
        const type = Sub_Type({
                            sub_type_name:req.body.sub_type_name,
                            admin_id:req.admin._id,
                            type_id : req.body.type_id
        });
        const result = await type.save();
        req.toastr.success("Sub Type Successfully add.");  
        res.redirect("/admin/sub_type");
    }
    catch(err)
    {
        req.toastr.error("501 : Server Error :"+err);  
        res.status(501).redirect("/admin/sub_type");
    }
}
const sub_type_delete = async (req,res) =>{
    try
    {
        const type_data = await Sub_Type.findOneAndDelete({_id:req.params._id});
        req.toastr.success("Sub Type Successfully Delete.");  
        res.redirect("/admin/sub_type");
    }  
    catch(err)
    {
        req.toastr.error("501 : Server Error");  
        res.status(501).redirect("/admin/sub_type");
    }
    // console.log(req.query._id);
    // res.send(req.query._id);
}

const updateSubType = async (req,res) => {
    try
    {
        const data = await Sub_Type.findOneAndUpdate({_id:req.body.sub_type_id},{sub_type_name:req.body.sub_type_name,type_id:req.body.type_id});
        req.toastr.success("Sub Type Successfully Update.");  
        res.redirect("/admin/sub_type");
    }
    catch(err)
    {
        req.toastr.error("501 : Server Error");  
        res.status(501).redirect("/admin/sub_type");
    }
}

const get_type_by_ajax = async (req,res) => {
    try
    {
        const data = await Sub_Type.find({type_id:req.body.type_id});
        //let arrData = [];
        let arrData = '<option value="">-- Select Sub Type --</option>';
        data.forEach(function(d){
            arrData += '<option value="'+d._id+'">'+d.sub_type_name+'</option>';
        });
        //res.status(201).send(data);
        res.json({content:arrData});
    }
    catch(err)
    {
        req.toastr.error("501 : Server Error");  
        res.status(501).redirect("/admin/products");
    }
}
module.exports = {create_sub_type,sub_type_delete,updateSubType,get_type_by_ajax};