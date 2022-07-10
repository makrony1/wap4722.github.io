const { use } = require("../routes/productRouter");

let db = [{
    id: 1,
    name: 'Mak',
    password: '123'
},
{
    id: 2,
    name: 'Amit',
    password: '123'
},
{
    id: 3,
    name: 'Shudi',
    password: '123'
}];

function outer() {
    let inc = 5;
    return function () {
        inc++;
        return inc;
    }
}

const getNextId = outer();

module.exports = class User {
    constructor(id, name, password) {
        this.id = id;
        this.name = name;
        this.password = password;
    }

    save() {
        this.id = getNextId();
        db.push(this);
        return this;
    }

    static getAuthenticate(userId, password) {
        
        const user = db.find(
            (user) =>
              user.name.toUpperCase() == userId.toUpperCase() &&
              user.password.toUpperCase() == password.toUpperCase()
          );
        if(user!= null){
            return {
                name: user.name,
                id: user.id
            };
        }

        return null;
    }
}