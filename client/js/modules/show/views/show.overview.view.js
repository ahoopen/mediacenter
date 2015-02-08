/* globals define, require, $,_, io */

define([
    'dst!modules/show/template/show.overview.dust',
    'modules/page/views/page.view',
    'modules/list/model/list.showcontrol.model',
    'component-list'
], function () {
    'use strict';

    var Page = require('modules/page/views/page.view'),
        Controls = require('modules/list/model/list.showcontrol.model'),
        List = require('component-list');

    return Page.extend({

        template: require('dst!modules/show/template/show.overview.dust'),

        initialize: function (options) {
            this.listenTo(this, 'render-complete', this.onRenderComplete);

            _.bindAll(this, 'render');


            this.list = new List( {
                model : new Controls()
            });

            this.socket();

            this.model.on('change', this.render);
            this.model.fetch({
                url: 'api/shows/' + options.title
            });
        },

        socket : function() {
            var socket = io.connect(window.location.host);

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

