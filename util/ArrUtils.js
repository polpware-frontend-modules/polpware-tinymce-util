import { Obj, Type } from '@ephox/katamari';
const isArrayLike = (o) => o.length !== undefined;
const isArray = Array.isArray;
const toArray = (obj) => {
    if (!isArray(obj)) {
        const array = [];
        for (let i = 0, l = obj.length; i < l; i++) {
            array[i] = obj[i];
        }
        return array;
    }
    else {
        return obj;
    }
};
const each = (o, cb, s) => {
    if (!o) {
        return false;
    }
    s = s || o;
    if (isArrayLike(o)) {
        // Indexed arrays, needed for Safari
        for (let n = 0, l = o.length; n < l; n++) {
            if (cb.call(s, o[n], n, o) === false) {
                return false;
            }
        }
    }
    else {
        // Hashtables
        for (const n in o) {
            if (Obj.has(o, n)) {
                if (cb.call(s, o[n], n, o) === false) {
                    return false;
                }
            }
        }
    }
    return true;
};
const map = (array, callback) => {
    const out = [];
    each(array, (item, index) => {
        out.push(callback(item, index, array));
    });
    return out;
};
const filter = (a, f) => {
    const o = [];
    each(a, (v, index) => {
        if (!f || f(v, index, a)) {
            o.push(v);
        }
    });
    return o;
};
const indexOf = (a, v) => {
    if (a) {
        for (let i = 0, l = a.length; i < l; i++) {
            if (a[i] === v) {
                return i;
            }
        }
    }
    return -1;
};
const reduce = (collection, iteratee, accumulator, thisArg) => {
    let acc = Type.isUndefined(accumulator) ? collection[0] : accumulator;
    for (let i = 0; i < collection.length; i++) {
        acc = iteratee.call(thisArg, acc, collection[i], i);
    }
    return acc;
};
const findIndex = (array, predicate, thisArg) => {
    for (let i = 0, l = array.length; i < l; i++) {
        if (predicate.call(thisArg, array[i], i, array)) {
            return i;
        }
    }
    return -1;
};
const find = (array, predicate, thisArg) => {
    const idx = findIndex(array, predicate, thisArg);
    if (idx !== -1) {
        return array[idx];
    }
    return undefined;
};
const last = (collection) => collection[collection.length - 1];
export { isArrayLike, isArray, toArray, each, map, filter, indexOf, reduce, findIndex, find, last };
//# sourceMappingURL=ArrUtils.js.map