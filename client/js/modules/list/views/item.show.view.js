/* globals define, require, Backbone */

define([
    'dst!modules/list/template/item.list.dust'
], function () {

    'use strict';

    return Backbone.View.extend({

        tagName: 'li',

        template: require('dst!modules/list/template/item.list.dust'),

        events: {
            'click': 'onSelect',
            'click .item__show--block' : 'test'
        },

        initialize: function () {
            this.$el.addClass('item__show');
        },

        getTemplateData: function () {
            return {
                title: this.model.get('title'),
                image: this.model.get('poster'),
                genre: this.model.get('genre').join(', ').toString()
            };
        },

        render: function () {
            Backbone.View.prototype.render.apply(this, arguments);
            return this;
        },

        onSelect: function (event) {
            event.preventDefault();

            this.publish('SHOW_SELECTED', {
                background: this.model.get('background'),
                summary: this.model.get('summary')
            });

            //var show = this.model.get('title');

            //Backbone.history.navigate('/show/' + show, {trigger: true});
        },

        test: function () {
            //console.log('test', this.model.get('ref'));
            var show = this.model.get('title');

            Backbone.history.navigate('/show/' + show, {trigger: true});
        }
    });
});
