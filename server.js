/* globals require, module */

var express = require('express'),
    http = require('http'),
    path = require('path'),
    fs = require('fs'),
    routes = require('./server/routes/index'),
    middleware = require('./server/middleware/middleware'),
    remoteControle = require('./server/controllers/player'),
    config = require('./server/configuration/config'),
    mongoose = require('mongoose');

var connect = function () {
    var options = {server: {socketOptions: {keepAlive: 1}}};
    mongoose.connect(config.database.db);
};
connect();

// error handling
mongoose.connection.on('error', function (err) {
    console.log("error mongoose : ", err);
});

mongoose.connection.on('disconnected', function () {
    connect();
});

// bootstrap de modellen
var models_path = __dirname + '/server/models';
fs.readdirSync(models_path).forEach(function (file) {
    if (~file.indexOf('.js')) {
        require(models_path + '/' + file);
    }
});

var app = express();

// serve static files
app.use(express.static(path.join(__dirname, 'target')));
app.use(express.static(path.join(__dirname, 'cache')));
app.use(express.static(path.join(__dirname, 'client')));

app.set('views', __dirname + '/client');
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');


middleware(app);
// set up all the routes
routes(app);

var port = Number(process.env.PORT || 1337);
var server = http.createServer(app);
var io = require('socket.io')(server);

server.listen(port, function () {
    console.log("Listening on " + port);
});

io.on('connect', function (socket) {

    socket.on('screen', function () {
        console.log('screen connected! ');
        socket.type = 'screen';

        ss = socket;
    });

    socket.on('remote', function () {
        console.log('remote control connected :) ');
        socket.type = 'remote';
    });

    socket.on('remote_control_action', function (data) {
        console.log('remote control action!');

        if (socket.type == 'remote') {
            if (data.action === 'next') {
                if ( typeof ss != undefined) {
                    console.log('remote next');
                    ss.emit('remote:next');
                }
            }
            if (data.action === 'previous') {
                if (typeof ss != undefined) {
                    console.log('remote previous');
                    ss.emit('remote:previous');
                }
            }
        }
    });

});

//remoteControle.init(io);

module.exports = app;
