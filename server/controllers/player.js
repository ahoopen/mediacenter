/* globals module, require */
var omx = require('omx-manager');

var child_process = require('child_process');
var exec = child_process.exec;

module.exports = {

    init: function (io) {

        io.sockets.on('connection', function (socket) {

            socket.on('remote:pause', function () {
                omx.pause();
            });

            socket.on('remote:start', function () {
                console.log('play video');
                omx.play(['/media/usb/newgirl.mkv'], {
                    '-o' : 'hdmi',
                    '-t' : true
                });

                //setInterval( getDuration('/media/usb/newgirl.mkv', function(time) {
                //    console.log(time);
                //}), 1000);
            });

            socket.on('remote:stop', function() {
                omx.stop();
            });
        });
    }
};

var getDuration = function(video, callback) {
    exec('omxplayer --info ' + video, function (err, stdout, stderr) {
        if (!err) {
            var duration = /(Duration:\s)([\d.:]+)/g.exec(stderr);
            if (duration) {
                var durationArray = duration[2].split(':');
                var seconds = Math.ceil(durationArray[0]) * 60 * 60 + Math.ceil(+durationArray[1]) * 60 + Math.ceil(+durationArray[2]);
                callback(seconds);
            } else {
                // couldn't find duration for some reason
                callback(null);
            }
        } else {
            callback(null);
        }
    });
};
