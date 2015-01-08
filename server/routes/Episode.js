/* globals require, module */
require('../models/ShowSchema');

var mongoose = require('mongoose'),
    Episode = mongoose.model('Episode');

module.exports = function (app) {

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
