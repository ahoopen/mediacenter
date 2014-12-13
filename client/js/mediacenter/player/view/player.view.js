/* globals Backbone, define, require */

define([
    'dst!mediacenter/player/template/player.dust'
], function () {

    'use strict';

    return Backbone.View.extend({

        template: require('dst!mediacenter/player/template/player.dust'),

        events: {
            'click player__start': 'start',
            'click player__pause': 'pause'
        },

        initialize: function () {
            Backbone.View.prototype.initialize.apply(this, arguments);
            this.on('render-complete', this.onRenderComplete, this);
            this.render();
        },

        start: function () {
            console.log('start');
        },

        pause: function () {
            console.log('pause');
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
