/**
 * Copyright (c) Tiny Technologies, Inc. All rights reserved.
 * Licensed under the LGPL or a commercial license.
 * For LGPL see License.txt in the project root for license information.
 * For commercial licenses see https://www.tiny.cloud/
 */
import { HTMLElement } from '@ephox/dom-globals';
declare type DebounceFunc = (...args: any[]) => {
    stop: () => void;
};
interface Delay {
    requestAnimationFrame(callback: () => void, element?: HTMLElement): void;
    setInterval(callback: () => void, time?: number): number;
    setTimeout(callback: () => void, time?: number): number;
    clearInterval(id: number): void;
    clearTimeout(id: number): void;
    debounce(callback: (...args: any[]) => void, time?: number): DebounceFunc;
    throttle(callback: (...args: any[]) => void, time?: number): DebounceFunc;
}
declare const Delay: Delay;
export default Delay;
