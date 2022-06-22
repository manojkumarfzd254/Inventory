const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
require("./db/conn");
const path = require("path");
const Login = require("./routers/Login");
const Admin = require("./routers/Admin");
const Orders = require("./routers/Orders");
const Company = require("./routers/Company");
const Vendors = require("./routers/Vendor");
const Stock = require("./routers/Stock");
const Files = require("./routers/Files");
  
const flash = require('connect-flash');
const session = require('express-session');
cookieParser = require('cookie-parser');
const toastr = require("express-toastr");
app.use(cookieParser());
app.use(express.json());
app.use(express.static(path.join(__dirname,'../public/')));
console.log(path.join(__dirname,'../public/'));
const bodyParser = require("body-parser");

app.use(cookieParser('secret'));

app.use(session({
    secret: 'secret',
    saveUninitialized: true,
    resave: true,
}));
app.use(flash());
 
// Load express-toastr
// You can pass an object of default options to toastr(), see example/index.coffee
app.use(toastr());

app.use(
    bodyParser.urlencoded({
      extended: true,
    })
  );
// app.use(express.urlencoded({
//   extended: true
// }));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use("/login",Login);
app.use("/admin",Admin);
app.use("/orders",Orders);
app.use("/company",Company);
app.use("/vendors",Vendors);
app.use("/stock",Stock);
app.use("/files",Files);


app.get("/", async(req,res)=>{
    res.render("hello world");
});


app.post("/manoj", async(req,res)=>{
    res.send(req.file);
});

app.listen(port, ()=>{
    console.log(`Running port is : ${port}`);
});

