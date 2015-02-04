/* globals define, require, _ */

define([
    'dst!modules/show/template/show.overview.dust',
    'modules/page/views/page.view'
], function () {
    'use strict';

    var Page = require('modules/page/views/page.view');

    return Page.extend({

        template: require('dst!modules/show/template/show.overview.dust'),

        initialize: function () {
            this.listenTo(this, 'render-complete', this.onRenderComplete);

            _.bindAll(this, 'render');

            this.model.on('change', this.render);
            this.model.fetch({
                url: 'api/shows/dexter'
            });
        },

        getTemplateData: function () {
            return {
                title: this.model.get('title'),
                summary: this.model.get('summary'),
                genre: this.model.get('genre'),
                image : this.model.get('poster')
            };
        },

        render : function() {
            return Page.prototype.render.apply(this, arguments);
        },

        onRenderComplete: function () {
            console.log('render complete');
        }
    });
});

