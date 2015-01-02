/* globals require, module */

var api = require('moviedb')('d086542135ccd8848541b28dfeea5d91'),
    Promise = require('promise');

var tvService = {

    /**
     * Search for tv show. return a promise object.
     *
     * @param title {string}
     * @returns {Promise}
     */
    show: function (title) {

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


// http://image.tmdb.org/t/p/w500/8uO0gUM8aNqYLs1OsTBQiXu0fEv.jpg
