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
const nativeEvents = Tools.makeMap('focus blur focusin focusout click dblclick mousedown mouseup mousemove mouseover beforepaste paste cut copy selectionchange ' +
    'mouseout mouseenter mouseleave wheel keydown keypress keyup input beforeinput contextmenu dragstart dragend dragover ' +
    'draggesture dragdrop drop drag submit ' +
    'compositionstart compositionend compositionupdate touchstart touchmove touchend', ' ');
class EventDispatcher {
    constructor(settings) {
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
    static isNative(name) {
        return !!nativeEvents[name.toLowerCase()];
    }
    fire(name, args) {
        let handlers, i, l, callback;
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
    }
    on(name, callback, prepend, extra) {
        let handlers, names, i;
        if (callback === false) {
            callback = Fun.never;
        }
        if (callback) {
            const wrappedCallback = {
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
    }
    off(name, callback) {
        let i, handlers, bindingName, names, hi;
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
    }
    once(name, callback, prepend) {
        return this.on(name, callback, prepend, { once: true });
    }
    /**
     * Returns true/false if the dispatcher has a event of the specified name.
     *
     * @method has
     * @param {String} name Name of the event to check for.
     * @return {Boolean} true/false if the event exists or not.
     */
    has(name) {
        name = name.toLowerCase();
        return !(!this.bindings[name] || this.bindings[name].length === 0);
    }
}
export default EventDispatcher;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRXZlbnREaXNwYXRjaGVyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHBvbHB3YXJlL3RpbnltY2UtdXRpbC8iLCJzb3VyY2VzIjpbImxpYi9hcGkvdXRpbC9FdmVudERpc3BhdGNoZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7O0dBS0c7QUFHSCxPQUFPLEtBQUssTUFBTSxTQUFTLENBQUM7QUFDNUIsT0FBTyxFQUFFLEdBQUcsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBOEV0Qzs7Ozs7Ozs7OztHQVVHO0FBRUgsTUFBTSxZQUFZLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FDaEMsOEhBQThIO0lBQzlILHVIQUF1SDtJQUN2SCx3Q0FBd0M7SUFDeEMsaUZBQWlGLEVBQ2pGLEdBQUcsQ0FDSixDQUFDO0FBRUYsTUFBTSxlQUFlO0lBa0JuQixZQUFhLFFBQThCO1FBRm5DLGFBQVEsR0FBRyxFQUFFLENBQUM7UUFHcEIsSUFBSSxDQUFDLFFBQVEsR0FBRyxRQUFRLElBQUksRUFBRSxDQUFDO1FBQy9CLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLElBQUksSUFBSSxDQUFDO1FBQ3pDLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLElBQUksR0FBRyxDQUFDLEtBQUssQ0FBQztJQUM1RCxDQUFDO0lBckJEOzs7Ozs7O09BT0c7SUFDSSxNQUFNLENBQUMsUUFBUSxDQUFFLElBQVk7UUFDbEMsT0FBTyxDQUFDLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDO0lBQzVDLENBQUM7SUF5Qk0sSUFBSSxDQUFFLElBQVksRUFBRSxJQUFVO1FBQ25DLElBQUksUUFBUSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsUUFBUSxDQUFDO1FBRTdCLElBQUksR0FBRyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDMUIsSUFBSSxHQUFHLElBQUksSUFBSSxFQUFF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aUI7UUFDdkYsT0FBTyxJQUFJLENBQUMsRUFBRSxDQUFDLElBQUksRUFBRSxRQUFRLEVBQUUsT0FBTyxFQUFFLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7SUFDMUQsQ0FBQztJQUVEOzs7Ozs7T0FNRztJQUNJLEdBQUcsQ0FBRSxJQUFZO1FBQ3RCLElBQUksR0FBRyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDMUIsT0FBTyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUMsTUFBTSxLQUFLLENBQUMsQ0FBQyxDQUFDO0lBQ3JFLENBQUM7Q0FDRjtBQUVELGVBQWUsZUFBZSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIFRpbnkgVGVjaG5vbG9naWVzLCBJbmMuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgTEdQTCBvciBhIGNvbW1lcmNpYWwgbGljZW5zZS5cbiAqIEZvciBMR1BMIHNlZSBMaWNlbnNlLnR4dCBpbiB0aGUgcHJvamVjdCByb290IGZvciBsaWNlbnNlIGluZm9ybWF0aW9uLlxuICogRm9yIGNvbW1lcmNpYWwgbGljZW5zZXMgc2VlIGh0dHBzOi8vd3d3LnRpbnkuY2xvdWQvXG4gKi9cblxuaW1wb3J0IHsgQ2xpcGJvYXJkRXZlbnQsIERhdGFUcmFuc2ZlciwgRHJhZ0V2ZW50LCBFdmVudCwgRm9jdXNFdmVudCwgS2V5Ym9hcmRFdmVudCwgTW91c2VFdmVudCwgUG9pbnRlckV2ZW50LCBUb3VjaEV2ZW50LCBXaGVlbEV2ZW50IH0gZnJvbSAnQGVwaG94L2RvbS1nbG9iYWxzJztcbmltcG9ydCBUb29scyBmcm9tICcuL1Rvb2xzJztcbmltcG9ydCB7IEZ1biB9IGZyb20gJ0BlcGhveC9rYXRhbWFyaSc7XG5cbi8vIElucHV0RXZlbnQgaXMgZXhwZXJpbWVudGFsIHNvIHdlIGRvbid0IGhhdmUgYW4gYWN0dWFsIHR5cGVcbi8vIFNlZSBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9BUEkvSW5wdXRFdmVudFxuZXhwb3J0IGludGVyZmFjZSBJbnB1dEV2ZW50IGV4dGVuZHMgRXZlbnQge1xuICByZWFkb25seSBkYXRhOiBzdHJpbmc7XG4gIHJlYWRvbmx5IGRhdGFUcmFuc2ZlcjogRGF0YVRyYW5zZmVyO1xuICByZWFkb25seSBpbnB1dFR5cGU6IHN0cmluZztcbiAgcmVhZG9ubHkgaXNDb21wb3Npbmc6IGJvb2xlYW47XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgTmF0aXZlRXZlbnRNYXAge1xuICAnYmVmb3JlcGFzdGUnOiBFdmVudDtcbiAgJ2JsdXInOiBGb2N1c0V2ZW50O1xuICAnYmVmb3JlaW5wdXQnOiBJbnB1dEV2ZW50O1xuICAnY2xpY2snOiBNb3VzZUV2ZW50O1xuICAnY29tcG9zaXRpb25lbmQnOiBFdmVudDtcbiAgJ2NvbXBvc2l0aW9uc3RhcnQnOiBFdmVudDtcbiAgJ2NvbXBvc2l0aW9udXBkYXRlJzogRXZlbnQ7XG4gICdjb250ZXh0bWVudSc6IFBvaW50ZXJFdmVudDtcbiAgJ2NvcHknOiBDbGlwYm9hcmRFdmVudDtcbiAgJ2N1dCc6IENsaXBib2FyZEV2ZW50O1xuICAnZGJsY2xpY2snOiBNb3VzZUV2ZW50O1xuICAnZHJhZyc6IERyYWdFdmVudDtcbiAgJ2RyYWdkcm9wJzogRHJhZ0V2ZW50O1xuICAnZHJhZ2VuZCc6IERyYWdFdmVudDtcbiAgJ2RyYWdnZXN0dXJlJzogRHJhZ0V2ZW50O1xuICAnZHJhZ292ZXInOiBEcmFnRXZlbnQ7XG4gICdkcmFnc3RhcnQnOiBEcmFnRXZlbnQ7XG4gICdkcm9wJzogRHJhZ0V2ZW50O1xuICAnZm9jdXMnOiBGb2N1c0V2ZW50O1xuICAnZm9jdXNpbic6IEZvY3VzRXZlbnQ7XG4gICdmb2N1c291dCc6IEZvY3VzRXZlbnQ7XG4gICdpbnB1dCc6IElucHV0RXZlbnQ7XG4gICdrZXlkb3duJzogS2V5Ym9hcmRFdmVudDtcbiAgJ2tleXByZXNzJzogS2V5Ym9hcmRFdmVudDtcbiAgJ2tleXVwJzogS2V5Ym9hcmRFdmVudDtcbiAgJ21vdXNlZG93bic6IE1vdXNlRXZlbnQ7XG4gICdtb3VzZWVudGVyJzogTW91c2VFdmVudDtcbiAgJ21vdXNlbGVhdmUnOiBNb3VzZUV2ZW50O1xuICAnbW91c2Vtb3ZlJzogTW91c2VFdmVudDtcbiAgJ21vdXNlb3V0JzogTW91c2VFdmVudDtcbiAgJ21vdXNlb3Zlcic6IE1vdXNlRXZlbnQ7XG4gICdtb3VzZXVwJzogTW91c2VFdmVudDtcbiAgJ3Bhc3RlJzogQ2xpcGJvYXJkRXZlbnQ7XG4gICdzZWxlY3Rpb25jaGFuZ2UnOiBFdmVudDtcbiAgJ3N1Ym1pdCc6IEV2ZW50O1xuICAndG91Y2hlbmQnOiBUb3VjaEV2ZW50O1xuICAndG91Y2htb3ZlJzogVG91Y2hFdmVudDtcbiAgJ3RvdWNoc3RhcnQnOiBUb3VjaEV2ZW50O1xuICAnd2hlZWwnOiBXaGVlbEV2ZW50O1xufVxuXG5leHBvcnQgdHlwZSBFZGl0b3JFdmVudDxUPiA9IFQgJiB7XG4gIHRhcmdldDogYW55O1xuICB0eXBlOiBzdHJpbmc7XG4gIHByZXZlbnREZWZhdWx0ICgpOiB2b2lkO1xuICBpc0RlZmF1bHRQcmV2ZW50ZWQgKCk6IGJvb2xlYW47XG4gIHN0b3BQcm9wYWdhdGlvbiAoKTogdm9pZDtcbiAgaXNQcm9wYWdhdGlvblN0b3BwZWQgKCk6IGJvb2xlYW47XG4gIHN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbiAoKTogdm9pZDtcbiAgaXNJbW1lZGlhdGVQcm9wYWdhdGlvblN0b3BwZWQgKCk6IGJvb2xlYW47XG59O1xuXG5leHBvcnQgaW50ZXJmYWNlIEV2ZW50RGlzcGF0Y2hlclNldHRpbmdzIHtcbiAgc2NvcGU/OiB7fTtcbiAgdG9nZ2xlRXZlbnQ/OiAobmFtZTogc3RyaW5nLCBzdGF0ZTogYm9vbGVhbikgPT4gdm9pZCB8IGJvb2xlYW47XG4gIGJlZm9yZUZpcmU/OiA8VD4oYXJnczogRWRpdG9yRXZlbnQ8VD4pID0+IHZvaWQ7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgRXZlbnREaXNwYXRjaGVyQ29uc3RydWN0b3I8VCBleHRlbmRzIE5hdGl2ZUV2ZW50TWFwPiB7XG4gIHJlYWRvbmx5IHByb3RvdHlwZTogRXZlbnREaXNwYXRjaGVyPFQ+O1xuXG4gIG5ldyAoc2V0dGluZ3M/OiBFdmVudERpc3BhdGNoZXJTZXR0aW5ncyk6IEV2ZW50RGlzcGF0Y2hlcjxUPjtcblxuICBpc05hdGl2ZSAobmFtZTogc3RyaW5nKTogYm9vbGVhbjtcbn1cblxuLyoqXG4gKiBUaGlzIGNsYXNzIGxldHMgeW91IGFkZC9yZW1vdmUgYW5kIGZpcmUgZXZlbnRzIGJ5IG5hbWUgb24gdGhlIHNwZWNpZmllZCBzY29wZS4gVGhpcyBtYWtlc1xuICogaXQgZWFzeSB0byBhZGQgZXZlbnQgbGlzdGVuZXIgbG9naWMgdG8gYW55IGNsYXNzLlxuICpcbiAqIEBjbGFzcyB0aW55bWNlLnV0aWwuRXZlbnREaXNwYXRjaGVyXG4gKiBAZXhhbXBsZVxuICogIHZhciBldmVudERpc3BhdGNoZXIgPSBuZXcgRXZlbnREaXNwYXRjaGVyKCk7XG4gKlxuICogIGV2ZW50RGlzcGF0Y2hlci5vbignY2xpY2snLCBmdW5jdGlvbigpIHtjb25zb2xlLmxvZygnZGF0YScpO30pO1xuICogIGV2ZW50RGlzcGF0Y2hlci5maXJlKCdjbGljaycsIHtkYXRhOiAxMjN9KTtcbiAqL1xuXG5jb25zdCBuYXRpdmVFdmVudHMgPSBUb29scy5tYWtlTWFwKFxuICAnZm9jdXMgYmx1ciBmb2N1c2luIGZvY3Vzb3V0IGNsaWNrIGRibGNsaWNrIG1vdXNlZG93biBtb3VzZXVwIG1vdXNlbW92ZSBtb3VzZW92ZXIgYmVmb3JlcGFzdGUgcGFzdGUgY3V0IGNvcHkgc2VsZWN0aW9uY2hhbmdlICcgK1xuICAnbW91c2VvdXQgbW91c2VlbnRlciBtb3VzZWxlYXZlIHdoZWVsIGtleWRvd24ga2V5cHJlc3Mga2V5dXAgaW5wdXQgYmVmb3JlaW5wdXQgY29udGV4dG1lbnUgZHJhZ3N0YXJ0IGRyYWdlbmQgZHJhZ292ZXIgJyArXG4gICdkcmFnZ2VzdHVyZSBkcmFnZHJvcCBkcm9wIGRyYWcgc3VibWl0ICcgK1xuICAnY29tcG9zaXRpb25zdGFydCBjb21wb3NpdGlvbmVuZCBjb21wb3NpdGlvbnVwZGF0ZSB0b3VjaHN0YXJ0IHRvdWNobW92ZSB0b3VjaGVuZCcsXG4gICcgJ1xuKTtcblxuY2xhc3MgRXZlbnREaXNwYXRjaGVyPFQgZXh0ZW5kcyBOYXRpdmVFdmVudE1hcD4ge1xuICAvKipcbiAgICogUmV0dXJucyB0cnVlL2ZhbHNlIGlmIHRoZSBzcGVjaWZpZWQgZXZlbnQgbmFtZSBpcyBhIG5hdGl2ZSBicm93c2VyIGV2ZW50IG9yIG5vdC5cbiAgICpcbiAgICogQG1ldGhvZCBpc05hdGl2ZVxuICAgKiBAcGFyYW0ge1N0cmluZ30gbmFtZSBOYW1lIHRvIGNoZWNrIGlmIGl0J3MgbmF0aXZlLlxuICAgKiBAcmV0dXJuIHtCb29sZWFufSB0cnVlL2ZhbHNlIGlmIHRoZSBldmVudCBpcyBuYXRpdmUgb3Igbm90LlxuICAgKiBAc3RhdGljXG4gICAqL1xuICBwdWJsaWMgc3RhdGljIGlzTmF0aXZlIChuYW1lOiBzdHJpbmcpOiBib29sZWFuIHtcbiAgICByZXR1cm4gISFuYXRpdmVFdmVudHNbbmFtZS50b0xvd2VyQ2FzZSgpXTtcbiAgfVxuXG4gIHByaXZhdGUgcmVhZG9ubHkgc2V0dGluZ3M6IFJlY29yZDxzdHJpbmcsIGFueT47XG4gIHByaXZhdGUgcmVhZG9ubHkgc2NvcGU6IHt9O1xuICBwcml2YXRlIHJlYWRvbmx5IHRvZ2dsZUV2ZW50OiAobmFtZTogc3RyaW5nLCB0b2dnbGU6IGJvb2xlYW4pID0+IHZvaWQ7XG4gIHByaXZhdGUgYmluZGluZ3MgPSB7fTtcblxuICBjb25zdHJ1Y3RvciAoc2V0dGluZ3M/OiBSZWNvcmQ8c3RyaW5nLCBhbnk+KSB7XG4gICAgdGhpcy5zZXR0aW5ncyA9IHNldHRpbmdzIHx8IHt9O1xuICAgIHRoaXMuc2NvcGUgPSB0aGlzLnNldHRpbmdzLnNjb3BlIHx8IHRoaXM7XG4gICAgdGhpcy50b2dnbGVFdmVudCA9IHRoaXMuc2V0dGluZ3MudG9nZ2xlRXZlbnQgfHwgRnVuLm5ldmVyO1xuICB9XG5cbiAgLyoqXG4gICAqIEZpcmVzIHRoZSBzcGVjaWZpZWQgZXZlbnQgYnkgbmFtZS5cbiAgICpcbiAgICogQG1ldGhvZCBmaXJlXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBuYW1lIE5hbWUgb2YgdGhlIGV2ZW50IHRvIGZpcmUuXG4gICAqIEBwYXJhbSB7T2JqZWN0P30gYXJncyBFdmVudCBhcmd1bWVudHMuXG4gICAqIEByZXR1cm4ge09iamVjdH0gRXZlbnQgYXJncyBpbnN0YW5jZSBwYXNzZWQgaW4uXG4gICAqIEBleGFtcGxlXG4gICAqIGluc3RhbmNlLmZpcmUoJ2V2ZW50Jywgey4uLn0pO1xuICAgKi9cbiAgcHVibGljIGZpcmUgPEsgZXh0ZW5kcyBrZXlvZiBUPihuYW1lOiBLLCBhcmdzPzogVFtLXSk6IEVkaXRvckV2ZW50PFRbS10+O1xuICBwdWJsaWMgZmlyZSA8VSA9IGFueT4obmFtZTogc3RyaW5nLCBhcmdzPzogVSk6IEVkaXRvckV2ZW50PFU+O1xuICBwdWJsaWMgZmlyZSAobmFtZTogc3RyaW5nLCBhcmdzPzogYW55KTogRWRpdG9yRXZlbnQ8YW55PiB7XG4gICAgbGV0IGhhbmRsZXJzLCBpLCBsLCBjYWxsYmFjaztcblxuICAgIG5hbWUgPSBuYW1lLnRvTG93ZXJDYXNlKCk7XG4gICAgYXJncyA9IGFyZ3MgfHwge307XG4gICAgYXJncy50eXBlID0gbmFtZTtcblxuICAgIC8vIFNldHVwIHRhcmdldCBpcyB0aGVyZSBpc24ndCBvbmVcbiAgICBpZiAoIWFyZ3MudGFyZ2V0KSB7XG4gICAgICBhcmdzLnRhcmdldCA9IHRoaXMuc2NvcGU7XG4gICAgfVxuXG4gICAgLy8gQWRkIGV2ZW50IGRlbGVnYXRpb24gbWV0aG9kcyBpZiB0aGV5IGFyZSBtaXNzaW5nXG4gICAgaWYgKCFhcmdzLnByZXZlbnREZWZhdWx0KSB7XG4gICAgICAvLyBBZGQgcHJldmVudERlZmF1bHQgbWV0aG9kXG4gICAgICBhcmdzLnByZXZlbnREZWZhdWx0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBhcmdzLmlzRGVmYXVsdFByZXZlbnRlZCA9IEZ1bi5hbHdheXM7XG4gICAgICB9O1xuXG4gICAgICAvLyBBZGQgc3RvcFByb3BhZ2F0aW9uXG4gICAgICBhcmdzLnN0b3BQcm9wYWdhdGlvbiA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgYXJncy5pc1Byb3BhZ2F0aW9uU3RvcHBlZCA9IEZ1bi5hbHdheXM7XG4gICAgICB9O1xuXG4gICAgICAvLyBBZGQgc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uXG4gICAgICBhcmdzLnN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbiA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgYXJncy5pc0ltbWVkaWF0ZVByb3BhZ2F0aW9uU3RvcHBlZCA9IEZ1bi5hbHdheXM7XG4gICAgICB9O1xuXG4gICAgICAvLyBBZGQgZXZlbnQgZGVsZWdhdGlvbiBzdGF0ZXNcbiAgICAgIGFyZ3MuaXNEZWZhdWx0UHJldmVudGVkID0gRnVuLm5ldmVyO1xuICAgICAgYXJncy5pc1Byb3BhZ2F0aW9uU3RvcHBlZCA9IEZ1bi5uZXZlcjtcbiAgICAgIGFyZ3MuaXNJbW1lZGlhdGVQcm9wYWdhdGlvblN0b3BwZWQgPSBGdW4ubmV2ZXI7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuc2V0dGluZ3MuYmVmb3JlRmlyZSkge1xuICAgICAgdGhpcy5zZXR0aW5ncy5iZWZvcmVGaXJlKGFyZ3MpO1xuICAgIH1cblxuICAgIGhhbmRsZXJzID0gdGhpcy5iaW5kaW5nc1tuYW1lXTtcbiAgICBpZiAoaGFuZGxlcnMpIHtcbiAgICAgIGZvciAoaSA9IDAsIGwgPSBoYW5kbGVycy5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgICAgY2FsbGJhY2sgPSBoYW5kbGVyc1tpXTtcblxuICAgICAgICAvLyBVbmJpbmQgaGFuZGxlcnMgbWFya2VkIHdpdGggXCJvbmNlXCJcbiAgICAgICAgaWYgKGNhbGxiYWNrLm9uY2UpIHtcbiAgICAgICAgICB0aGlzLm9mZihuYW1lLCBjYWxsYmFjay5mdW5jKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFN0b3AgaW1tZWRpYXRlIHByb3BhZ2F0aW9uIGlmIG5lZWRlZFxuICAgICAgICBpZiAoYXJncy5pc0ltbWVkaWF0ZVByb3BhZ2F0aW9uU3RvcHBlZCgpKSB7XG4gICAgICAgICAgYXJncy5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICByZXR1cm4gYXJncztcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIElmIGNhbGxiYWNrIHJldHVybnMgZmFsc2UgdGhlbiBwcmV2ZW50IGRlZmF1bHQgYW5kIHN0b3AgYWxsIHByb3BhZ2F0aW9uXG4gICAgICAgIGlmIChjYWxsYmFjay5mdW5jLmNhbGwodGhpcy5zY29wZSwgYXJncykgPT09IGZhbHNlKSB7XG4gICAgICAgICAgYXJncy5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgIHJldHVybiBhcmdzO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGFyZ3M7XG4gIH1cblxuICAvKipcbiAgICogQmluZHMgYW4gZXZlbnQgbGlzdGVuZXIgdG8gYSBzcGVjaWZpYyBldmVudCBieSBuYW1lLlxuICAgKlxuICAgKiBAbWV0aG9kIG9uXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBuYW1lIEV2ZW50IG5hbWUgb3Igc3BhY2Ugc2VwYXJhdGVkIGxpc3Qgb2YgZXZlbnRzIHRvIGJpbmQuXG4gICAqIEBwYXJhbSB7Y2FsbGJhY2t9IGNhbGxiYWNrIENhbGxiYWNrIHRvIGJlIGV4ZWN1dGVkIHdoZW4gdGhlIGV2ZW50IG9jY3Vycy5cbiAgICogQHBhcmFtIHtCb29sZWFufSBwcmVwZW5kIE9wdGlvbmFsIGZsYWcgaWYgdGhlIGV2ZW50IHNob3VsZCBiZSBwcmVwZW5kZWQuIFVzZSB0aGlzIHdpdGggY2FyZS5cbiAgICogQHJldHVybiB7T2JqZWN0fSBDdXJyZW50IGNsYXNzIGluc3RhbmNlLlxuICAgKiBAZXhhbXBsZVxuICAgKiBpbnN0YW5jZS5vbignZXZlbnQnLCBmdW5jdGlvbihlKSB7XG4gICAqICAgICAvLyBDYWxsYmFjayBsb2dpY1xuICAgKiB9KTtcbiAgICovXG4gIHB1YmxpYyBvbiA8SyBleHRlbmRzIGtleW9mIFQ+KG5hbWU6IEssIGNhbGxiYWNrOiAoZXZlbnQ6IEVkaXRvckV2ZW50PFRbS10+KSA9PiB2b2lkLCBwcmVwZW5kPzogYm9vbGVhbiwgZXh0cmE/OiB7fSk6IHRoaXM7XG4gIHB1YmxpYyBvbiA8VSA9IGFueT4obmFtZTogc3RyaW5nLCBjYWxsYmFjazogKGV2ZW50OiBFZGl0b3JFdmVudDxVPikgPT4gdm9pZCwgcHJlcGVuZD86IGJvb2xlYW4sIGV4dHJhPzoge30pOiB0aGlzO1xuICBwdWJsaWMgb24gKG5hbWU6IHN0cmluZywgY2FsbGJhY2s6IGZhbHNlLCBwcmVwZW5kPzogYm9vbGVhbiwgZXh0cmE/OiB7fSk6IHRoaXM7XG4gIHB1YmxpYyBvbiAobmFtZTogc3RyaW5nLCBjYWxsYmFjazogZmFsc2UgfCAoKGV2ZW50OiBFZGl0b3JFdmVudDxhbnk+KSA9PiB2b2lkKSwgcHJlcGVuZD86IGJvb2xlYW4sIGV4dHJhPzoge30pOiB0aGlzIHtcbiAgICBsZXQgaGFuZGxlcnMsIG5hbWVzLCBpO1xuXG4gICAgaWYgKGNhbGxiYWNrID09PSBmYWxzZSkge1xuICAgICAgY2FsbGJhY2sgPSBGdW4ubmV2ZXI7XG4gICAgfVxuXG4gICAgaWYgKGNhbGxiYWNrKSB7XG4gICAgICBjb25zdCB3cmFwcGVkQ2FsbGJhY2sgPSB7XG4gICAgICAgIGZ1bmM6IGNhbGxiYWNrXG4gICAgICB9O1xuXG4gICAgICBpZiAoZXh0cmEpIHtcbiAgICAgICAgVG9vbHMuZXh0ZW5kKHdyYXBwZWRDYWxsYmFjaywgZXh0cmEpO1xuICAgICAgfVxuXG4gICAgICBuYW1lcyA9IG5hbWUudG9Mb3dlckNhc2UoKS5zcGxpdCgnICcpO1xuICAgICAgaSA9IG5hbWVzLmxlbmd0aDtcbiAgICAgIHdoaWxlIChpLS0pIHtcbiAgICAgICAgbmFtZSA9IG5hbWVzW2ldO1xuICAgICAgICBoYW5kbGVycyA9IHRoaXMuYmluZGluZ3NbbmFtZV07XG4gICAgICAgIGlmICghaGFuZGxlcnMpIHtcbiAgICAgICAgICBoYW5kbGVycyA9IHRoaXMuYmluZGluZ3NbbmFtZV0gPSBbXTtcbiAgICAgICAgICB0aGlzLnRvZ2dsZUV2ZW50KG5hbWUsIHRydWUpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHByZXBlbmQpIHtcbiAgICAgICAgICBoYW5kbGVycy51bnNoaWZ0KHdyYXBwZWRDYWxsYmFjayk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaGFuZGxlcnMucHVzaCh3cmFwcGVkQ2FsbGJhY2spO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvKipcbiAgICogVW5iaW5kcyBhbiBldmVudCBsaXN0ZW5lciB0byBhIHNwZWNpZmljIGV2ZW50IGJ5IG5hbWUuXG4gICAqXG4gICAqIEBtZXRob2Qgb2ZmXG4gICAqIEBwYXJhbSB7U3RyaW5nP30gbmFtZSBOYW1lIG9mIHRoZSBldmVudCB0byB1bmJpbmQuXG4gICAqIEBwYXJhbSB7Y2FsbGJhY2s/fSBjYWxsYmFjayBDYWxsYmFjayB0byB1bmJpbmQuXG4gICAqIEByZXR1cm4ge09iamVjdH0gQ3VycmVudCBjbGFzcyBpbnN0YW5jZS5cbiAgICogQGV4YW1wbGVcbiAgICogLy8gVW5iaW5kIHNwZWNpZmljIGNhbGxiYWNrXG4gICAqIGluc3RhbmNlLm9mZignZXZlbnQnLCBoYW5kbGVyKTtcbiAgICpcbiAgICogLy8gVW5iaW5kIGFsbCBsaXN0ZW5lcnMgYnkgbmFtZVxuICAgKiBpbnN0YW5jZS5vZmYoJ2V2ZW50Jyk7XG4gICAqXG4gICAqIC8vIFVuYmluZCBhbGwgZXZlbnRzXG4gICAqIGluc3RhbmNlLm9mZigpO1xuICAgKi9cbiAgcHVibGljIG9mZiA8SyBleHRlbmRzIGtleW9mIFQ+KG5hbWU6IEssIGNhbGxiYWNrOiAoZXZlbnQ6IEVkaXRvckV2ZW50PFRbS10+KSA9PiB2b2lkKTogdGhpcztcbiAgcHVibGljIG9mZiA8VSA9IGFueT4obmFtZTogc3RyaW5nLCBjYWxsYmFjazogKGV2ZW50OiBFZGl0b3JFdmVudDxVPikgPT4gdm9pZCk6IHRoaXM7XG4gIHB1YmxpYyBvZmYgKG5hbWU/OiBzdHJpbmcpOiB0aGlzO1xuICBwdWJsaWMgb2ZmIChuYW1lPzogc3RyaW5nLCBjYWxsYmFjaz86IChldmVudDogRWRpdG9yRXZlbnQ8YW55PikgPT4gdm9pZCk6IHRoaXMge1xuICAgIGxldCBpLCBoYW5kbGVycywgYmluZGluZ05hbWUsIG5hbWVzLCBoaTtcblxuICAgIGlmIChuYW1lKSB7XG4gICAgICBuYW1lcyA9IG5hbWUudG9Mb3dlckNhc2UoKS5zcGxpdCgnICcpO1xuICAgICAgaSA9IG5hbWVzLmxlbmd0aDtcbiAgICAgIHdoaWxlIChpLS0pIHtcbiAgICAgICAgbmFtZSA9IG5hbWVzW2ldO1xuICAgICAgICBoYW5kbGVycyA9IHRoaXMuYmluZGluZ3NbbmFtZV07XG5cbiAgICAgICAgLy8gVW5iaW5kIGFsbCBoYW5kbGVyc1xuICAgICAgICBpZiAoIW5hbWUpIHtcbiAgICAgICAgICBmb3IgKGJpbmRpbmdOYW1lIGluIHRoaXMuYmluZGluZ3MpIHtcbiAgICAgICAgICAgIHRoaXMudG9nZ2xlRXZlbnQoYmluZGluZ05hbWUsIGZhbHNlKTtcbiAgICAgICAgICAgIGRlbGV0ZSB0aGlzLmJpbmRpbmdzW2JpbmRpbmdOYW1lXTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChoYW5kbGVycykge1xuICAgICAgICAgIC8vIFVuYmluZCBhbGwgYnkgbmFtZVxuICAgICAgICAgIGlmICghY2FsbGJhY2spIHtcbiAgICAgICAgICAgIGhhbmRsZXJzLmxlbmd0aCA9IDA7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vIFVuYmluZCBzcGVjaWZpYyBvbmVzXG4gICAgICAgICAgICBoaSA9IGhhbmRsZXJzLmxlbmd0aDtcbiAgICAgICAgICAgIHdoaWxlIChoaS0tKSB7XG4gICAgICAgICAgICAgIGlmIChoYW5kbGVyc1toaV0uZnVuYyA9PT0gY2FsbGJhY2spIHtcbiAgICAgICAgICAgICAgICBoYW5kbGVycyA9IGhhbmRsZXJzLnNsaWNlKDAsIGhpKS5jb25jYXQoaGFuZGxlcnMuc2xpY2UoaGkgKyAxKSk7XG4gICAgICAgICAgICAgICAgdGhpcy5iaW5kaW5nc1tuYW1lXSA9IGhhbmRsZXJzO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKCFoYW5kbGVycy5sZW5ndGgpIHtcbiAgICAgICAgICAgIHRoaXMudG9nZ2xlRXZlbnQobmFtZSwgZmFsc2UpO1xuICAgICAgICAgICAgZGVsZXRlIHRoaXMuYmluZGluZ3NbbmFtZV07XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGZvciAobmFtZSBpbiB0aGlzLmJpbmRpbmdzKSB7XG4gICAgICAgIHRoaXMudG9nZ2xlRXZlbnQobmFtZSwgZmFsc2UpO1xuICAgICAgfVxuXG4gICAgICB0aGlzLmJpbmRpbmdzID0ge307XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvKipcbiAgICogQmluZHMgYW4gZXZlbnQgbGlzdGVuZXIgdG8gYSBzcGVjaWZpYyBldmVudCBieSBuYW1lXG4gICAqIGFuZCBhdXRvbWF0aWNhbGx5IHVuYmluZCB0aGUgZXZlbnQgb25jZSB0aGUgY2FsbGJhY2sgZmlyZXMuXG4gICAqXG4gICAqIEBtZXRob2Qgb25jZVxuICAgKiBAcGFyYW0ge1N0cmluZ30gbmFtZSBFdmVudCBuYW1lIG9yIHNwYWNlIHNlcGFyYXRlZCBsaXN0IG9mIGV2ZW50cyB0byBiaW5kLlxuICAgKiBAcGFyYW0ge2NhbGxiYWNrfSBjYWxsYmFjayBDYWxsYmFjayB0byBiZSBleGVjdXRlZCB3aGVuIHRoZSBldmVudCBvY2N1cnMuXG4gICAqIEBwYXJhbSB7Qm9vbGVhbn0gcHJlcGVuZCBPcHRpb25hbCBmbGFnIGlmIHRoZSBldmVudCBzaG91bGQgYmUgcHJlcGVuZGVkLiBVc2UgdGhpcyB3aXRoIGNhcmUuXG4gICAqIEByZXR1cm4ge09iamVjdH0gQ3VycmVudCBjbGFzcyBpbnN0YW5jZS5cbiAgICogQGV4YW1wbGVcbiAgICogaW5zdGFuY2Uub25jZSgnZXZlbnQnLCBmdW5jdGlvbihlKSB7XG4gICAqICAgICAvLyBDYWxsYmFjayBsb2dpY1xuICAgKiB9KTtcbiAgICovXG4gIHB1YmxpYyBvbmNlIDxLIGV4dGVuZHMga2V5b2YgVD4obmFtZTogSywgY2FsbGJhY2s6IChldmVudDogRWRpdG9yRXZlbnQ8VFtLXT4pID0+IHZvaWQsIHByZXBlbmQ/OiBib29sZWFuKTogdGhpcztcbiAgcHVibGljIG9uY2UgPFUgPSBhbnk+KG5hbWU6IHN0cmluZywgY2FsbGJhY2s6IChldmVudDogRWRpdG9yRXZlbnQ8VT4pID0+IHZvaWQsIHByZXBlbmQ/OiBib29sZWFuKTogdGhpcztcbiAgcHVibGljIG9uY2UgKG5hbWU6IHN0cmluZywgY2FsbGJhY2s6IChldmVudDogRWRpdG9yRXZlbnQ8YW55PikgPT4gdm9pZCwgcHJlcGVuZD86IGJvb2xlYW4pOiB0aGlzIHtcbiAgICByZXR1cm4gdGhpcy5vbihuYW1lLCBjYWxsYmFjaywgcHJlcGVuZCwgeyBvbmNlOiB0cnVlIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdHJ1ZS9mYWxzZSBpZiB0aGUgZGlzcGF0Y2hlciBoYXMgYSBldmVudCBvZiB0aGUgc3BlY2lmaWVkIG5hbWUuXG4gICAqXG4gICAqIEBtZXRob2QgaGFzXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBuYW1lIE5hbWUgb2YgdGhlIGV2ZW50IHRvIGNoZWNrIGZvci5cbiAgICogQHJldHVybiB7Qm9vbGVhbn0gdHJ1ZS9mYWxzZSBpZiB0aGUgZXZlbnQgZXhpc3RzIG9yIG5vdC5cbiAgICovXG4gIHB1YmxpYyBoYXMgKG5hbWU6IHN0cmluZyk6IGJvb2xlYW4ge1xuICAgIG5hbWUgPSBuYW1lLnRvTG93ZXJDYXNlKCk7XG4gICAgcmV0dXJuICEoIXRoaXMuYmluZGluZ3NbbmFtZV0gfHwgdGhpcy5iaW5kaW5nc1tuYW1lXS5sZW5ndGggPT09IDApO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IEV2ZW50RGlzcGF0Y2hlcjsiXX0=