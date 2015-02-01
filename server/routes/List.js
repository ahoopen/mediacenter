/* globals require, module */

var ListService = require('../services/ListService');

module.exports = function (app) {

    /**
     *  Returns show list items
     */
    app.get('/api/list/shows', function (request, response) {
        ListService.showItems().then(function (data) {
            response.json(data);
        });
    });

    app.get('/api/list/shows/:show_id/season/:season_number', function (request, response) {
        var showID = request.params.show_id,
            season_number = request.params.season_number;

        ListService.episodeItems(showID, season_number).then(function (data) {
            response.json( data );
        });
    });

};
