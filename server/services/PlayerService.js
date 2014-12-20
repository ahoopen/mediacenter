/* module, require */

var moment = require('moment');

module.exports = {

    player: {
        status: 'stop',
        start: null,
        duration: moment.duration(0)
    },

    onPlay: function () {
        var now;

        if (this.player.status != 'play') {
            this.player.status = 'play';
        }

        now = moment();
        this.player.duration = moment.duration(0);
        this.player.start = now;

        console.log("duration: " + this.getFormattedDuration(this.player.duration));
    },

    onPause: function () {
        var now = moment(),
            old_duration = moment.duration(this.player.duration),
            diff;

        if (this.player.status != 'pause') {
            this.player.status = 'pause';
        }

        if (this.player.start != null) {
            diff = now.diff(this.player.start);
        } else {
            diff = 0;
        }

        this.player.duration = moment.duration(diff);
        this.player.duration.add(old_duration);
        this.player.start = now;

        console.log("duration: " + this.getFormattedDuration(this.player.duration));
    },

    onStop: function () {
        if (this.player != 'stop') {
            this.player.status = 'stop';
        }

        this.player.start = null;
        this.player.duration = moment.duration(0);

        console.log("duration: " + this.getFormattedDuration(this.player.duration));
    },

    onResume: function () {
        if (this.player.status != 'play') {
            this.player.status = 'play';
        }

        var now = moment();
        this.player.start = now;

        console.log("duration: " + this.getFormattedDuration(this.player.duration));
    },

    getFormattedDuration: function (duration) {
        return duration.hours() + ":" + duration.minutes() + ":" + duration.seconds();
    },

    getTotalDuration: function () {

    },

    updateDuration: function () {
        if (this.player.status == 'play') {
            var now = moment(),
                diff,
                old_duration = moment.duration(this.player.duration);

            if (this.player.start != null) {
                diff = now.diff(this.player.start);
            } else {
                diff = 0;
            }

            this.player.duration = moment.duration(diff);
            this.player.duration.add(old_duration);
            this.player.start = now;
        }
    },

    info: function (callback) {
        this.updateDuration();
        return callback(this.player);
    }

};
