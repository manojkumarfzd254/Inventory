const express = require("express");
const app = express();
const auth = require("../middleware/auth");
const Route = express.Router();
const toastr = require("express-toastr");
const stockController = require("../controllers/stockController");

Route.get("/stock_entry",auth, async (req,res) =>{
    
    const data = {
        data:req.admin,
        title : "Stock Entry",
        req: req,
    };
    res.render("stock/stock_entry",data);
});
Route.post("/check_stock_entry",auth,stockController.checkStock);
module.exports = Route;
