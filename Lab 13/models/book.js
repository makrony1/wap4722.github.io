let db = [];
let counter = 0;


function outer(){
    let inc=0;
    return function(){
        inc++;
        return inc;
    }
}

const getNextId = outer();

module.exports = class Book {
    constructor(id, title, ISBN, publishedDate, author) {
        this.id = id;
        this.title = title;
        this.ISBN = ISBN;
        this.publishedDate = publishedDate;
        this.author = author;
    }

    save(){
        this.id = getNextId(); //start with 1;
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

    static getById(bookId){
        return db.find(book=> book.id== bookId);
    }

    static deleteById(bookId){
        const index = db.findIndex(book => book.id == bookId);
        const deletedBook = db[index];
        db.splice(index, 1);
        return deletedBook;
    }
}