/**
 * Copyright (c) Tiny Technologies, Inc. All rights reserved.
 * Licensed under the LGPL or a commercial license.
 * For LGPL see License.txt in the project root for license information.
 * For commercial licenses see https://www.tiny.cloud/
 */
import EventDispatcher from './EventDispatcher';
/**
 * This mixin will add event binding logic to classes.
 *
 * @mixin tinymce.util.Observable
 */
var getEventDispatcher = function (obj) {
    if (!obj._eventDispatcher) {
        obj._eventDispatcher = new EventDispatcher({
            scope: obj,
            toggleEvent: function (name, state) {
                if (EventDispatcher.isNative(name) && obj.toggleNativeEvent) {
                    obj.toggleNativeEvent(name, state);
                }
            }
        });
    }
    return obj._eventDispatcher;
};
var ɵ0 = getEventDispatcher;
var Observable = {
    /**
     * Fires the specified event by name. Consult the
     * <a href="/docs/advanced/events">event reference</a> for more details on each event.
     *
     * @method fire
     * @param {String} name Name of the event to fire.
     * @param {Object?} args Event arguments.
     * @param {Boolean?} bubble True/false if the event is to be bubbled.
     * @return {Object} Event args instance passed in.
     * @example
     * instance.fire('event', {...});
     */
    fire: function (name, args, bubble) {
        var self = this;
        // Prevent all events except the remove/detach event after the instance has been removed
        if (self.removed && name !== 'remove' && name !== 'detach') {
            // TODO should we be patching the EventArgs here like EventDispatcher?
            return args;
        }
        var dispatcherArgs = getEventDispatcher(self).fire(name, args);
        // Bubble event up to parents
        if (bubble !== false && self.parent) {
            var parent_1 = self.parent();
            while (parent_1 && !dispatcherArgs.isPropagationStopped()) {
                parent_1.fire(name, dispatcherArgs, false);
                parent_1 = parent_1.parent();
            }
        }
        return dispatcherArgs;
    },
    /**
     * Binds an event listener to a specific event by name. Consult the
     * <a href="/docs/advanced/events">event reference</a> for more details on each event.
     *
     * @method on
     * @param {String} name Event name or space separated list of events to bind.
     * @param {callback} callback Callback to be executed when the event occurs.
     * @param {Boolean} prepend Optional flag if the event should be prepended. Use this with care.
     * @return {Object} Current class instance.
     * @example
     * instance.on('event', function(e) {
     *     // Callback logic
     * });
     */
    on: function (name, callback, prepend) {
        return getEventDispatcher(this).on(name, callback, prepend);
    },
    /**
     * Unbinds an event listener to a specific event by name. Consult the
     * <a href="/docs/advanced/events">event reference</a> for more details on each event.
     *
     * @method off
     * @param {String?} name Name of the event to unbind.
     * @param {callback?} callback Callback to unbind.
     * @return {Object} Current class instance.
     * @example
     * // Unbind specific callback
     * instance.off('event', handler);
     *
     * // Unbind all listeners by name
     * instance.off('event');
     *
     * // Unbind all events
     * instance.off();
     */
    off: function (name, callback) {
        return getEventDispatcher(this).off(name, callback);
    },
    /**
     * Bind the event callback and once it fires the callback is removed. Consult the
     * <a href="/docs/advanced/events">event reference</a> for more details on each event.
     *
     * @method once
     * @param {String} name Name of the event to bind.
     * @param {callback} callback Callback to bind only once.
     * @return {Object} Current class instance.
     */
    once: function (name, callback) {
        return getEventDispatcher(this).once(name, callback);
    },
    /**
     * Returns true/false if the object has a event of the specified name.
     *
     * @method hasEventListeners
     * @param {String} name Name of the event to check for.
     * @return {Boolean} true/false if the event exists or not.
     */
    hasEventListeners: function (name) {
        return getEventDispatcher(this).has(name);
    }
};
export default Observable;
export { ɵ0 };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiT2JzZXJ2YWJsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Bwb2xwd2FyZS90aW55bWNlLXV0aWwvIiwic291cmNlcyI6WyJsaWIvYXBpL3V0aWwvT2JzZXJ2YWJsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7R0FLRztBQUVILE9BQU8sZUFBZ0QsTUFBTSxtQkFBbUIsQ0FBQztBQWNqRjs7OztHQUlHO0FBRUgsSUFBTSxrQkFBa0IsR0FBRyxVQUFVLEdBQUc7SUFDdEMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsRUFBRTtRQUN6QixHQUFHLENBQUMsZ0JBQWdCLEdBQUcsSUFBSSxlQUFlLENBQUM7WUFDekMsS0FBSyxFQUFFLEdBQUc7WUFDVixXQUFXLFlBQUUsSUFBSSxFQUFFLEtBQUs7Z0JBQ3RCLElBQUksZUFBZSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxHQUFHLENBQUMsaUJBQWlCLEVBQUU7b0JBQzNELEdBQUcsQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDLENBQUM7aUJBQ3BDO1lBQ0gsQ0FBQztTQUNGLENBQUMsQ0FBQztLQUNKO0lBRUQsT0FBTyxHQUFHLENBQUMsZ0JBQWdCLENBQUM7QUFDOUIsQ0FBQyxDQUFDOztBQUVGLElBQU0sVUFBVSxHQUFvQjtJQUNsQzs7Ozs7Ozs7Ozs7T0FXRztJQUNILElBQUksRUFBSixVQUFNLElBQUksRUFBRSxJQUFLLEVBQUUsTUFBTztRQUN4QixJQUFNLElBQUksR0FBRyxJQUFJLENBQUM7UUFFbEIsd0ZBQXdGO1FBQ3hGLElBQUksSUFBSSxDQUFDLE9BQU8sSUFBSSxJQUFJLEtBQUssUUFBUSxJQUFJLElBQUksS0FBSyxRQUFRLEVBQUU7WUFDMUQsc0VBQXNFO1lBQ3RFLE9BQU8sSUFBVyxDQUFDO1NBQ3BCO1FBRUQsSUFBTSxjQUFjLEdBQUcsa0JBQWtCLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztRQUVqRSw2QkFBNkI7UUFDN0IsSUFBSSxNQUFNLEtBQUssS0FBSyxJQUFJLElBQUksQ0FBQyxNQUFNLEVBQUU7WUFDbkMsSUFBSSxRQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO1lBQzNCLE9BQU8sUUFBTSxJQUFJLENBQUMsY0FBYyxDQUFDLG9CQUFvQixFQUFFLEVBQUU7Z0JBQ3ZELFFBQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLGNBQWMsRUFBRSxLQUFLLENBQUMsQ0FBQztnQkFDekMsUUFBTSxHQUFHLFFBQU0sQ0FBQyxNQUFNLEVBQUUsQ0FBQzthQUMxQjtTQUNGO1FBRUQsT0FBTyxjQUFjLENBQUM7SUFDeEIsQ0FBQztJQUVEOzs7Ozs7Ozs7Ozs7O09BYUc7SUFDSCxFQUFFLEVBQUYsVUFBSSxJQUFJLEVBQUUsUUFBUSxFQUFFLE9BQVE7UUFDMUIsT0FBTyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsSUFBSSxFQUFFLFFBQVEsRUFBRSxPQUFPLENBQUMsQ0FBQztJQUM5RCxDQUFDO0lBRUQ7Ozs7Ozs7Ozs7Ozs7Ozs7O09BaUJHO0lBQ0gsR0FBRyxFQUFILFVBQUssSUFBSyxFQUFFLFFBQVM7UUFDbkIsT0FBTyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLFFBQVEsQ0FBQyxDQUFDO0lBQ3RELENBQUM7SUFFRDs7Ozs7Ozs7T0FRRztJQUNILElBQUksWUFBRSxJQUFJLEVBQUUsUUFBUTtRQUNsQixPQUFPLGtCQUFrQixDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsUUFBUSxDQUFDLENBQUM7SUFDdkQsQ0FBQztJQUVEOzs7Ozs7T0FNRztJQUNILGlCQUFpQixZQUFFLElBQUk7UUFDckIsT0FBTyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDNUMsQ0FBQztDQUNGLENBQUM7QUFFRixlQUFlLFVBQVUsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQ29weXJpZ2h0IChjKSBUaW55IFRlY2hub2xvZ2llcywgSW5jLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICogTGljZW5zZWQgdW5kZXIgdGhlIExHUEwgb3IgYSBjb21tZXJjaWFsIGxpY2Vuc2UuXG4gKiBGb3IgTEdQTCBzZWUgTGljZW5zZS50eHQgaW4gdGhlIHByb2plY3Qgcm9vdCBmb3IgbGljZW5zZSBpbmZvcm1hdGlvbi5cbiAqIEZvciBjb21tZXJjaWFsIGxpY2Vuc2VzIHNlZSBodHRwczovL3d3dy50aW55LmNsb3VkL1xuICovXG5cbmltcG9ydCBFdmVudERpc3BhdGNoZXIsIHsgRWRpdG9yRXZlbnQsIE5hdGl2ZUV2ZW50TWFwIH0gZnJvbSAnLi9FdmVudERpc3BhdGNoZXInO1xuXG5pbnRlcmZhY2UgT2JzZXJ2YWJsZTxUIGV4dGVuZHMgTmF0aXZlRXZlbnRNYXA+IHtcbiAgZmlyZSA8SyBleHRlbmRzIGtleW9mIFQ+KG5hbWU6IEssIGFyZ3M/OiBUW0tdLCBidWJibGU/OiBib29sZWFuKTogRWRpdG9yRXZlbnQ8VFtLXT47XG4gIGZpcmUgPFUgPSBhbnk+KG5hbWU6IHN0cmluZywgYXJncz86IFUsIGJ1YmJsZT86IGJvb2xlYW4pOiBFZGl0b3JFdmVudDxVPjtcbiAgb24gPEsgZXh0ZW5kcyBrZXlvZiBUPihuYW1lOiBLLCBjYWxsYmFjazogKGV2ZW50OiBFZGl0b3JFdmVudDxUW0tdPikgPT4gdm9pZCwgcHJlcGVuZD86IGJvb2xlYW4pOiBFdmVudERpc3BhdGNoZXI8VD47XG4gIG9uIDxVID0gYW55PihuYW1lOiBzdHJpbmcsIGNhbGxiYWNrOiAoZXZlbnQ6IEVkaXRvckV2ZW50PFU+KSA9PiB2b2lkLCBwcmVwZW5kPzogYm9vbGVhbik6IEV2ZW50RGlzcGF0Y2hlcjxUPjtcbiAgb2ZmIDxLIGV4dGVuZHMga2V5b2YgVD4obmFtZT86IEssIGNhbGxiYWNrPzogKGV2ZW50OiBFZGl0b3JFdmVudDxUW0tdPikgPT4gdm9pZCk6IEV2ZW50RGlzcGF0Y2hlcjxUPjtcbiAgb2ZmIDxVID0gYW55PihuYW1lPzogc3RyaW5nLCBjYWxsYmFjaz86IChldmVudDogRWRpdG9yRXZlbnQ8VT4pID0+IHZvaWQpOiBFdmVudERpc3BhdGNoZXI8VD47XG4gIG9uY2UgPEsgZXh0ZW5kcyBrZXlvZiBUPihuYW1lOiBLLCAgY2FsbGJhY2s6IChldmVudDogRWRpdG9yRXZlbnQ8VFtLXT4pID0+IHZvaWQpOiBFdmVudERpc3BhdGNoZXI8VD47XG4gIG9uY2UgPFUgPSBhbnk+KG5hbWU6IHN0cmluZywgY2FsbGJhY2s6IChldmVudDogRWRpdG9yRXZlbnQ8VT4pID0+IHZvaWQpOiBFdmVudERpc3BhdGNoZXI8VD47XG4gIGhhc0V2ZW50TGlzdGVuZXJzIChuYW1lOiBzdHJpbmcpOiBib29sZWFuO1xufVxuXG4vKipcbiAqIFRoaXMgbWl4aW4gd2lsbCBhZGQgZXZlbnQgYmluZGluZyBsb2dpYyB0byBjbGFzc2VzLlxuICpcbiAqIEBtaXhpbiB0aW55bWNlLnV0aWwuT2JzZXJ2YWJsZVxuICovXG5cbmNvbnN0IGdldEV2ZW50RGlzcGF0Y2hlciA9IGZ1bmN0aW9uIChvYmopOiBFdmVudERpc3BhdGNoZXI8YW55PiB7XG4gIGlmICghb2JqLl9ldmVudERpc3BhdGNoZXIpIHtcbiAgICBvYmouX2V2ZW50RGlzcGF0Y2hlciA9IG5ldyBFdmVudERpc3BhdGNoZXIoe1xuICAgICAgc2NvcGU6IG9iaixcbiAgICAgIHRvZ2dsZUV2ZW50IChuYW1lLCBzdGF0ZSkge1xuICAgICAgICBpZiAoRXZlbnREaXNwYXRjaGVyLmlzTmF0aXZlKG5hbWUpICYmIG9iai50b2dnbGVOYXRpdmVFdmVudCkge1xuICAgICAgICAgIG9iai50b2dnbGVOYXRpdmVFdmVudChuYW1lLCBzdGF0ZSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIHJldHVybiBvYmouX2V2ZW50RGlzcGF0Y2hlcjtcbn07XG5cbmNvbnN0IE9ic2VydmFibGU6IE9ic2VydmFibGU8YW55PiA9IHtcbiAgLyoqXG4gICAqIEZpcmVzIHRoZSBzcGVjaWZpZWQgZXZlbnQgYnkgbmFtZS4gQ29uc3VsdCB0aGVcbiAgICogPGEgaHJlZj1cIi9kb2NzL2FkdmFuY2VkL2V2ZW50c1wiPmV2ZW50IHJlZmVyZW5jZTwvYT4gZm9yIG1vcmUgZGV0YWlscyBvbiBlYWNoIGV2ZW50LlxuICAgKlxuICAgKiBAbWV0aG9kIGZpcmVcbiAgICogQHBhcmFtIHtTdHJpbmd9IG5hbWUgTmFtZSBvZiB0aGUgZXZlbnQgdG8gZmlyZS5cbiAgICogQHBhcmFtIHtPYmplY3Q/fSBhcmdzIEV2ZW50IGFyZ3VtZW50cy5cbiAgICogQHBhcmFtIHtCb29sZWFuP30gYnViYmxlIFRydWUvZmFsc2UgaWYgdGhlIGV2ZW50IGlzIHRvIGJlIGJ1YmJsZWQuXG4gICAqIEByZXR1cm4ge09iamVjdH0gRXZlbnQgYXJncyBpbnN0YW5jZSBwYXNzZWQgaW4uXG4gICAqIEBleGFtcGxlXG4gICAqIGluc3RhbmNlLmZpcmUoJ2V2ZW50Jywgey4uLn0pO1xuICAgKi9cbiAgZmlyZSAobmFtZSwgYXJncz8sIGJ1YmJsZT8pIHtcbiAgICBjb25zdCBzZWxmID0gdGhpcztcblxuICAgIC8vIFByZXZlbnQgYWxsIGV2ZW50cyBleGNlcHQgdGhlIHJlbW92ZS9kZXRhY2ggZXZlbnQgYWZ0ZXIgdGhlIGluc3RhbmNlIGhhcyBiZWVuIHJlbW92ZWRcbiAgICBpZiAoc2VsZi5yZW1vdmVkICYmIG5hbWUgIT09ICdyZW1vdmUnICYmIG5hbWUgIT09ICdkZXRhY2gnKSB7XG4gICAgICAvLyBUT0RPIHNob3VsZCB3ZSBiZSBwYXRjaGluZyB0aGUgRXZlbnRBcmdzIGhlcmUgbGlrZSBFdmVudERpc3BhdGNoZXI/XG4gICAgICByZXR1cm4gYXJncyBhcyBhbnk7XG4gICAgfVxuXG4gICAgY29uc3QgZGlzcGF0Y2hlckFyZ3MgPSBnZXRFdmVudERpc3BhdGNoZXIoc2VsZikuZmlyZShuYW1lLCBhcmdzKTtcblxuICAgIC8vIEJ1YmJsZSBldmVudCB1cCB0byBwYXJlbnRzXG4gICAgaWYgKGJ1YmJsZSAhPT0gZmFsc2UgJiYgc2VsZi5wYXJlbnQpIHtcbiAgICAgIGxldCBwYXJlbnQgPSBzZWxmLnBhcmVudCgpO1xuICAgICAgd2hpbGUgKHBhcmVudCAmJiAhZGlzcGF0Y2hlckFyZ3MuaXNQcm9wYWdhdGlvblN0b3BwZWQoKSkge1xuICAgICAgICBwYXJlbnQuZmlyZShuYW1lLCBkaXNwYXRjaGVyQXJncywgZmFsc2UpO1xuICAgICAgICBwYXJlbnQgPSBwYXJlbnQucGFyZW50KCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGRpc3BhdGNoZXJBcmdzO1xuICB9LFxuXG4gIC8qKlxuICAgKiBCaW5kcyBhbiBldmVudCBsaXN0ZW5lciB0byBhIHNwZWNpZmljIGV2ZW50IGJ5IG5hbWUuIENvbnN1bHQgdGhlXG4gICAqIDxhIGhyZWY9XCIvZG9jcy9hZHZhbmNlZC9ldmVudHNcIj5ldmVudCByZWZlcmVuY2U8L2E+IGZvciBtb3JlIGRldGFpbHMgb24gZWFjaCBldmVudC5cbiAgICpcbiAgICogQG1ldGhvZCBvblxuICAgKiBAcGFyYW0ge1N0cmluZ30gbmFtZSBFdmVudCBuYW1lIG9yIHNwYWNlIHNlcGFyYXRlZCBsaXN0IG9mIGV2ZW50cyB0byBiaW5kLlxuICAgKiBAcGFyYW0ge2NhbGxiYWNrfSBjYWxsYmFjayBDYWxsYmFjayB0byBiZSBleGVjdXRlZCB3aGVuIHRoZSBldmVudCBvY2N1cnMuXG4gICAqIEBwYXJhbSB7Qm9vbGVhbn0gcHJlcGVuZCBPcHRpb25hbCBmbGFnIGlmIHRoZSBldmVudCBzaG91bGQgYmUgcHJlcGVuZGVkLiBVc2UgdGhpcyB3aXRoIGNhcmUuXG4gICAqIEByZXR1cm4ge09iamVjdH0gQ3VycmVudCBjbGFzcyBpbnN0YW5jZS5cbiAgICogQGV4YW1wbGVcbiAgICogaW5zdGFuY2Uub24oJ2V2ZW50JywgZnVuY3Rpb24oZSkge1xuICAgKiAgICAgLy8gQ2FsbGJhY2sgbG9naWNcbiAgICogfSk7XG4gICAqL1xuICBvbiAobmFtZSwgY2FsbGJhY2ssIHByZXBlbmQ/KSB7XG4gICAgcmV0dXJuIGdldEV2ZW50RGlzcGF0Y2hlcih0aGlzKS5vbihuYW1lLCBjYWxsYmFjaywgcHJlcGVuZCk7XG4gIH0sXG5cbiAgLyoqXG4gICAqIFVuYmluZHMgYW4gZXZlbnQgbGlzdGVuZXIgdG8gYSBzcGVjaWZpYyBldmVudCBieSBuYW1lLiBDb25zdWx0IHRoZVxuICAgKiA8YSBocmVmPVwiL2RvY3MvYWR2YW5jZWQvZXZlbnRzXCI+ZXZlbnQgcmVmZXJlbmNlPC9hPiBmb3IgbW9yZSBkZXRhaWxzIG9uIGVhY2ggZXZlbnQuXG4gICAqXG4gICAqIEBtZXRob2Qgb2ZmXG4gICAqIEBwYXJhbSB7U3RyaW5nP30gbmFtZSBOYW1lIG9mIHRoZSBldmVudCB0byB1bmJpbmQuXG4gICAqIEBwYXJhbSB7Y2FsbGJhY2s/fSBjYWxsYmFjayBDYWxsYmFjayB0byB1bmJpbmQuXG4gICAqIEByZXR1cm4ge09iamVjdH0gQ3VycmVudCBjbGFzcyBpbnN0YW5jZS5cbiAgICogQGV4YW1wbGVcbiAgICogLy8gVW5iaW5kIHNwZWNpZmljIGNhbGxiYWNrXG4gICAqIGluc3RhbmNlLm9mZignZXZlbnQnLCBoYW5kbGVyKTtcbiAgICpcbiAgICogLy8gVW5iaW5kIGFsbCBsaXN0ZW5lcnMgYnkgbmFtZVxuICAgKiBpbnN0YW5jZS5vZmYoJ2V2ZW50Jyk7XG4gICAqXG4gICAqIC8vIFVuYmluZCBhbGwgZXZlbnRzXG4gICAqIGluc3RhbmNlLm9mZigpO1xuICAgKi9cbiAgb2ZmIChuYW1lPywgY2FsbGJhY2s/KSB7XG4gICAgcmV0dXJuIGdldEV2ZW50RGlzcGF0Y2hlcih0aGlzKS5vZmYobmFtZSwgY2FsbGJhY2spO1xuICB9LFxuXG4gIC8qKlxuICAgKiBCaW5kIHRoZSBldmVudCBjYWxsYmFjayBhbmQgb25jZSBpdCBmaXJlcyB0aGUgY2FsbGJhY2sgaXMgcmVtb3ZlZC4gQ29uc3VsdCB0aGVcbiAgICogPGEgaHJlZj1cIi9kb2NzL2FkdmFuY2VkL2V2ZW50c1wiPmV2ZW50IHJlZmVyZW5jZTwvYT4gZm9yIG1vcmUgZGV0YWlscyBvbiBlYWNoIGV2ZW50LlxuICAgKlxuICAgKiBAbWV0aG9kIG9uY2VcbiAgICogQHBhcmFtIHtTdHJpbmd9IG5hbWUgTmFtZSBvZiB0aGUgZXZlbnQgdG8gYmluZC5cbiAgICogQHBhcmFtIHtjYWxsYmFja30gY2FsbGJhY2sgQ2FsbGJhY2sgdG8gYmluZCBvbmx5IG9uY2UuXG4gICAqIEByZXR1cm4ge09iamVjdH0gQ3VycmVudCBjbGFzcyBpbnN0YW5jZS5cbiAgICovXG4gIG9uY2UgKG5hbWUsIGNhbGxiYWNrKSB7XG4gICAgcmV0dXJuIGdldEV2ZW50RGlzcGF0Y2hlcih0aGlzKS5vbmNlKG5hbWUsIGNhbGxiYWNrKTtcbiAgfSxcblxuICAvKipcbiAgICogUmV0dXJucyB0cnVlL2ZhbHNlIGlmIHRoZSBvYmplY3QgaGFzIGEgZXZlbnQgb2YgdGhlIHNwZWNpZmllZCBuYW1lLlxuICAgKlxuICAgKiBAbWV0aG9kIGhhc0V2ZW50TGlzdGVuZXJzXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBuYW1lIE5hbWUgb2YgdGhlIGV2ZW50IHRvIGNoZWNrIGZvci5cbiAgICogQHJldHVybiB7Qm9vbGVhbn0gdHJ1ZS9mYWxzZSBpZiB0aGUgZXZlbnQgZXhpc3RzIG9yIG5vdC5cbiAgICovXG4gIGhhc0V2ZW50TGlzdGVuZXJzIChuYW1lKSB7XG4gICAgcmV0dXJuIGdldEV2ZW50RGlzcGF0Y2hlcih0aGlzKS5oYXMobmFtZSk7XG4gIH1cbn07XG5cbmV4cG9ydCBkZWZhdWx0IE9ic2VydmFibGU7Il19