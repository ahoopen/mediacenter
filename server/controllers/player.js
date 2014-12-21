/* globals module, require */
var omx = require('omx-manager'),
    PlayerService = require('../services/PlayerService');

var child_process = require('child_process'),
    exec = child_process.exec;

module.exports = {

    subtitles: false,
    running : false,

    init: function (io) {

        this.assignListeners();

        PlayerService.getTotalDuration('/media/usb/newgirl.mkv');

        io.sockets.on('connection', function (socket) {

            socket.on('remote:pause', function () {
                omx.pause();
            });

            /**
             *
             */
            socket.on('remote:start', function (video) {
                PlayerService.info( function(player) {
                    if( player.status === 'stop' ) {
                        console.log('play video');
                        omx.play(['/media/usb/newgirl.mkv'], {
                            '-t': 'on',
                            '-o': 'hdmi'
                        });
                    } else {
                        console.log('resume!!');
                        PlayerService.onResume();
                    }
                });

                if( ! this.running ) {
                    this.running = true;

                    setInterval( function() {
                        var status = omx.getStatus();
                        if( status.playing ) {
                            socket.emit('progress', PlayerService.getPlayingProgress() );
                            socket.emit('duration', PlayerService.getFormattedDuration() );
                        }
                    }, 1000);
                }
            });

            socket.on('remote:stop', function () {
                omx.stop();
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
                this.subtitles = true;
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
