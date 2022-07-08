const express = require('express');
const { join } = require('path');
const path = require('path');
const Product = require('./../models/product');

const router = express.Router();


router.get('/', (req, res, next)=>{
    res.sendFile(path.join(__dirname,'..','views','products.html'));
});

router.get('/getAll',(req, res, next)=>{
    res.send(Product.GetProducts());
})

router.post('/',express.json(),(req, res, next)=>{
    const p1 = new Product(req.body.name, req.body.quatity, req.body.price);
    Product.SaveProduct(p1);
    res.send(p1);
})

module.exports = router;