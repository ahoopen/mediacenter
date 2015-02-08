/* globals define, require, $, io, Backbone */

define([
    'dst!modules/list/template/list.dust',

    'modules/list/model/list.show.model',
    'modules/list/model/list.episode.model',

    'modules/list/views/item.list.view',
    'modules/page/views/page.view'
], function () {

    'use strict';

    var ItemList = require('modules/list/views/item.list.view');

    return Backbone.View.extend({

        template: require('dst!modules/list/template/list.dust'),

        subscriptions: {
            'LIST_RENDER_COMPLETE': 'attachList'
        },

        connected: false,

        initialize: function () {
            this.list = new ItemList({
                model: this.model
            });

            this.socket = io.connect(window.location.host);
            this.listenTo(this, 'render-complete', this.onRenderComplete);
            this.render();
        },

        /**
         * When rendering of the view is complete, initialize sockets
         */
        onRenderComplete: function () {
            this.socket.on('connect', function () {
                console.log('list socket connected!');
                this.connected = true;
                this.next();
                this.previous();
                this.enter();
            }.bind(this));
        },

        /**
         * Set socket listener
         *
         * @param action
         * @param fn
         */
        onSocketEvent: function (action, fn) {
            if (this.connected) {
                this.socket.on(action, fn);
            } else {
                throw 'Remote control - Connect first!';
            }
        },

        /**
         * Selects next item in the list
         *
         */
        next: function () {
            var self = this;

            this.onSocketEvent('remote:next', function () {
                var current = $('.selected', self.$el);
                current.removeClass('selected');

                if ($(current).prev().attr('data-menu-list') === 'start') {
                    $('[data-menu-list="end"]').prev().addClass('selected');
                } else {
                    $(current).prev().addClass('selected');
                }
            });
        },

        /**
         * Selects the previous item in the list.
         *
         */
        previous: function () {
            var self = this;

            this.onSocketEvent('remote:previous', function () {
                var current = $('.selected', self.$el);
                current.removeClass('selected');

                if ($(current).next().attr('data-menu-list') === 'end') {
                    $('[data-menu-list="start"]').next().addClass('selected');
                } else {
                    $(current).next().addClass('selected');
                }
            });
        },

        enter: function () {
            this.onSocketEvent('remote:enter', function () {
                console.log('goto next page!');
            });
        },

        renderScrollbar: function () {
            $('#menu').mCustomScrollbar({
                axis: 'y',
                theme: 'minimal-dark',
                scrollbarPosition: 'outside',
                autoHideScrollbar: true,
                scrollInertia: 20
            });
        },

        attachList: function () {
            this.$('.item__list').replaceWith($(this.list.$el));
            this.renderScrollbar();
        }
    });
});
