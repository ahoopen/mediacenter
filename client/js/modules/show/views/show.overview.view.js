/* globals define, require, $, _ */

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
                image: this.model.get('poster'),
                rating : this.model.get('rating'),
                runtime : this.model.get('episode_run_time')
            };
        },

        render: function () {
            this.publish('SHOW__BACKGROUND', this.model.get('background'));
            return Page.prototype.render.apply(this, arguments);
        },

        onRenderComplete: function () {
            this.$('.show__overview--options').replaceWith($(this.list.$el));
        }
    });
});

