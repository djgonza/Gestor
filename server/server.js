var express = require('express');
var router = require('./router/router')
var server = express();
var mongoose = require('mongoose');

//Db
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/users');

//global routes
global.__root = __dirname + '/';
global.__db = __dirname + '/db/';
global.__middleware = __dirname + '/middleware/';
global.__controllers = __dirname + '/controllers/';
global.__public = __dirname + '/public/';

server.set('tokenConfig', './tokenConfig');

server.use(router);

server.listen(5000, function() {
  console.log('Listening on port 5000...');
});