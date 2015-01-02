var path = require('path'),
    Promise = require('promise'),
    tv_title_cleaner = require('./title-cleaner'),
    scan = require('./scan');

var Episode = require('../controllers/Episode');
var Show = require('../controllers/Show');


var SUPPORTED_FILETYPES = new RegExp("(avi|mkv|mpeg|mov|mp4|m4v|wmv)$", "g");  //Pipe seperated
var nrScanned = 0;
var totalFiles = 0;

var setupParse = function (callback, results) {
    if (results.length == 0) {
        callback();
    }
    if (results && results.length > 0) {
        var file = results.pop();
        doParse(file, function () {
            setupParse(callback, results);
        });
    }
    if (!results) {
        callback('no results');
    }
};

var doParse = function (file, callback) {

    var originalTitle = file.filename
        , episodeInfo = tv_title_cleaner.cleanupTitle(originalTitle)
        , episodeReturnedTitle = episodeInfo.title
        , episodeStripped = episodeReturnedTitle.replace(SUPPORTED_FILETYPES, "")
        , episodeTitle = episodeStripped.trimRight();


    var info = getEpisodeInfo(episodeTitle);
    info.location = file.location;
    nrScanned++;

    // get the tv show from the database
    Show.get(info.title)
        .then(function (show) {
            console.log('Show exists [' + show.title + '] ! Just add episode');
            // check if the episode already exists. if so
            // we dont want to add it again
            hasEpisode(show.ref, info).then(function () {
                console.log('next file..');
                callback();
            }, function () {
                addEpisode(show.ref, info, callback);
            });
        }, function () {
            // tv show doesnt exist yet, create it
            addTvShow(info.title).then(function (ShowId) {
                addEpisode(ShowId, info, callback);
            }, function () {
                // error
            });
        });

    progress();
};

var progress = function () {
    var percentage = parseInt((nrScanned / totalFiles) * 100);
    if (percentage > 0) {
        console.log("percentage: ", percentage);
        //io.sockets.emit('progress', {msg: percentage});
    }
};

/**
 *
 *
 * @param ShowId
 * @param info
 * @returns {Promise}
 */
var hasEpisode = function (ShowId, info) {
    return new Promise(function (resolve, reject) {
        Show.hasEpisode(ShowId, info.season, info.episode).then(function (exists) {
            if (exists) {
                resolve();
            } else {
                reject();
            }
        });
    });
};

/**
 * Adds a new tv show
 *
 * @param title
 * @returns {Promise}
 */
var addTvShow = function (title) {
    return new Promise(function (resolve, reject) {
        Show.create(title).then(function (ShowId) {
            resolve(ShowId);
        }, function () {
            reject();
        });
    });
};

/**
 * Adds the episode to the tv show
 *
 * @param ShowId
 * @param info
 * @param callback
 */
var addEpisode = function (ShowId, info, callback) {
    Episode.create(ShowId, info.season, info.episode, info.location).then(function () {
        callback();
    }, function () {
        console.log('ERROR: adding episode..');
    });
};

/**
 * Gives back the episode information.
 *
 * @param episodeTitle
 * @returns {{title: string, season: (*|XML|string|void), episode: (*|XML|string|void)}}
 */
var getEpisodeInfo = function (episodeTitle) {
    var showTitle = episodeTitle.replace(/[sS]([0-9]{2})[eE]([0-9]{2})/, ''),
        episodeSeasonMatch = episodeTitle.match(/[sS]([0-9]{2})/),
        episodeNumberMatch = episodeTitle.match(/[eE]([0-9]{2})/);

    if (episodeSeasonMatch) {
        episodeSeason = episodeSeasonMatch[0].replace(/[sS]/, "");
    }
    if (episodeNumberMatch) {
        episodeNumber = episodeNumberMatch[0].replace(/[eE]/, "");
    }

    var episodeData = {
        title: showTitle.toLowerCase().trim(),
        season: episodeSeason,
        episode: episodeNumber
    };

    return episodeData;
};

/* Lookup */
var loadData = function (callback) {
    nrScanned = 0;
    scan('/Users/auketenhoopen/Desktop/data', ['.mkv', '.mp4', '.avi'], function (err, results) {
        if (err) {
            throw err;
        }

        totalFiles = (results) ? results.length : 0;
        setupParse(callback, results);
    });
};

loadData(function () {
    console.log('DONE!!!!');
});
