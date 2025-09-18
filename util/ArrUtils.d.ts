/**
 * Array utility class.
 *
 * @private
 * @class tinymce.util.Arr
 */
export type ArrayCallback<T, R> = (this: any, x: T, i: number, xs: ArrayLike<T>) => R;
export type ObjCallback<T, R> = (this: any, value: T, key: string, obj: Record<string, T>) => R;
declare const isArrayLike: <T>(o: Record<string, T> | ArrayLike<T>) => o is ArrayLike<T>;
declare const isArray: (arg: any) => arg is any[];
declare const toArray: <T>(obj: ArrayLike<T>) => T[];
declare const each: {
    <T>(arr: ArrayLike<T> | null | undefined, cb: ArrayCallback<T, void | boolean>, scope?: any): boolean;
    <T>(obj: Record<string, T> | null | undefined, cb: ObjCallback<T, void | boolean>, scope?: any): boolean;
};
declare const map: {
    <T, R>(arr: ArrayLike<T> | null | undefined, cb: ArrayCallback<T, R>): R[];
    <T, R>(obj: Record<string, T> | null | undefined, cb: ObjCallback<T, R>): R[];
};
declare const filter: {
    <T>(arr: ArrayLike<T> | null | undefined, f?: ArrayCallback<T, boolean>): T[];
    <T>(obj: Record<string, T> | null | undefined, f?: ObjCallback<T, boolean>): T[];
};
declare const indexOf: <T>(a: ArrayLike<T>, v: T) => number;
declare const reduce: {
    <T, R>(collection: ArrayLike<T>, iteratee: (acc: R, item: T, index: number) => R, accumulator: R, thisArg?: any): R;
    <T>(collection: ArrayLike<T>, iteratee: (acc: T, item: T, index: number) => T, accumulator?: undefined, thisArg?: any): T;
};
declare const findIndex: <T>(array: ArrayLike<T>, predicate: ArrayCallback<T, boolean>, thisArg?: any) => number;
declare const find: <T>(array: ArrayLike<T>, predicate: ArrayCallback<T, boolean>, thisArg?: any) => T | undefined;
declare const last: <T>(collection: ArrayLike<T>) => T | undefined;
export { isArrayLike, isArray, toArray, each, map, filter, indexOf, reduce, findIndex, find, last };
//# sourceMappingURL=ArrUtils.d.ts.map