/* globals define, Backbone, $, _ */

define([
  'backbone'
], function () {
    'use strict';

    return Backbone.View.extend({

        subscriptions : {
            'SHOW__BACKGROUND' : 'setBackground'
        },

        initialize: function () {
            //this.router = new app.Router();
        },

        renderPage: function (options) {
            options = options || {};

            if (options.page === true) {
                this.$el.addClass('page');
            }

            return this;
        },

        setBackground : function(bgUrl) {
            var sheet = document.styleSheets[0],
                selector = 'body:before',
                styles = 'background: url("' + bgUrl + '");';

            var animate = function() {
                if (sheet.insertRule) {
                    return sheet.insertRule(selector + ' {' + styles + '}', sheet.cssRules.length);
                }
                if (sheet.addRule) {
                    return sheet.addRule(selector, styles);
                }
            };

            _.delay(animate, 500);
        },

        transitionIn: function (callback) {
            var view = this;

            var transitionIn = function () {
                //view.$el.addClass('is-visible');
                view.$el.addClass('pt-page-scaleUp');
                view.$el.one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd animationend', function () {
                    view.$el.removeClass('pt-page-scaleUp');
                    if (_.isFunction(callback)) {
                        $('#menu').mCustomScrollbar('update');
                        callback();
                    }
                });
            };

            _.delay(transitionIn, 20);
        },

        transitionOut: function (callback) {
            var view = this;

            view.$el.addClass('pt-page-moveToBottom');
            //view.$el.removeClass('iosSlideInRight animated');
            //view.$el.removeClass('is-visible');
            view.$el.one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd', function () {
                view.$el.removeClass('pt-page-moveToBottom');
                if (_.isFunction(callback)) {
                    callback();
                }
            });
        }
    });
});
