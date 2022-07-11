let Store = {
    logoutBtn: document.getElementById('btnLogout'),
    loginBtn: document.getElementById('btnLogin'),
    main_beore: document.getElementById('before-login'),
    main_after: document.getElementById('after-login'),
    login_form: document.getElementById('login-form'),
    welcome: document.getElementById('welcome'),
    cartItems: [],
    init() {
        Store.cartItems = [];
        Store.logoutBtn = document.getElementById('btnLogout');
        Store.loginBtn = document.getElementById('btnLogin');
        Store.main_beore = document.getElementById('before-login');
        Store.main_after = document.getElementById('after-login');
        Store.login_form = document.getElementById('login-form');
        Store.welcome = document.getElementById('welcome');

        if (sessionStorage.getItem("token") == null) {
            Store.logoutBtn.style.display = 'none';
            Store.loginBtn.style.display = 'block';
            Store.main_beore.style.display = 'block';
            Store.main_after.style.display = 'none';
            Store.login_form.style.display = 'block';
        } else {
            Store.logoutBtn.style.display = 'block';
            Store.loginBtn.style.display = 'none';
            Store.main_beore.style.display = 'none';
            Store.main_after.style.display = 'block';
            Store.login_form.style.display = 'none';
            let name = sessionStorage.getItem("token").split('-')[1];
            Store.welcome.innerHTML = 'Welcome ' + name;
            Store.loadProductTable();
            Store.loadCard();
        }



        Store.bindEvent();

    },

    addCart(prodId) {
        Store.postData('http://localhost:3000/CartItems', { productId: prodId }, "Post")
            .then(data => {
                if (data != null) {
                    if (data.success == false) {
                        swal(data.msg, "Please try again", "warning");
                    } else {

                        var indx = Store.cartItems.findIndex(i => i.id == data.id);
                        if (indx < 0) {
                            Store.cartItems.push(data);
                        } else {
                            Store.cartItems[indx] = data;
                        }
                        Store.refreshCard();
                    }
                }

            });

    },
    bindEvent() {
        Store.loginBtn.addEventListener("click", function () {

            var data = {
                userId: document.getElementById('userId').value,
                password: document.getElementById('password').value
            }
            Store.postData('http://localhost:3000/users/authenticate', data, "POST")
                .then(data => {
                    if (data != null) {

                        if (data.success == false) {
                            swal("Invalid username or password", "", "warning");
                        } else {

                            Store.logoutBtn.style.display = 'block';
                            Store.loginBtn.style.display = 'none';
                            Store.main_beore.style.display = 'none';
                            Store.main_after.style.display = 'block';
                            Store.login_form.style.display = 'none';
                            sessionStorage.setItem("token", data.accessToken);
                            let name = sessionStorage.getItem("token").split('-')[1];
                            Store.welcome.innerHTML = 'Welcome ' + name;
                            Store.loadProductTable();
                            Store.loadCard();
                        }


                    } else {
                        //alert("Invalid username or password");
                        swal("Invalid username or password", "", "warning");
                    }

                });
        })

        Store.logoutBtn.addEventListener("click", function () {
            Store.logout();
            
        })

    },

    logout(){
        Store.logoutBtn.style.display = 'none';
            Store.loginBtn.style.display = 'block';
            Store.main_beore.style.display = 'block';
            Store.main_after.style.display = 'none';
            Store.login_form.style.display = 'block';
            Store.welcome.innerHTML = ''
            sessionStorage.clear();
    },

    deleteOi(oderitemId) {
        let ctitem = Store.cartItems.find(ci => ci.id == oderitemId);
        let q = ctitem.quantity;
        q--;
        Store.postData('http://localhost:3000/CartItems/' + oderitemId, null, "DELETE")
            .then(data => {
                if (data != null) {
                    if (data.success == false) {
                        swal(data.msg, "Please try again", "warning");
                        //alert(data.msg);
                    } else {
                        console.log('index', Store.cartItems.indexOf(ctitem));
                        Store.cartItems.splice(Store.cartItems.indexOf(ctitem), 1);
                        Store.refreshCard();
                    }
                }
            });
    },

    reduceQuantity(oderitemId) {
        let ctitem = Store.cartItems.find(ci => ci.id == oderitemId);
        if (ctitem.quantity <= 1) {
            Store.deleteOi(oderitemId);
        } else {
            let q = ctitem.quantity;
            q--;
            Store.postData('http://localhost:3000/CartItems/' + oderitemId, { quantity: q }, "PATCH")
                .then(data => {
                    if (data != null) {

                        if (data.success == false) {
                            swal(data.msg, "Please try again", "warning");

                        } else {
                            Store.cartItems[Store.cartItems.indexOf(ctitem)] = data;
                            Store.refreshCard();
                        }
                    }
                });
        }
    },
    incrementQuantity(oderitemId) {
        let ctitem = Store.cartItems.find(ci => ci.id == oderitemId);
        let q = ctitem.quantity;
        q++;
        Store.postData('http://localhost:3000/CartItems/' + oderitemId, { quantity: q }, "PATCH")
            .then(data => {

                if (data != null) {
                    if (data.success == false) {
                        swal(data.msg, "Please try again", "warning");

                    } else {
                        Store.cartItems[Store.cartItems.indexOf(ctitem)] = data;
                        Store.refreshCard();
                    }
                }
            });
    },
    loadProductTable() {
        Store.postData('http://localhost:3000/products', null, "GET")
            .then(data => {
                let str = `<tr>
        <th>Name</th>
        
        <th>Price</th>
        <th>Image</th>
        <th>Stock</th>
        <th style="width:20%">Action</th>
    </tr>`;
                data.forEach(u => {
                    let temp = `<tr>
        <td>${u.title}</td>
        
        <td>${u.price}</td>
        <td><img width="50px" src="http://localhost:3000/${u.imageUrl}" alt="Product image"/></td>
        <td>${u.stock}</td>
        <td><button data-id="u.id" onclick="Store.addCart(${u.id})" class="add_cart">Add to cart</button></td>
        </tr>`;
                    str += temp
                });

                document.getElementById('product').innerHTML = str;
            });

    },
    refreshCard() {

        if (Store.cartItems.length > 0) {
            document.getElementById('shopping-cart').style.display = 'block';
            document.getElementById('no-shopping-cart').style.display = 'none';
            let str = `<tr>
        <th style="width:30%">Name</th>
        <th style="width:25%">Price</th>
        <th style="width:25%">Total</th>
        <th style="width:20%">Qantity</th>
    </tr>`;
            let t = 0;
            Store.cartItems.forEach(u => {
                let temp = `<tr>
        <td>${u.title}</td>
        <td>${u.price}</td>
        <td>${u.total}</td>
        <td><button onclick="Store.reduceQuantity(${u.id})" >-</button><input onblur="Store.inputblur(${u.id})" value="${u.quantity}" type="text" id="q_${u.id}" style="max-width:40px;" /><button onclick="Store.incrementQuantity(${u.id})">+</button></td>
        
        </tr>`;

                str += temp;
                t += u.total;
            });
            t = (Math.round(t * 100) / 100).toFixed(2);
            str += `<tr style="text-align:right;"><td style="padding-right:100px; text-align:right;" colspan="4">Total: ${t}</td></tr>`
            document.getElementById('cart').innerHTML = str;

        } else {

            document.getElementById('cart').innerHTML = "";
            document.getElementById('shopping-cart').style.display = 'none';
            document.getElementById('no-shopping-cart').style.display = 'block';
        }


    },
    inputblur(oiId) {
        let ctitem = Store.cartItems.find(ci => ci.id == oiId);
        let q = ctitem.quantity;

        let c = document.getElementById('q_' + oiId).value;
        if (c == 0) {
            Store.deleteOi(oiId);
            return;
        }

        if (c < 0) {
            swal("Ooops", "Invalid quantity", "warning");
            document.getElementById('q_' + oiId).value = q;
            return;
        }


        Store.postData('http://localhost:3000/CartItems/' + oiId, { quantity: c }, "PATCH")
            .then(data => {
                if (data != null) {

                    if (data.success == false) {
                        document.getElementById('q_' + oiId).value = q;
                        swal(data.msg, "Please try again", "warning");

                    } else {
                        Store.cartItems[Store.cartItems.indexOf(ctitem)] = data;
                        Store.refreshCard();
                    }
                }
            });

    },
    loadCard() {

        Store.postData('http://localhost:3000/CartItems', null, "GET")
            .then(data => {
                if (data.length > 0) {
                    Store.cartItems = Store.cartItems.concat(data);
                }
                Store.refreshCard();
            });

    },
    async postData(url = '', data = {}, method) {

        let token = sessionStorage.getItem('token');
        if(!url.includes('authenticate')){
            if(token==null || token==undefined || token==''){
                Store.logout();
                return;
            }
        }
        let init = {
            method: method,
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        };

        if (method.toUpperCase() != "GET" && data != null) {
            init.body = JSON.stringify(data);
        }
        const response = await fetch(url, init);
        return response.json();
    },
    placeOrder() {

        Store.postData('http://localhost:3000/orders', {}, "POST")
            .then(data => {
                if (data != null) {
                    if (data.success == false) {
                        //alert(data.msg);
                        swal(data.msg, "Please try again", "warning");

                    } else {
                        Store.cartItems = [];
                        Store.refreshCard();
                        Store.loadProductTable();
                        swal("Thank you", "We have received your order", "success");
                        //alert("We received your order.")
                    }
                }
            });

    }
}


window.onload = function () {
    Store.init();
}