var express = require('express');
var router = express.Router();
var omx = require('omx-manager');

/* GET home page. */
router.get('/', function (request, response) {
    response.render('/client/index.html');
    //response.end();
});

router.get('/player', function (request, response) {
    omx.play('/media/usb/New\\ girl\\ s03e01.mkv');
});

module.exports = router;
