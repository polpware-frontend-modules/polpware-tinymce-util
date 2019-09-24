/**
 * Copyright (c) Tiny Technologies, Inc. All rights reserved.
 * Licensed under the LGPL or a commercial license.
 * For LGPL see License.txt in the project root for license information.
 * For commercial licenses see https://www.tiny.cloud/
 */
import { ClipboardEvent, DataTransfer, DragEvent, Event, FocusEvent, KeyboardEvent, MouseEvent, PointerEvent, TouchEvent, WheelEvent } from '@ephox/dom-globals';
export interface InputEvent extends Event {
    readonly data: string;
    readonly dataTransfer: DataTransfer;
    readonly inputType: string;
    readonly isComposing: boolean;
}
export interface NativeEventMap {
    'beforepaste': Event;
    'blur': FocusEvent;
    'beforeinput': InputEvent;
    'click': MouseEvent;
    'compositionend': Event;
    'compositionstart': Event;
    'compositionupdate': Event;
    'contextmenu': PointerEvent;
    'copy': ClipboardEvent;
    'cut': ClipboardEvent;
    'dblclick': MouseEvent;
    'drag': DragEvent;
    'dragdrop': DragEvent;
    'dragend': DragEvent;
    'draggesture': DragEvent;
    'dragover': DragEvent;
    'dragstart': DragEvent;
    'drop': DragEvent;
    'focus': FocusEvent;
    'focusin': FocusEvent;
    'focusout': FocusEvent;
    'input': InputEvent;
    'keydown': KeyboardEvent;
    'keypress': KeyboardEvent;
    'keyup': KeyboardEvent;
    'mousedown': MouseEvent;
    'mouseenter': MouseEvent;
    'mouseleave': MouseEvent;
    'mousemove': MouseEvent;
    'mouseout': MouseEvent;
    'mouseover': MouseEvent;
    'mouseup': MouseEvent;
    'paste': ClipboardEvent;
    'selectionchange': Event;
    'submit': Event;
    'touchend': TouchEvent;
    'touchmove': TouchEvent;
    'touchstart': TouchEvent;
    'wheel': WheelEvent;
}
export declare type EditorEvent<T> = T & {
    target: any;
    type: string;
    preventDefault(): void;
    isDefaultPrevented(): boolean;
    stopPropagation(): void;
    isPropagationStopped(): boolean;
    stopImmediatePropagation(): void;
    isImmediatePropagationStopped(): boolean;
};
export interface EventDispatcherSettings {
    scope?: {};
    toggleEvent?: (name: string, state: boolean) => void | boolean;
    beforeFire?: <T>(args: EditorEvent<T>) => void;
}
export interface EventDispatcherConstructor<T extends NativeEventMap> {
    readonly prototype: EventDispatcher<T>;
    new (settings?: EventDispatcherSettings): EventDispatcher<T>;
    isNative(name: string): boolean;
}
declare class EventDispatcher<T extends NativeEventMap> {
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
    constructor(settings?: Record<string, any>);
    /**
     * Fires the specified event by name.
     *
     * @method fire
     * @param {String} name Name of the event to fire.
     * @param {Object?} args Event arguments.
     * @return {Object} Event args instance passed in.
     * @example
     * instance.fire('event', {...});
     */
    fire<K extends keyof T>(name: K, args?: T[K]): EditorEvent<T[K]>;
    fire<U = any>(name: string, args?: U): EditorEvent<U>;
    /**
     * Binds an event listener to a specific event by name.
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
    on<K extends keyof T>(name: K, callback: (event: EditorEvent<T[K]>) => void, prepend?: boolean, extra?: {}): this;
    on<U = any>(name: string, callback: (event: EditorEvent<U>) => void, prepend?: boolean, extra?: {}): this;
    on(name: string, callback: false, prepend?: boolean, extra?: {}): this;
    /**
     * Unbinds an event listener to a specific event by name.
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
    off<K extends keyof T>(name: K, callback: (event: EditorEvent<T[K]>) => void): this;
    off<U = any>(name: string, callback: (event: EditorEvent<U>) => void): this;
    off(name?: string): this;
    /**
     * Binds an event listener to a specific event by name
     * and automatically unbind the event once the callback fires.
     *
     * @method once
     * @param {String} name Event name or space separated list of events to bind.
     * @param {callback} callback Callback to be executed when the event occurs.
     * @param {Boolean} prepend Optional flag if the event should be prepended. Use this with care.
     * @return {Object} Current class instance.
     * @example
     * instance.once('event', function(e) {
     *     // Callback logic
     * });
     */
    once<K extends keyof T>(name: K, callback: (event: EditorEvent<T[K]>) => void, prepend?: boolean): this;
    once<U = any>(name: string, callback: (event: EditorEvent<U>) => void, prepend?: boolean): this;
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
