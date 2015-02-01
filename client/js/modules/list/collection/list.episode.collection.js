/*globals define, Backbone, require */
define([
    'modules/show/model/episode.model'
], function () {

    'use strict';

    var ListEpisodeItemModel = require('modules/show/model/episode.model');

    return Backbone.Collection.extend({
        model: ListEpisodeItemModel
    });
});
