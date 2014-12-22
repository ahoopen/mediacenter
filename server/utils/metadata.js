var path = require('path'),
    Trakt = require('trakt'),
    tv_title_cleaner = require('./title-cleaner'),
    scan = require('./scan');

var SUPPORTED_FILETYPES = new RegExp("(avi|mkv|mpeg|mov|mp4|m4v|wmv)$", "g");  //Pipe seperated
var nrScanned = 0;
var totalFiles = 0;

var setupParse = function(callback, results) {
    if (results.length == 0) {
        callback();
    }
    if (results && results.length > 0) {
        var file = results.pop();
        doParse(file, function() {
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
        , episodeStripped = episodeReturnedTitle.replace(/.(avi|mkv|mpeg|mpg|mov|mp4|wmv)$/, "")
        , episodeTitle = episodeStripped.trimRight();

    getDataForNewShow(originalTitle, episodeTitle, function () {
        nrScanned++;

        var perc = parseInt((nrScanned / totalFiles) * 100);
        if (perc > 0) {
            console.log("percentage: ", perc);
            //io.sockets.emit('progress', {msg: perc});
        }
        callback();
    });
};


/**
 * Fetches the (new) show Metadata not stored in db based on episode
 * @param originalTitle      Original episode filename
 * @param episodeTitle       Cleaned up name of episode
 */
getDataForNewShow = function (originalTitle, episodeTitle, callback) {

    //var episodeDetails = episoder.parseFilename(originalTitle);
    //
    //var trimmedTitle = episodeDetails.show;
    //if (trimmedTitle !== undefined) {
    //    trimmedTitle = trimmedTitle.toLowerCase().trim();
    //} else {
    //    trimmedTitle = "Unknown show";
    //}

    var showData = {
        name: episodeTitle,
        posterURL: '/tv/css/img/nodata.jpg',
        genre: 'Unknown',
        certification: 'Unknown'
    };
    getMetadataFromTrakt(episodeTitle, function (err, traktResult) {
        if (err) {
            //logger.error('Error returning Trakt data', err);
        } else {
            if (traktResult !== null) {
                if (traktResult.images !== undefined
                    && traktResult.images.banner !== undefined) {
                    showData.posterURL = traktResult.images.poster;
                }
                if (traktResult.genres !== undefined) {
                    showData.genre = traktResult.genres.join(",");
                }
                if (traktResult.certification !== undefined) {
                    showData.certification = traktResult.certification;
                }
                if (traktResult.title !== undefined) {
                    showData.name = traktResult.title.toLowerCase();
                }

                console.log(showData);
                getEpisodeInfo(episodeTitle, callback)
            }
        }
    });
};


getEpisodeInfo = function(episodeTitle, callback) {
    var showTitle    = episodeTitle.replace(/[sS]([0-9]{2})[eE]([0-9]{2})/, ''),
        episodeSeasonMatch = episodeTitle.match(/[sS]([0-9]{2})/),
        episodeNumberMatch = episodeTitle.match(/[eE]([0-9]{2})/);

    if( episodeSeasonMatch ){
        episodeSeason = episodeSeasonMatch[0].replace(/[sS]/,"");
    }
    if(episodeNumberMatch ){
        episodeNumber = episodeNumberMatch[0].replace(/[eE]/,"");
    }

    var episodeData = {
        title : showTitle.toLowerCase().trim().replace(/\s/g, '-'),
        season : episodeSeason,
        episode : episodeNumber
    };

    console.log(episodeData);

    getEpisodeInfoFromTrakt(episodeData, function(err, data) {
        console.log( data );
        callback();
    });
};

getMetadataFromTrakt = function (tvShow, callback) {
    var trakt = new Trakt({username: 'mediacenterjs', password: 'mediacenterjs'});

    trakt.request('search', 'shows', {query: tvShow}, function (err, result) {
        if (err) {
            callback(err, null);
        } else {
            var tvSearchResult = result[0];

            if (tvSearchResult !== undefined && tvSearchResult !== '' && tvSearchResult !== null) {
                callback(err, tvSearchResult);
            } else {
                callback(err, null);
            }
        }
    });
};

getEpisodeInfoFromTrakt = function(options, callback) {
    var trakt = new Trakt({ username: 'johnGestalt', password: '524f12bb3bb1ae9cbb9dad225186a972abc9771a'});

    trakt.request('show', 'episode/summary', options, function(err, result) {
        if (err) {
            console.log('error retrieving tvshow info', err);
            callback(err, null);
        } else {
            var tvSearchResult = result;
            console.log('summary', result);

            callback(err, tvSearchResult );
        }
    });
};


/* Lookup */
var loadData = function (callback) {
    nrScanned = 0;
    scan('path', ['.mkv', '.mp4', '.avi'], function (err, results) {
        if(err) {
            throw err;
        }
        totalFiles = (results) ? results.length : 0;
        setupParse(callback, results);
    });
};
loadData( function() {
    console.log('DONE!!!!');
});
