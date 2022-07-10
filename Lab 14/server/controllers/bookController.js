const Book = require('../models/book');

exports.save = (req, res, next) => {
    const addedProd = new Book(null, req.body.title, req.body.ISBN, req.body.publishedDate, req.body.author).save();
    res.status(201).json(addedProd);
}

exports.getAll = (req, res, next) => {
    res.status(200).json(Book.getAll());
}

exports.getById = (req, res, next) => {
    res.status(200).json(Book.getById(req.params.bookId));
}

exports.deleteById = (req, res, next) => {
    res.json(Book.deleteById(req.params.bookId));
}

exports.edit = (req, res) => {
    
    const editedBook = new Book(req.params.bookId, req.body.title, req.body.ISBN, req.body.publishedDate, req.body.author).edit();
    res.json(editedBook);
}