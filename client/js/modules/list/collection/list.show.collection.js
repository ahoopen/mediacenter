/*globals define, Backbone, require */
define([
    'modules/show/model/show.model'
], function () {

    'use strict';

    var ListShowItemModel = require('modules/show/model/show.model');

    return Backbone.Collection.extend({
        model: ListShowItemModel
    });
});
