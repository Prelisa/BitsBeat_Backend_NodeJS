const express=require('express');
const ejs=require('ejs');
const ejs_layout=require('express-ejs-layouts');
const body_parser=require('body-parser');
const app= express();
app.use(body_parser.json());
app.use(body_parser.urlencoded({extended:false}));
require('dotenv').config()



const users=require('./userinfo');
const path=require('path');

const indexrouter=require('./routes/index')

app.set('view engine','ejs')
app.set('views',__dirname+'/views')
app.set('layout','layouts/layout')
app.use(ejs_layout)
app.use(express.static(path.join(__dirname,'public')))

const validity={
    "length":"10",
    "breadth":"5",
    "hologram":"true",

}
app.use("/",indexrouter)
app.post('/validate',function(req,res,next){
    const{name,ticket,length, breadth, hologram}=req.body;
    if(length==validity.length&& breadth==validity.breadth &&hologram==validity.hologram){
        console.log(name,ticket)
        console.log(users[0].name)
    next()
    }
    else{
        res.send("Not valid info");
    }
}, function(req,res,next){
    const{name,ticket}=req.body;
    for(var i=0; i<users.length;i++){
        if(users[i].name==name && users[i].ticket==ticket){
            res.send('valid user');
            next();
        }
    }
}
)

const Port= process.env.PORT;
console.log(process.env);
app.listen(Port);