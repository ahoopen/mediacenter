/* globals require, module */

require('../models/ShowSchema');
var Promise = require('promise'),
    TvService = require('../services/tvService'),
    Cache = require('../utils/cache');

var mongoose = require('mongoose');
//mongoose.connect('mongodb://localhost/mediacenter');

var Show = mongoose.model('Show');


var tvShow = {

    /**
     * Creates an new tv show based on the title.
     * It checks if it already exists. if not it will be created
     *
     * @param title
     * @returns {Promise}
     */
    create: function (title) {
        var self = this;

        return new Promise(function (resolve, reject) {
            TvService.show(title)
                .then(function (show) {
                    return self.isNew(show);
                }).then(function (show) {
                    console.log('start creating the tv show.. [' + show.title + ']');
                    return self.createShow(show);
                }).then(function (showId) {
                    // succesfull created a new tv show
                    resolve(showId);
                }, function (err) {
                    reject(err);
                });
        });
    },

    get: function (title) {
        return Show.getShow(title);
    },

    /**
     * Checks if the show already has the episode
     *
     * @param showId
     * @param season_number
     * @param episode_number
     * @returns {Promise}
     */
    hasEpisode: function (showId, season_number, episode_number) {
        return new Promise(function (resolve) {
            Show.hasEpisode(showId, season_number, episode_number).then(function () {
                resolve(true);
            }, function () {
                resolve(false);
            });
        });
    },

    /**
     * Checks if the show is new.
     *
     * @param show
     * @returns {Promise}
     */
    isNew: function (show) {
        return new Promise(function (resolve, reject) {
            Show.isNew(show.id).then(function () {
                resolve(show);
            }, function () {
                reject();

            });
        });
    },

    /**
     * Create new show in the database
     *
     * @param response
     * @returns {Promise}
     */
    createShow: function (response) {
        var ref = response.id,
            path = 'http://image.tmdb.org/t/p/w500' + response.poster;

        return new Promise(function (resolve, reject) {
            Cache.save(ref, path).then(function (file) {
                Show.create({
                    ref: ref,
                    title: response.title.toLowerCase(),
                    summary: response.summary,
                    genre: response.genres,
                    rating : response.rating,
                    episode_run_time : response.episode_run_time,
                    poster: file.path,
                    background: response.background
                }, function (err) {
                    if (err) {
                        console.log('errror create tv show..', err);
                        reject(err);
                    }
                    console.log('done making tv show..', response.title);
                    resolve(response.id);
                });
            }, function (err) {
                console.log(err);
            });
        });
    }
};

module.exports = tvShow;


//Show.getAll().then(function (shows) {
//    console.log(shows);
//});
//
//Show.season(1396, 1).then( function(result) {
//   console.log(result);
//});

//Show.episode(1396,1,1);

//tvShow.create('breaking bad')
//    .then(function () {
//        console.log("tv show created!");
//    }, function() {
//        console.log('already created :(');
//    });
//
//


