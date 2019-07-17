const express= require('express');
const jwt=require('jsonwebtoken');
const app=express();

app.get('/',(req,res)=>{
    res.json({
        message: "welcome to api"
    });
});


app.post('/api/posts', verifyToken,(req,res)=>{

    jwt.verify(req.token,'secretkey',(err, authData)=>{
        if(err){
            res.sendStatus(403);
        }
        else{
            res.json({
                message:"Posted",
                authData
            });
        }
    });



});


app.post('/api/login',(req,res)=>{
    //mock user
    const user={
        id:1,
        username: 'prelu',
        gmail:'prelu@gmail.com'
    }

    jwt.sign({user},'secretkey',{expiresIn:'30s'},(err,token)=>{
        res.json({
         token
        });
    });
});

//format of token
//Authorizaation : Bearer <access_token>


 
function verifyToken(req,res,next){
    //get the auth header value
    const bearerHeader= req.headers['authorization'];

    //check if bearer is undefined 
    if(typeof bearerHeader!=='undefined'){
        // split the space
        const bearer=bearerHeader.split(' ');

        //get token from array
        const bearerToken=bearer[1];

        //set the token 
        req.token=bearerToken;
        //next middleware
        next();


    }
    else{
        res.sendStatus(403)
    }

}


const port= process.env.PORT || 5000;

app.listen(5000,()=>{
    console.log(`started on ${port}`);
});