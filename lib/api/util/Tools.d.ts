/**
 * Copyright (c) Tiny Technologies, Inc. All rights reserved.
 * Licensed under the LGPL or a commercial license.
 * For LGPL see License.txt in the project root for license information.
 * For commercial licenses see https://www.tiny.cloud/
 */
declare type ArrayCallback<T, R> = (x: T, i: number, xs: ReadonlyArray<T>) => R;
declare type ObjCallback<T, R> = (value: T[keyof T], key: string, obj: T) => R;
interface Tools {
    is(obj: any, type: string): boolean;
    isArray<T>(T: any): T is ArrayLike<T>;
    inArray<T>(arr: ArrayLike<T>, value: T): number;
    grep<T>(arr: ArrayLike<T>, pred?: ArrayCallback<T, boolean>): any;
    trim(str: string): string;
    toArray<T>(obj: ArrayLike<T>): T[];
    hasOwn(obj: any, name: string): boolean;
    makeMap<T>(items: ArrayLike<T> | string, delim?: string | RegExp, map?: Record<string, T | string>): Record<string, T | string>;
    each<T>(arr: ReadonlyArray<T>, cb: ArrayCallback<T, any>, scope?: any): void;
    each<T>(obj: T, cb: ObjCallback<T, any>, scope?: any): void;
    map<T, U>(arr: ReadonlyArray<T>, cb: ArrayCallback<T, U>, scope?: any): Array<U>;
    map<T, U>(obj: T, cb: ObjCallback<T, U>, scope?: any): Array<U>;
    extend(obj: {}, ext: {}, ...objs: {}[]): any;
    create(name: string, p: {}, root?: {}): any;
    walk<T = {}>(obj: T, f: Function, n?: keyof T, scope?: any): void;
    createNS(name: string, o?: {}): any;
    resolve(path: string, o?: {}): any;
    explode(s: string, d?: string | RegExp): string[];
    _addCacheSuffix(url: string): string;
}
declare const Tools: Tools;
export default Tools;
