/* globals require, module */

require('../models/ShowSchema');
var Promise = require('promise'),
    TvService = require('../services/TvService');

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
                    console.log('start creating the tv show.. [' + show.name + ']');
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
            Show.exists(show.id).then(function () {
                reject();
            }, function () {
                resolve(show);
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
        return new Promise(function (resolve, reject) {
            Show.create({
                ref: response.id,
                title: response.name.toLowerCase(),
                poster: response.poster_path
            }, function (err) {
                if (err) {
                    console.log('errror create tv show..', err);
                    reject(err);
                }
                console.log('done making tv show..', response.name);
                resolve(response.id);
            });
        });
    }
};

module.exports = tvShow;


//Show.find({}).exec( function(err, result) {
//    console.log(result);
////});
//
//Show.season(1396, 1).then( function(result) {
//   console.log(result);
//});

//tvShow.create('breaking bad')
//    .then(function () {
//        console.log("tv show created!");
//    }, function() {
//        console.log('already created :(');
//    });
//
//


