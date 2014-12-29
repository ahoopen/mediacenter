/* globals require, module */

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    Promise = require('promise'),
    ObjectId = mongoose.SchemaTypes.ObjectId;

var EpisodeSchema = new Schema({
    id : { type: Number, required: true, index: true },
    created: {type: Date, default: Date.now},
    title: {type: String, required: true, index: true},
    season: {type: Number, required: true, index: true},
    number: {type: Number, required: true, index: true},
    summary: {type: String},
    screen: {type: String},
    location: {type: String}
});

EpisodeSchema.statics.exists = function (id) {
    var episode = this;

    return Promise(function (resolve, reject) {
        episode.find({id: id})
            .exec(function (err, result) {
                if (err) {
                    reject(err);
                }
                resolve(result.length);
            });
    });
};

module.exports = mongoose.model('episode', EpisodeSchema);
