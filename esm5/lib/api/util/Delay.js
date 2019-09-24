/**
 * Copyright (c) Tiny Technologies, Inc. All rights reserved.
 * Licensed under the LGPL or a commercial license.
 * For LGPL see License.txt in the project root for license information.
 * For commercial licenses see https://www.tiny.cloud/
 */
import { clearInterval, clearTimeout, document, setInterval, setTimeout, window } from '@ephox/dom-globals';
import Promise from './Promise';
/**
 * Utility class for working with delayed actions like setTimeout.
 *
 * @class tinymce.util.Delay
 */
var requestAnimationFramePromise;
var requestAnimationFrame = function (callback, element) {
    var i, requestAnimationFrameFunc = window.requestAnimationFrame;
    var vendors = ['ms', 'moz', 'webkit'];
    var featurefill = function (callback) {
        window.setTimeout(callback, 0);
    };
    for (i = 0; i < vendors.length && !requestAnimationFrameFunc; i++) {
        requestAnimationFrameFunc = window[vendors[i] + 'RequestAnimationFrame'];
    }
    if (!requestAnimationFrameFunc) {
        requestAnimationFrameFunc = featurefill;
    }
    requestAnimationFrameFunc(callback, element);
};
var ɵ0 = requestAnimationFrame;
var wrappedSetTimeout = function (callback, time) {
    if (typeof time !== 'number') {
        time = 0;
    }
    return setTimeout(callback, time);
};
var ɵ1 = wrappedSetTimeout;
var wrappedSetInterval = function (callback, time) {
    if (typeof time !== 'number') {
        time = 1; // IE 8 needs it to be > 0
    }
    return setInterval(callback, time);
};
var ɵ2 = wrappedSetInterval;
var wrappedClearTimeout = function (id) {
    return clearTimeout(id);
};
var ɵ3 = wrappedClearTimeout;
var wrappedClearInterval = function (id) {
    return clearInterval(id);
};
var ɵ4 = wrappedClearInterval;
var debounce = function (callback, time) {
    var timer, func;
    func = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        clearTimeout(timer);
        timer = wrappedSetTimeout(function () {
            callback.apply(this, args);
        }, time);
    };
    func.stop = function () {
        clearTimeout(timer);
    };
    return func;
};
var ɵ5 = debounce;
var Delay = {
    /**
     * Requests an animation frame and fallbacks to a timeout on older browsers.
     *
     * @method requestAnimationFrame
     * @param {function} callback Callback to execute when a new frame is available.
     * @param {DOMElement} element Optional element to scope it to.
     */
    requestAnimationFrame: function (callback, element) {
        if (requestAnimationFramePromise) {
            requestAnimationFramePromise.then(callback);
            return;
        }
        requestAnimationFramePromise = new Promise(function (resolve) {
            if (!element) {
                element = document.body;
            }
            requestAnimationFrame(resolve, element);
        }).then(callback);
    },
    /**
     * Sets a timer in ms and executes the specified callback when the timer runs out.
     *
     * @method setTimeout
     * @param {function} callback Callback to execute when timer runs out.
     * @param {Number} time Optional time to wait before the callback is executed, defaults to 0.
     * @return {Number} Timeout id number.
     */
    setTimeout: wrappedSetTimeout,
    /**
     * Sets an interval timer in ms and executes the specified callback at every interval of that time.
     *
     * @method setInterval
     * @param {function} callback Callback to execute when interval time runs out.
     * @param {Number} time Optional time to wait before the callback is executed, defaults to 0.
     * @return {Number} Timeout id number.
     */
    setInterval: wrappedSetInterval,
    /**
     * Creates debounced callback function that only gets executed once within the specified time.
     *
     * @method debounce
     * @param {function} callback Callback to execute when timer finishes.
     * @param {Number} time Optional time to wait before the callback is executed, defaults to 0.
     * @return {Function} debounced function callback.
     */
    debounce: debounce,
    // Throttle needs to be debounce due to backwards compatibility.
    throttle: debounce,
    /**
     * Clears an interval timer so it won't execute.
     *
     * @method clearInterval
     * @param {Number} Interval timer id number.
     */
    clearInterval: wrappedClearInterval,
    /**
     * Clears an timeout timer so it won't execute.
     *
     * @method clearTimeout
     * @param {Number} Timeout timer id number.
     */
    clearTimeout: wrappedClearTimeout
};
export default Delay;
export { ɵ0, ɵ1, ɵ2, ɵ3, ɵ4, ɵ5 };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRGVsYXkuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AcG9scHdhcmUvdGlueW1jZS11dGlsLyIsInNvdXJjZXMiOlsibGliL2FwaS91dGlsL0RlbGF5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7OztHQUtHO0FBRUgsT0FBTyxFQUFFLGFBQWEsRUFBRSxZQUFZLEVBQUUsUUFBUSxFQUFlLFdBQVcsRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDekgsT0FBTyxPQUFPLE1BQU0sV0FBVyxDQUFDO0FBY2hDOzs7O0dBSUc7QUFFSCxJQUFJLDRCQUE0QixDQUFDO0FBRWpDLElBQU0scUJBQXFCLEdBQUcsVUFBUyxRQUFRLEVBQUUsT0FBUTtJQUNyRCxJQUFJLENBQUMsRUFBRSx5QkFBeUIsR0FBUSxNQUFNLENBQUMscUJBQXFCLENBQUM7SUFDckUsSUFBTSxPQUFPLEdBQUcsQ0FBQyxJQUFJLEVBQUUsS0FBSyxFQUFFLFFBQVEsQ0FBQyxDQUFDO0lBRXhDLElBQU0sV0FBVyxHQUFHLFVBQVMsUUFBUTtRQUNqQyxNQUFNLENBQUMsVUFBVSxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUMsQ0FBQztJQUNuQyxDQUFDLENBQUM7SUFFRixLQUFLLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLE9BQU8sQ0FBQyxNQUFNLElBQUksQ0FBQyx5QkFBeUIsRUFBRSxDQUFDLEVBQUUsRUFBRTtRQUMvRCx5QkFBeUIsR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxHQUFHLHVCQUF1QixDQUFDLENBQUM7S0FDNUU7SUFFRCxJQUFJLENBQUMseUJBQXlCLEVBQUU7UUFDNUIseUJBQXlCLEdBQUcsV0FBVyxDQUFDO0tBQzNDO0lBRUQseUJBQXlCLENBQUMsUUFBUSxFQUFFLE9BQU8sQ0FBQyxDQUFDO0FBQ2pELENBQUMsQ0FBQzs7QUFFRixJQUFNLGlCQUFpQixHQUFHLFVBQVMsUUFBUSxFQUFFLElBQUs7SUFDOUMsSUFBSSxPQUFPLElBQUksS0FBSyxRQUFRLEVBQUU7UUFDMUIsSUFBSSxHQUFHLENBQUMsQ0FBQztLQUNaO0lBRUQsT0FBTyxVQUFVLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxDQUFDO0FBQ3RDLENBQUMsQ0FBQzs7QUFFRixJQUFNLGtCQUFrQixHQUFHLFVBQVMsUUFBa0IsRUFBRSxJQUFhO0lBQ2pFLElBQUksT0FBTyxJQUFJLEtBQUssUUFBUSxFQUFFO1FBQzFCLElBQUksR0FBRyxDQUFDLENBQUMsQ0FBQywwQkFBMEI7S0FDdkM7SUFFRCxPQUFPLFdBQVcsQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLENBQUM7QUFDdkMsQ0FBQyxDQUFDOztBQUVGLElBQU0sbUJBQW1CLEdBQUcsVUFBUyxFQUFVO0lBQzNDLE9BQU8sWUFBWSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0FBQzVCLENBQUMsQ0FBQzs7QUFFRixJQUFNLG9CQUFvQixHQUFHLFVBQVMsRUFBVTtJQUM1QyxPQUFPLGFBQWEsQ0FBQyxFQUFFLENBQUMsQ0FBQztBQUM3QixDQUFDLENBQUM7O0FBRUYsSUFBTSxRQUFRLEdBQUcsVUFBUyxRQUFrQyxFQUFFLElBQWE7SUFDdkUsSUFBSSxLQUFLLEVBQUUsSUFBSSxDQUFDO0lBRWhCLElBQUksR0FBRztRQUFTLGNBQU87YUFBUCxVQUFPLEVBQVAscUJBQU8sRUFBUCxJQUFPO1lBQVAseUJBQU87O1FBQ25CLFlBQVksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUVwQixLQUFLLEdBQUcsaUJBQWlCLENBQUM7WUFDdEIsUUFBUSxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDL0IsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ2IsQ0FBQyxDQUFDO0lBRUYsSUFBSSxDQUFDLElBQUksR0FBRztRQUNSLFlBQVksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUN4QixDQUFDLENBQUM7SUFFRixPQUFPLElBQUksQ0FBQztBQUNoQixDQUFDLENBQUM7O0FBRUYsSUFBTSxLQUFLLEdBQVU7SUFDakI7Ozs7OztPQU1HO0lBQ0gscUJBQXFCLEVBQXJCLFVBQXNCLFFBQVEsRUFBRSxPQUFRO1FBQ3BDLElBQUksNEJBQTRCLEVBQUU7WUFDOUIsNEJBQTRCLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQzVDLE9BQU87U0FDVjtRQUVELDRCQUE0QixHQUFHLElBQUksT0FBTyxDQUFDLFVBQVMsT0FBTztZQUN2RCxJQUFJLENBQUMsT0FBTyxFQUFFO2dCQUNWLE9BQU8sR0FBRyxRQUFRLENBQUMsSUFBSSxDQUFDO2FBQzNCO1lBRUQscUJBQXFCLENBQUMsT0FBTyxFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBQzVDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUN0QixDQUFDO0lBRUQ7Ozs7Ozs7T0FPRztJQUNILFVBQVUsRUFBRSxpQkFBaUI7SUFFN0I7Ozs7Ozs7T0FPRztJQUNILFdBQVcsRUFBRSxrQkFBa0I7SUFFL0I7Ozs7Ozs7T0FPRztJQUNILFFBQVEsVUFBQTtJQUVSLGdFQUFnRTtJQUNoRSxRQUFRLEVBQUUsUUFBUTtJQUVsQjs7Ozs7T0FLRztJQUNILGFBQWEsRUFBRSxvQkFBb0I7SUFFbkM7Ozs7O09BS0c7SUFDSCxZQUFZLEVBQUUsbUJBQW1CO0NBQ3BDLENBQUM7QUFFRixlQUFlLEtBQUssQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQ29weXJpZ2h0IChjKSBUaW55IFRlY2hub2xvZ2llcywgSW5jLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICogTGljZW5zZWQgdW5kZXIgdGhlIExHUEwgb3IgYSBjb21tZXJjaWFsIGxpY2Vuc2UuXG4gKiBGb3IgTEdQTCBzZWUgTGljZW5zZS50eHQgaW4gdGhlIHByb2plY3Qgcm9vdCBmb3IgbGljZW5zZSBpbmZvcm1hdGlvbi5cbiAqIEZvciBjb21tZXJjaWFsIGxpY2Vuc2VzIHNlZSBodHRwczovL3d3dy50aW55LmNsb3VkL1xuICovXG5cbmltcG9ydCB7IGNsZWFySW50ZXJ2YWwsIGNsZWFyVGltZW91dCwgZG9jdW1lbnQsIEhUTUxFbGVtZW50LCBzZXRJbnRlcnZhbCwgc2V0VGltZW91dCwgd2luZG93IH0gZnJvbSAnQGVwaG94L2RvbS1nbG9iYWxzJztcbmltcG9ydCBQcm9taXNlIGZyb20gJy4vUHJvbWlzZSc7XG5cbnR5cGUgRGVib3VuY2VGdW5jID0gKC4uLmFyZ3M6IGFueVtdKSA9PiB7IHN0b3A6ICgpID0+IHZvaWQ7IH07XG5cbmludGVyZmFjZSBEZWxheSB7XG4gICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKGNhbGxiYWNrOiAoKSA9PiB2b2lkLCBlbGVtZW50PzogSFRNTEVsZW1lbnQpOiB2b2lkO1xuICAgIHNldEludGVydmFsKGNhbGxiYWNrOiAoKSA9PiB2b2lkLCB0aW1lPzogbnVtYmVyKTogbnVtYmVyO1xuICAgIHNldFRpbWVvdXQoY2FsbGJhY2s6ICgpID0+IHZvaWQsIHRpbWU/OiBudW1iZXIpOiBudW1iZXI7XG4gICAgY2xlYXJJbnRlcnZhbChpZDogbnVtYmVyKTogdm9pZDtcbiAgICBjbGVhclRpbWVvdXQoaWQ6IG51bWJlcik6IHZvaWQ7XG4gICAgZGVib3VuY2UoY2FsbGJhY2s6ICguLi5hcmdzOiBhbnlbXSkgPT4gdm9pZCwgdGltZT86IG51bWJlcik6IERlYm91bmNlRnVuYztcbiAgICB0aHJvdHRsZShjYWxsYmFjazogKC4uLmFyZ3M6IGFueVtdKSA9PiB2b2lkLCB0aW1lPzogbnVtYmVyKTogRGVib3VuY2VGdW5jO1xufVxuXG4vKipcbiAqIFV0aWxpdHkgY2xhc3MgZm9yIHdvcmtpbmcgd2l0aCBkZWxheWVkIGFjdGlvbnMgbGlrZSBzZXRUaW1lb3V0LlxuICpcbiAqIEBjbGFzcyB0aW55bWNlLnV0aWwuRGVsYXlcbiAqL1xuXG5sZXQgcmVxdWVzdEFuaW1hdGlvbkZyYW1lUHJvbWlzZTtcblxuY29uc3QgcmVxdWVzdEFuaW1hdGlvbkZyYW1lID0gZnVuY3Rpb24oY2FsbGJhY2ssIGVsZW1lbnQ/KSB7XG4gICAgbGV0IGksIHJlcXVlc3RBbmltYXRpb25GcmFtZUZ1bmM6IGFueSA9IHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWU7XG4gICAgY29uc3QgdmVuZG9ycyA9IFsnbXMnLCAnbW96JywgJ3dlYmtpdCddO1xuXG4gICAgY29uc3QgZmVhdHVyZWZpbGwgPSBmdW5jdGlvbihjYWxsYmFjaykge1xuICAgICAgICB3aW5kb3cuc2V0VGltZW91dChjYWxsYmFjaywgMCk7XG4gICAgfTtcblxuICAgIGZvciAoaSA9IDA7IGkgPCB2ZW5kb3JzLmxlbmd0aCAmJiAhcmVxdWVzdEFuaW1hdGlvbkZyYW1lRnVuYzsgaSsrKSB7XG4gICAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZUZ1bmMgPSB3aW5kb3dbdmVuZG9yc1tpXSArICdSZXF1ZXN0QW5pbWF0aW9uRnJhbWUnXTtcbiAgICB9XG5cbiAgICBpZiAoIXJlcXVlc3RBbmltYXRpb25GcmFtZUZ1bmMpIHtcbiAgICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lRnVuYyA9IGZlYXR1cmVmaWxsO1xuICAgIH1cblxuICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZUZ1bmMoY2FsbGJhY2ssIGVsZW1lbnQpO1xufTtcblxuY29uc3Qgd3JhcHBlZFNldFRpbWVvdXQgPSBmdW5jdGlvbihjYWxsYmFjaywgdGltZT8pIHtcbiAgICBpZiAodHlwZW9mIHRpbWUgIT09ICdudW1iZXInKSB7XG4gICAgICAgIHRpbWUgPSAwO1xuICAgIH1cblxuICAgIHJldHVybiBzZXRUaW1lb3V0KGNhbGxiYWNrLCB0aW1lKTtcbn07XG5cbmNvbnN0IHdyYXBwZWRTZXRJbnRlcnZhbCA9IGZ1bmN0aW9uKGNhbGxiYWNrOiBGdW5jdGlvbiwgdGltZT86IG51bWJlcik6IG51bWJlciB7XG4gICAgaWYgKHR5cGVvZiB0aW1lICE9PSAnbnVtYmVyJykge1xuICAgICAgICB0aW1lID0gMTsgLy8gSUUgOCBuZWVkcyBpdCB0byBiZSA+IDBcbiAgICB9XG5cbiAgICByZXR1cm4gc2V0SW50ZXJ2YWwoY2FsbGJhY2ssIHRpbWUpO1xufTtcblxuY29uc3Qgd3JhcHBlZENsZWFyVGltZW91dCA9IGZ1bmN0aW9uKGlkOiBudW1iZXIpIHtcbiAgICByZXR1cm4gY2xlYXJUaW1lb3V0KGlkKTtcbn07XG5cbmNvbnN0IHdyYXBwZWRDbGVhckludGVydmFsID0gZnVuY3Rpb24oaWQ6IG51bWJlcikge1xuICAgIHJldHVybiBjbGVhckludGVydmFsKGlkKTtcbn07XG5cbmNvbnN0IGRlYm91bmNlID0gZnVuY3Rpb24oY2FsbGJhY2s6ICguLi5hcmdzOiBhbnlbXSkgPT4gdm9pZCwgdGltZT86IG51bWJlcik6IERlYm91bmNlRnVuYyB7XG4gICAgbGV0IHRpbWVyLCBmdW5jO1xuXG4gICAgZnVuYyA9IGZ1bmN0aW9uKC4uLmFyZ3MpIHtcbiAgICAgICAgY2xlYXJUaW1lb3V0KHRpbWVyKTtcblxuICAgICAgICB0aW1lciA9IHdyYXBwZWRTZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgY2FsbGJhY2suYXBwbHkodGhpcywgYXJncyk7XG4gICAgICAgIH0sIHRpbWUpO1xuICAgIH07XG5cbiAgICBmdW5jLnN0b3AgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgY2xlYXJUaW1lb3V0KHRpbWVyKTtcbiAgICB9O1xuXG4gICAgcmV0dXJuIGZ1bmM7XG59O1xuXG5jb25zdCBEZWxheTogRGVsYXkgPSB7XG4gICAgLyoqXG4gICAgICogUmVxdWVzdHMgYW4gYW5pbWF0aW9uIGZyYW1lIGFuZCBmYWxsYmFja3MgdG8gYSB0aW1lb3V0IG9uIG9sZGVyIGJyb3dzZXJzLlxuICAgICAqXG4gICAgICogQG1ldGhvZCByZXF1ZXN0QW5pbWF0aW9uRnJhbWVcbiAgICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBjYWxsYmFjayBDYWxsYmFjayB0byBleGVjdXRlIHdoZW4gYSBuZXcgZnJhbWUgaXMgYXZhaWxhYmxlLlxuICAgICAqIEBwYXJhbSB7RE9NRWxlbWVudH0gZWxlbWVudCBPcHRpb25hbCBlbGVtZW50IHRvIHNjb3BlIGl0IHRvLlxuICAgICAqL1xuICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZShjYWxsYmFjaywgZWxlbWVudD8pIHtcbiAgICAgICAgaWYgKHJlcXVlc3RBbmltYXRpb25GcmFtZVByb21pc2UpIHtcbiAgICAgICAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZVByb21pc2UudGhlbihjYWxsYmFjayk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWVQcm9taXNlID0gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSkge1xuICAgICAgICAgICAgaWYgKCFlbGVtZW50KSB7XG4gICAgICAgICAgICAgICAgZWxlbWVudCA9IGRvY3VtZW50LmJvZHk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZShyZXNvbHZlLCBlbGVtZW50KTtcbiAgICAgICAgfSkudGhlbihjYWxsYmFjayk7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIFNldHMgYSB0aW1lciBpbiBtcyBhbmQgZXhlY3V0ZXMgdGhlIHNwZWNpZmllZCBjYWxsYmFjayB3aGVuIHRoZSB0aW1lciBydW5zIG91dC5cbiAgICAgKlxuICAgICAqIEBtZXRob2Qgc2V0VGltZW91dFxuICAgICAqIEBwYXJhbSB7ZnVuY3Rpb259IGNhbGxiYWNrIENhbGxiYWNrIHRvIGV4ZWN1dGUgd2hlbiB0aW1lciBydW5zIG91dC5cbiAgICAgKiBAcGFyYW0ge051bWJlcn0gdGltZSBPcHRpb25hbCB0aW1lIHRvIHdhaXQgYmVmb3JlIHRoZSBjYWxsYmFjayBpcyBleGVjdXRlZCwgZGVmYXVsdHMgdG8gMC5cbiAgICAgKiBAcmV0dXJuIHtOdW1iZXJ9IFRpbWVvdXQgaWQgbnVtYmVyLlxuICAgICAqL1xuICAgIHNldFRpbWVvdXQ6IHdyYXBwZWRTZXRUaW1lb3V0LFxuXG4gICAgLyoqXG4gICAgICogU2V0cyBhbiBpbnRlcnZhbCB0aW1lciBpbiBtcyBhbmQgZXhlY3V0ZXMgdGhlIHNwZWNpZmllZCBjYWxsYmFjayBhdCBldmVyeSBpbnRlcnZhbCBvZiB0aGF0IHRpbWUuXG4gICAgICpcbiAgICAgKiBAbWV0aG9kIHNldEludGVydmFsXG4gICAgICogQHBhcmFtIHtmdW5jdGlvbn0gY2FsbGJhY2sgQ2FsbGJhY2sgdG8gZXhlY3V0ZSB3aGVuIGludGVydmFsIHRpbWUgcnVucyBvdXQuXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IHRpbWUgT3B0aW9uYWwgdGltZSB0byB3YWl0IGJlZm9yZSB0aGUgY2FsbGJhY2sgaXMgZXhlY3V0ZWQsIGRlZmF1bHRzIHRvIDAuXG4gICAgICogQHJldHVybiB7TnVtYmVyfSBUaW1lb3V0IGlkIG51bWJlci5cbiAgICAgKi9cbiAgICBzZXRJbnRlcnZhbDogd3JhcHBlZFNldEludGVydmFsLFxuXG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBkZWJvdW5jZWQgY2FsbGJhY2sgZnVuY3Rpb24gdGhhdCBvbmx5IGdldHMgZXhlY3V0ZWQgb25jZSB3aXRoaW4gdGhlIHNwZWNpZmllZCB0aW1lLlxuICAgICAqXG4gICAgICogQG1ldGhvZCBkZWJvdW5jZVxuICAgICAqIEBwYXJhbSB7ZnVuY3Rpb259IGNhbGxiYWNrIENhbGxiYWNrIHRvIGV4ZWN1dGUgd2hlbiB0aW1lciBmaW5pc2hlcy5cbiAgICAgKiBAcGFyYW0ge051bWJlcn0gdGltZSBPcHRpb25hbCB0aW1lIHRvIHdhaXQgYmVmb3JlIHRoZSBjYWxsYmFjayBpcyBleGVjdXRlZCwgZGVmYXVsdHMgdG8gMC5cbiAgICAgKiBAcmV0dXJuIHtGdW5jdGlvbn0gZGVib3VuY2VkIGZ1bmN0aW9uIGNhbGxiYWNrLlxuICAgICAqL1xuICAgIGRlYm91bmNlLFxuXG4gICAgLy8gVGhyb3R0bGUgbmVlZHMgdG8gYmUgZGVib3VuY2UgZHVlIHRvIGJhY2t3YXJkcyBjb21wYXRpYmlsaXR5LlxuICAgIHRocm90dGxlOiBkZWJvdW5jZSxcblxuICAgIC8qKlxuICAgICAqIENsZWFycyBhbiBpbnRlcnZhbCB0aW1lciBzbyBpdCB3b24ndCBleGVjdXRlLlxuICAgICAqXG4gICAgICogQG1ldGhvZCBjbGVhckludGVydmFsXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IEludGVydmFsIHRpbWVyIGlkIG51bWJlci5cbiAgICAgKi9cbiAgICBjbGVhckludGVydmFsOiB3cmFwcGVkQ2xlYXJJbnRlcnZhbCxcblxuICAgIC8qKlxuICAgICAqIENsZWFycyBhbiB0aW1lb3V0IHRpbWVyIHNvIGl0IHdvbid0IGV4ZWN1dGUuXG4gICAgICpcbiAgICAgKiBAbWV0aG9kIGNsZWFyVGltZW91dFxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBUaW1lb3V0IHRpbWVyIGlkIG51bWJlci5cbiAgICAgKi9cbiAgICBjbGVhclRpbWVvdXQ6IHdyYXBwZWRDbGVhclRpbWVvdXRcbn07XG5cbmV4cG9ydCBkZWZhdWx0IERlbGF5O1xuIl19