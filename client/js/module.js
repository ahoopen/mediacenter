/* globals define, $ */

define('raspberry-pi-mediacenterjs', [
    'routes/router',
    'component-remote-control'
], function (MainRouter, remote) {
    'use strict';

    var remoteCtrl = new remote();
    console.log('routes..init');
    MainRouter.initialize();

    $('.remote-control').append( remoteCtrl.el);
});
