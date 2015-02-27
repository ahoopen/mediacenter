/* globals define, require, $, Backbone */

define([
    'backbone',
    'component-shows',
    'component-list',
    'component-remote-control',

    'modules/show/views/shows.view',
    'modules/show/model/show.model'
], function () {

    'use strict';

    var MainRouter = Backbone.Router.extend({
        routes: {
            'index': 'home',
            'remote': 'remote_control',
            'shows' : 'shows',
            'show/:title': 'show_overview',
            'show/:title/season/:number' : 'season'
        }

    });

    var initialize = function () {

        var router = new MainRouter();

        console.log('MainRouter / initialize');

        router.on('route:remote_control', function () {
            var remote = require('component-remote-control'),
                control = new remote();

            console.log( control.el);

            $(document.body).append(control.el);
            //window.app.goto(control);


        });

        router.on('route:home', function () {
            var ItemList = require('component-list'),
                list = new ItemList();

            window.app.goto(list);
        });

        router.on('route:shows', function() {
            var shows = require('modules/show/views/shows.view'),
                overview = require('modules/show/model/show.model'),
                showsList = new shows({
                    model: new overview()
                });

            window.app.goto(showsList);
        });

        router.on('route:show_overview', function (params) {
            var overview = require('component-shows'),
                showOverview = new overview.view({
                    model: new overview.model(),
                    title : params
                });


            window.app.goto(showOverview);
        });

        router.on('route:season', function(title, season) {
            var seasonView = require('modules/show/views/show.season.view'),
                overview = require('component-shows'),
                showOverview = new seasonView({
                    model: new overview.model(),
                    title : title,
                    season: season
                });

            window.app.goto(showOverview);
        });

        Backbone.history.start();

    };
    return {
        initialize: initialize
    };
});
