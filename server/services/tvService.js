/* globals require, module */

var api = require('moviedb')('d086542135ccd8848541b28dfeea5d91'),
    Promise = require('promise');

var tvService = {

    show: function (title) {
        var self = this;

        return new Promise(function (resolve, reject) {
            self.showSearch(title).then(function (response) {
                self.showDetails(response.id).then(function (details) {
                    resolve({
                        id: response.id,
                        title: response.name,
                        summary: details.summary,
                        genres: details.genres,
                        poster: response.poster_path
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
        return new Promise(function (resolve, reject) {
            api.tvInfo({id: id}, function (err, response) {
                if (err) {
                    reject();
                }

                var details = {
                    summary: response.overview,
                    genres: response.genres.map(function (genre) {
                        return genre.name;
                    })
                };

                resolve(details);
            });
        });
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
