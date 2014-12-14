/* globals require */

var express = require('express');
var router = express.Router();
var omx = require('omx-manager');

/* GET home page. */
router.get('/', function (request, response) {
    response.render('/client/index.html');
    //response.end();
});

router.get('/remote', function (request, response) {
    console.log('remote');
    response.render('remote.html');
});

module.exports = router;
