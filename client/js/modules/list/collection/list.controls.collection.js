/*globals define, Backbone, require */
define([
    'modules/list/model/list.showcontrol.model'
], function () {

    'use strict';

    var ListControlsModel = require('modules/list/model/list.showcontrol.model');

    return Backbone.Collection.extend({
        model: ListControlsModel
    });
});
