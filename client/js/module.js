/* globals define, require, $, window */

define('raspberry-pi-mediacenterjs', [
    'routes/router',
    'modules/page/views/app.view'
    //'component-shows',
    //'component-list'
], function (MainRouter) {
    'use strict';

    var app = require('modules/page/views/app.view'),
        main = new app();


        window.app = main;

    $(document.body).append(main);

    //var remoteCtrl = new remote();
    MainRouter.initialize();

    //$('.remote-control').append( remoteCtrl.el);
});
