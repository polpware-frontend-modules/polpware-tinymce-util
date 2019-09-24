/**
 * Copyright (c) Tiny Technologies, Inc. All rights reserved.
 * Licensed under the LGPL or a commercial license.
 * For LGPL see License.txt in the project root for license information.
 * For commercial licenses see https://www.tiny.cloud/
 */
export declare const create: () => {
    getItem(key: any): any;
    setItem(key: any, value: any): void;
    key(index: any): any;
    removeItem(key: any): void;
    clear(): void;
    length: number;
};
