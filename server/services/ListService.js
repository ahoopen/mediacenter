/* globals module, require */

require('../models/ShowSchema');
var Promise = require('promise');

var mongoose = require('mongoose');
var Show = mongoose.model('Show'),
    Episode = mongoose.model('Episode');

var ListController = {

    /**
     *
     *
     * @returns {Promise}
     */
    showItems: function () {
        var self = this;

        return new Promise(function (resolve, reject) {
            Show.getAll().then(function (items) {
                resolve(self.createListResponse('SHOW_ITEM', items));
            }, function () {
                reject();
            });
        });
    },

    episodeItems: function (showID, season_number) {
        var self = this;

        return new Promise( function(resolve, reject) {
           Show.episodeList(showID, season_number).then( function(items) {
               resolve( self.createListResponse('EPISODE_ITEM', items.episodes) );
           }, function() {
               reject();
           });
        });
    },

    createListResponse: function (type, items) {
        return {
            type: type,
            items: items
        }
    }

};

module.exports = ListController;
