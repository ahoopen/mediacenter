/* globals module, require */
var omx = require('omx-manager');

module.exports = {

    init: function (io) {

        io.sockets.on('connection', function (socket) {

            socket.on('remote:pause', function () {
                omx.pause();
            });

            socket.on('remote:start', function () {
                console.log('play video');
                omx.play(['/media/usb/newgirl.mkv'], {
                    '--o' : 'hdmi',
                    '--t' : 'on'
                });
            });

            socket.on('remote:stop', function() {
                omx.stop();
            });
        });
    }
};
