/* globals define, require, Backbone, _ */

define([
    'backbone-patterns'
], function () {

    'use strict';

    var router = Backbone.Router.extend({

        routes: {
            '/home': 'home'
        },

        initialize: function () {
            this.subscribe('router:start', this.onRouter, this);
        },

        onRouter: function () {
            this.unsubscribe('router:start', this.onRouter, this);

            Backbone.history.start({
                pushState: true,
                hashChange: true,
                root: '/'
            });
        },

        home: function () {
            require(['home'], function() {

            });
        }

    });

    _.extend(router.prototype, Backbone.decorators.PubSub);

    return router;
});
