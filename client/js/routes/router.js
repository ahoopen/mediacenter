/* globals define, require, Backbone */

define([
    'backbone-patterns',
    'modules/remote/module'
], function () {

    'use strict';

    var componentRemoteControl = require('modules/remote/module');

    var MainRouter = Backbone.Router.extend({
        routes: {
            '' : 'index',
            'remote': 'remote_control'
        }
    });

    var initialize = function () {

        var router = new MainRouter();

        console.log('MainRouter / initialize');

        router.on('route:remote_control', function(){
            console.log('testddda');
            console.log( componentRemoteControl );
        });

        Backbone.history.start();

    };
    return {
        initialize: initialize
    };
});
