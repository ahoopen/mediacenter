/* globals requirejs, require */

requirejs.config({

    baseUrl: '/client/js',

    paths: {

        'raspberry-pi-mediacenterjs': 'mediacenter/module',

        'backbone': '../bower_components/backbone/backbone',
        'underscore': '../bower_components/lodash/dist/lodash.compat',
        'text': '../bower_components/requirejs-text/text',

        /* Dust */
        'dst': '../bower_components/requirejs-dust/dst',
        'dust': '../bower_components/dustjs-linkedin/dist/dust-full',

        /* Jquery */
        'jquery': '../bower_components/jquery/dist/jquery',

        'es5-shim': '../bower_components/es5-shim/es5-shim',
        'promise': '../bower_components/promise/Promise',
        'dustjs-linkedin-helpers': '../bower_components/dustjs-linkedin-helpers/dist/dust-helpers'
    },

    shim: {

        'underscore': {
            exports: '_'
        },

        'backbone': {
            deps: ['underscore', 'jquery'],
            exports: 'Backbone'
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
            deps: ['backbone', 'backbone-patterns', 'es5-shim', 'jquery']
        }
    }
});

require(['raspberry-pi-mediacenterjs'], function() {
   'use strict';

    return {

    };
});
