/**
 * Copyright (c) Tiny Technologies, Inc. All rights reserved.
 * Licensed under the LGPL or a commercial license.
 * For LGPL see License.txt in the project root for license information.
 * For commercial licenses see https://www.tiny.cloud/
 */
import EventDispatcher, { EditorEvent, NativeEventMap } from './EventDispatcher';
interface Observable<T extends NativeEventMap> {
    fire<K extends keyof T>(name: K, args?: T[K], bubble?: boolean): EditorEvent<T[K]>;
    fire<U = any>(name: string, args?: U, bubble?: boolean): EditorEvent<U>;
    on<K extends keyof T>(name: K, callback: (event: EditorEvent<T[K]>) => void, prepend?: boolean): EventDispatcher<T>;
    on<U = any>(name: string, callback: (event: EditorEvent<U>) => void, prepend?: boolean): EventDispatcher<T>;
    off<K extends keyof T>(name?: K, callback?: (event: EditorEvent<T[K]>) => void): EventDispatcher<T>;
    off<U = any>(name?: string, callback?: (event: EditorEvent<U>) => void): EventDispatcher<T>;
    once<K extends keyof T>(name: K, callback: (event: EditorEvent<T[K]>) => void): EventDispatcher<T>;
    once<U = any>(name: string, callback: (event: EditorEvent<U>) => void): EventDispatcher<T>;
    hasEventListeners(name: string): boolean;
}
declare const Observable: Observable<any>;
export default Observable;
