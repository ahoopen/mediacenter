/* globals require, module */

require('../models/ShowSchema');
var Promise = require('promise'),
    TvService = require('../services/tvService');

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/mediacenter');

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
                    return self.createShow(show);
                }).then(function() {
                    // succesfull created a new tv show
                    resolve();
                }, function (err) {
                    reject(err);
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
                title: response.name,
                poster: response.poster_path
            }, function (err) {
                if (err) {
                    reject(err);
                }
                resolve();
            });
        });
    }
};

tvShow.create('breaking bad')
    .then(function () {
        console.log("tv show created!");
    }, function() {
        console.log('already created :(');
    });

module.exports = tvShow;



