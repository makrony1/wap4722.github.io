const express = require('express');
const { join } = require('path');
const path = require('path');
const router = express.Router();


router.get('/', (req, res, next)=>{
    res.sendFile(path.join(__dirname,'..','views','products.html'));
});


module.exports = router;