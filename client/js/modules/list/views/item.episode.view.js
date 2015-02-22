/* globals define, require, Backbone */

define([
    'dst!modules/list/template/item.episode.dust'
], function () {

    'use strict';

    return Backbone.View.extend({

        tagName: 'li',

        template: require('dst!modules/list/template/item.episode.dust'),

        events: {
            'click': 'onSelect',
            'click .item--action': 'onPlay'
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

        onSelect: function (event) {
            event.preventDefault();

            this.publish('SHOW_EPISODE_SELECTED', {
                screen: this.model.get('screen'),
                summary: this.model.get('summary')
            });

            //Backbone.history.navigate('/show/homeland', {trigger: true});
        },

        onPlay: function () {
            console.log('play episode!', this.model.get('ref'));
        }
    });
});
