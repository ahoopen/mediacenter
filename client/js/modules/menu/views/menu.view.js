/* globals Backbone, require, define */

define([
    'dst!modules/menu/template/menu.dust'
], function () {

    'use strict';

    return Backbone.View.extend({

        template: require('dst!modules/menu/template/menu.dust'),

        initialize: function () {
            this.socket = window.socket;
            this.assignListeners();
        },

        assignListeners: function () {
            this.socket.on('MENU_OPEN', this.openMenu);
            this.socket.on('MENU_CLOSE', this.hideMenu);
        },

        openMenu: function () {
            this.$el.addClass('menu__open');
        },

        hideMenu: function () {
            this.$el.removeClass('menu__open');
        },

        remove: function () {
            this.socket.removeListener('MENU_OPEN', this.openMenu);
            this.socket.removeListener('MENU_CLOSE', this.hideMenu);

            Backbone.View.prototype.remove.apply(this, arguments);
        }
    });
});
