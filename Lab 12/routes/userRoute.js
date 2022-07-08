const express = require('express');
const path = require('path');
const User = require('./../models/user')
const router = express.Router();

router.get('/',(req, res, next)=>{
    res.sendFile(path.join(__dirname,'..','views','users.html'));
})


router.get('/getAll',(req, res, next)=>{
    res.send(User.GetUsers());
})

router.post('/',express.json(),(req, res, next)=>{
    const u1 = new User(req.body.name, req.body.phone,req.body.address);
    User.SaveUser(u1);
    res.send(u1);
})

module.exports = router;