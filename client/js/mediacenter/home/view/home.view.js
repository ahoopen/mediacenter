/* globals Backbone, define, require */

define([

    'dst!mediacenter/home/template/home.dust'

], function () {

    'use strict';

    return Backbone.View.extend({

        template: require('dst!mediacenter/home/template/home.dust'),

        events: {
            'click': 'close'
        },

        initialize: function () {
            Backbone.View.prototype.initialize.apply(this, arguments);
            this.on('render-complete', this.onRenderComplete, this);
            this.render();
        },

        getTemplateData: function () {
            return {};
        },

        onRenderComplete: function () {
            console.log('render complete');
        },

        remove: function () {
            Backbone.View.prototype.remove.apply(this, arguments);
            this.off('render-complete', this.onRenderComplete, this);
        }
    });
});
