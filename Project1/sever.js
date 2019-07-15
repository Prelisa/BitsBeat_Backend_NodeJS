

const users= require('./users');
const express=require('express');
const app= express();
app.get('/users/:location',(req,res)=>{
    const locateduser=users.filter((data)=>{
        if(req.params.location===data.location){
            return data;
        }   
    })
    res.send(locateduser);
});

app.get('/users',(req,res)=>{
    let promise=new Promise((resolve,reject)=>{
        resolve(users);
    });
    promise .then((users)=>{
       res.send(users);
    })
    .catch(()=>{
        res.send("Not Valid");
        console.log(users);
    })
   
})
app.listen(5000);



