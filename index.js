var net = require('net');
var express = require('express');
var getHealthRoute = require('./getHealthRoute');

var DEFAULT_PORT = 6789;

var servicesList = require('./services.json');

var app = express();

app.get('/', getHealthRoute(servicesList));

var port = process.env.PORT || DEFAULT_PORT;

app.listen(port, function() {
    console.log('Listening on port %d', port);
});

