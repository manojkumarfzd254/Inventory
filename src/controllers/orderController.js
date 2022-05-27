const res = require("express/lib/response");
const Order = require("../models/Order");
const Order_item = require("../models/Order_item");
const Vendor = require("../models/Vendor");
const Product = require("../models/Product");
const Company = require("../models/Company");
function makeid(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * 
 charactersLength));
   }
   return result.toUpperCase();
}

function between(min, max) {  
    return Math.floor(
      Math.random() * (max - min + 1) + min
    )
  }
const create = async (req,res)=>{
    //console.log(makeid(5));
    //console.log(req.body);
    try{
        const ress = Order({
                            bill_no:"BILPR-"+between(10, 200)+makeid(5),
                            vendor_id:req.body.vendor_id,
                            gross_amount:req.body.gross_amount,
                            service_charge_rate:req.body.service_charge_rate,
                            service_charge:req.body.service_charge,
                            vat_charge_rate:req.body.vat_charge_rate,
                            vat_charge:req.body.vat_charge,
                            net_amount:req.body.net_amount,
                            discount:(req.body.discount=="")?"0":req.body.discount,
                            paid_status:0,
                            admin_id:req.admin._id
        });
        const result = await ress.save();
       // console.log(result);
        
        let result2;
        req.body.product_id.forEach(async function(err,row) {
            console.log(row);
            //console.log(req.body.product_id[Index]);
            let Items = Order_item({
                order_id:result._id,
                product_id:req.body.product_id[row],
                qty:req.body.qty[row],
                rate:req.body.rate[row],
                amount:req.body.amount[row],
                qty:req.body.qty[row],
                qty:req.body.qty[row],
                admin_id:req.admin._id,
            });
            result2 =  Items.save();
        });
        
        req.toastr.success("Order Successfully Create.");  
        res.redirect("/orders/list");
    }
    catch(err)
    {
        console.log(err);
        req.toastr.error("501 : Server Error :"+err);   
        res.redirect("/orders/create");
    }
}
const order_delete = async (req,res) =>{
    try
    {
        const v_data = await Order.findOneAndDelete({_id:req.params._id});
        const item_delete = await Order_item.deleteMany({order_id:req.params._id});
        req.toastr.success("Order Successfully Delete.");  
        res.redirect("/orders/list");
    }  
    catch(err)
    {
        req.toastr.error("501 : Server Error :" +err);   
        res.redirect("/orders/list");
    }
    // console.log(req.query._id);
    // res.send(req.query._id);
}

