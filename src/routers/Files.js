const express = require("express");
const app = express();
const auth = require("../middleware/auth");
const Route = express.Router();
const files = require("../controllers/fileController");
const toastr = require("express-toastr");
const File = require("../models/File");

Route.get("/upload", auth,async (req,res) =>{
    const data = {
        data:req.admin,
        title : "Upload File on AWS",
        req: req,
    };
    res.render("files/upload",data);
});

Route.post("/upload",auth, files.upload);

module.exports = Route;
