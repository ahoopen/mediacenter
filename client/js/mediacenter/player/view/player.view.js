/* globals Backbone, define, require */

define([
    'dst!mediacenter/player/template/remote.dust',

], function () {

    'use strict';

    //var socket = io.connect(window.location.hostname);

    return Backbone.View.extend({

        template: require('dst!mediacenter/player/template/remote.dust'),

        events: {
            //'click remote__control-start': 'start',
            'click remote__control-pause': 'pause'
        },

        initialize: function () {
            console.log('remote control');
            Backbone.View.prototype.initialize.apply(this, arguments);
            this.on('render-complete', this.onRenderComplete, this);
            this.render();
        },

        getTemplateData: function () {
            return {};
        },

        start: function () {
            console.log('start');
        },

        pause: function () {
            //socket.emit('remote:pause');
        },

        onRenderComplete: function () {
            console.log('render complete');
        },

        render: function () {
            Backbone.View.prototype.render.apply(this, arguments);
            return this;
        },

        remove: function () {
            Backbone.View.prototype.remove.apply(this, arguments);
            this.off('render-complete', this.onRenderComplete, this);
        }
    });
});
