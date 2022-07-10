const express = require("express");
const Cart = require("../models/cart");
const OrderItem = require("../models/orderItem");
const Product = require("../models/product");

const CreateOrder = (req, res, next) => {
    let userId = req.user;
    let userCart = Cart.getByUserId(userId);
    let products = Product.getAll();

    // validating
    let invalidP = []
    userCart.orderItems.forEach((oi)=>{
        let p = products.find(p=>p.id==oi.productId && p.stock >= oi.quantity);
        if(p==null){
            invalidP.push(p);
        }
    });

    if(invalidP.length > 0){
        res.status(500).json({success:false,msg:"Invalid product or product quantity selection"})
    }else{
        userCart.orderItems.forEach((oi)=>{
            let p = products.find(p=>p.id==oi.productId);
            p.stock = p.stock - oi.quantity;
        });

        userCart.orderItems = [];

        res.status(201).json({msg:"Order created"});
    }
};

module.exports = {CreateOrder};
