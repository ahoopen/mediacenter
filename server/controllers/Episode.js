/* globals require, module */
require('../models/ShowSchema');
var Promise = require('promise'),
    TvService = require('../services/tvService'),
    Cache = require('../utils/cache');

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/mediacenter');

var Show = mongoose.model('Show'),
    Episode = mongoose.model('Episode');

var tvEpisode = {

    /**
     * Adds an episode to a show. Gathers its metadata from the tv service.
     *
     * @param id
     * @param season
     * @param episode
     * @returns {Promise}
     */
    create: function (id, season, episode, location) {
        var self = this;

        return new Promise(function (resolve, reject) {
            TvService.episode(id, season, episode)
                .then(function (episode) {
                    return self.isNew(episode);
                }).then(function (episode) {
                    // add the file location
                    episode.location = location;

                    return self.addEpisode(id, episode);
                }).then(function () {
                    // succesfull created a new tv show
                    resolve();
                }, function (err) {
                    reject(err);
                });
        });
    },

    /**
     * Checks if the episode already exists.
     *
     * @param episode
     * @returns {Promise}
     */
    isNew: function (episode) {
        return new Promise(function (resolve, reject) {
            Episode.exists(episode.id).then(function () {
                reject();
            }, function () {
                resolve(episode);
            });
        });
    },

    /**
     * Adds the episode to the tv show
     *
     * @param id
     * @param episode
     * @returns {*}
     */
    addEpisode: function (id, episode) {
        var path = 'http://image.tmdb.org/t/p/w500' + episode.still_path;

        return new Promise(function (resolve) {
            Cache.save(id, path).then(function (file) {
                // set cache path
                episode.still_path = file.path;

                Show.addEpisode(id, episode).then(function () {
                    resolve();
                });
            }, function(err) {
                console.log(err);
            });
        });
    }

};

module.exports = tvEpisode;


//Show.season(1399, 1)
//    .then( function(result) {
//        console.log(result);
//    });

//tvEpisode.create(1399, 01, 01)
//    .then(function () {
//        console.log('done!');
//    }, function() {
//        console.log('err!!');
//    });
