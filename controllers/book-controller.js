module.exports = function () {

    var Book = require('../models/book-model');

    function post(req, res) {
        var book = new Book(req.body);
        book.save();
        res.status(201).send(book);
    }

    function get(req, res) {
        var query = {};
        if (req.query.genre) {
            query.genre = req.query.genre;
        }
        Book.find(query, function (err, books) {
            if (err)
                res.status(500).send(err);
            res.json(books);
        });
    }

    function getById(req, res, next) {
        Book.findById(req.params.book_id, function (err, book) {
            if (err)
                res.status(500).send(err);
            if (!book)
                res.status(404).send("book not found");
            req.book = book;
            next();
        });
    }

    function getOne(req, res) {
        res.json(req.book);
    }

    function put(req, res) {
        // update all fields, except _id
        // NOTE: fields missing in the request will be deleted
        req.book.title = req.body.title;
        req.book.author = req.body.author;
        req.book.genre = req.body.genre;
        req.book.read = req.body.read;

        req.book.save(function (err) {
            if (err)
                res.status(500).send(err);
            res.json(req.book);
        });
    }

    function patch(req, res) {
        // update the fields included in the request, excluding _id
        // TODO: accept only fields defined in the book schema
        if (req.body._id)
            delete req.body._id;
        for (var k in req.body) {
            req.book[k] = req.body[k];
        }

        req.book.save(function (err) {
            if (err)
                res.status(500).send(err);
            res.json(req.book);
        });
    }

    function remove(req, res) {
        req.book.remove(function (err) {
            if (err)
                res.status(500).send(err);
            res.status(204).send("Removed");
        });
    }

    return {
        post: post,
        get: get,
        getById: getById,
        getOne: getOne,
        put: put,
        patch: patch,
        remove: remove
    }
}