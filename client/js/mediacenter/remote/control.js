/* globals $, io */

(function (window) {

    'use strict';

    var socket = null,
        connected = false,

        init = function () {
            socket = io.connect(window.location.host);
            socket.on('connect', function () {
                connected = true;
                next();
                previous();
            });
        },

        on = function (action, fn) {
            if (connected) {
                socket.on(action, fn);
            } else {
                throw 'Remote control - Connect first!';
            }
        },

        next = function () {
            on('remote:next', function () {
                var current = $('.selected');
                current.removeClass('selected');


                if ($(current).prev().attr('data-menu-list') === 'start') {
                    $('[data-menu-list="end"]').prev().addClass('selected');
                } else {
                    $(current).prev().addClass('selected');
                }

            });
        },

        previous = function () {
            on('remote:previous', function () {
                var current = $('.selected');
                current.removeClass('selected');

                if ($(current).next().attr('data-menu-list') === 'end') {
                    $('[data-menu-list="start"]').next().addClass('selected');
                } else {
                    $(current).next().addClass('selected');
                }
            });
        },

        enter = function (callback) {
            on('enter', function () {
                console.log($('.selected '));
                callback();
            });

        };


    window.remoteControle = {
        init: init,
        next: next,
        previous: previous,
        enter: enter
    };

}(window));
