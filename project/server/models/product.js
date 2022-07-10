let db = [
    {
        id:1,
        title:"Node.js",
        stock:12,
        price:9.99,
        imageUrl:"2.png"
    },
    {
        id:2,
        title:"React",
        stock:12,
        price:9.99,
        imageUrl:'3.jpg'
    },
    {
        id:3,
        title:"Angular",
        stock:12,
        price:9.99,
        imageUrl:'1.png'
    }
];
let counter = 0;

module.exports = class Product {
    constructor(id, title, stock, price, imageUrl) {
        this.id = id;
        this.title = title;
        this.stock = stock;
        this.price = price;
        this.imageUrl = imageUrl;
    }

    save(){
        this.id = ++counter;
        db.push(this);
        return this;
    }

    edit(){
        const index = db.findIndex(prod => prod.id == this.id);
        db.splice(index, 1, this);
        return this;
    }

    

    static getAll(){
        return db;
    }

    static getById(pid){
        return db.find(x=>x.id==pid);
    }
    static deleteById(prodId){
        const index = db.findIndex(prod => prod.id == prodId);
        const deletedProd = db[index];
        db.splice(index, 1);
        return deletedProd;
    }
}