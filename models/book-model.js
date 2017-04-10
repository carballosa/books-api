var mongoose = require('mongoose');

var BookSchema = new mongoose.Schema({ 
    title: {type: String},
    author: {type: String},
    genre: {type: String},
    read: {type: Boolean, default:false}
});

module.exports = mongoose.model('Book', BookSchema); //how is 'Book' used?
