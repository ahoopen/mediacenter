/* globals module, require */
var omx = require('omx-manager'),
    PlayerService = require('../services/PlayerService');

var child_process = require('child_process'),
    exec = child_process.exec;

module.exports = {

    subtitles: false,

    init: function (io) {

        this.assignListeners();

        io.sockets.on('connection', function (socket) {

            socket.on('remote:pause', function () {
                omx.pause();
                //console.log('pause!!');
                //PlayerService.onPause();
            });

            /**
             *
             */
            socket.on('remote:start', function (video) {
                console.log('play video');
                omx.play(['/media/usb/newgirl.mkv'], {
                    '-t': 'on',
                    '-o': 'hdmi'
                });
                //PlayerService.info( function(player) {
                //    if( player.status == null ) {
                //        PlayerService.onPlay();
                //    } else {
                //        console.log('resume!!');
                //        PlayerService.onResume();
                //    }
                //});
                //
                //setInterval( function() {
                //    PlayerService.info( function(player) {
                //        socket.emit('duration', player.duration );
                //    });
                //}, 1000);
            });

            socket.on('remote:stop', function () {
                omx.stop();
                //PlayerService.onStop();
            });
        });
    },

    assignListeners: function () {
        this.onStart();
        this.onPause();
        this.onStop();
        this.onEnd();
    },

    onStart: function () {
        omx.on('play', function () {
            console.log('omx:play event');
            if (!this.subtitles) {
                omx.toggleSubtitles();
            }
            PlayerService.onPlay();
        });
    },

    onPause: function () {
        omx.on('pause', function () {
            console.log('omx:pause event');
            PlayerService.onPause();
        })
    },

    onStop: function () {
        omx.on('stop', function () {
            console.log('omx:stop event');
            PlayerService.onStop();
        });
    },

    onEnd: function () {
        omx.on('end', function () {
            console.log('omx:end event');
            PlayerService.onStop();
        });
    }
};
