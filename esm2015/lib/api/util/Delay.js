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
let requestAnimationFramePromise;
const requestAnimationFrame = function (callback, element) {
    let i, requestAnimationFrameFunc = window.requestAnimationFrame;
    const vendors = ['ms', 'moz', 'webkit'];
    const featurefill = function (callback) {
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
const ɵ0 = requestAnimationFrame;
const wrappedSetTimeout = function (callback, time) {
    if (typeof time !== 'number') {
        time = 0;
    }
    return setTimeout(callback, time);
};
const ɵ1 = wrappedSetTimeout;
const wrappedSetInterval = function (callback, time) {
    if (typeof time !== 'number') {
        time = 1; // IE 8 needs it to be > 0
    }
    return setInterval(callback, time);
};
const ɵ2 = wrappedSetInterval;
const wrappedClearTimeout = function (id) {
    return clearTimeout(id);
};
const ɵ3 = wrappedClearTimeout;
const wrappedClearInterval = function (id) {
    return clearInterval(id);
};
const ɵ4 = wrappedClearInterval;
const debounce = function (callback, time) {
    let timer, func;
    func = function (...args) {
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
const ɵ5 = debounce;
const Delay = {
    /**
     * Requests an animation frame and fallbacks to a timeout on older browsers.
     *
     * @method requestAnimationFrame
     * @param {function} callback Callback to execute when a new frame is available.
     * @param {DOMElement} element Optional element to scope it to.
     */
    requestAnimationFrame(callback, element) {
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
    debounce,
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRGVsYXkuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AcG9scHdhcmUvdGlueW1jZS11dGlsLyIsInNvdXJjZXMiOlsibGliL2FwaS91dGlsL0RlbGF5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7OztHQUtHO0FBRUgsT0FBTyxFQUFFLGFBQWEsRUFBRSxZQUFZLEVBQUUsUUFBUSxFQUFlLFdBQVcsRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDekgsT0FBTyxPQUFPLE1BQU0sV0FBVyxDQUFDO0FBY2hDOzs7O0dBSUc7QUFFSCxJQUFJLDRCQUE0QixDQUFDO0FBRWpDLE1BQU0scUJBQXFCLEdBQUcsVUFBUyxRQUFRLEVBQUUsT0FBUTtJQUNyRCxJQUFJLENBQUMsRUFBRSx5QkFBeUIsR0FBUSxNQUFNLENBQUMscUJBQXFCLENBQUM7SUFDckUsTUFBTSxPQUFPLEdBQUcsQ0FBQyxJQUFJLEVBQUUsS0FBSyxFQUFFLFFBQVEsQ0FBQyxDQUFDO0lBRXhDLE1BQU0sV0FBVyxHQUFHLFVBQVMsUUFBUTtRQUNqQyxNQUFNLENBQUMsVUFBVSxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUMsQ0FBQztJQUNuQyxDQUFDLENBQUM7SUFFRixLQUFLLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLE9BQU8sQ0FBQyxNQUFNLElBQUksQ0FBQyx5QkFBeUIsRUFBRSxDQUFDLEVBQUUsRUFBRTtRQUMvRCx5QkFBeUIsR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxHQUFHLHVCQUF1QixDQUFDLENBQUM7S0FDNUU7SUFFRCxJQUFJLENBQUMseUJBQXlCLEVBQUU7UUFDNUIseUJBQXlCLEdBQUcsV0FBVyxDQUFDO0tBQzNDO0lBRUQseUJBQXlCLENBQUMsUUFBUSxFQUFFLE9BQU8sQ0FBQyxDQUFDO0FBQ2pELENBQUMsQ0FBQzs7QUFFRixNQUFNLGlCQUFpQixHQUFHLFVBQVMsUUFBUSxFQUFFLElBQUs7SUFDOUMsSUFBSSxPQUFPLElBQUksS0FBSyxRQUFRLEVBQUU7UUFDMUIsSUFBSSxHQUFHLENBQUMsQ0FBQztLQUNaO0lBRUQsT0FBTyxVQUFVLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxDQUFDO0FBQ3RDLENBQUMsQ0FBQzs7QUFFRixNQUFNLGtCQUFrQixHQUFHLFVBQVMsUUFBa0IsRUFBRSxJQUFhO0lBQ2pFLElBQUksT0FBTyxJQUFJLEtBQUssUUFBUSxFQUFFO1FBQzFCLElBQUksR0FBRyxDQUFDLENBQUMsQ0FBQywwQkFBMEI7S0FDdkM7SUFFRCxPQUFPLFdBQVcsQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLENBQUM7QUFDdkMsQ0FBQyxDQUFDOztBQUVGLE1BQU0sbUJBQW1CLEdBQUcsVUFBUyxFQUFVO0lBQzNDLE9BQU8sWUFBWSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0FBQzVCLENBQUMsQ0FBQzs7QUFFRixNQUFNLG9CQUFvQixHQUFHLFVBQVMsRUFBVTtJQUM1QyxPQUFPLGFBQWEsQ0FBQyxFQUFFLENBQUMsQ0FBQztBQUM3QixDQUFDLENBQUM7O0FBRUYsTUFBTSxRQUFRLEdBQUcsVUFBUyxRQUFrQyxFQUFFLElBQWE7SUFDdkUsSUFBSSxLQUFLLEVBQUUsSUFBSSxDQUFDO0lBRWhCLElBQUksR0FBRyxVQUFTLEdBQUcsSUFBSTtRQUNuQixZQUFZLENBQUMsS0FBSyxDQUFDLENBQUM7UUFFcEIsS0FBSyxHQUFHLGlCQUFpQixDQUFDO1lBQ3RCLFFBQVEsQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQy9CLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQztJQUNiLENBQUMsQ0FBQztJQUVGLElBQUksQ0FBQyxJQUFJLEdBQUc7UUFDUixZQUFZLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDeEIsQ0FBQyxDQUFDO0lBRUYsT0FBTyxJQUFJLENBQUM7QUFDaEIsQ0FBQyxDQUFDOztBQUVGLE1BQU0sS0FBSyxHQUFVO0lBQ2pCOzs7Ozs7T0FNRztJQUNILHFCQUFxQixDQUFDLFFBQVEsRUFBRSxPQUFRO1FBQ3BDLElBQUksNEJBQTRCLEVBQUU7WUFDOUIsNEJBQTRCLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQzVDLE9BQU87U0FDVjtRQUVELDRCQUE0QixHQUFHLElBQUksT0FBTyxDQUFDLFVBQVMsT0FBTztZQUN2RCxJQUFJLENBQUMsT0FBTyxFQUFFO2dCQUNWLE9BQU8sR0FBRyxRQUFRLENBQUMsSUFBSSxDQUFDO2FBQzNCO1lBRUQscUJBQXFCLENBQUMsT0FBTyxFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBQzVDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUN0QixDQUFDO0lBRUQ7Ozs7Ozs7T0FPRztJQUNILFVBQVUsRUFBRSxpQkFBaUI7SUFFN0I7Ozs7Ozs7T0FPRztJQUNILFdBQVcsRUFBRSxrQkFBa0I7SUFFL0I7Ozs7Ozs7T0FPRztJQUNILFFBQVE7SUFFUixnRUFBZ0U7SUFDaEUsUUFBUSxFQUFFLFFBQVE7SUFFbEI7Ozs7O09BS0c7SUFDSCxhQUFhLEVBQUUsb0JBQW9CO0lBRW5DOzs7OztPQUtHO0lBQ0gsWUFBWSxFQUFFLG1CQUFtQjtDQUNwQyxDQUFDO0FBRUYsZUFBZSxLQUFLLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIENvcHlyaWdodCAoYykgVGlueSBUZWNobm9sb2dpZXMsIEluYy4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBMR1BMIG9yIGEgY29tbWVyY2lhbCBsaWNlbnNlLlxuICogRm9yIExHUEwgc2VlIExpY2Vuc2UudHh0IGluIHRoZSBwcm9qZWN0IHJvb3QgZm9yIGxpY2Vuc2UgaW5mb3JtYXRpb24uXG4gKiBGb3IgY29tbWVyY2lhbCBsaWNlbnNlcyBzZWUgaHR0cHM6Ly93d3cudGlueS5jbG91ZC9cbiAqL1xuXG5pbXBvcnQgeyBjbGVhckludGVydmFsLCBjbGVhclRpbWVvdXQsIGRvY3VtZW50LCBIVE1MRWxlbWVudCwgc2V0SW50ZXJ2YWwsIHNldFRpbWVvdXQsIHdpbmRvdyB9IGZyb20gJ0BlcGhveC9kb20tZ2xvYmFscyc7XG5pbXBvcnQgUHJvbWlzZSBmcm9tICcuL1Byb21pc2UnO1xuXG50eXBlIERlYm91bmNlRnVuYyA9ICguLi5hcmdzOiBhbnlbXSkgPT4geyBzdG9wOiAoKSA9PiB2b2lkOyB9O1xuXG5pbnRlcmZhY2UgRGVsYXkge1xuICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZShjYWxsYmFjazogKCkgPT4gdm9pZCwgZWxlbWVudD86IEhUTUxFbGVtZW50KTogdm9pZDtcbiAgICBzZXRJbnRlcnZhbChjYWxsYmFjazogKCkgPT4gdm9pZCwgdGltZT86IG51bWJlcik6IG51bWJlcjtcbiAgICBzZXRUaW1lb3V0KGNhbGxiYWNrOiAoKSA9PiB2b2lkLCB0aW1lPzogbnVtYmVyKTogbnVtYmVyO1xuICAgIGNsZWFySW50ZXJ2YWwoaWQ6IG51bWJlcik6IHZvaWQ7XG4gICAgY2xlYXJUaW1lb3V0KGlkOiBudW1iZXIpOiB2b2lkO1xuICAgIGRlYm91bmNlKGNhbGxiYWNrOiAoLi4uYXJnczogYW55W10pID0+IHZvaWQsIHRpbWU/OiBudW1iZXIpOiBEZWJvdW5jZUZ1bmM7XG4gICAgdGhyb3R0bGUoY2FsbGJhY2s6ICguLi5hcmdzOiBhbnlbXSkgPT4gdm9pZCwgdGltZT86IG51bWJlcik6IERlYm91bmNlRnVuYztcbn1cblxuLyoqXG4gKiBVdGlsaXR5IGNsYXNzIGZvciB3b3JraW5nIHdpdGggZGVsYXllZCBhY3Rpb25zIGxpa2Ugc2V0VGltZW91dC5cbiAqXG4gKiBAY2xhc3MgdGlueW1jZS51dGlsLkRlbGF5XG4gKi9cblxubGV0IHJlcXVlc3RBbmltYXRpb25GcmFtZVByb21pc2U7XG5cbmNvbnN0IHJlcXVlc3RBbmltYXRpb25GcmFtZSA9IGZ1bmN0aW9uKGNhbGxiYWNrLCBlbGVtZW50Pykge1xuICAgIGxldCBpLCByZXF1ZXN0QW5pbWF0aW9uRnJhbWVGdW5jOiBhbnkgPSB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lO1xuICAgIGNvbnN0IHZlbmRvcnMgPSBbJ21zJywgJ21veicsICd3ZWJraXQnXTtcblxuICAgIGNvbnN0IGZlYXR1cmVmaWxsID0gZnVuY3Rpb24oY2FsbGJhY2spIHtcbiAgICAgICAgd2luZG93LnNldFRpbWVvdXQoY2FsbGJhY2ssIDApO1xuICAgIH07XG5cbiAgICBmb3IgKGkgPSAwOyBpIDwgdmVuZG9ycy5sZW5ndGggJiYgIXJlcXVlc3RBbmltYXRpb25GcmFtZUZ1bmM7IGkrKykge1xuICAgICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWVGdW5jID0gd2luZG93W3ZlbmRvcnNbaV0gKyAnUmVxdWVzdEFuaW1hdGlvbkZyYW1lJ107XG4gICAgfVxuXG4gICAgaWYgKCFyZXF1ZXN0QW5pbWF0aW9uRnJhbWVGdW5jKSB7XG4gICAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZUZ1bmMgPSBmZWF0dXJlZmlsbDtcbiAgICB9XG5cbiAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWVGdW5jKGNhbGxiYWNrLCBlbGVtZW50KTtcbn07XG5cbmNvbnN0IHdyYXBwZWRTZXRUaW1lb3V0ID0gZnVuY3Rpb24oY2FsbGJhY2ssIHRpbWU/KSB7XG4gICAgaWYgKHR5cGVvZiB0aW1lICE9PSAnbnVtYmVyJykge1xuICAgICAgICB0aW1lID0gMDtcbiAgICB9XG5cbiAgICByZXR1cm4gc2V0VGltZW91dChjYWxsYmFjaywgdGltZSk7XG59O1xuXG5jb25zdCB3cmFwcGVkU2V0SW50ZXJ2YWwgPSBmdW5jdGlvbihjYWxsYmFjazogRnVuY3Rpb24sIHRpbWU/OiBudW1iZXIpOiBudW1iZXIge1xuICAgIGlmICh0eXBlb2YgdGltZSAhPT0gJ251bWJlcicpIHtcbiAgICAgICAgdGltZSA9IDE7IC8vIElFIDggbmVlZHMgaXQgdG8gYmUgPiAwXG4gICAgfVxuXG4gICAgcmV0dXJuIHNldEludGVydmFsKGNhbGxiYWNrLCB0aW1lKTtcbn07XG5cbmNvbnN0IHdyYXBwZWRDbGVhclRpbWVvdXQgPSBmdW5jdGlvbihpZDogbnVtYmVyKSB7XG4gICAgcmV0dXJuIGNsZWFyVGltZW91dChpZCk7XG59O1xuXG5jb25zdCB3cmFwcGVkQ2xlYXJJbnRlcnZhbCA9IGZ1bmN0aW9uKGlkOiBudW1iZXIpIHtcbiAgICByZXR1cm4gY2xlYXJJbnRlcnZhbChpZCk7XG59O1xuXG5jb25zdCBkZWJvdW5jZSA9IGZ1bmN0aW9uKGNhbGxiYWNrOiAoLi4uYXJnczogYW55W10pID0+IHZvaWQsIHRpbWU/OiBudW1iZXIpOiBEZWJvdW5jZUZ1bmMge1xuICAgIGxldCB0aW1lciwgZnVuYztcblxuICAgIGZ1bmMgPSBmdW5jdGlvbiguLi5hcmdzKSB7XG4gICAgICAgIGNsZWFyVGltZW91dCh0aW1lcik7XG5cbiAgICAgICAgdGltZXIgPSB3cmFwcGVkU2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGNhbGxiYWNrLmFwcGx5KHRoaXMsIGFyZ3MpO1xuICAgICAgICB9LCB0aW1lKTtcbiAgICB9O1xuXG4gICAgZnVuYy5zdG9wID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIGNsZWFyVGltZW91dCh0aW1lcik7XG4gICAgfTtcblxuICAgIHJldHVybiBmdW5jO1xufTtcblxuY29uc3QgRGVsYXk6IERlbGF5ID0ge1xuICAgIC8qKlxuICAgICAqIFJlcXVlc3RzIGFuIGFuaW1hdGlvbiBmcmFtZSBhbmQgZmFsbGJhY2tzIHRvIGEgdGltZW91dCBvbiBvbGRlciBicm93c2Vycy5cbiAgICAgKlxuICAgICAqIEBtZXRob2QgcmVxdWVzdEFuaW1hdGlvbkZyYW1lXG4gICAgICogQHBhcmFtIHtmdW5jdGlvbn0gY2FsbGJhY2sgQ2FsbGJhY2sgdG8gZXhlY3V0ZSB3aGVuIGEgbmV3IGZyYW1lIGlzIGF2YWlsYWJsZS5cbiAgICAgKiBAcGFyYW0ge0RPTUVsZW1lbnR9IGVsZW1lbnQgT3B0aW9uYWwgZWxlbWVudCB0byBzY29wZSBpdCB0by5cbiAgICAgKi9cbiAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoY2FsbGJhY2ssIGVsZW1lbnQ/KSB7XG4gICAgICAgIGlmIChyZXF1ZXN0QW5pbWF0aW9uRnJhbWVQcm9taXNlKSB7XG4gICAgICAgICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWVQcm9taXNlLnRoZW4oY2FsbGJhY2spO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lUHJvbWlzZSA9IG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUpIHtcbiAgICAgICAgICAgIGlmICghZWxlbWVudCkge1xuICAgICAgICAgICAgICAgIGVsZW1lbnQgPSBkb2N1bWVudC5ib2R5O1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUocmVzb2x2ZSwgZWxlbWVudCk7XG4gICAgICAgIH0pLnRoZW4oY2FsbGJhY2spO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBTZXRzIGEgdGltZXIgaW4gbXMgYW5kIGV4ZWN1dGVzIHRoZSBzcGVjaWZpZWQgY2FsbGJhY2sgd2hlbiB0aGUgdGltZXIgcnVucyBvdXQuXG4gICAgICpcbiAgICAgKiBAbWV0aG9kIHNldFRpbWVvdXRcbiAgICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBjYWxsYmFjayBDYWxsYmFjayB0byBleGVjdXRlIHdoZW4gdGltZXIgcnVucyBvdXQuXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IHRpbWUgT3B0aW9uYWwgdGltZSB0byB3YWl0IGJlZm9yZSB0aGUgY2FsbGJhY2sgaXMgZXhlY3V0ZWQsIGRlZmF1bHRzIHRvIDAuXG4gICAgICogQHJldHVybiB7TnVtYmVyfSBUaW1lb3V0IGlkIG51bWJlci5cbiAgICAgKi9cbiAgICBzZXRUaW1lb3V0OiB3cmFwcGVkU2V0VGltZW91dCxcblxuICAgIC8qKlxuICAgICAqIFNldHMgYW4gaW50ZXJ2YWwgdGltZXIgaW4gbXMgYW5kIGV4ZWN1dGVzIHRoZSBzcGVjaWZpZWQgY2FsbGJhY2sgYXQgZXZlcnkgaW50ZXJ2YWwgb2YgdGhhdCB0aW1lLlxuICAgICAqXG4gICAgICogQG1ldGhvZCBzZXRJbnRlcnZhbFxuICAgICAqIEBwYXJhbSB7ZnVuY3Rpb259IGNhbGxiYWNrIENhbGxiYWNrIHRvIGV4ZWN1dGUgd2hlbiBpbnRlcnZhbCB0aW1lIHJ1bnMgb3V0LlxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSB0aW1lIE9wdGlvbmFsIHRpbWUgdG8gd2FpdCBiZWZvcmUgdGhlIGNhbGxiYWNrIGlzIGV4ZWN1dGVkLCBkZWZhdWx0cyB0byAwLlxuICAgICAqIEByZXR1cm4ge051bWJlcn0gVGltZW91dCBpZCBudW1iZXIuXG4gICAgICovXG4gICAgc2V0SW50ZXJ2YWw6IHdyYXBwZWRTZXRJbnRlcnZhbCxcblxuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgZGVib3VuY2VkIGNhbGxiYWNrIGZ1bmN0aW9uIHRoYXQgb25seSBnZXRzIGV4ZWN1dGVkIG9uY2Ugd2l0aGluIHRoZSBzcGVjaWZpZWQgdGltZS5cbiAgICAgKlxuICAgICAqIEBtZXRob2QgZGVib3VuY2VcbiAgICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBjYWxsYmFjayBDYWxsYmFjayB0byBleGVjdXRlIHdoZW4gdGltZXIgZmluaXNoZXMuXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IHRpbWUgT3B0aW9uYWwgdGltZSB0byB3YWl0IGJlZm9yZSB0aGUgY2FsbGJhY2sgaXMgZXhlY3V0ZWQsIGRlZmF1bHRzIHRvIDAuXG4gICAgICogQHJldHVybiB7RnVuY3Rpb259IGRlYm91bmNlZCBmdW5jdGlvbiBjYWxsYmFjay5cbiAgICAgKi9cbiAgICBkZWJvdW5jZSxcblxuICAgIC8vIFRocm90dGxlIG5lZWRzIHRvIGJlIGRlYm91bmNlIGR1ZSB0byBiYWNrd2FyZHMgY29tcGF0aWJpbGl0eS5cbiAgICB0aHJvdHRsZTogZGVib3VuY2UsXG5cbiAgICAvKipcbiAgICAgKiBDbGVhcnMgYW4gaW50ZXJ2YWwgdGltZXIgc28gaXQgd29uJ3QgZXhlY3V0ZS5cbiAgICAgKlxuICAgICAqIEBtZXRob2QgY2xlYXJJbnRlcnZhbFxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBJbnRlcnZhbCB0aW1lciBpZCBudW1iZXIuXG4gICAgICovXG4gICAgY2xlYXJJbnRlcnZhbDogd3JhcHBlZENsZWFySW50ZXJ2YWwsXG5cbiAgICAvKipcbiAgICAgKiBDbGVhcnMgYW4gdGltZW91dCB0aW1lciBzbyBpdCB3b24ndCBleGVjdXRlLlxuICAgICAqXG4gICAgICogQG1ldGhvZCBjbGVhclRpbWVvdXRcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gVGltZW91dCB0aW1lciBpZCBudW1iZXIuXG4gICAgICovXG4gICAgY2xlYXJUaW1lb3V0OiB3cmFwcGVkQ2xlYXJUaW1lb3V0XG59O1xuXG5leHBvcnQgZGVmYXVsdCBEZWxheTtcbiJdfQ==