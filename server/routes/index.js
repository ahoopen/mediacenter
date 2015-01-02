/* globals require */

var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (request, response) {
    response.render('index.html');
});

router.get('/remote', function (request, response) {
    console.log('remote');
    response.render('remote.html');
});

router.get('/indexing', function (request, response) {
    response.render('indexing.html');
});

module.exports = router;
