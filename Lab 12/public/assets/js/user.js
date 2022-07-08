

var User = User || {
    users: [],
    init() {
        User.getUser();
        User.addBtnListener();
    },
    addBtnListener() {
        document.getElementById('addUser').onclick = function (evt) {
            var u = {
                name: document.getElementById('name').value,
                phone: document.getElementById('phone').value,
                address: document.getElementById('address').value
            }
            User.postData('/user', u)
                .then(data => {
                    User.users.push(data);
                    User.updateUserTable(User.users);
                    document.getElementById('name').value = '';
                    document.getElementById('phone').value = '';
                    document.getElementById('address').value = '';
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


    getUser() {
        fetch('/user/getAll')
            .then(response => response.json())
            .then(data => {
                User.users = data;
                User.updateUserTable(data);
            });

    },

    updateUserTable(users) {

        let str = `<tr>
        <th>Name</th>
        <th>Phone</th>
        <th>Address</th>
    </tr>`;
        users.forEach(u => {
            let temp = `<tr>
        <td>${u.name}</td>
        <td>${u.phone}</td>
        <td>${u.address}</td>
        </tr>`;
            str += temp
        });

        document.getElementById('user').innerHTML = str;

    }
}

window.onload = function () {
    User.init();
};