const express=require("express");
const bodyParser=require("body-parser");
const ejs=require("ejs");
const _ =require("lodash");
const mongoose = require("mongoose");
const { rearg } = require("lodash");

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));


mongoose.connect("mongodb+srv://Klevin05:1186prince@sihtle.oclfr.mongodb.net/UserlistDB", {useNewUrlParser: true});

const itemsSchema = {
    username:String,
    email: String,
    name:String,
    phoneNo:String,
    password:String
};


const Item = mongoose.model("Item", itemsSchema);

const listSchema={
    username:String,
    ip:String 
}
const List = mongoose.model("List", listSchema);

app.get("/",function(req,res){
    const userName=req.body.Username;
    const password=req.body.password;
    var ipAddress =req.header('x-forwarded-for') || req.connection.remoteAddress;

    
    
    res.render("home");
});

app.get("/login",function(req,res){
    res.render("login");
})

app.post("/login",function(req,res){
    const userName=req.body.Username;
    const email=req.body.Email;
    const name=req.body.Name;
    const number=req.body.Number;
    const password=req.body.Password;
    
    const details=new Item({
        username:userName,
        email: email,
        name:name,
        phoneNo:number,
        password:password
    });
    details.save();
    res.redirect("/");
})
app.get("/otp",function(req,res){
    res.render("otp");
})

app.listen(3000,function(){
    console.log("Server Started on port 3000");
});