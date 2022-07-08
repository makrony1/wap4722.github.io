

var Product = Product || {
    products: [],
    init() {
        Product.getProduct();
        Product.addBtnListener();
    },
    addBtnListener() {
        document.getElementById('addProduct').onclick = function (evt) {
            var u = {
                name: document.getElementById('name').value,
                quatity: document.getElementById('quatity').value,
                price: document.getElementById('price').value
            }
            Product.postData('/product', u)
                .then(data => {
                    Product.products.push(data);
                    Product.updateProductTable(Product.products);
                    document.getElementById('name').value = '';
                    document.getElementById('quatity').value = '';
                    document.getElementById('price').value = '';
                });

        };

    },

    async postData(url = '', data = {}) {
        const response = await fetch(url, {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        return response.json();
    },


    getProduct() {
        fetch('/product/getAll')
            .then(response => response.json())
            .then(data => {
                Product.products = data;
                Product.updateProductTable(data);
            });

    },

    updateProductTable(prod) {

        let str = `<tr>
        <th>Name</th>
        <th>Quantity</th>
        <th>Price</th>
    </tr>`;
    prod.forEach(u => {
            let temp = `<tr>
        <td>${u.name}</td>
        <td>${u.quatity}</td>
        <td>$${u.price}</td>
        </tr>`;
            str += temp
        });

        document.getElementById('product').innerHTML = str;

    }
}

window.onload = function () {
    Product.init();
};