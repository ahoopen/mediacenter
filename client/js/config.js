/* globals requirejs, require */

requirejs.config({

    baseUrl: '/js',

    paths: {

        'raspberry-pi-mediacenterjs': 'module',

        'component-remote-control' : 'modules/remote/module',


        'backbone': '../bower_components/backbone/backbone',
        'backbone-patterns': '../bower_components/backbone-patterns/dist/backbone-patterns',
        'underscore': '../bower_components/lodash/dist/lodash.compat',
        'text': '../bower_components/requirejs-text/text',

        /* Dust */
        'dst': '../bower_components/requirejs-dust/dst',
        'dust': '../bower_components/dustjs-linkedin/dist/dust-full',

        /* Jquery */
        'jquery': '../bower_components/jquery/dist/jquery',

        'es5-shim': '../bower_components/es5-shim/es5-shim',
        'promise': '../bower_components/promise/Promise',
        'dustjs-linkedin-helpers': '../bower_components/dustjs-linkedin-helpers/dist/dust-helpers',

        /* Requirejs plugins */
        'async': '../bower_components/requirejs-plugins/src/async',
        'goog': '../bower_components/requirejs-plugins/src/goog',
        'noext': '../bower_components/requirejs-plugins/src/noext',
        'propertyParser': '../bower_components/requirejs-plugins/src/propertyParser',

        /* Gestures */
        'gestureManager' : 'utils/gesture'
    },

    shim: {

        'underscore': {
            exports: '_'
        },

        'backbone': {
            deps: ['underscore', 'jquery'],
            exports: 'Backbone'
        },

        'backbone-patterns': {
            deps: ['backbone']
        },

        /* Dust */
        'dust': {
            exports: 'dust'
        },

        'dst': {
            deps: ['text', 'dust']
        },

        'dustjs-linkedin-helpers': {
            deps: ['dust']
        },

        'jquery': {
            exports: '$'
        },

        'raspberry-pi-mediacenterjs': {
            deps: ['backbone', 'backbone-patterns','es5-shim', 'jquery', 'gestureManager']
        }
    }
});

require(['raspberry-pi-mediacenterjs'], function () {
    'use strict';

    return {};
});
