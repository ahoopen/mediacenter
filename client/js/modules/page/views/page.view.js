/* globals define, Backbone, _ */

define( function () {
    'use strict';

    return Backbone.View.extend({

        initialize: function () {
            //this.router = new app.Router();
        },

        render2: function (options) {
            console.log( 'page render...');
            options = options || {};

            if (options.page === true) {
                this.$el.addClass('page');
            }

            return this;
        },

        transitionIn: function (callback) {
            var view = this;

            var transitionIn = function () {
                //view.$el.addClass('is-visible');
                view.$el.addClass('iosSlideInRight animated');
                view.$el.one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd animationend', function () {
                    view.$el.removeClass('iosSlideInRight animated');
                    if (_.isFunction(callback)) {
                        callback();
                    }
                });
            };

            _.delay(transitionIn, 20);
        },

        transitionOut: function (callback) {
            var view = this;

            console.log('transition out...');
            view.$el.addClass('iosFadeLeft animated');
            //view.$el.removeClass('iosSlideInRight animated');
            //view.$el.removeClass('is-visible');
            view.$el.one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd animationend', function () {
                view.$el.removeClass('iosFadeLeft animated');
                if (_.isFunction(callback)) {
                    callback();
                }
            });
        }
    });
});
