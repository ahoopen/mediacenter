/* globals require, module */
require('../models/ShowSchema');

var mongoose = require('mongoose'),
    Shows = mongoose.model('Show');

module.exports = function (app) {

    /**
     *  Get all the tv shows
     */
    app.get('/api/shows', function (request, response) {
        Shows.getAll()
            .then( function() {
                response.json(result);
            }, function(err) {
                //
            });
    });

    /**
     *
     *
     */
    app.get('/api/shows/:show_id', function (request, response) {
        Shows.getShow(request.params.show_id)
            .then( function(result) {
                response.json(result);
            }, function(err) {
                //
                response.json(err);
            });
    });

    /**
     * Returns episodes of a specific season
     */
    app.get('/api/shows/:show_id/season/:season_number', function (request, response) {
        Shows.season(request.params.show_id, request.params.season_number)
            .then(function (result) {
                response.json(result);
            }, function (err) {
                response.json(err);
            });
    });
};
