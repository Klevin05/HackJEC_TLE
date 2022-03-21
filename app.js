const express=require("express");
const bodyParser=require("body-parser");
const ejs=require("ejs");
const _ =require("lodash");
const mongoose = require("mongoose");
const { rearg } = require("lodash");
const bcrypt = require('bcrypt');
const requestIp = require('request-ip');
var mongoDumpCollection = require("mongo-dump-collection")

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

app.get("/SignInSignUP",function(req,res){
    res.render("SignInSignUP")
})

app.post("/SignInSignUP",async function(req,res){
    const userName=req.body.Username;
    
    const password=req.body.password;
    var clientIp = requestIp.getClientIp(req);
    

    const foundList = await Item.findOne({username: userName});
    const isPasswordMatch = await bcrypt.compare(password, foundList.password );
    console.log(password);
    console.log(isPasswordMatch);
    if(isPasswordMatch) {
        const list = new List({ 
            username: userName,
            ip: clientIp
        });
        list.save();
        // const options = {
        //     mongoConnectionString: 'mongodb+srv://Klevin05:1186prince@sihtle.oclfr.mongodb.net/UserlistDB',
        //     collectionName: 'lists',
        //     // outputPath: 'C:\Users\KLEVIN PASCAL\OneDrive\Desktop\OTP WEB 2\OTP TEXT'
        // }
        // mongoDumpCollection(options)
        res.redirect("/otp");
        return;
    }
    res.redirect("/");

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
    var clientIp = requestIp.getClientIp(req);
    function stringToHash(string) {
                  
        var hash = 0 ;
        console.log(hash)
          
        if (string.length == 0) return hash;
          
        for (i = 0; i < string.length; i++) {
            char = string.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash;
        }
          
        return hash%10000;
    }
    var s="192.168.29.252";
    var otp=stringToHash(s);
    // var s="192.168.29.252";
    // var otp=stringToHash(s);
    console.log(otp);
    res.render("otp",{OTP:otp});
})

app.post("/otp",function(req,res){
     
    res.redirect("/Thanku")
})

app.get("/Thanku",function(req,res){
    res.render("Thanku")
})
app.listen(3000,function(){
    console.log("Server Started on port 3000");
});