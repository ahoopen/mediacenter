/* globals require, module */

var config = require('../configuration/config'),
    api = require('moviedb')(config.metadata.apiKey),
    Promise = require('promise'),
    Cache = require('../utils/cache');

var tvService = {

    /**
     * Get metadata for the tv show. Consists on two api calls to get
     * all the information needed
     *
     * @param title
     * @returns {Promise}
     */
    show: function (title) {
        var self = this;

        return new Promise(function (resolve, reject) {
            self.showSearch(title).then(function (response) {
                self.showDetails(response.id).then(function (details) {
                    resolve({
                        id: response.id,
                        title: response.name,
                        summary: details.summary,
                        rating : details.rating,
                        episode_run_time : details.episode_run_time,
                        genres: details.genres,
                        poster: response.poster_path,
                        background: details.background
                    });
                }, reject);
            }, reject);
        });
    },

    /**
     * Search for tv show. return a promise object.
     *
     * @param title {string}
     * @returns {Promise}
     */
    showSearch: function (title) {

        return new Promise(function (resolve, reject) {
            api.searchTv({query: title}, function (err, response) {
                if (err) {
                    reject(err);
                }

                if (typeof response.results !== 'undefined' && response.results.length >= 1) {
                    // always take the first result
                    resolve(response.results.shift());
                } else {
                    resolve({
                        error: {
                            code: 404,
                            message: 'no tv show found'
                        }
                    });
                }
            });
        });
    },

    /**
     * Gives back detail information about a tv show
     *
     * @param id
     * @returns {Promise}
     */
    showDetails: function (id) {
        var self = this;

        return new Promise(function (resolve, reject) {
            api.tvInfo({id: id}, function (err, response) {
                if (err) {
                    reject();
                }

                var path = 'http://image.tmdb.org/t/p/w1920' + response.backdrop_path;
                Cache.save(id, path).then(function (file) {
                    var details = {
                        summary: response.overview,
                        background: file.path,
                        episode_run_time: self.getEpisideRunTime(response.episode_run_time),
                        rating: response.vote_average,
                        genres: response.genres.map(function (genre) {
                            return genre.name;
                        })
                    };
                    resolve(details);
                });
            });
        });
    },

    /**
     * computes the average duration of the shows episodes.
     *
     * @param runtime
     * @returns {*}
     */
    getEpisideRunTime: function (runtime) {
        var total = runtime.reduce(function (memo, episode_run_time) {
            return memo + parseInt(episode_run_time, 10);
        }, 0);

        if (runtime.length > 1) {
            total = Math.floor(total / runtime.length);
        }
        return total
    },

    /**
     * Return a promise object with will contain episode meta data
     *
     * @param id {int}
     * @param season {int}
     * @param episode {int}
     * @returns {Promise}
     */
    episode: function (id, season, episode) {

        return new Promise(function (resolve, reject) {
            api.tvEpisodeInfo({id: id, season_number: season, episode_number: episode}, function (err, response) {
                if (err) {
                    reject(err);
                }
                resolve(response);
            });
        });
    }
};


module.exports = tvService;
