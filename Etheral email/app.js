const express= require('express');
const bodyParser=require('body-parser');
const exphbs=require('express-handlebars');
const path=require('path');
const nodemailer=require('nodemailer');

const app=express();

//View engine setup
app.engine('handlebars',exphbs());
app.set('view engine','handlebars');

//body parser middleware
//parse application
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());


//static folder

app.use('/public',express.static(path.join(__dirname,'public')));



app.get('/',(req,res)=>{
    res.render('contact.hbs')
});


app.post('/send',(req,res)=>{
    const output=`
    <p> You have a new contact Req </p>
    <h3>Contact Details</h3>
    <ul>
        <li>Name: ${req.body.name}</li>
        <li>Company: ${req.body.company}</li>
        <li>Email: ${req.body.email}</li>
        <li>Phone: ${req.body.phone}</li>
    </ul>
    <h3>Message</h3>
    <p>${req.body.message}</p>

    `;
        // create reusable transporter object using the default SMTP transport
        const transporter = nodemailer.createTransport({
            host: 'smtp.ethereal.email',
            port: 587,
            auth: {
                user: 'sincere.hackett@ethereal.email',
                pass: 'YpFAH3b4F5g5WTUej3'
            },
            tls:{
                rejectUnauthorized:false
            }
        });

        // send mail with defined transport object
        let mailOptions={
            from: '"PRelu" <sincere.hackett@ethereal.email>', // sender address
            to: "dprelisa@gmail.com", // list of receivers
            subject: "Hello ✔", // Subject line
            text: "Hello world?", // plain text body
            html: output // html body
        };

        transporter.sendMail(mailOptions,(error,info)=>{
            if(error){
                return console.log(error);
            
            }
            console.log("Message sent: %s", info.messageId);
            console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
            
            res.render('contact.hbs',{msg:'Email has been sent'});

        });
});
const port=process.env.PORT || 3000
app.listen(port,()=>{
    console.log(`server started on ${port}`);
});