/* globals define, require, _, $ */

define([
    'dst!modules/show/template/show.season.dust',
    'modules/page/views/page.view'
], function () {
    'use strict';

    var Page = require('modules/page/views/page.view'),
        EpisodeList = require('modules/list/model/list.episode.model'),
        List = require('component-list');

    return Page.extend({

        template: require('dst!modules/show/template/show.season.dust'),

        subscriptions: {
            'SHOW_EPISODE_SELECTED': 'onSelectedEpisode'
        },

        initialize: function (options) {
            this.listenTo(this, 'render-complete', this.onRenderComplete);
            _.bindAll(this, 'render');

            this.model.fetch({
                url: 'api/shows/' + options.title,
                success: function () {
                    this.getListEpisodes();
                }.bind(this)
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

        onSelectedEpisode: function (episode) {
            this.$('.show__overview--image').css({
                'background-image': 'url(' + episode.screen + ')'
            });
            this.$('.show__info--synopsis p').html(episode.summary);
        },

        getListEpisodes: function () {
            var ref = this.model.get('ref');

            this.list = new List({
                url : 'api/list/shows/' + ref + '/season/1',
                model: new EpisodeList()
            });

            this.render();
        },

        render: function () {
            this.publish('SHOW__BACKGROUND', this.model.get('background'));
            return Page.prototype.render.apply(this, arguments);
        },

        onRenderComplete: function () {
            this.appendToElement('list-season', this.list);
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
        }
    });
});

