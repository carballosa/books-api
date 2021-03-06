var mongoose = require('mongoose');

var BookSchema = new mongoose.Schema({ 
    title: String,
    author: String,
    genre: String,
    read: {type: Boolean, default:false}
});

module.exports = mongoose.model('Book', BookSchema); //how is 'Book' used?
