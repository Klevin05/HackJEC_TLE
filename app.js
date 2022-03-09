const express=require("express");
const bodyParser=require("body-parser");
const ejs=require("ejs");
const _ =require("lodash");
const mongoose = require("mongoose");
const { rearg } = require("lodash");
const bcrypt = require('bcrypt');

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));


mongoose.connect("mongodb+srv://Klevin05:1186prince@sihtle.oclfr.mongodb.net/UserlistDB", {useNewUrlParser: true});

const itemsSchema = {
    username:{
        type: String,
        unique: true
    },
    email: {
        type: String,
        unique: true
    },
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
    res.render("home");
})

app.post("/SignInSignUP",async function(req,res){
    const userName=req.body.Username;
    console.log(req.body);
    const password=req.body.password;
    var ipAddress =req.header('x-forwarded-for') || req.connection.remoteAddress;

    const foundList = await Item.findOne({username: userName});
    const isPasswordMatch = await bcrypt.compare(password, foundList.password );
    console.log(isPasswordMatch);
    if(isPasswordMatch) {
        const list = new List({ 
            username: userName,
            ip: ipAddress
        });
        list.save();
        res.redirect("/otp");
        return;
    }
    res.redirect("/");
    // function(foundList){
    //     if(foundList.password==password){
    //         const list = new List({
    //             username: userName,
    //             ip: ipAddress
    //           });
    //           list.save();
    //           res.redirect("/otp");
    //     }
    //     res.render("home");      
    // });
});

app.get("/signup",function(req,res){
    res.render("signup");
})

app.post("/signup",async function(req,res){
    const userName=req.body.Username;
    const email=req.body.Email;
    const name=req.body.Name;
    const number=req.body.Number;
    const password=req.body.Password;
    
    const hashPassword = await bcrypt.hash(password, 10);
    const details=new Item({
        username:userName,
        email: email,
        name:name,
        phoneNo:number,
        password:hashPassword
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