/* globals define, require, $, Backbone */

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

        optionNames: ['url'],

        template: require('dst!modules/list/template/list.dust'),

        subscriptions: {
            'LIST_RENDER_COMPLETE': 'attachList'
        },

        connected: false,

        initialize: function () {
            this.list = new ItemList({
                url: this.url,
                model: this.model
            });

            this.socket = window.socket;
            this.listenTo(this, 'render-complete', this.onRenderComplete);
            this.render();
        },

        /**
         * When rendering of the view is complete, initialize sockets
         */
        onRenderComplete: function () {
            // cache reference because a new reference is created when using .bind
            this._next = this.next.bind(this);
            this._previous = this.previous.bind(this);
            this._enter = this.enter.bind(this);

            this.socket.on('remote:next', this._next);
            this.socket.on('remote:previous', this._previous);
            this.socket.on('remote:enter', this._enter);
        },

        /**
         * Selects next item in the list
         *
         */
        next: function () {
            var current = $('.selected', this.$el);
            current.removeClass('selected');

            if ($(current).prev().attr('data-menu-list') === 'start') {
                $('[data-menu-list="end"]').prev().addClass('selected').trigger('click');
            } else {
                $(current).prev().addClass('selected').trigger('click');
            }

            this.scrollTo();
        },

        /**
         * Selects the previous item in the list.
         *
         */
        previous: function () {
            var current = $('.selected', this.$el);
            current.removeClass('selected');

            if ($(current).next().attr('data-menu-list') === 'end') {
                $('[data-menu-list="start"]').next().addClass('selected').trigger('click');
            } else {
                $(current).next().addClass('selected').trigger('click');
            }

            this.scrollTo();
        },

        enter: function () {
            console.log( $('.selected', this.$el).find('.item--action') );
            $('.selected', this.$el).find('.item--action').trigger('click');
        },

        scrollTo: function () {
            var menu = $('#menu');

            //menu.mCustomScrollbar('scrollTo', 'li:eq(' + element + ')' );
            menu.mCustomScrollbar('scrollTo', '.selected', {
                scrollEasing: 'easeOut'
            });
        },

        renderScrollbar: function () {
            $(window).ready(function () {
                $('#menu').mCustomScrollbar({
                    axis: 'y',
                    theme: 'minimal-dark',
                    scrollbarPosition: 'outside',
                    scrollEasing: 'easeOut',
                    autoHideScrollbar: false,
                    scrollInertia: 200
                });
            });
        },

        attachList: function () {
            this.$('.item__list').replaceWith($(this.list.$el));
            this.renderScrollbar();
        },

        remove: function () {
            this.socket.removeListener('remote:next', this._next);
            this.socket.removeListener('remote:previous', this._previous);
            this.socket.removeListener('remote:enter', this._enter);

            Backbone.View.prototype.remove.apply(this, arguments);
        }
    });
});
