const Order = require("../models/Order");
const toastrController = require("../controllers/toastrController");
const Order_item = require("../models/Order_item");
const Company = require("../models/Company");
const checkStock = async (req,res)=>{
    //console.log(req.body);
    //res.json(req.body);
    try{
        const data = await Order.find({bill_no:req.body.bill_no,admin_id:req.admin._id,paid_status:1}).populate("vendor_id");
        const items = await Order_item.find({order_id:data[0]._id}).populate("product_id");
        const charges = await Company.find({admin_id:req.admin._id});
        var content = "";
        
        content += "<table class='table table-bordered'>"+
                "<tbody>"+
                        "<tr>"+
                                "<th>Bill No.</th><td>"+data[0].bill_no+"</td>"+
                                "<th>Date</th><td>"+data[0].bill_no+"</td>"+
                        "</tr>"+
                        "<tr>"+
                                "<th>Vendor Name</th><td>"+data[0].vendor_id.vendor_name+"</td>"+
                                "<th>Email ID</th><td>"+data[0].vendor_id.vendor_email+"</td>"+
                        "</tr>"+
                        "<tr>"+
                                "<th>Mobile No.</th><td>"+data[0].vendor_id.vendor_mobile+"</td>"+
                                "<th>Address</th><td>"+data[0].vendor_id.vendor_address+"</td>"+
                        "</tr>"+
                "</tbody>"+
        "</table>";
        content += "<table class='table table-bordered table-striped'>"+
                    "<thead>"+
                        "<tr>"+
                            "<th>#</th>"+
                            "<th>Item Name</th>"+
                            "<th>Serial No.</th>"+
                            "<th>Rate</th>"+
                            "<th>QTY</th>"+
                            "<th>Amount</th>"+
                    "</thead>"+
                "<tbody>";
                let ii = 1;
                items.forEach(function(row){
                    content += "<tr>"+
                                "<td>"+(ii++)+"</td>"+
                                "<td>"+row.product_id.product_name+"</td>"+
                                "<td>"+row.product_id.serial_no+"</td>"+
                                "<td>"+row.rate+"</td>"+
                                "<td>"+row.qty+"</td>"+
                                "<td>"+row.amount+"</td>"+
                    "</tr>";
                });
        content += "</tbody>"+
        "</table>";
        
        content += "<div class='row'>"+

        "<div class='form-group col-md-4 col-lg-4 col-sm-12 col-xs-12'>"+
          "<label for='gross_amount' class=' control-label'>Gross Amount</label>"+
          "<div class=''>"+
            "<input type='text' value='"+data[0].gross_amount+"' class='form-control' id='gross_amount' name='gross_amount' readonly autocomplete='off'>"+
             "</div>"+
        "</div>"+
        "<div class='form-group col-md-4 col-lg-4 col-sm-12 col-xs-12'>"+
          "<label for='service_charge' class=' control-label'>S-Charge "+charges[0].service_charge_value+" %</label>"+
          "<div class=''>"+
            "<input type='text' class='form-control' id='service_charge' value='"+data[0].service_charge+"' name='service_charge' readonly autocomplete='off'>"+
            "<input type='hidden' name='service_charge_rate' value='"+charges[0].service_charge_value+"'>"+
          "</div>"+
        "</div>"+
          "<div class='form-group col-md-4 col-lg-4 col-sm-12 col-xs-12'>"+
          "<label for='vat_charge' class=' control-label'>Vat "+charges[0].vat_charge_value+" %</label>"+
          "<div class=''>"+
            "<input type='text' class='form-control' id='vat_charge' name='vat_charge' value='"+data[0].vat_charge+"' readonly autocomplete='off'>"+
            "<input type='hidden' name='vat_charge_rate' value='"+charges[0].vat_charge_value+"'>"+
          "</div>"+
        "</div>"+
        "<div class='form-group col-md-4 col-lg-4 col-sm-12 col-xs-12'>"+
          "<label for='discount' class=' control-label'>Discount</label>"+
          "<div class=''>"+
            "<input type='text' class='form-control' value='"+data[0].discount+"' id='discount' name='discount' placeholder='Discount' onkeyup='subAmount()' autocomplete='off'>"+
          "</div>"+
        "</div>"+
        "<div class='form-group col-md-4 col-lg-4 col-sm-12 col-xs-12'>"+
          "<label for='net_amount' class=' control-label'>Net Amount</label>"+
          "<div class=''>"+
            "<input type='text' value='"+data[0].net_amount+"' class='form-control' id='net_amount' name='net_amount' readonly autocomplete='off'>"+
            
          "</div>"+
        "</div>"+

        "<div class='form-group col-md-4 col-lg-4 col-sm-12 col-xs-12'>"+
          "<label for='net_amount' class=' control-label'>Paid Status</label>"+
          "<div class=''>"+
            "<select class='form-control' name='paid_status'>"+
            "</select>"+
          "</div>"+
        "</div>"+
      "</div>";

        res.status(200).json(content);
    }
    catch(err)
    {
        res.status(501).json(err);
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
module.exports = {checkStock,type_delete,updateType};