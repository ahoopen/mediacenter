/* globals require, module */

var express = require('express'),
    http = require('http'),
    path = require('path'),
    fs = require('fs'),
    routes = require('./server/routes/index'),
    middleware = require('./server/middleware/middleware'),å
    remoteControle = require('./server/controllers/player'),
    config = require('./server/configuration/config'),
    mongoose = require('mongoose');

var connect = function () {
    //var options = {server: {socketOptions: {keepAlive: 1}}};
    mongoose.connect(config.database.db);
};
connect();

// error handling
mongoose.connection.on('error', function (err) {
    //console.log("error mongoose : ", err);
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

app.use(express.static(path.join(__dirname, 'target')));
app.use(express.static(path.join(__dirname, 'cache')));
app.set('views', __dirname + '/client');
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');


middleware(app);

// set up all the routes
routes(app);

app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

var port = Number(process.env.PORT || 1337);
var server = http.createServer(app);
var io = require('socket.io')(server);

server.listen(port, function () {
    console.log("Listening on " + port);
});

//remoteControle.init(io);

module.exports = app;
