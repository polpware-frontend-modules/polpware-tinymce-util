/**
 * Copyright (c) Tiny Technologies, Inc. All rights reserved.
 * Licensed under the LGPL or a commercial license.
 * For LGPL see License.txt in the project root for license information.
 * For commercial licenses see https://www.tiny.cloud/
 */
import Tools from './Tools';
import { Fun } from '@ephox/katamari';
/**
 * This class lets you add/remove and fire events by name on the specified scope. This makes
 * it easy to add event listener logic to any class.
 *
 * @class tinymce.util.EventDispatcher
 * @example
 *  var eventDispatcher = new EventDispatcher();
 *
 *  eventDispatcher.on('click', function() {console.log('data');});
 *  eventDispatcher.fire('click', {data: 123});
 */
var nativeEvents = Tools.makeMap('focus blur focusin focusout click dblclick mousedown mouseup mousemove mouseover beforepaste paste cut copy selectionchange ' +
    'mouseout mouseenter mouseleave wheel keydown keypress keyup input beforeinput contextmenu dragstart dragend dragover ' +
    'draggesture dragdrop drop drag submit ' +
    'compositionstart compositionend compositionupdate touchstart touchmove touchend', ' ');
var EventDispatcher = /** @class */ (function () {
    function EventDispatcher(settings) {
        this.bindings = {};
        this.settings = settings || {};
        this.scope = this.settings.scope || this;
        this.toggleEvent = this.settings.toggleEvent || Fun.never;
    }
    /**
     * Returns true/false if the specified event name is a native browser event or not.
     *
     * @method isNative
     * @param {String} name Name to check if it's native.
     * @return {Boolean} true/false if the event is native or not.
     * @static
     */
    EventDispatcher.isNative = function (name) {
        return !!nativeEvents[name.toLowerCase()];
    };
    EventDispatcher.prototype.fire = function (name, args) {
        var handlers, i, l, callback;
        name = name.toLowerCase();
        args = args || {};
        args.type = name;
        // Setup target is there isn't one
        if (!args.target) {
            args.target = this.scope;
        }
        // Add event delegation methods if they are missing
        if (!args.preventDefault) {
            // Add preventDefault method
            args.preventDefault = function () {
                args.isDefaultPrevented = Fun.always;
            };
            // Add stopPropagation
            args.stopPropagation = function () {
                args.isPropagationStopped = Fun.always;
            };
            // Add stopImmediatePropagation
            args.stopImmediatePropagation = function () {
                args.isImmediatePropagationStopped = Fun.always;
            };
            // Add event delegation states
            args.isDefaultPrevented = Fun.never;
            args.isPropagationStopped = Fun.never;
            args.isImmediatePropagationStopped = Fun.never;
        }
        if (this.settings.beforeFire) {
            this.settings.beforeFire(args);
        }
        handlers = this.bindings[name];
        if (handlers) {
            for (i = 0, l = handlers.length; i < l; i++) {
                callback = handlers[i];
                // Unbind handlers marked with "once"
                if (callback.once) {
                    this.off(name, callback.func);
                }
                // Stop immediate propagation if needed
                if (args.isImmediatePropagationStopped()) {
                    args.stopPropagation();
                    return args;
                }
                // If callback returns false then prevent default and stop all propagation
                if (callback.func.call(this.scope, args) === false) {
                    args.preventDefault();
                    return args;
                }
            }
        }
        return args;
    };
    EventDispatcher.prototype.on = function (name, callback, prepend, extra) {
        var handlers, names, i;
        if (callback === false) {
            callback = Fun.never;
        }
        if (callback) {
            var wrappedCallback = {
                func: callback
            };
            if (extra) {
                Tools.extend(wrappedCallback, extra);
            }
            names = name.toLowerCase().split(' ');
            i = names.length;
            while (i--) {
                name = names[i];
                handlers = this.bindings[name];
                if (!handlers) {
                    handlers = this.bindings[name] = [];
                    this.toggleEvent(name, true);
                }
                if (prepend) {
                    handlers.unshift(wrappedCallback);
                }
                else {
                    handlers.push(wrappedCallback);
                }
            }
        }
        return this;
    };
    EventDispatcher.prototype.off = function (name, callback) {
        var i, handlers, bindingName, names, hi;
        if (name) {
            names = name.toLowerCase().split(' ');
            i = names.length;
            while (i--) {
                name = names[i];
                handlers = this.bindings[name];
                // Unbind all handlers
                if (!name) {
                    for (bindingName in this.bindings) {
                        this.toggleEvent(bindingName, false);
                        delete this.bindings[bindingName];
                    }
                    return this;
                }
                if (handlers) {
                    // Unbind all by name
                    if (!callback) {
                        handlers.length = 0;
                    }
                    else {
                        // Unbind specific ones
                        hi = handlers.length;
                        while (hi--) {
                            if (handlers[hi].func === callback) {
                                handlers = handlers.slice(0, hi).concat(handlers.slice(hi + 1));
                                this.bindings[name] = handlers;
                            }
                        }
                    }
                    if (!handlers.length) {
                        this.toggleEvent(name, false);
                        delete this.bindings[name];
                    }
                }
            }
        }
        else {
            for (name in this.bindings) {
                this.toggleEvent(name, false);
            }
            this.bindings = {};
        }
        return this;
    };
    EventDispatcher.prototype.once = function (name, callback, prepend) {
        return this.on(name, callback, prepend, { once: true });
    };
    /**
     * Returns true/false if the dispatcher has a event of the specified name.
     *
     * @method has
     * @param {String} name Name of the event to check for.
     * @return {Boolean} true/false if the event exists or not.
     */
    EventDispatcher.prototype.has = function (name) {
        name = name.toLowerCase();
        return !(!this.bindings[name] || this.bindings[name].length === 0);
    };
    return EventDispatcher;
}());
export default EventDispatcher;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRXZlbnREaXNwYXRjaGVyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHBvbHB3YXJlL3RpbnltY2UtdXRpbC8iLCJzb3VyY2VzIjpbImxpYi9hcGkvdXRpbC9FdmVudERpc3BhdGNoZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7O0dBS0c7QUFHSCxPQUFPLEtBQUssTUFBTSxTQUFTLENBQUM7QUFDNUIsT0FBTyxFQUFFLEdBQUcsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBOEV0Qzs7Ozs7Ozs7OztHQVVHO0FBRUgsSUFBTSxZQUFZLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FDaEMsOEhBQThIO0lBQzlILHVIQUF1SDtJQUN2SCx3Q0FBd0M7SUFDeEMsaUZBQWlGLEVBQ2pGLEdBQUcsQ0FDSixDQUFDO0FBRUY7SUFrQkUseUJBQWEsUUFBOEI7UUFGbkMsYUFBUSxHQUFHLEVBQUUsQ0FBQztRQUdwQixJQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsSUFBSSxFQUFFLENBQUM7UUFDL0IsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssSUFBSSxJQUFJLENBQUM7UUFDekMsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsSUFBSSxHQUFHLENBQUMsS0FBSyxDQUFDO0lBQzVELENBQUM7SUFyQkQ7Ozs7Ozs7T0FPRztJQUNXLHdCQUFRLEdBQXRCLFVBQXdCLElBQVk7UUFDbEMsT0FBTyxDQUFDLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDO0lBQzVDLENBQUM7SUF5Qk0sOEJBQUksR0FBWCxVQUFhLElBQVksRUFBRSxJQUFVO1FBQ25DLElBQUksUUFBUSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsUUFBUSxDQUFDO1FBRTdCLElBQUksR0FBRyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDMUIsSUFBSSxHQUFHLElBQUksSUFBSSxFQUFFLENBQUM7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QTJDLEVBQUUsT0FBaUI7UUFDdkYsT0FBTyxJQUFJLENBQUMsRUFBRSxDQUFDLElBQUksRUFBRSxRQUFRLEVBQUUsT0FBTyxFQUFFLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7SUFDMUQsQ0FBQztJQUVEOzs7Ozs7T0FNRztJQUNJLDZCQUFHLEdBQVYsVUFBWSxJQUFZO1FBQ3RCLElBQUksR0FBRyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDMUIsT0FBTyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUMsTUFBTSxLQUFLLENBQUMsQ0FBQyxDQUFDO0lBQ3JFLENBQUM7SUFDSCxzQkFBQztBQUFELENBQUMsQUFsUUQsSUFrUUM7QUFFRCxlQUFlLGVBQWUsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQ29weXJpZ2h0IChjKSBUaW55IFRlY2hub2xvZ2llcywgSW5jLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICogTGljZW5zZWQgdW5kZXIgdGhlIExHUEwgb3IgYSBjb21tZXJjaWFsIGxpY2Vuc2UuXG4gKiBGb3IgTEdQTCBzZWUgTGljZW5zZS50eHQgaW4gdGhlIHByb2plY3Qgcm9vdCBmb3IgbGljZW5zZSBpbmZvcm1hdGlvbi5cbiAqIEZvciBjb21tZXJjaWFsIGxpY2Vuc2VzIHNlZSBodHRwczovL3d3dy50aW55LmNsb3VkL1xuICovXG5cbmltcG9ydCB7IENsaXBib2FyZEV2ZW50LCBEYXRhVHJhbnNmZXIsIERyYWdFdmVudCwgRXZlbnQsIEZvY3VzRXZlbnQsIEtleWJvYXJkRXZlbnQsIE1vdXNlRXZlbnQsIFBvaW50ZXJFdmVudCwgVG91Y2hFdmVudCwgV2hlZWxFdmVudCB9IGZyb20gJ0BlcGhveC9kb20tZ2xvYmFscyc7XG5pbXBvcnQgVG9vbHMgZnJvbSAnLi9Ub29scyc7XG5pbXBvcnQgeyBGdW4gfSBmcm9tICdAZXBob3gva2F0YW1hcmknO1xuXG4vLyBJbnB1dEV2ZW50IGlzIGV4cGVyaW1lbnRhbCBzbyB3ZSBkb24ndCBoYXZlIGFuIGFjdHVhbCB0eXBlXG4vLyBTZWUgaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvQVBJL0lucHV0RXZlbnRcbmV4cG9ydCBpbnRlcmZhY2UgSW5wdXRFdmVudCBleHRlbmRzIEV2ZW50IHtcbiAgcmVhZG9ubHkgZGF0YTogc3RyaW5nO1xuICByZWFkb25seSBkYXRhVHJhbnNmZXI6IERhdGFUcmFuc2ZlcjtcbiAgcmVhZG9ubHkgaW5wdXRUeXBlOiBzdHJpbmc7XG4gIHJlYWRvbmx5IGlzQ29tcG9zaW5nOiBib29sZWFuO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIE5hdGl2ZUV2ZW50TWFwIHtcbiAgJ2JlZm9yZXBhc3RlJzogRXZlbnQ7XG4gICdibHVyJzogRm9jdXNFdmVudDtcbiAgJ2JlZm9yZWlucHV0JzogSW5wdXRFdmVudDtcbiAgJ2NsaWNrJzogTW91c2VFdmVudDtcbiAgJ2NvbXBvc2l0aW9uZW5kJzogRXZlbnQ7XG4gICdjb21wb3NpdGlvbnN0YXJ0JzogRXZlbnQ7XG4gICdjb21wb3NpdGlvbnVwZGF0ZSc6IEV2ZW50O1xuICAnY29udGV4dG1lbnUnOiBQb2ludGVyRXZlbnQ7XG4gICdjb3B5JzogQ2xpcGJvYXJkRXZlbnQ7XG4gICdjdXQnOiBDbGlwYm9hcmRFdmVudDtcbiAgJ2RibGNsaWNrJzogTW91c2VFdmVudDtcbiAgJ2RyYWcnOiBEcmFnRXZlbnQ7XG4gICdkcmFnZHJvcCc6IERyYWdFdmVudDtcbiAgJ2RyYWdlbmQnOiBEcmFnRXZlbnQ7XG4gICdkcmFnZ2VzdHVyZSc6IERyYWdFdmVudDtcbiAgJ2RyYWdvdmVyJzogRHJhZ0V2ZW50O1xuICAnZHJhZ3N0YXJ0JzogRHJhZ0V2ZW50O1xuICAnZHJvcCc6IERyYWdFdmVudDtcbiAgJ2ZvY3VzJzogRm9jdXNFdmVudDtcbiAgJ2ZvY3VzaW4nOiBGb2N1c0V2ZW50O1xuICAnZm9jdXNvdXQnOiBGb2N1c0V2ZW50O1xuICAnaW5wdXQnOiBJbnB1dEV2ZW50O1xuICAna2V5ZG93bic6IEtleWJvYXJkRXZlbnQ7XG4gICdrZXlwcmVzcyc6IEtleWJvYXJkRXZlbnQ7XG4gICdrZXl1cCc6IEtleWJvYXJkRXZlbnQ7XG4gICdtb3VzZWRvd24nOiBNb3VzZUV2ZW50O1xuICAnbW91c2VlbnRlcic6IE1vdXNlRXZlbnQ7XG4gICdtb3VzZWxlYXZlJzogTW91c2VFdmVudDtcbiAgJ21vdXNlbW92ZSc6IE1vdXNlRXZlbnQ7XG4gICdtb3VzZW91dCc6IE1vdXNlRXZlbnQ7XG4gICdtb3VzZW92ZXInOiBNb3VzZUV2ZW50O1xuICAnbW91c2V1cCc6IE1vdXNlRXZlbnQ7XG4gICdwYXN0ZSc6IENsaXBib2FyZEV2ZW50O1xuICAnc2VsZWN0aW9uY2hhbmdlJzogRXZlbnQ7XG4gICdzdWJtaXQnOiBFdmVudDtcbiAgJ3RvdWNoZW5kJzogVG91Y2hFdmVudDtcbiAgJ3RvdWNobW92ZSc6IFRvdWNoRXZlbnQ7XG4gICd0b3VjaHN0YXJ0JzogVG91Y2hFdmVudDtcbiAgJ3doZWVsJzogV2hlZWxFdmVudDtcbn1cblxuZXhwb3J0IHR5cGUgRWRpdG9yRXZlbnQ8VD4gPSBUICYge1xuICB0YXJnZXQ6IGFueTtcbiAgdHlwZTogc3RyaW5nO1xuICBwcmV2ZW50RGVmYXVsdCAoKTogdm9pZDtcbiAgaXNEZWZhdWx0UHJldmVudGVkICgpOiBib29sZWFuO1xuICBzdG9wUHJvcGFnYXRpb24gKCk6IHZvaWQ7XG4gIGlzUHJvcGFnYXRpb25TdG9wcGVkICgpOiBib29sZWFuO1xuICBzdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24gKCk6IHZvaWQ7XG4gIGlzSW1tZWRpYXRlUHJvcGFnYXRpb25TdG9wcGVkICgpOiBib29sZWFuO1xufTtcblxuZXhwb3J0IGludGVyZmFjZSBFdmVudERpc3BhdGNoZXJTZXR0aW5ncyB7XG4gIHNjb3BlPzoge307XG4gIHRvZ2dsZUV2ZW50PzogKG5hbWU6IHN0cmluZywgc3RhdGU6IGJvb2xlYW4pID0+IHZvaWQgfCBib29sZWFuO1xuICBiZWZvcmVGaXJlPzogPFQ+KGFyZ3M6IEVkaXRvckV2ZW50PFQ+KSA9PiB2b2lkO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIEV2ZW50RGlzcGF0Y2hlckNvbnN0cnVjdG9yPFQgZXh0ZW5kcyBOYXRpdmVFdmVudE1hcD4ge1xuICByZWFkb25seSBwcm90b3R5cGU6IEV2ZW50RGlzcGF0Y2hlcjxUPjtcblxuICBuZXcgKHNldHRpbmdzPzogRXZlbnREaXNwYXRjaGVyU2V0dGluZ3MpOiBFdmVudERpc3BhdGNoZXI8VD47XG5cbiAgaXNOYXRpdmUgKG5hbWU6IHN0cmluZyk6IGJvb2xlYW47XG59XG5cbi8qKlxuICogVGhpcyBjbGFzcyBsZXRzIHlvdSBhZGQvcmVtb3ZlIGFuZCBmaXJlIGV2ZW50cyBieSBuYW1lIG9uIHRoZSBzcGVjaWZpZWQgc2NvcGUuIFRoaXMgbWFrZXNcbiAqIGl0IGVhc3kgdG8gYWRkIGV2ZW50IGxpc3RlbmVyIGxvZ2ljIHRvIGFueSBjbGFzcy5cbiAqXG4gKiBAY2xhc3MgdGlueW1jZS51dGlsLkV2ZW50RGlzcGF0Y2hlclxuICogQGV4YW1wbGVcbiAqICB2YXIgZXZlbnREaXNwYXRjaGVyID0gbmV3IEV2ZW50RGlzcGF0Y2hlcigpO1xuICpcbiAqICBldmVudERpc3BhdGNoZXIub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7Y29uc29sZS5sb2coJ2RhdGEnKTt9KTtcbiAqICBldmVudERpc3BhdGNoZXIuZmlyZSgnY2xpY2snLCB7ZGF0YTogMTIzfSk7XG4gKi9cblxuY29uc3QgbmF0aXZlRXZlbnRzID0gVG9vbHMubWFrZU1hcChcbiAgJ2ZvY3VzIGJsdXIgZm9jdXNpbiBmb2N1c291dCBjbGljayBkYmxjbGljayBtb3VzZWRvd24gbW91c2V1cCBtb3VzZW1vdmUgbW91c2VvdmVyIGJlZm9yZXBhc3RlIHBhc3RlIGN1dCBjb3B5IHNlbGVjdGlvbmNoYW5nZSAnICtcbiAgJ21vdXNlb3V0IG1vdXNlZW50ZXIgbW91c2VsZWF2ZSB3aGVlbCBrZXlkb3duIGtleXByZXNzIGtleXVwIGlucHV0IGJlZm9yZWlucHV0IGNvbnRleHRtZW51IGRyYWdzdGFydCBkcmFnZW5kIGRyYWdvdmVyICcgK1xuICAnZHJhZ2dlc3R1cmUgZHJhZ2Ryb3AgZHJvcCBkcmFnIHN1Ym1pdCAnICtcbiAgJ2NvbXBvc2l0aW9uc3RhcnQgY29tcG9zaXRpb25lbmQgY29tcG9zaXRpb251cGRhdGUgdG91Y2hzdGFydCB0b3VjaG1vdmUgdG91Y2hlbmQnLFxuICAnICdcbik7XG5cbmNsYXNzIEV2ZW50RGlzcGF0Y2hlcjxUIGV4dGVuZHMgTmF0aXZlRXZlbnRNYXA+IHtcbiAgLyoqXG4gICAqIFJldHVybnMgdHJ1ZS9mYWxzZSBpZiB0aGUgc3BlY2lmaWVkIGV2ZW50IG5hbWUgaXMgYSBuYXRpdmUgYnJvd3NlciBldmVudCBvciBub3QuXG4gICAqXG4gICAqIEBtZXRob2QgaXNOYXRpdmVcbiAgICogQHBhcmFtIHtTdHJpbmd9IG5hbWUgTmFtZSB0byBjaGVjayBpZiBpdCdzIG5hdGl2ZS5cbiAgICogQHJldHVybiB7Qm9vbGVhbn0gdHJ1ZS9mYWxzZSBpZiB0aGUgZXZlbnQgaXMgbmF0aXZlIG9yIG5vdC5cbiAgICogQHN0YXRpY1xuICAgKi9cbiAgcHVibGljIHN0YXRpYyBpc05hdGl2ZSAobmFtZTogc3RyaW5nKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuICEhbmF0aXZlRXZlbnRzW25hbWUudG9Mb3dlckNhc2UoKV07XG4gIH1cblxuICBwcml2YXRlIHJlYWRvbmx5IHNldHRpbmdzOiBSZWNvcmQ8c3RyaW5nLCBhbnk+O1xuICBwcml2YXRlIHJlYWRvbmx5IHNjb3BlOiB7fTtcbiAgcHJpdmF0ZSByZWFkb25seSB0b2dnbGVFdmVudDogKG5hbWU6IHN0cmluZywgdG9nZ2xlOiBib29sZWFuKSA9PiB2b2lkO1xuICBwcml2YXRlIGJpbmRpbmdzID0ge307XG5cbiAgY29uc3RydWN0b3IgKHNldHRpbmdzPzogUmVjb3JkPHN0cmluZywgYW55Pikge1xuICAgIHRoaXMuc2V0dGluZ3MgPSBzZXR0aW5ncyB8fCB7fTtcbiAgICB0aGlzLnNjb3BlID0gdGhpcy5zZXR0aW5ncy5zY29wZSB8fCB0aGlzO1xuICAgIHRoaXMudG9nZ2xlRXZlbnQgPSB0aGlzLnNldHRpbmdzLnRvZ2dsZUV2ZW50IHx8IEZ1bi5uZXZlcjtcbiAgfVxuXG4gIC8qKlxuICAgKiBGaXJlcyB0aGUgc3BlY2lmaWVkIGV2ZW50IGJ5IG5hbWUuXG4gICAqXG4gICAqIEBtZXRob2QgZmlyZVxuICAgKiBAcGFyYW0ge1N0cmluZ30gbmFtZSBOYW1lIG9mIHRoZSBldmVudCB0byBmaXJlLlxuICAgKiBAcGFyYW0ge09iamVjdD99IGFyZ3MgRXZlbnQgYXJndW1lbnRzLlxuICAgKiBAcmV0dXJuIHtPYmplY3R9IEV2ZW50IGFyZ3MgaW5zdGFuY2UgcGFzc2VkIGluLlxuICAgKiBAZXhhbXBsZVxuICAgKiBpbnN0YW5jZS5maXJlKCdldmVudCcsIHsuLi59KTtcbiAgICovXG4gIHB1YmxpYyBmaXJlIDxLIGV4dGVuZHMga2V5b2YgVD4obmFtZTogSywgYXJncz86IFRbS10pOiBFZGl0b3JFdmVudDxUW0tdPjtcbiAgcHVibGljIGZpcmUgPFUgPSBhbnk+KG5hbWU6IHN0cmluZywgYXJncz86IFUpOiBFZGl0b3JFdmVudDxVPjtcbiAgcHVibGljIGZpcmUgKG5hbWU6IHN0cmluZywgYXJncz86IGFueSk6IEVkaXRvckV2ZW50PGFueT4ge1xuICAgIGxldCBoYW5kbGVycywgaSwgbCwgY2FsbGJhY2s7XG5cbiAgICBuYW1lID0gbmFtZS50b0xvd2VyQ2FzZSgpO1xuICAgIGFyZ3MgPSBhcmdzIHx8IHt9O1xuICAgIGFyZ3MudHlwZSA9IG5hbWU7XG5cbiAgICAvLyBTZXR1cCB0YXJnZXQgaXMgdGhlcmUgaXNuJ3Qgb25lXG4gICAgaWYgKCFhcmdzLnRhcmdldCkge1xuICAgICAgYXJncy50YXJnZXQgPSB0aGlzLnNjb3BlO1xuICAgIH1cblxuICAgIC8vIEFkZCBldmVudCBkZWxlZ2F0aW9uIG1ldGhvZHMgaWYgdGhleSBhcmUgbWlzc2luZ1xuICAgIGlmICghYXJncy5wcmV2ZW50RGVmYXVsdCkge1xuICAgICAgLy8gQWRkIHByZXZlbnREZWZhdWx0IG1ldGhvZFxuICAgICAgYXJncy5wcmV2ZW50RGVmYXVsdCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgYXJncy5pc0RlZmF1bHRQcmV2ZW50ZWQgPSBGdW4uYWx3YXlzO1xuICAgICAgfTtcblxuICAgICAgLy8gQWRkIHN0b3BQcm9wYWdhdGlvblxuICAgICAgYXJncy5zdG9wUHJvcGFnYXRpb24gPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGFyZ3MuaXNQcm9wYWdhdGlvblN0b3BwZWQgPSBGdW4uYWx3YXlzO1xuICAgICAgfTtcblxuICAgICAgLy8gQWRkIHN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvblxuICAgICAgYXJncy5zdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24gPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGFyZ3MuaXNJbW1lZGlhdGVQcm9wYWdhdGlvblN0b3BwZWQgPSBGdW4uYWx3YXlzO1xuICAgICAgfTtcblxuICAgICAgLy8gQWRkIGV2ZW50IGRlbGVnYXRpb24gc3RhdGVzXG4gICAgICBhcmdzLmlzRGVmYXVsdFByZXZlbnRlZCA9IEZ1bi5uZXZlcjtcbiAgICAgIGFyZ3MuaXNQcm9wYWdhdGlvblN0b3BwZWQgPSBGdW4ubmV2ZXI7XG4gICAgICBhcmdzLmlzSW1tZWRpYXRlUHJvcGFnYXRpb25TdG9wcGVkID0gRnVuLm5ldmVyO1xuICAgIH1cblxuICAgIGlmICh0aGlzLnNldHRpbmdzLmJlZm9yZUZpcmUpIHtcbiAgICAgIHRoaXMuc2V0dGluZ3MuYmVmb3JlRmlyZShhcmdzKTtcbiAgICB9XG5cbiAgICBoYW5kbGVycyA9IHRoaXMuYmluZGluZ3NbbmFtZV07XG4gICAgaWYgKGhhbmRsZXJzKSB7XG4gICAgICBmb3IgKGkgPSAwLCBsID0gaGFuZGxlcnMubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgICAgIGNhbGxiYWNrID0gaGFuZGxlcnNbaV07XG5cbiAgICAgICAgLy8gVW5iaW5kIGhhbmRsZXJzIG1hcmtlZCB3aXRoIFwib25jZVwiXG4gICAgICAgIGlmIChjYWxsYmFjay5vbmNlKSB7XG4gICAgICAgICAgdGhpcy5vZmYobmFtZSwgY2FsbGJhY2suZnVuYyk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBTdG9wIGltbWVkaWF0ZSBwcm9wYWdhdGlvbiBpZiBuZWVkZWRcbiAgICAgICAgaWYgKGFyZ3MuaXNJbW1lZGlhdGVQcm9wYWdhdGlvblN0b3BwZWQoKSkge1xuICAgICAgICAgIGFyZ3Muc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgICAgcmV0dXJuIGFyZ3M7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBJZiBjYWxsYmFjayByZXR1cm5zIGZhbHNlIHRoZW4gcHJldmVudCBkZWZhdWx0IGFuZCBzdG9wIGFsbCBwcm9wYWdhdGlvblxuICAgICAgICBpZiAoY2FsbGJhY2suZnVuYy5jYWxsKHRoaXMuc2NvcGUsIGFyZ3MpID09PSBmYWxzZSkge1xuICAgICAgICAgIGFyZ3MucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICByZXR1cm4gYXJncztcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBhcmdzO1xuICB9XG5cbiAgLyoqXG4gICAqIEJpbmRzIGFuIGV2ZW50IGxpc3RlbmVyIHRvIGEgc3BlY2lmaWMgZXZlbnQgYnkgbmFtZS5cbiAgICpcbiAgICogQG1ldGhvZCBvblxuICAgKiBAcGFyYW0ge1N0cmluZ30gbmFtZSBFdmVudCBuYW1lIG9yIHNwYWNlIHNlcGFyYXRlZCBsaXN0IG9mIGV2ZW50cyB0byBiaW5kLlxuICAgKiBAcGFyYW0ge2NhbGxiYWNrfSBjYWxsYmFjayBDYWxsYmFjayB0byBiZSBleGVjdXRlZCB3aGVuIHRoZSBldmVudCBvY2N1cnMuXG4gICAqIEBwYXJhbSB7Qm9vbGVhbn0gcHJlcGVuZCBPcHRpb25hbCBmbGFnIGlmIHRoZSBldmVudCBzaG91bGQgYmUgcHJlcGVuZGVkLiBVc2UgdGhpcyB3aXRoIGNhcmUuXG4gICAqIEByZXR1cm4ge09iamVjdH0gQ3VycmVudCBjbGFzcyBpbnN0YW5jZS5cbiAgICogQGV4YW1wbGVcbiAgICogaW5zdGFuY2Uub24oJ2V2ZW50JywgZnVuY3Rpb24oZSkge1xuICAgKiAgICAgLy8gQ2FsbGJhY2sgbG9naWNcbiAgICogfSk7XG4gICAqL1xuICBwdWJsaWMgb24gPEsgZXh0ZW5kcyBrZXlvZiBUPihuYW1lOiBLLCBjYWxsYmFjazogKGV2ZW50OiBFZGl0b3JFdmVudDxUW0tdPikgPT4gdm9pZCwgcHJlcGVuZD86IGJvb2xlYW4sIGV4dHJhPzoge30pOiB0aGlzO1xuICBwdWJsaWMgb24gPFUgPSBhbnk+KG5hbWU6IHN0cmluZywgY2FsbGJhY2s6IChldmVudDogRWRpdG9yRXZlbnQ8VT4pID0+IHZvaWQsIHByZXBlbmQ/OiBib29sZWFuLCBleHRyYT86IHt9KTogdGhpcztcbiAgcHVibGljIG9uIChuYW1lOiBzdHJpbmcsIGNhbGxiYWNrOiBmYWxzZSwgcHJlcGVuZD86IGJvb2xlYW4sIGV4dHJhPzoge30pOiB0aGlzO1xuICBwdWJsaWMgb24gKG5hbWU6IHN0cmluZywgY2FsbGJhY2s6IGZhbHNlIHwgKChldmVudDogRWRpdG9yRXZlbnQ8YW55PikgPT4gdm9pZCksIHByZXBlbmQ/OiBib29sZWFuLCBleHRyYT86IHt9KTogdGhpcyB7XG4gICAgbGV0IGhhbmRsZXJzLCBuYW1lcywgaTtcblxuICAgIGlmIChjYWxsYmFjayA9PT0gZmFsc2UpIHtcbiAgICAgIGNhbGxiYWNrID0gRnVuLm5ldmVyO1xuICAgIH1cblxuICAgIGlmIChjYWxsYmFjaykge1xuICAgICAgY29uc3Qgd3JhcHBlZENhbGxiYWNrID0ge1xuICAgICAgICBmdW5jOiBjYWxsYmFja1xuICAgICAgfTtcblxuICAgICAgaWYgKGV4dHJhKSB7XG4gICAgICAgIFRvb2xzLmV4dGVuZCh3cmFwcGVkQ2FsbGJhY2ssIGV4dHJhKTtcbiAgICAgIH1cblxuICAgICAgbmFtZXMgPSBuYW1lLnRvTG93ZXJDYXNlKCkuc3BsaXQoJyAnKTtcbiAgICAgIGkgPSBuYW1lcy5sZW5ndGg7XG4gICAgICB3aGlsZSAoaS0tKSB7XG4gICAgICAgIG5hbWUgPSBuYW1lc1tpXTtcbiAgICAgICAgaGFuZGxlcnMgPSB0aGlzLmJpbmRpbmdzW25hbWVdO1xuICAgICAgICBpZiAoIWhhbmRsZXJzKSB7XG4gICAgICAgICAgaGFuZGxlcnMgPSB0aGlzLmJpbmRpbmdzW25hbWVdID0gW107XG4gICAgICAgICAgdGhpcy50b2dnbGVFdmVudChuYW1lLCB0cnVlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChwcmVwZW5kKSB7XG4gICAgICAgICAgaGFuZGxlcnMudW5zaGlmdCh3cmFwcGVkQ2FsbGJhY2spO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGhhbmRsZXJzLnB1c2god3JhcHBlZENhbGxiYWNrKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLyoqXG4gICAqIFVuYmluZHMgYW4gZXZlbnQgbGlzdGVuZXIgdG8gYSBzcGVjaWZpYyBldmVudCBieSBuYW1lLlxuICAgKlxuICAgKiBAbWV0aG9kIG9mZlxuICAgKiBAcGFyYW0ge1N0cmluZz99IG5hbWUgTmFtZSBvZiB0aGUgZXZlbnQgdG8gdW5iaW5kLlxuICAgKiBAcGFyYW0ge2NhbGxiYWNrP30gY2FsbGJhY2sgQ2FsbGJhY2sgdG8gdW5iaW5kLlxuICAgKiBAcmV0dXJuIHtPYmplY3R9IEN1cnJlbnQgY2xhc3MgaW5zdGFuY2UuXG4gICAqIEBleGFtcGxlXG4gICAqIC8vIFVuYmluZCBzcGVjaWZpYyBjYWxsYmFja1xuICAgKiBpbnN0YW5jZS5vZmYoJ2V2ZW50JywgaGFuZGxlcik7XG4gICAqXG4gICAqIC8vIFVuYmluZCBhbGwgbGlzdGVuZXJzIGJ5IG5hbWVcbiAgICogaW5zdGFuY2Uub2ZmKCdldmVudCcpO1xuICAgKlxuICAgKiAvLyBVbmJpbmQgYWxsIGV2ZW50c1xuICAgKiBpbnN0YW5jZS5vZmYoKTtcbiAgICovXG4gIHB1YmxpYyBvZmYgPEsgZXh0ZW5kcyBrZXlvZiBUPihuYW1lOiBLLCBjYWxsYmFjazogKGV2ZW50OiBFZGl0b3JFdmVudDxUW0tdPikgPT4gdm9pZCk6IHRoaXM7XG4gIHB1YmxpYyBvZmYgPFUgPSBhbnk+KG5hbWU6IHN0cmluZywgY2FsbGJhY2s6IChldmVudDogRWRpdG9yRXZlbnQ8VT4pID0+IHZvaWQpOiB0aGlzO1xuICBwdWJsaWMgb2ZmIChuYW1lPzogc3RyaW5nKTogdGhpcztcbiAgcHVibGljIG9mZiAobmFtZT86IHN0cmluZywgY2FsbGJhY2s/OiAoZXZlbnQ6IEVkaXRvckV2ZW50PGFueT4pID0+IHZvaWQpOiB0aGlzIHtcbiAgICBsZXQgaSwgaGFuZGxlcnMsIGJpbmRpbmdOYW1lLCBuYW1lcywgaGk7XG5cbiAgICBpZiAobmFtZSkge1xuICAgICAgbmFtZXMgPSBuYW1lLnRvTG93ZXJDYXNlKCkuc3BsaXQoJyAnKTtcbiAgICAgIGkgPSBuYW1lcy5sZW5ndGg7XG4gICAgICB3aGlsZSAoaS0tKSB7XG4gICAgICAgIG5hbWUgPSBuYW1lc1tpXTtcbiAgICAgICAgaGFuZGxlcnMgPSB0aGlzLmJpbmRpbmdzW25hbWVdO1xuXG4gICAgICAgIC8vIFVuYmluZCBhbGwgaGFuZGxlcnNcbiAgICAgICAgaWYgKCFuYW1lKSB7XG4gICAgICAgICAgZm9yIChiaW5kaW5nTmFtZSBpbiB0aGlzLmJpbmRpbmdzKSB7XG4gICAgICAgICAgICB0aGlzLnRvZ2dsZUV2ZW50KGJpbmRpbmdOYW1lLCBmYWxzZSk7XG4gICAgICAgICAgICBkZWxldGUgdGhpcy5iaW5kaW5nc1tiaW5kaW5nTmFtZV07XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoaGFuZGxlcnMpIHtcbiAgICAgICAgICAvLyBVbmJpbmQgYWxsIGJ5IG5hbWVcbiAgICAgICAgICBpZiAoIWNhbGxiYWNrKSB7XG4gICAgICAgICAgICBoYW5kbGVycy5sZW5ndGggPSAwO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyBVbmJpbmQgc3BlY2lmaWMgb25lc1xuICAgICAgICAgICAgaGkgPSBoYW5kbGVycy5sZW5ndGg7XG4gICAgICAgICAgICB3aGlsZSAoaGktLSkge1xuICAgICAgICAgICAgICBpZiAoaGFuZGxlcnNbaGldLmZ1bmMgPT09IGNhbGxiYWNrKSB7XG4gICAgICAgICAgICAgICAgaGFuZGxlcnMgPSBoYW5kbGVycy5zbGljZSgwLCBoaSkuY29uY2F0KGhhbmRsZXJzLnNsaWNlKGhpICsgMSkpO1xuICAgICAgICAgICAgICAgIHRoaXMuYmluZGluZ3NbbmFtZV0gPSBoYW5kbGVycztcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmICghaGFuZGxlcnMubGVuZ3RoKSB7XG4gICAgICAgICAgICB0aGlzLnRvZ2dsZUV2ZW50KG5hbWUsIGZhbHNlKTtcbiAgICAgICAgICAgIGRlbGV0ZSB0aGlzLmJpbmRpbmdzW25hbWVdO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBmb3IgKG5hbWUgaW4gdGhpcy5iaW5kaW5ncykge1xuICAgICAgICB0aGlzLnRvZ2dsZUV2ZW50KG5hbWUsIGZhbHNlKTtcbiAgICAgIH1cblxuICAgICAgdGhpcy5iaW5kaW5ncyA9IHt9O1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLyoqXG4gICAqIEJpbmRzIGFuIGV2ZW50IGxpc3RlbmVyIHRvIGEgc3BlY2lmaWMgZXZlbnQgYnkgbmFtZVxuICAgKiBhbmQgYXV0b21hdGljYWxseSB1bmJpbmQgdGhlIGV2ZW50IG9uY2UgdGhlIGNhbGxiYWNrIGZpcmVzLlxuICAgKlxuICAgKiBAbWV0aG9kIG9uY2VcbiAgICogQHBhcmFtIHtTdHJpbmd9IG5hbWUgRXZlbnQgbmFtZSBvciBzcGFjZSBzZXBhcmF0ZWQgbGlzdCBvZiBldmVudHMgdG8gYmluZC5cbiAgICogQHBhcmFtIHtjYWxsYmFja30gY2FsbGJhY2sgQ2FsbGJhY2sgdG8gYmUgZXhlY3V0ZWQgd2hlbiB0aGUgZXZlbnQgb2NjdXJzLlxuICAgKiBAcGFyYW0ge0Jvb2xlYW59IHByZXBlbmQgT3B0aW9uYWwgZmxhZyBpZiB0aGUgZXZlbnQgc2hvdWxkIGJlIHByZXBlbmRlZC4gVXNlIHRoaXMgd2l0aCBjYXJlLlxuICAgKiBAcmV0dXJuIHtPYmplY3R9IEN1cnJlbnQgY2xhc3MgaW5zdGFuY2UuXG4gICAqIEBleGFtcGxlXG4gICAqIGluc3RhbmNlLm9uY2UoJ2V2ZW50JywgZnVuY3Rpb24oZSkge1xuICAgKiAgICAgLy8gQ2FsbGJhY2sgbG9naWNcbiAgICogfSk7XG4gICAqL1xuICBwdWJsaWMgb25jZSA8SyBleHRlbmRzIGtleW9mIFQ+KG5hbWU6IEssIGNhbGxiYWNrOiAoZXZlbnQ6IEVkaXRvckV2ZW50PFRbS10+KSA9PiB2b2lkLCBwcmVwZW5kPzogYm9vbGVhbik6IHRoaXM7XG4gIHB1YmxpYyBvbmNlIDxVID0gYW55PihuYW1lOiBzdHJpbmcsIGNhbGxiYWNrOiAoZXZlbnQ6IEVkaXRvckV2ZW50PFU+KSA9PiB2b2lkLCBwcmVwZW5kPzogYm9vbGVhbik6IHRoaXM7XG4gIHB1YmxpYyBvbmNlIChuYW1lOiBzdHJpbmcsIGNhbGxiYWNrOiAoZXZlbnQ6IEVkaXRvckV2ZW50PGFueT4pID0+IHZvaWQsIHByZXBlbmQ/OiBib29sZWFuKTogdGhpcyB7XG4gICAgcmV0dXJuIHRoaXMub24obmFtZSwgY2FsbGJhY2ssIHByZXBlbmQsIHsgb25jZTogdHJ1ZSB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRydWUvZmFsc2UgaWYgdGhlIGRpc3BhdGNoZXIgaGFzIGEgZXZlbnQgb2YgdGhlIHNwZWNpZmllZCBuYW1lLlxuICAgKlxuICAgKiBAbWV0aG9kIGhhc1xuICAgKiBAcGFyYW0ge1N0cmluZ30gbmFtZSBOYW1lIG9mIHRoZSBldmVudCB0byBjaGVjayBmb3IuXG4gICAqIEByZXR1cm4ge0Jvb2xlYW59IHRydWUvZmFsc2UgaWYgdGhlIGV2ZW50IGV4aXN0cyBvciBub3QuXG4gICAqL1xuICBwdWJsaWMgaGFzIChuYW1lOiBzdHJpbmcpOiBib29sZWFuIHtcbiAgICBuYW1lID0gbmFtZS50b0xvd2VyQ2FzZSgpO1xuICAgIHJldHVybiAhKCF0aGlzLmJpbmRpbmdzW25hbWVdIHx8IHRoaXMuYmluZGluZ3NbbmFtZV0ubGVuZ3RoID09PSAwKTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBFdmVudERpc3BhdGNoZXI7Il19