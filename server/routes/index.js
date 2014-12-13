/* globals require */

var express = require('express');
var router = express.Router();
var omx = require('omx-manager');

/* GET home page. */
router.get('/', function (request, response) {
    response.render('/client/index.html');
    //response.end();
});

router.get('/player', function (request, response) {
    omx.play('/media/usb/newgirl.mkv');
    var status = omx.getStatus();
    omx.on('play', function(video) {
        response.send('video is playing!', video,status);
        response.end();
    })
});

module.exports = router;
