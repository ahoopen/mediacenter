/* globals define, $ */

define([
    'mediacenter/player/view/player.view'
], function () {
    'use strict';

    var Player = require('mediacenter/player/view/player.view');
    var player = new Player();

    $('#home').append(player.$el);

    return null;
});
