/* globals define, require, $, _ */

define([
    'dst!modules/show/template/shows.dust',
    'modules/page/views/page.view',
    'modules/list/model/list.showcontrol.model',
    'component-list'
], function () {
    'use strict';

    var Page = require('modules/page/views/page.view'),
        Controls = require('modules/list/model/list.show.model'),
        List = require('component-list');

    return Page.extend({

        template: require('dst!modules/show/template/shows.dust'),

        subscriptions : {
            'SHOW_SELECTED' : 'onSelectedShow'
        },

        initialize: function () {
            this.listenTo(this, 'render-complete', this.onRenderComplete);

            _.bindAll(this, 'render');

            this.list = new List( {
                url : 'api/list/shows',
                model : new Controls()
            });

            this.socket();

            this.model.on('change', this.render);
            this.model.fetch({
                url: 'api/shows'
            });
        },

        socket : function() {
            var socket = window.socket;

            socket.on('connect', function() {
                socket.emit('screen');
            });
        },

        getTemplateData: function () {
            return {
                title: this.model.get('title'),
                summary: this.model.get('summary'),
                genre: this.model.get('genre'),
                image: this.model.get('poster')
            };
        },

        onSelectedShow : function(show) {
            this.publish('SHOW__BACKGROUND', show.background);
            this.$('.show__poster-img').attr('src', show.background);
        },

        render: function () {
            //this.publish('SHOW__BACKGROUND', this.model.get('background'));
            return Page.prototype.render.apply(this, arguments);
        },

        /**
         * Append the item view to the list view
         *
         * @param id
         * @param view
         */
        appendToElement: function (id, view) {
            this.$('.show__overview--options').replaceWith($(view.$el));
            this.subview(id, view);
        },

        onRenderComplete: function () {
            this.appendToElement('list', this.list);
        }
    });
});

