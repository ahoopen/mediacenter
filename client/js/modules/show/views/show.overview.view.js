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

            this.model.fetch({
                url: 'api/shows/' + options.title,
                success: function() {
                    this.getShowControls();
                }.bind(this)
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

        getShowControls: function () {
            var ref = this.model.get('ref');

            this.list = new List({
                url : 'api/list/shows/' + ref + '/controls',
                model: new Controls()
            });

            this.render();
        },

        render: function () {
            this.publish('SHOW__BACKGROUND', this.model.get('background'));
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
            this.appendToElement('list-overview', this.list);
        }
    });
});

