/* globals define, require, Backbone */

define([
    'dst!modules/list/template/item.show.controls.dust'
], function () {

    'use strict';

    return Backbone.View.extend({

        tagName: 'li',

        template: require('dst!modules/list/template/item.show.controls.dust'),

        events : {
            'click .item--action' : 'showSeasonList'
        },

        initialize: function () {
            this.$el.addClass('item__controls');
        },

        getTemplateData: function () {
            return {
                title: this.model.get('title'),
                icon : this.model.get('icon') || 'fa fa-play'
            };
        },

        render: function () {
            Backbone.View.prototype.render.apply(this, arguments);
            return this;
        },

        showSeasonList : function(event) {
            event.preventDefault();

            Backbone.history.navigate('/show/' + this.model.get('title') + '/season/1', {trigger: true});
        }
    });
});
