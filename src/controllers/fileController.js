const File = require("../models/File");
const AWS = require("aws-sdk");
const multer = require("multer");
const uuid = require('uuid');
const storage = multer.memoryStorage({
    destination:function(req,file,callback){
        callback(null,'');
    }
});

const s3 = new AWS.S3({
    accessKeyId: '',
    secretAccessKey: ''
});


const upload2 = multer({storage}).single('file');

const upload = async (req,res,next)=>{
    try{
        upload2(req,res, function(err){
            
            let myfile = req.file.originalname.split(".");
            const fileType = myfile[myfile.length - 1];
            const params = {
                Bucket : 'manoj254',
                Key : `${uuid.v1()}.${fileType}`,
                Body : req.file.buffer
            }
           // console.log(params.key);
            s3.upload(params,(error,data)=>{
                if(error){
                    req.toastr.error(error);  
                }
                else{
                    console.log(data);
                const fileSave = File({
                                        title:req.body.title,
                                        file_url:data.Location,
                                        admin_id:req.admin._id
                });
               // const ss = await fileSave.save();
               const result = fileSave.save();
                req.toastr.success("File successfully upload"); 
                }
                 
                res.redirect("/files/upload");
            });
            
            
        });
    }
    catch(err)
    {
        console.log(err);
        req.toastr.error("501 : Server Error"+err);   
        res.redirect("/files/upload");
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
module.exports = {upload,type_delete,update};