/* globals requirejs, require */

requirejs.config({

    baseUrl: '/js',

    paths: {

        'raspberry-pi-mediacenterjs': 'module',

        'component-remote-control': 'modules/remote/module',
        'component-list': 'modules/list/module',
        'component-shows': 'modules/show/module',


        'backbone': '../bower_components/backbone/backbone',
        'backbone-patterns': '../bower_components/backbone-patterns/dist/backbone-patterns',
        'underscore': '../bower_components/lodash/dist/lodash.compat',
        'text': '../bower_components/requirejs-text/text',

        /* Dust */
        'dst': '../bower_components/requirejs-dust/dst',
        'dust': '../bower_components/dustjs-linkedin/dist/dust-full',

        /* Jquery */
        'jquery': '../bower_components/jquery/dist/jquery',
        'jquery-mousewheel': '../bower_components/jquery-mousewheel/jquery.mousewheel',
        'es5-shim': '../bower_components/es5-shim/es5-shim',
        'promise': '../bower_components/promise/Promise',
        'dustjs-linkedin-helpers': '../bower_components/dustjs-linkedin-helpers/dist/dust-helpers',

        /* Requirejs plugins */
        'async': '../bower_components/requirejs-plugins/src/async',
        'goog': '../bower_components/requirejs-plugins/src/goog',
        'noext': '../bower_components/requirejs-plugins/src/noext',
        'propertyParser': '../bower_components/requirejs-plugins/src/propertyParser',

        /* Gestures */
        'gestureManager': 'utils/gesture',

        /* */
        'jquery.mCustomScrollbar': '../bower_components/malihu-custom-scrollbar-plugin/jquery.mCustomScrollbar.concat.min'
    },

    shim: {

        'underscore': {
            exports: '_'
        },

        'backbone': {
            deps: ['underscore', 'jquery'],
            exports: 'Backbone'
        },

        'jquery.mCustomScrollbar': {
            deps: ['jquery']
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
            deps: ['backbone', 'backbone-patterns', 'es5-shim', 'jquery', 'gestureManager', 'jquery.mCustomScrollbar']
        }
    }
});

require(['raspberry-pi-mediacenterjs'], function () {
    'use strict';

    return {};
});
