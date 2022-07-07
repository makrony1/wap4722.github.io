const express = require('express');
const path = require('path');
const router = express.Router();



router.post('/save',express.json(),(req,res,next)=>{
    res.send('got it');
})

router.get('/',(req, res, next)=>{
    res.sendFile(path.join(__dirname,'..','views','users.html'));
})

module.exports = router;