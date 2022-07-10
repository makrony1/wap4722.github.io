let db = [
    {
        id: 1,
        title: "C",
        isbn: "122-11-2022",
        publishedDate: "2-12-2022",
        author: "Richi",
      },
      {
        id: 2,
        title: "Algorithm",
        isbn: "123-11-2222",
        publishedDate: "2-12-1993",
        author: "Wrox",
      },
      {
        id: 3,
        title: "The famous book",
        isbn: "124-11-2000",
        publishedDate: "2-12-2002",
        author: "Tina",
      },
      {
        id: 4,
        title: "Complete Java",
        isbn: "01-11-1978",
        publishedDate: "2-12-2022",
        author: "Godwin",
      },
];
let counter = 5;


function outer(){
    let inc=5;
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
        this.isbn = ISBN;
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