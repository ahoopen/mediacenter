/*globals Backbone, define, require*/

define([

    'modules/show/model/show.model'

], function () {

    'use strict';

    var ShowModel = require('modules/show/model/show.model');

    var ShowCollection = Backbone.Collection.extend({
        model: ShowModel,
        url : 'api/shows'
    });

    return ShowCollection;
});
