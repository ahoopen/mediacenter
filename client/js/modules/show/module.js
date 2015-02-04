/* globals define, require */

define('component-shows', [
    'modules/show/views/show.overview.view',
    'modules/show/views/show.season.view',

    'modules/show/model/show.model'
], function () {
    'use strict';

    console.log('shows overview!!');
    //var ItemList = require('modules/list/views/list.main.view'),
    //    list = new ItemList();
    //
    //$(document.body).append(list.render().el);

    var ShowOverview = require('modules/show/views/show.overview.view'),
        ShowModel = require('modules/show/model/show.model');

    return {
        model : ShowModel,
        view : ShowOverview
    };
    //$(document.body).append(overview.el);

    //console.log('component show');
    //
    //var showCollection = require('modules/show/collection/show.collection');
    //var collection = new showCollection();
    //
    //console.log(collection);
});
