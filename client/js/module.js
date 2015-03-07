/* globals define, require, $, io, window */

define('raspberry-pi-mediacenterjs', [
    'routes/router',
    'modules/page/views/app.view',
    'component-shows',
    'component-list'
], function (MainRouter) {
    'use strict';

    var app = require('modules/page/views/app.view'),
        main = new app();

    // set socket instance global
    window.socket = io.connect(window.location.host);

        window.app = main;

    $(document.body).append(main);

    MainRouter.initialize();

});
