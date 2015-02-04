/* globals define, require */

define('component-remote-control', [
    'dst!modules/remote/template/remote.dust',
    'modules/remote/views/remote.view'
], function () {
    'use strict';

    var remoteView = require('modules/remote/views/remote.view');
    return remoteView;
});
