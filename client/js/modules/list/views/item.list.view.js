/* globals define, require, Backbone */
define([
    'dst!modules/list/template/list.empty.dust',

    'modules/list/views/item.show.view',
    'modules/list/views/item.episode.view'
], function () {

    'use strict';

    var ShowItemView = require('modules/list/views/item.show.view'),
        EpisodeItemView = require('modules/list/views/item.episode.view');

    return Backbone.View.extend({

        template: require('dst!modules/list/template/list.empty.dust'),

        initialize: function () {
            this.$el.addClass('items__list');

            if (this.model === undefined) {
                throw 'No model provided for view!';
            }

            this.listenTo(this, 'render-complete', this.onRenderComplete);

            this.getItems();
        },

        /**
         * Render the list with items.
         *
         * @returns {*}
         */
        render: function () {
            this._removeSubviews();

            // render all the item views
            this.model.get('items').each(function (model) {
                this.renderItem(model);
            }.bind(this));

            this.$el.children().first().addClass('selected');
            this.setElement(this.$el.children() );

            Backbone.View.prototype.render.apply(this, arguments);

            return this;
        },

        /**
         * Render is complete, init scrollbar
         *
         */
        onRenderComplete: function () {
            this.publish('LIST_RENDER_COMPLETE');
        },

        /**
         * Fetch model and on succes render the list
         */
        getItems: function () {
            this.model.fetch({
                success: function () {
                    this.render();
                }.bind(this)
            });
        },

        /**
         * Render item views based on the model type.
         *
         * @param model
         */
        renderItem: function (model) {
            var itemView;

            switch (this.model.get('type')) {
                case 'SHOW_ITEM':
                    itemView = new ShowItemView({
                        model: model
                    });
                    break;
                case 'EPISODE_ITEM' :
                    itemView = new EpisodeItemView({
                        model: model
                    });
                    break;
                default :
                    throw new Error('No view defined!');
            }

            if (itemView) {
                this.appendToElement('id-' + model.get('id'), itemView);
            }
        },

        /**
         * Append the item view to the list view
         *
         * @param id
         * @param view
         */
        appendToElement: function (id, view) {
            this.$el.append(view.render().el);
            this.subview(id, view);
        },

        remove: function () {
            Backbone.View.prototype.remove.apply(this, arguments);
        }
    });
});
