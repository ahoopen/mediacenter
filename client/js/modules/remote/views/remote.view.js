/* globals Backbone, define, require, io */

define([
    'dst!modules/remote/template/remote.dust',
    'gestureManager'

], function () {

    'use strict';

    var GestureManager = require('gestureManager');

    return Backbone.View.extend({

        template: require('dst!modules/remote/template/remote.dust'),

        socket: null,
        gesture: null,

        initialize: function () {
            Backbone.View.prototype.initialize.apply(this, arguments);

            this._socket();
            this.on('render-complete', this.onRenderComplete, this);
            this.render();
        },

        /**
         * Set up a socket connection
         *
         * @private
         */
        _socket: function () {
            this.socket = io.connect(window.location.host);
            this.socket.on('connect', function () {
                this.socket.emit('remote');
            }.bind(this));
        },

        /**
         * Sends 'remote_control_action' events to the server.
         *
         * @param action
         * @private
         */
        _sendRemoteAction: function (action) {
            console.log(action);
            this.socket.emit('remote_control_action', {action: action});
        },

        /**
         * Initialize the gesture event listeners
         *
         * @private
         */
        _assignGestureListeners: function () {
            var self = this;

            if (this.gesture === null) {
                this.gesture = new GestureManager(this.el);

                this.gesture.on('swipeUp', function () {
                    self._sendRemoteAction('next');
                });
                this.gesture.on('swipeLeft', function () {
                    self._sendRemoteAction('showMenu');
                });
                this.gesture.on('swipeRight', function () {
                    self._sendRemoteAction('hideMenu');
                });
                this.gesture.on('swipeDown', function () {
                    self._sendRemoteAction('previous');
                });
                this.gesture.on('tap', function () {
                    self._sendRemoteAction('select');

                });
                this.gesture.on('doubletap', function () {
                    self._sendRemoteAction('select');
                });
            }
        },

        onRenderComplete: function () {
            this._assignGestureListeners();
        },

        render: function () {
            Backbone.View.prototype.render.apply(this, arguments);
            return this;
        },

        remove: function () {
            Backbone.View.prototype.remove.apply(this, arguments);
            this.off('render-complete', this.onRenderComplete, this);
        }
    });
});
