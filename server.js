var express = require('express');
var path = require('path');
var favicon = require('static-favicon');

var routes = require('./routes/index');
var bodyParser = require('body-parser');

var app = express();
var port = process.env.PORT || 3000;

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(favicon());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);

var server = app.listen(port, function() {
    console.log('Listening on port %d', server.address().port);
});

