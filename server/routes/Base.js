/* globals require, module */

module.exports = function (app) {

    app.get('/', function (request, response) {
        console.log('render index.html');
        response.render('index.html');
    });

    app.get('/home', function (request, response) {
        response.render('home.html');
    });

    app.get('/remote', function (request, response) {
        response.render('remote.html');
    });

    app.get('/indexing', function (request, response) {
        response.render('indexing.html');
    });

    app.get('/episode', function (request, response) {
        response.render('index2.html');
    });

    app.get('/show', function (request, response) {
        response.render('show.html');
    });
};
