
class Product{
    
    constructor(name, quantity, price){
        this.name = name;
        this.quatity = quantity;
        this.price = price
    }

    static SaveProduct(product){
        allProducts.push(product);
    }

    static GetProducts(){
        return allProducts;
    }
}
let allProducts=[
    new Product('Node.js', '15', '19.99'),
    new Product('Angular', '10', '9.89')
];
module.exports = Product;