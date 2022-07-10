let db = [];

function outer(){
    let inc=0;
    return function(){
        inc++;
        return inc;
    }
}

const getNextId = outer();

module.exports = class OrderItem {
    constructor(id, title, price, total,  productId, quantity) {
        this.id = id;
        this.title = title;
        this.price = price;
        this.total = total;
        this.productId = productId
        this.quantity = quantity;
    }

    save(){
        this.id = getNextId();
        db.push(this);
        return this;
    }

    edit(){
        const index = db.findIndex(book => book.id == this.id);
        db.splice(index, 1, this);
        return this;
    }

    

    static getAll(){
        return db;
    }

    static deleteById(orderItemId){
        const index = db.findIndex(orderItem => orderItem.id == orderItemId);
        const deleted = db[index];
        db.splice(index, 1);
        return deleted;
    }
}