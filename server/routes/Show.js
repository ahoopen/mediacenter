/* globals require, module */
require('../models/ShowSchema');

var mongoose = require('mongoose'),
    Shows = mongoose.model('Show');

module.exports = function (app) {

    /**
     *  Get all the tv shows
     */
    app.get('/api/shows', function (request, response) {
        Shows.find({})
            .select('_id ref title summary poster background genre')
            .exec(function (err, result) {
                if (err) {
                    throw err;
                }
                response.json(result);
            })
    });


    app.get('/api/shows/:show_id', function (request, response) {
        Shows.find({ref: request.params.show_id})
            .exec(function (err, result) {
                if (err) {
                    throw err;
                }
                response.json(result);
            });
    });
};
