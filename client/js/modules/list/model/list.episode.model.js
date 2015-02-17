/* globals Backbone, define */

define([
    'modules/list/collection/list.episode.collection'
], function () {

    'use strict';

    var EpisodeCollection = require('modules/list/collection/list.episode.collection');

    return Backbone.Model.extend({

        parse: function (response) {

            if (response.items) {
                response.items = new EpisodeCollection(response.items);
            }

            return response;
        }
    });

});
