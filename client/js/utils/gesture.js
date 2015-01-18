/* globals define, $, dispatchEvent */

define( function() {

    'use strict';

    var gesture = function (element) {
        this.surface = element;
        this.threshold = 100;
        this.restraint = 200;
        this.allowedTime = 700;
        this.startTime = 0;
        this.previousTime = 0;
        this.gestures = [];

        // double tap
        this.pressDuration = 300;
        this.doubleTapInterval = 300;
        this.motionThreshold = 10;
        this.cancel = false;
        this.motion = false;
        this.previousElement = null;

        this.x = 0;
        this.y = 0;
        this.startX = 0;
        this.startY = 0;
        this.startTarget = 0;
        this.distX = 0;
        this.distY = 0;
        this.elapsedTime = 0;
        this.timeout = null;
        this.direction = 'none';

        this.init();
    };

    gesture.prototype.init = function () {
        this.surface.addEventListener('touchstart', this.touchStart.bind(this), false);
        this.surface.addEventListener('touchmove', this.touchMove.bind(this), false);
        this.surface.addEventListener('touchend', this.touchEnd.bind(this), false);

        addEventListener('GestureEvent', function (GestureEvent) {
            for( var i = 0; i < this.gestures.length; i++) {
                var gesture = this.gestures[i];
                if (gesture.type === GestureEvent.detail) {
                    gesture.callback();
                    return;
                }
            }
        }.bind(this), false);
    };

    /**
     * Delegates GestureEvent to the correct callback function
     *
     * @param type
     * @param fn
     */
    gesture.prototype.on = function (type, fn) {
        this.gestures.push({type: type, callback: fn});
    };

    /**
     * Sets begin data on start of the gesture
     *
     * @param event
     */
    gesture.prototype.touchStart = function (event) {
        var touchobj = event.changedTouches[0];

        this.startX = touchobj.pageX;
        this.startY = touchobj.pageY;
        this.startTime = new Date().getTime();
        this.startTarget = event.target;
        this.cancel = false;

        // trigger tap event
        this.timeout = setTimeout(function () {
            this.cancel = true;
            this.triggerTap();
        }.bind(this), this.pressDuration);

        event.preventDefault();
    };

    /**
     * Updates swipe direction when moving.
     *
     * @param event
     */
    gesture.prototype.touchMove = function (event) {
        var touchobj = event.changedTouches[0];

        this.distX = touchobj.pageX - this.startX;
        this.distY = touchobj.pageY - this.startY;

        //// check if the user moves its finger
        this.motion = Math.abs(this.distX) > this.motionThreshold || Math.abs(this.distY) > this.motionThreshold;
        if (!this.motion) {
            return;
        }

        // moves cancel press events
        clearTimeout(this.timeout);

        //// if distance traveled horizontally is greater than vertically, consider this a horizontal movement
        if (Math.abs(this.distX) > Math.abs(this.distY)) {
            this.direction = (this.distX < 0) ? 'swipeLeft' : 'swipeRight';
        }
        else {
        $('.remote__control--actions').text( this.distY, ' --- ', 0 );
            this.direction = (this.distY < 0) ? 'swipeUp' : 'swipeDown';
        }

        // prevent scrolling when inside DIV
        event.preventDefault();
    };

    /**
     * Checks on the last touch event which gesture is carried out.
     *
     * @param event
     */
    gesture.prototype.touchEnd = function (event) {
        var timestamp = new Date().getTime();
        this.elapsedTime = timestamp - this.startTime;

        // clear press timeout
        clearTimeout(this.timeout);


        if (this.elapsedTime <= this.allowedTime) {
            if (this.isHorizontal(this.distX, this.distY)) {
                dispatchEvent(new CustomEvent('GestureEvent', {detail: this.direction}));
            }
            else if (this.isVertical(this.distX, this.distY)) {
                dispatchEvent(new CustomEvent('GestureEvent', {detail: this.direction}));
            }
        } else if (!this.motion && !this.cancel && event.target === this.startTarget) {
            var doubleTap = this.isDoubleTap(event, timestamp);
            if (doubleTap) {
                this.triggerDoubleTap();
            }
            this.previousElement = doubleTap ? null : this.startTarget;
            this.previousTime = timestamp;
        }

        event.preventDefault();
    };

    /**
     * Checks if gesture is horizontal
     *
     * @param x
     * @param y
     * @returns {boolean}
     */
    gesture.prototype.isHorizontal = function (x, y) {
        return !!(Math.abs(x) >= this.threshold && Math.abs(y) <= this.restraint);
    };

    /**
     * Checks if gesture is vertical
     *
     * @param x
     * @param y
     * @returns {boolean}
     */
    gesture.prototype.isVertical = function (x, y) {
        return !!(Math.abs(y) >= this.threshold && Math.abs(x) <= this.restraint);
    };

    /**
     *  Triggers tap gesture event
     */
    gesture.prototype.triggerTap = function () {
        dispatchEvent(new CustomEvent('GestureEvent', {detail: 'tap'}));
    };

    /**
     *  Triggers double tap gesture event
     */
    gesture.prototype.triggerDoubleTap = function () {
        dispatchEvent(new CustomEvent('GestureEvent', {detail: 'doubletap'}));
    };

    /**
     *
     * @param event
     * @param timestamp
     * @returns {boolean}
     */
    gesture.prototype.isDoubleTap = function (event, timestamp) {
        return this.previousElement === event.target && (timestamp - this.previousTime) < this.doubleTapInterval;
    };

    return gesture;
});
