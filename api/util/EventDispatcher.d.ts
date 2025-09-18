import * as EventUtils from '../../events/EventUtils';
export type MappedEvent<T extends {}, K extends string> = K extends keyof T ? T[K] : any;
export interface NativeEventMap {
    beforepaste: Event;
    blur: FocusEvent;
    beforeinput: InputEvent;
    click: MouseEvent;
    compositionend: Event;
    compositionstart: Event;
    compositionupdate: Event;
    contextmenu: PointerEvent;
    copy: ClipboardEvent;
    cut: ClipboardEvent;
    dblclick: MouseEvent;
    drag: DragEvent;
    dragdrop: DragEvent;
    dragend: DragEvent;
    draggesture: DragEvent;
    dragover: DragEvent;
    dragstart: DragEvent;
    drop: DragEvent;
    focus: FocusEvent;
    focusin: FocusEvent;
    focusout: FocusEvent;
    input: InputEvent;
    keydown: KeyboardEvent;
    keypress: KeyboardEvent;
    keyup: KeyboardEvent;
    mousedown: MouseEvent;
    mouseenter: MouseEvent;
    mouseleave: MouseEvent;
    mousemove: MouseEvent;
    mouseout: MouseEvent;
    mouseover: MouseEvent;
    mouseup: MouseEvent;
    paste: ClipboardEvent;
    selectionchange: Event;
    submit: Event;
    touchend: TouchEvent;
    touchmove: TouchEvent;
    touchstart: TouchEvent;
    touchcancel: TouchEvent;
    wheel: WheelEvent;
}
export type EditorEvent<T> = EventUtils.NormalizedEvent<T>;
export interface EventDispatcherSettings {
    scope?: any;
    toggleEvent?: (name: string, state: boolean) => void | boolean;
    beforeFire?: <T>(args: EditorEvent<T>) => void;
}
export interface EventDispatcherConstructor<T extends {}> {
    readonly prototype: EventDispatcher<T>;
    new (settings?: EventDispatcherSettings): EventDispatcher<T>;
    isNative: (name: string) => boolean;
}
declare class EventDispatcher<T extends {}> {
    /**
     * Returns true/false if the specified event name is a native browser event or not.
     *
     * @method isNative
     * @param {String} name Name to check if it's native.
     * @return {Boolean} true/false if the event is native or not.
     * @static
     */
    static isNative(name: string): boolean;
    private readonly settings;
    private readonly scope;
    private readonly toggleEvent;
    private bindings;
    constructor(settings?: EventDispatcherSettings);
    /**
     * Fires the specified event by name.
     * <br>
     * <em>Marked for removal in TinyMCE 8.0. Use <code>dispatch</code> instead.</em>
     *
     * @method fire
     * @param {String} name Name of the event to fire.
     * @param {Object?} args Event arguments.
     * @return {Object} Event args instance passed in.
     * @deprecated Use dispatch() instead
     * @example
     * instance.fire('event', {...});
     */
    fire<K extends string, U extends MappedEvent<T, K>>(name: K, args?: U): EditorEvent<U>;
    /**
     * Dispatches the specified event by name.
     *
     * @method dispatch
     * @param {String} name Name of the event to dispatch
     * @param {Object?} args Event arguments.
     * @return {Object} Event args instance passed in.
     * @example
     * instance.dispatch('event', {...});
     */
    dispatch<K extends string, U extends MappedEvent<T, K>>(name: K, args?: U): EditorEvent<U>;
    /**
     * Binds an event listener to a specific event by name.
     *
     * @method on
     * @param {String} name Event name or space separated list of events to bind.
     * @param {Function} callback Callback to be executed when the event occurs.
     * @param {Boolean} prepend Optional flag if the event should be prepended. Use this with care.
     * @return {Object} Current class instance.
     * @example
     * instance.on('event', (e) => {
     *   // Callback logic
     * });
     */
    on<K extends string>(name: K, callback: false | ((event: EditorEvent<MappedEvent<T, K>>) => void | boolean), prepend?: boolean, extra?: {}): this;
    /**
     * Unbinds an event listener to a specific event by name.
     *
     * @method off
     * @param {String?} name Name of the event to unbind.
     * @param {Function?} callback Callback to unbind.
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
    off<K extends string>(name?: K, callback?: (event: EditorEvent<MappedEvent<T, K>>) => void): this;
    /**
     * Binds an event listener to a specific event by name
     * and automatically unbind the event once the callback fires.
     *
     * @method once
     * @param {String} name Event name or space separated list of events to bind.
     * @param {Function} callback Callback to be executed when the event occurs.
     * @param {Boolean} prepend Optional flag if the event should be prepended. Use this with care.
     * @return {Object} Current class instance.
     * @example
     * instance.once('event', (e) => {
     *   // Callback logic
     * });
     */
    once<K extends string>(name: K, callback: (event: EditorEvent<MappedEvent<T, K>>) => void, prepend?: boolean): this;
    /**
     * Returns true/false if the dispatcher has a event of the specified name.
     *
     * @method has
     * @param {String} name Name of the event to check for.
     * @return {Boolean} true/false if the event exists or not.
     */
    has(name: string): boolean;
}
export default EventDispatcher;
//# sourceMappingURL=EventDispatcher.d.ts.map