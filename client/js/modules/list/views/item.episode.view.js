/* globals define, require, Backbone */

define([
    'dst!modules/list/template/item.episode.dust'
], function () {

    'use strict';

    return Backbone.View.extend({

        tagName: 'li',

        template: require('dst!modules/list/template/item.episode.dust'),

        events: {
            'click .item__episode--title': 'test'
        },

        initialize: function () {
            this.$el.addClass('item__episode');
        },

        getTemplateData: function () {
            return {
                title: this.model.get('title')
            };
        },

        render: function () {
            Backbone.View.prototype.render.apply(this, arguments);
            return this;
        },

        test: function () {
            Backbone.history.navigate('/show/homeland', {trigger: true});
        }
    });
});
