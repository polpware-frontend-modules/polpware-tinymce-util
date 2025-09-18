import * as ArrUtils from '../../util/ArrUtils';
type ArrayCallback<T, R> = ArrUtils.ArrayCallback<T, R>;
type ObjCallback<T, R> = ArrUtils.ObjCallback<T, R>;
type WalkCallback<T> = (this: any, o: T, i: string, n: keyof T | undefined) => boolean | void;
interface Tools {
    is: (obj: any, type?: string) => boolean;
    isArray: <T>(arr: any) => arr is Array<T>;
    inArray: <T>(arr: ArrayLike<T>, value: T) => number;
    grep: {
        <T>(arr: ArrayLike<T> | null | undefined, pred?: ArrayCallback<T, boolean>): T[];
        <T>(arr: Record<string, T> | null | undefined, pred?: ObjCallback<T, boolean>): T[];
    };
    trim: (str: string | null | undefined) => string;
    toArray: <T>(obj: ArrayLike<T>) => T[];
    hasOwn: (obj: any, name: string) => boolean;
    makeMap: (items: ArrayLike<string> | string | undefined, delim?: string | RegExp, map?: Record<string, {}>) => Record<string, {}>;
    each: {
        <T>(arr: ArrayLike<T> | null | undefined, cb: ArrayCallback<T, void | boolean>, scope?: any): boolean;
        <T>(obj: Record<string, T> | null | undefined, cb: ObjCallback<T, void | boolean>, scope?: any): boolean;
    };
    map: {
        <T, R>(arr: ArrayLike<T> | null | undefined, cb: ArrayCallback<T, R>): R[];
        <T, R>(obj: Record<string, T> | null | undefined, cb: ObjCallback<T, R>): R[];
    };
    extend: (obj: Object, ext: Object, ...objs: Object[]) => any;
    walk: <T extends Record<string, any>>(obj: T, f: WalkCallback<T>, n?: keyof T, scope?: any) => void;
    resolve: (path: string, o?: Object) => any;
    explode: (s: string | string[], d?: string | RegExp) => string[];
    _addCacheSuffix: (url: string) => string;
}
declare const Tools: Tools;
export default Tools;
//# sourceMappingURL=Tools.d.ts.map