var omx = require('omx-manager');

omx.play('/media/usb/newgirl.mkv');
var status = omx.getStatus();
omx.on('play', function(video) {
    console.log('video is playing!', video,status);
});
