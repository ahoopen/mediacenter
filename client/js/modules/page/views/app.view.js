/* globals define, require */

define( [
    'modules/page/views/page.view'
], function() {

    'use strict';

    var Page = require('modules/page/views/page.view');

    return Page.extend({

        el: 'body',

        goto: function (view) {
            var previous = this.currentPage || null;
            var next = view;

            if (previous) {
                previous.transitionOut(function () {
                    previous.remove();
                });
            }

            next.renderPage({page: true});
            this.$el.append(next.$el);
            next.transitionIn();
            this.currentPage = next;
        }
    });
});

