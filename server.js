var express = require('express');
var mongoose = require('mongoose');
var body_parser = require('body-parser');

var db = mongoose.connect('mongodb://localhost/bookAPI');

var app = express();
var port = process.env.PORT || 3000;

app.use(body_parser.urlencoded({ extended: true }));
app.use(body_parser.json()); 

var book_route = require('./routes/book-route')();

app.use('/api', book_route);
//app.use('/api', author_route);

// set route to handle root request
app.get('/', function (req, res) {
    res.send('welcome to my API');
});

app.listen(port, function () {
    console.log('The server is listening on port ' + port)
});
