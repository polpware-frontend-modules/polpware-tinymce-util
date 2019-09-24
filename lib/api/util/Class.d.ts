/**
 * Copyright (c) Tiny Technologies, Inc. All rights reserved.
 * Licensed under the LGPL or a commercial license.
 * For LGPL see License.txt in the project root for license information.
 * For commercial licenses see https://www.tiny.cloud/
 */
interface Prop {
    Mixins?: any;
    Methods?: any;
    Properties?: any;
    Statics?: any;
    Defaults?: any;
}
interface Class {
    prototype: Class;
    extend(prop: Prop): ExtendedClass;
}
export interface ExtendedClass extends Class {
    constructor: ExtendedClass;
    init?(...args: any[]): void;
    [key: string]: any;
}
declare const Class: Class;
export default Class;
