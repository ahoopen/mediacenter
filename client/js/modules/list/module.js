/* globals define, require */

define('component-list', [
    'modules/list/views/list.main.view'
], function () {
    'use strict';

    var ItemList = require('modules/list/views/list.main.view');

    return ItemList;
});
