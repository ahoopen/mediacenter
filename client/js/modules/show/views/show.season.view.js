/* globals define, require, _, $ */

define([
    'dst!modules/show/template/show.season.dust',
    'modules/page/views/page.view'
], function () {
    'use strict';

    var Page = require('modules/page/views/page.view'),
        Controls = require('modules/list/model/list.episode.model'),
        List = require('component-list');

    return Page.extend({

        template: require('dst!modules/show/template/show.season.dust'),

        subscriptions : {
            'SHOW_EPISODE_SELECTED' : 'onSelectedEpisode'
        },

        initialize: function (options) {
            this.listenTo(this, 'render-complete', this.onRenderComplete);

            _.bindAll(this, 'render');

            this.list = new List({
                model: new Controls()
            });

            this.socket();

            this.model.on('change', this.render);
            this.model.fetch({
                url: 'api/shows/' + options.title
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

        onSelectedEpisode : function(episode) {
            this.$('.show__overview--image').css( {
                'background-image' : 'url(' + episode.screen + ')'
            });
            //this.$('.show__poster-img').attr('src', episode.screen);
            this.$('.show__info--synopsis p').html( episode.summary );
        },

        socket: function () {
            //var socket = io.connect(window.location.host);
            var socket = window.socket;

            socket.on('connect', function () {
                socket.emit('screen');
            });

        },

        render: function () {
            this.publish('SHOW__BACKGROUND', this.model.get('background'));
            console.log('render page');
            return Page.prototype.render.apply(this, arguments);
        },

        onRenderComplete: function () {
            this.$('.show__overview--options').replaceWith($(this.list.$el));
        }
    });
});

