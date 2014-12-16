/* globals require, module */

var express = require('express'),
    http = require('http'),
    path = require('path'),
    routes = require('./server/routes/index'),
    remoteControle = require('./server/controllers/player');


var app = express();

app.use(express.static(path.join(__dirname, 'target')));
app.set('views', __dirname + '/client');
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');

// routes
app.use('/', routes);

app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

var port = Number(process.env.PORT || 1337);
var server = http.createServer(app);
var io = require('socket.io')(server);

server.listen(port, function() {
    console.log("Listening on " + port);
});

remoteControle.init(io);

module.exports = app;
