var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ObjectId = mongoose.SchemaTypes.ObjectId;

var EpisodeSchema = new Schema({
    ref: {type: Number, required: true, index: true},
    created: {type: Date, default: Date.now},
    title: {type: String, required: true, index: true},
    season: {type: Number, required: true, index: true},
    number: {type: Number, required: true, index: true},
    summary: {type: String},
    screen: {type: String},
    location: {type: String}
});

/**
 * Checks if show already exists in the database
 *
 * @param id
 * @returns {Mongoose.Promise}
 */
EpisodeSchema.statics.exists = function (id) {
    var promise = new mongoose.Promise;

    this.find({ref: id})
        .exec(function (err, result) {
            if (err) {
                promise.error(err);
            }

            if (result !== null && result.length) {
                promise.complete();
            } else {
                promise.error();
            }
        });

    return promise;
};

exports.Episode = mongoose.model('Episode', EpisodeSchema);

var ShowSchema = new Schema({
    ref: {type: Number, required: true, index: true},
    title: {type: String, required: true, index: true},
    summary: {type: String},
    genre: {type: Array},
    poster: {type: String},
    background: {type: String},
    rating: {type: String},
    episode_run_time: {type: String},
    episodes: [{type: ObjectId, ref: "Episode", index: true}]
});


/**
 * Adds an episode to the tv show
 *
 * @param showId
 * @param episode
 * @returns {Mongoose.Promise}
 */
ShowSchema.statics.addEpisode = function (showId, episode) {
    var Episode = mongoose.model('Episode'),
        promise = new mongoose.Promise;

    this.findOne({ref: showId})
        .exec(function (err, show) {
            if (err) {
                promise.error(err);
            }

            var ep = new Episode({
                ref: episode.id,
                title: episode.name,
                season: episode.season_number,
                number: episode.episode_number,
                summary: episode.overview,
                screen: episode.still_path,
                location: episode.location
            });
            ep.save(function (err) {
                if (err) {
                    promise.error(err);
                }

                show.episodes.push({'_id': ep._id});
                show.save(function (err) {
                    if (err) {
                        promise.error(err);
                    }
                    promise.complete();
                });
            });
        });

    return promise;
};

/**
 * Checks if show already exists in the database
 *
 * @param id
 * @returns {Mongoose.Promise}
 */
ShowSchema.statics.isNew = function (show) {
    var promise = new mongoose.Promise;

    this.findOne({ref: show.id})
        .exec(function (err, result) {
            if (err) {
                promise.error(err);
            }

            if (result === null) {
                promise.complete(show);
            } else {
                promise.error();
            }
        });

    return promise;
};

/**
 * Checks if the episode already exists on the tv show
 *
 * @param showId
 * @param season_number
 * @param episode_number
 * @returns {Mongoose.Promise}
 */
ShowSchema.statics.hasEpisode = function (showId, season_number, episode_number) {
    var promise = new mongoose.Promise;

    this.findOne({ref: showId})
        .populate({
            path: 'episodes',
            match: {
                season: parseInt(season_number, 10),
                number: parseInt(episode_number, 10)
            }
        })
        .exec(function (err, result) {
            if (err) {
                promise.error(err);
            }

            if (result === null) {
                promise.error();
            } else if (result.episodes.length == 0) {
                promise.error();
            }
            else {
                promise.complete(result);
            }
        });

    return promise;
};

/**
 * Return the tv show
 *
 * @param title
 * @returns {Mongoose.Promise}
 */
ShowSchema.statics.getShow = function (title) {
    var promise = new mongoose.Promise;

    this.findOne({title: title.toLowerCase()})
        .exec(function (err, result) {
            if (err) {
                promise.error(err);
            }

            if (result === null) {
                promise.error();
            } else {
                promise.complete(result);
            }
        });

    return promise;
};

/**
 * Returns all the tv shows
 *
 * @returns {Mongoose.Promise}
 */
ShowSchema.statics.getAll = function () {
    var promise = new mongoose.Promise;

    this.find()
        .select('ref title summary poster genre background')
        .exec(function (err, result) {
            if (err) {
                promise.error(err);
            }
            promise.complete(result);
        });

    return promise;
};

/**
 * Gives back an episode list of the given season
 *
 *
 * @param showId
 * @param season_number
 * @returns {Mongoose.Promise}
 */
ShowSchema.statics.season = function (showId, season_number) {
    var promise = new mongoose.Promise;

    this.findOne({ref: showId})
        .populate({
            path: 'episodes',
            match: {
                season: parseInt(season_number, 10)
            }
        })
        .exec(function (err, result) {
            if (err) {
                promise.error(err);
            }

            result.episodes = result.episodes.sort(function (a, b) {
                if (a.number < b.number) {
                    return -1;
                } else if (a.number > b.number) {
                    return 1;
                }
                return 0;
            });

            promise.complete(result);
        });

    return promise;
};

/**
 * Return an episode of a tv show
 *
 * @param showId
 * @param season_number
 * @param episode_number
 * @returns {Mongoose.Promise}
 */
ShowSchema.statics.episode = function (showId, season_number, episode_number) {
    var promise = new mongoose.Promise;

    this.findOne({ref: showId})
        .populate({
            path: 'episodes',
            match: {
                season: parseInt(season_number),
                number: parseInt(episode_number)
            }
        })
        .exec(function (err, result) {
            if (err) {
                promise.error(err);
            }

            console.log(result);
        });

    return promise;
};


/**
 * Return an episode of a tv show
 *
 * @param showId
 * @param season_number
 * @param episode_number
 * @returns {Mongoose.Promise}
 */
ShowSchema.statics.episodeList = function (showId, season_number) {
    var promise = new mongoose.Promise;

    this.findOne({ref: showId})
        .select('ref episodes')
        .populate({
            path: 'episodes',
            match: {
                season: parseInt(season_number)
            }
        })
        .exec(function (err, result) {
            if (err) {
                promise.error(err);
            }

            result.episodes = result.episodes.sort(function (a, b) {
                if (a.number < b.number) {
                    return -1;
                } else if (a.number > b.number) {
                    return 1;
                }
                return 0;
            });

            promise.complete(result);
        });

    return promise;
};

ShowSchema.statics.firstEpisode = function (showId) {
    var promise = new mongoose.Promise;

    this.findOne({ref: showId})
        .populate('episodes')
        .exec(function (err, result) {
            if (err) {
                promise.error(err);
            }

            result = result.episodes.sort(function (a, b) {
                if (a.number < b.number) {
                    return -1;
                } else if (a.number > b.number) {
                    return 1;
                }
                return 0;
            });

            if(result.length) {
                // return first result
                promise.complete(result.slice(0, 1).shift());
            } else {
                promise.complete(result);
            }
        });

    return promise;
};

ShowSchema.statics.controls = function (showId) {
    var promise = new mongoose.Promise;

    this.findOne({ref: showId})
        .select('title episodes')
        .populate('episodes')
        .exec(function (err, result) {
            if (err) {
                promise.error(err);
            }
            var showTitle = result.title;

            result = result.episodes.sort(function (a, b) {
                if (a.number < b.number) {
                    return -1;
                } else if (a.number > b.number) {
                    return 1;
                }
                return 0;
            });

            result = result.slice(0, 1).shift();

            var list = [];
                list.push( result );
                list.push( {
                    title : 'Add to Queue',
                    icon : 'fa fa-plus'
                });
                list.push( {
                    title : 'All seasons and episodes',
                    show : showTitle,
                    icon : 'fa fa-bars'
                });

            promise.complete( list );

        });

    return promise;
};

exports.Show = mongoose.model('Show', ShowSchema);
