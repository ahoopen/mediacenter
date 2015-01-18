/* globals Backbone, define, require, io */

define([
    'dst!modules/list/template/list.dust'

], function () {

    'use strict';

    return Backbone.View.extend({

        template: require('dst!modules/list/template/list.dust'),

        events: {
            'click remote__control-start': 'start',
            'click remote__control-pause': 'pause'
        },

        initialize: function () {
            Backbone.View.prototype.initialize.apply(this, arguments);
            this.on('render-complete', this.onRenderComplete, this);
            this.render();
        },

        getTemplateData: function () {
            return {
                title: 'Game of Thrones - Valar Dohaeris 222'
            };
        },

        onRenderComplete: function () {
            this._assignGestureListeners();
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
