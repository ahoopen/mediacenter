/* globals define, require, Backbone */

define([
    'dst!modules/list/template/item.list.dust'
], function () {

    'use strict';

    return Backbone.View.extend({

        tagName: 'li',

        template : require('dst!modules/list/template/item.list.dust'),

        events : {
            'click .item__show' : 'test'
        },

        initialize : function() {
            this.$el.addClass('item__show');
        },

        getTemplateData: function () {
            return {
                title : this.model.get('title'),
                image : this.model.get('poster'),
                genre : this.model.get('genre').join(', ').toString()
            };
        },

        render: function () {
            Backbone.View.prototype.render.apply(this, arguments);
            return this;
        },

        test : function() {
            console.log('test', this.model.get('ref') );
        }
    });
});
