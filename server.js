// var express = require('express');
// var path = require('path');
// var favicon = require('static-favicon');

// var routes = require('./routes/index');
// var bodyParser = require('body-parser');

// var app = express();
// var port = process.env.PORT || 1337;

// // view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

// app.use(favicon());
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(express.static(path.join(__dirname, 'public')));

// app.use('/', routes);

// var server = app.listen(port, function() {
//     console.log('Listening on port %d', server.address().port);
// });


#!/usr/bin/env node
var debug = require('debug')('recipes');
var app = require('./app');

app.set('port', process.env.PORT || 3000);

var server = app.listen(app.get('port'), function() {
  debug('Express server listening on port ' + server.address().port);
});
