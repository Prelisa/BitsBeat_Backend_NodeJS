const express= require('express'),
router=express.Router(),
app=express();

router.get('/',(req,res)=>{
    res.send("working")
})
module.exports=router;