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

    this.findOne({ref: id})
        .exec(function (err, result) {
            if (err) {
                promise.error(err);
            }

            (result !== null) ? promise.complete() : promise.error()
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
    episodes: [{type: ObjectId, ref: "Episode", index: true}]
});

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
ShowSchema.statics.exists = function (id) {
    var promise = new mongoose.Promise;

    this.findOne({ref: id})
        .exec(function (err, result) {
            if (err) {
                promise.error(err);
            }

            (result !== null) ? promise.complete() : promise.error()
        });

    return promise;
};

ShowSchema.statics.season = function (showId, season_number) {
    var promise = new mongoose.Promise;

    this.find({ref: showId})
        .populate({
            path: 'episodes',
            match: {
                season: season_number
            }
        })
        .exec(function (err, result) {
            if (err) {
                promise.error(err);
            }
            promise.complete(result);
        });

    return promise;
};


exports.Show = mongoose.model('Show', ShowSchema);
