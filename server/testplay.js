var omx = require('omx-manager'),
    Ffmpeg = require('fluent-ffmpeg'),
    fs = require("fs"),
    Path = require('path');

//omx.play('/media/usb/newgirl.mkv');
//var status = omx.getStatus();
//omx.on('play', function (video) {
//    console.log('video is playing!', video, status);
//});


exports.ffprobe = function (filePath, callback) {
    filePath = Path.normalize(filePath);
    fs.exists(filePath, function (exists) {
        if (exists) {
            Ffmpeg.ffprobe(file.path, callback);
        } else {
            callback("File not found")
        }
    });
};

var metadata = function (file) {
    Ffmpeg.ffprobe(file, function (err, metadata) {
        if (err) {
            throw err;
        }
        console.log(metadata);
    });
};

metadata('/media/usb/newgirl.mkv');
