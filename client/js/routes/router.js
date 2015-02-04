/* globals define, require, Backbone */

define([
    'backbone-patterns',
    'component-shows',
    'component-list'
    //'component-remote-control',
], function () {

    'use strict';

    //var componentRemoteControl = require('component-remote-control'),
    //    listComponent = require('component-list');


    var MainRouter = Backbone.Router.extend({
        routes: {
            'index': 'home',
            'remote': 'remote_control',
            'show/:title': 'show',
            'season/:number' : 'season'
        }

    });

    var initialize = function () {

        var router = new MainRouter();

        console.log('MainRouter / initialize');

        router.on('route:remote_control', function () {
            console.log('testddda');
            //console.log( componentRemoteControl );
        });

        router.on('route:home', function () {
            var ItemList = require('component-list'),
                list = new ItemList();

            window.app.goto(list);

             //this.render(list);
            //$(document.body).append(list.render().el);
            //console.log('home..', listComponent);
            //$('.remote-control').append( listComponent.el);
        });

        router.on('route:show', function (params) {
            var overview = require('component-shows'),
                showOverview = new overview.view({
                    model: new overview.model(),
                    title : params
                });


            console.log( 'overview!:', showOverview);

            window.app.goto(showOverview);
            //
            //console.log('router params..:', params);
            ////console.log('home..', listComponent);
            //var overview = require('component-shows'),
            //    showOverview = new overview.view({
            //        model: new overview.model()
            //    });
            //
            //this.render(showOverview);
            ////$(document.body).append(showOverview.el);
            //$('.remote-control').append( listComponent.el);
        });

        router.on('route:season', function() {
            var season = require('modules/show/views/show.season.view'),
                overview = require('component-shows'),
                showOverview = new season({
                    model: new overview.model()
                });

            window.app.goto(showOverview);
        });

        Backbone.history.start();

    };
    return {
        initialize: initialize
    };
});
