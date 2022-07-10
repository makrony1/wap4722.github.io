const Cart = require('../models/cart');
const OderItem = require('../models/orderItem');
const Product = require('../models/product');

exports.save = (req, res, next) => {
    let userid=req.user;
    var cart = Cart.getByUserId(userid)
    var productID = req.body.productId;
    var pro = Product.getById(productID);
    if(pro!= null&& pro.stock>0){
        let oi = new OderItem(null, pro.title, pro.price, pro.price, pro.id, 1);
        let oidb = cart.addOrderItem(oi);
        if(oidb == null){
            res.status(500).json({success: false,msg:'Invalid product or not enough stock available.'})
        }else{
            res.status(201).json(oidb);
        }
        
    }else{
        res.status(404).json({success: false,msg:'Invalid product or not enough stock available.'});
    }

}

exports.getAll = (req, res, next) => {
    let userid=req.user;
    var cart = Cart.getByUserId(userid)
    res.status(200).json(cart.orderItems);
}

exports.deleteById = (req, res, next) => {

    let ciid= req.params.cartItemId;
    let userId = req.user;

    let cart = Cart.getByUserId(userId);
    const deleted = cart.deleteCartItem(ciid);
    if(deleted!= null){
        res.status(200).json(deleted);
    }else{
        res.status(500).json({success: false,msg:"Product could not found"});
    }
}

exports.updateQuantity=(req,res,next)=>{
    let userId = req.user;
    let oid = req.params.cartItemId;
    let q = req.body.quantity;

    if(q < 0){
        res.status(500).json({success: false,msg:"Cart item quantity can not be 0"});
    }

    let cart = Cart.getByUserId(userId);
    const updated = cart.updateQuantity(oid, q);
    if(updated!= null){
        res.status(200).json(updated);
    }else{
        res.status(500).json({success: false,msg:"Invalid quantity"});
    }

}
