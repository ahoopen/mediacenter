var express = require('express'),
    http = require('http'),
    routes = require('./server/routes/index');


var app = express();

// routes
app.use('/', express.static(__dirname + '/client'));
app.use('/', routes);

app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

var port = Number(process.env.PORT || 1337);
var server = http.createServer(app);
var io = require('socket.io').listen(server);

server.listen(port, function() {
    console.log("Listening on " + port);
});

module.exports = app;

//var http = require('http');
//http.createServer(function (req, res) {
//    res.writeHead(200, {'Content-Type': 'text/plain'});
//    res.end('Hello? Yes, this is Pi!\n');
//}).listen(1337);
