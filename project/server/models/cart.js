const Product = require('./product');
let db = [];

function outer() {
    let inc = 0;
    return function () {
        inc++;
        return inc;
    }
}

const getNextId = outer();

module.exports = class Cart {
    constructor(id, userId) {
        this.id = id;
        this.userId = userId;
        this.orderItems = [];
    }

    save() {
        this.id = getNextId();
        db.push(this);
        return this;
    }

    deleteCartItem(ciid) {
        let index = this.orderItems.findIndex(u => u.id == ciid);
        if (index > -1) {
            const deleted = this.orderItems[index];
            this.orderItems.splice(index, 1);
            return deleted;
        }
        return null;
    }
    updateQuantity(orderItemId, newQuantity) {
        var oi = this.orderItems.find(u => u.id == orderItemId);
        if (oi != null) {
            let p = Product.getById(oi.productId);
            if (p.stock >= newQuantity) {
                oi.quantity = newQuantity;
                oi.total = oi.quantity * oi.price;
                return oi;
            }

        }
        return null;
    }

    addOrderItem(orderitem) {

        var p = Product.getById(orderitem.productId);
        var itemdb = this.orderItems.find(oi => oi.productId == orderitem.productId);

        if(p== null || p.stock < 1){
            return null;
        }
        else if (itemdb == null ) {
            this.orderItems.push(orderitem.save());
            return orderitem;
        } else {
            
            if(p.stock>itemdb.quantity){
                itemdb.quantity++;
                itemdb.total = itemdb.quantity * itemdb.price;
                return itemdb;
            }
            return null;
        }
    };
    static getByUserId(userId) {
        let userCart = db.find(cart => cart.userId == userId);
        if (userCart == null) {
            userCart = new Cart(null, userId);
            userCart.save();

        }
        return userCart;
    }


}