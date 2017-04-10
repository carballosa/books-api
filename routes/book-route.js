module.exports = function () {

    var express = require('express');
    var book_controller = require('../controllers/book-controller')();

    var router = express.Router();

    router.route('/books')
        .post(book_controller.post)
        .get(book_controller.get);

    router.use('/books/:book_id', book_controller.getById);

    router.route('/books/:book_id')
        .get(book_controller.getOne)
        .put(book_controller.put)
        .patch(book_controller.patch)
        .delete(book_controller.remove);

    return router;
};