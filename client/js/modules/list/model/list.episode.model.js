/* globals Backbone, define */

define([
    'modules/list/collection/list.episode.collection'
],function () {

    'use strict';

    var EpisodeCollection = require('modules/list/collection/list.episode.collection');

    return Backbone.Model.extend({

        urlRoot: 'api/list/shows',

        url: function () {
            return 'api/list/shows/1407/season/1';
        },

        parse: function (response) {

            if (response.items) {
                response.items = new EpisodeCollection(response.items);
            }

            return response;
        }
    });

});
