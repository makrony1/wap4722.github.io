let allUser=[
    {name:'Mak', phone:'123', address:'1000 N 4th St, Fairfield, IA 52557'},
    {name:'Rony', phone:'1234', address:'1000 N 4th St, Fairfield, IA 52557'}
];
class User{
    
    constructor(name, phone, address){
        this.name = name;
        this.phone = phone;
        this.address = address
    }

    static SaveUser(user){
        allUser.push(user);
    }

    static GetUsers(){
        return allUser;
    }
}

module.exports = User;