const update = async (req,res) => {
    try
    {
        
            const data = await Order.findOneAndUpdate({_id:req.body._id},{
                vendor_name:req.body.vendor_name,
                vendor_email:req.body.vendor_email,
                vendor_mobile:req.body.vendor_mobile,
                vendor_address:req.body.vendor_address,
            });
            req.toastr.success("Order Successfully Update.");  
            res.redirect("/orders/list");
       
    }
    catch(err)
    {
        req.toastr.error("501 : Server Error");   
        res.redirect("/orders/list");
    }
}
const get_by_id = async (req,res) =>{
    try
    {
        
            const data = await Order.find({_id:req.body._id});
            //req.toastr.success("Vendor Successfully Update.");  
            res.json(data[0]);
       
    }
    catch(err)
    {
        req.toastr.error("501 : Server Error");   
        res.redirect("/orders/list");
    }
}
const get_time_am_pm =  (date ) => {
    var hours = date.getHours();
    var dateNow = date.toLocaleDateString();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12;
        minutes = minutes > 9 ? minutes : '0'+minutes;
    var myDate = dateNow +' ('+hours + ':' + minutes + ' '+ampm+')';
    return  myDate;
}
const get_item_by_order_id = async(req,res) =>{
    html = "<table class='table table-bordered table-striped'>"+
    "<thead>"+
        "<tr>"+
            "<th>#</th>"+
            "<th>Item Name</th>"+
            "<th>Sr No.</th>"+
            "<th>QTY</th>"+
            "<th>Rate</th>"+
            "<th>Amount</th>"+
        "</tr>"+
        "<tbody>";
        let count = 1;
        const Items = await Order_item.find({order_id:req.params._id}).populate("product_id");
        Items.forEach(async function(row){
            html += "<tr>"+
                        "<td>"+(count++)+"</td>"+
                        "<td>"+row.product_id.product_name+"</td>"+
                        "<td>"+row.product_id.serial_no+"</td>"+
                        "<td>"+row.qty+"</td>"+
                       
                        "<td>"+row.rate+"</td>"+
                        "<td>"+row.amount+"</td>";
                        
            html +="</tr>";
            
        });
        html += "</tbody>"+
    "</thead>"+
     "</table>";
    //return html;
    res.send(html);
}
const edit_order_form = async(req,res) =>{
    html = "";
    const vendors = await Vendor.find({admin_id:req.admin._id});
    const order = await Order.find({_id:req.params._id});
    const showVendor = await Vendor.find({_id:order[0].vendor_id});
    const items = await Order_item.find({order_id:order[0]._id}).populate("product_id");
    const products = await Product.find({admin_id:req.admin._id});
    const paid_select = (order[0].paid_status=="1")?"selected":"";
    const unpaid_select = (order[0].paid_status=="0")?"selected":"";
    const charges = await Company.find({admin_id:req.admin._id});
    html += "<div class=''>"+
   
      
        "<input type='hidden' name='order_id' value='"+order[0]._id+"'>"+
          "<div class='row'>"+

            "<div class='form-group col-md-4 col-lg-4 col-sm-12 col-xs-12'>"+
              "<label for='gross_amount' class='control-label' style='text-align:left;'>Select Customer</label>"+
              "<div class=''>"+
                "<select style='width:100%' class='form-control select_group get_vendor_data' name='vendor_id' required>"+
                  "<option value=''>--- Select Vendor ---</option>";
                  vendors.forEach(function(v){
                    var flag = (order[0].vendor_id+""==v._id+"")?"selected":"";
                    html += "<option value='"+v._id+"' "+flag+">"+v.vendor_name+"</option>";
                  });
        html +="</select>"+
              "</div>"+
            "</div>"+
            
            "<div class='form-group col-md-4 col-lg-4 col-sm-12 col-xs-12'>"+
              "<label for='gross_amount' class=' control-label' style='text-align:left;'>Customer Email ID</label>"+
              "<div class=''>"+
                "<input type='text' readonly value='"+showVendor[0].vendor_email+"' class='form-control' id='customer_email' name='customer_email' placeholder='Enter Customer Phone' autocomplete='off'>"+
              "</div>"+
            "</div>"+
            "<div class='form-group col-md-4 col-lg-4 col-sm-12 col-xs-12'>"+
              "<label for='gross_amount' class=' control-label' style='text-align:left;'>Customer Phone</label>"+
              "<div class=''>"+
                "<input type='text' readonly class='form-control' value='"+showVendor[0].vendor_mobile+"' id='customer_phone' name='customer_phone' placeholder='Enter Customer Phone' autocomplete='off'>"+
             "</div>"+
           "</div>"+
            "<div class='form-group col-md-12 col-lg-12 col-sm-12 col-xs-12'>"+
              "<label for='gross_amount' class=' control-label' style='text-align:left;'>Customer Address</label>"+
              "<div class=''>"+
                "<input type='text' readonly class='form-control' value='"+showVendor[0].vendor_address+"' id='customer_address' name='customer_address' placeholder='Enter Customer Address' autocomplete='off'>"+
              "</div>"+
            "</div>"+
          "</div>"+
           "<div class='table-responsive'>"+
                "<table class='table table-striped table-bordered' id='product_info_table'>"+
                    "<thead>"+
                        "<tr>"+
                            "<th style='width: 5%;'>#</th>"+
                            "<th style='width: 40%;'>Product Name</th>"+
                            "<th style='width: 20%;'>Serial No.</th>"+
                            
                            "<th style='width: 10%;'>QTY</th>"+
                            "<th style='width: 10%;'>Rate</th>"+
                            "<th style='width: 10%;'>Amount</th>"+
                            "<th style='width: 5%;'><button type='button' id='add_row' class='btn btn-default'><i class='fa fa-plus'></i></button></th>"+
                        "</tr>"+
                    "</thead>"+
                    "<tbody>";
                    var count = 1;
                    items.forEach(function(it){

                    
                      html +=  "<tr id='row_"+count+"'>"+
                            "<th>"+count+"</th>"+
                            "<td>"+
                                "<select onchange='getProductData("+count+")' style='width:100%;' id='product_"+count+"' data-row-id='row_"+count+"' class='form-control select_group get_record' name='product_id[]' required>"+
                                    "<option value=''>--- Select Type ---</option>";
                                    products.forEach(function(p){
                                      var sel = (p._id+""==it.product_id._id+"")?"selected":"";
                                      html += "<option value='"+p._id+"' "+sel+">"+p.product_name+"</option>";
                                    });   
                                html +="</select>"+
                            "</td><input type='hidden' name='item_id' value='"+it._id+"'>"+
                            "<td>"+
                                "<input type='text' value='"+it.product_id.serial_no+"' class='form-control' name='serial_no[]' id='serial_no_"+count+"' readonly>"+
                            "</td>"+
                            
                            "<td>"+
                                "<input type='text' value='"+it.qty+"' class='form-control' name='qty[]' onkeyup='getTotal("+count+")' id='qty_"+count+"'>"+
                            "</td>"+
                            "<td>"+
                                "<input readonly type='text' value='"+it.rate+"' class='form-control' name='rate[]' id='rate_"+count+"'>"+
                            "</td>"+
                            "<td>"+
                                "<input readonly type='text' value='"+it.amount+"' class='form-control' name='amount[]' id='amount_"+count+"'>"+
                            "</td>"+
                            "<td><button type='button' class='btn btn-danger' onclick='removeRow("+count+")'><i class='fa fa-close'></i></button></td>"+
                        "</tr>";
                        count++;
                      });
                   html += "</tbody>"+
                "</table>"+
            "</div>"+
            "<div class='row'>"+

              "<div class='form-group col-md-4 col-lg-4 col-sm-12 col-xs-12'>"+
                "<label for='gross_amount' class=' control-label'>Gross Amount</label>"+
                "<div class=''>"+
                  "<input type='text' value='"+order[0].gross_amount+"' class='form-control' id='gross_amount' name='gross_amount' readonly autocomplete='off'>"+
                   "</div>"+
              "</div>"+
              "<div class='form-group col-md-4 col-lg-4 col-sm-12 col-xs-12'>"+
                "<label for='service_charge' class=' control-label'>S-Charge "+charges[0].service_charge_value+" %</label>"+
                "<div class=''>"+
                  "<input type='text' class='form-control' id='service_charge' value='"+order[0].service_charge+"' name='service_charge' readonly autocomplete='off'>"+
                  "<input type='hidden' name='service_charge_rate' value='"+charges[0].service_charge_value+"'>"+
                "</div>"+
              "</div>"+
                "<div class='form-group col-md-4 col-lg-4 col-sm-12 col-xs-12'>"+
                "<label for='vat_charge' class=' control-label'>Vat "+charges[0].vat_charge_value+" %</label>"+
                "<div class=''>"+
                  "<input type='text' class='form-control' id='vat_charge' name='vat_charge' value='"+order[0].vat_charge+"' readonly autocomplete='off'>"+
                  "<input type='hidden' name='vat_charge_rate' value='"+charges[0].vat_charge_value+"'>"+
                "</div>"+
              "</div>"+
              "<div class='form-group col-md-4 col-lg-4 col-sm-12 col-xs-12'>"+
                "<label for='discount' class=' control-label'>Discount</label>"+
                "<div class=''>"+
                  "<input type='text' class='form-control' value='"+order[0].discount+"' id='discount' name='discount' placeholder='Discount' onkeyup='subAmount()' autocomplete='off'>"+
                "</div>"+
              "</div>"+
              "<div class='form-group col-md-4 col-lg-4 col-sm-12 col-xs-12'>"+
                "<label for='net_amount' class=' control-label'>Net Amount</label>"+
                "<div class=''>"+
                  "<input type='text' value='"+order[0].net_amount+"' class='form-control' id='net_amount' name='net_amount' readonly autocomplete='off'>"+
                  
                "</div>"+
              "</div>"+

              "<div class='form-group col-md-4 col-lg-4 col-sm-12 col-xs-12'>"+
                "<label for='net_amount' class=' control-label'>Paid Status</label>"+
                "<div class=''>"+
                  "<select class='form-control' name='paid_status'>"+
                    "<option value='0' "+unpaid_select+">Unpaid</option>"+
                    "<option value='1' "+paid_select+">Paid</option>"+
                  "</select>"+
                "</div>"+
              "</div>"+
              
            "</div>"+
       
   
     "</div><script>$('.select_group').select2();</script>";
     
    res.send(html);
}
const submit_edit_form = async(req,res) =>{
  try{
      const result = await Order.findOneAndUpdate({_id:req.body.order_id},{
                          vendor_id:req.body.vendor_id,
                          gross_amount:req.body.gross_amount,
                          service_charge_rate:req.body.service_charge_rate,
                          service_charge:req.body.service_charge,
                          vat_charge_rate:req.body.vat_charge_rate,
                          vat_charge:req.body.vat_charge,
                          net_amount:req.body.net_amount,
                          discount:(req.body.discount=="")?"0":req.body.discount,
                          paid_status:req.body.paid_status,
      });
    
    // console.log(result);
      
      let result2;
      const deleteTemp = await Order_item.deleteMany({order_id:req.body.order_id});
      req.body.product_id.forEach(async function(err,row) {
         
          //console.log(req.body.product_id[Index]);
         
              let Items = Order_item({
                order_id:req.body.order_id,
                product_id:req.body.product_id[row],
                qty:req.body.qty[row],
                rate:req.body.rate[row],
                amount:req.body.amount[row],
                qty:req.body.qty[row],
                qty:req.body.qty[row],
                admin_id:req.admin._id,
            });
            result2 = await Items.save();
          
          
      });
      
      res.status(201).json(req.body);
  }
  catch(err)
  {  
      res.status(501).json(err);
  }
}
module.exports = 
{
    create,
    order_delete,
    update,
    get_by_id,
    get_time_am_pm,
    get_item_by_order_id,
    edit_order_form,
    submit_edit_form
};