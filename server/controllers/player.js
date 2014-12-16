/* globals module, require */
var omx = require('omx-manager');

module.exports = {

    init: function (io) {

        io.sockets.on('connection', function (socket) {

            socket.on('remote:pause', function () {
                console.log('pause');
                omx.pause();
            });

            socket.on('remote:start', function (video) {
                console.log('start');
                omx.play('/media/usb/newgirl.mkv');
            });

            socket.on('remote:stop', function() {
                omx.stop();
            });
        });
    }
};
