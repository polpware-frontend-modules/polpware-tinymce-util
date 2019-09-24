/**
 * Copyright (c) Tiny Technologies, Inc. All rights reserved.
 * Licensed under the LGPL or a commercial license.
 * For LGPL see License.txt in the project root for license information.
 * For commercial licenses see https://www.tiny.cloud/
 */
declare const _default: {
    isArray: (arg: any) => arg is any[];
    toArray: (obj: any) => any;
    each: (o: any, cb: any, s?: any) => 1 | 0;
    map: (array: any, callback: any) => any[];
    filter: (a: any, f?: any) => any[];
    indexOf: (a: any, v: any) => any;
    reduce: (collection: any, iteratee: any, accumulator?: any, thisArg?: any) => any;
    findIndex: (array: any, predicate: any, thisArg?: any) => any;
    find: (array: any, predicate: any, thisArg?: any) => any;
    last: (collection: any) => any;
};
export default _default;
