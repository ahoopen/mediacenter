/* globals require, module */
require('../models/ShowSchema');

var mongoose = require('mongoose'),
    Episode = mongoose.model('Episode');

module.exports = function (app) {

    app.get('/api/shows', function (request, response) {
        Episode.find({})
            .select('_id ref title summary poster background genre')
            .exec(function (err, result) {
                if (err) {
                    throw err;
                }
                response.json(result);
            })
    });

    app.get('/api/episode/:show_id', function (request, response) {
        Episode.find({ref: request.params.show_id})
            .exec(function (err, result) {
                if (err) {
                    throw err;
                }
                response.json(result);
            });
    });
};
