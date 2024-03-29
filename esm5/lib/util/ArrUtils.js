/**
 * Copyright (c) Tiny Technologies, Inc. All rights reserved.
 * Licensed under the LGPL or a commercial license.
 * For LGPL see License.txt in the project root for license information.
 * For commercial licenses see https://www.tiny.cloud/
 */
/**
 * Array utility class.
 *
 * @private
 * @class tinymce.util.Arr
 */
var isArray = Array.isArray;
var toArray = function (obj) {
    var array = obj, i, l;
    if (!isArray(obj)) {
        array = [];
        for (i = 0, l = obj.length; i < l; i++) {
            array[i] = obj[i];
        }
    }
    return array;
};
var ɵ0 = toArray;
var each = function (o, cb, s) {
    var n, l;
    if (!o) {
        return 0;
    }
    s = s || o;
    if (o.length !== undefined) {
        // Indexed arrays, needed for Safari
        for (n = 0, l = o.length; n < l; n++) {
            if (cb.call(s, o[n], n, o) === false) {
                return 0;
            }
        }
    }
    else {
        // Hashtables
        for (n in o) {
            if (o.hasOwnProperty(n)) {
                if (cb.call(s, o[n], n, o) === false) {
                    return 0;
                }
            }
        }
    }
    return 1;
};
var ɵ1 = each;
var map = function (array, callback) {
    var out = [];
    each(array, function (item, index) {
        out.push(callback(item, index, array));
    });
    return out;
};
var ɵ2 = map;
var filter = function (a, f) {
    var o = [];
    each(a, function (v, index) {
        if (!f || f(v, index, a)) {
            o.push(v);
        }
    });
    return o;
};
var ɵ3 = filter;
var indexOf = function (a, v) {
    var i, l;
    if (a) {
        for (i = 0, l = a.length; i < l; i++) {
            if (a[i] === v) {
                return i;
            }
        }
    }
    return -1;
};
var ɵ4 = indexOf;
var reduce = function (collection, iteratee, accumulator, thisArg) {
    var i = 0;
    if (arguments.length < 3) {
        accumulator = collection[0];
    }
    for (; i < collection.length; i++) {
        accumulator = iteratee.call(thisArg, accumulator, collection[i], i);
    }
    return accumulator;
};
var ɵ5 = reduce;
var findIndex = function (array, predicate, thisArg) {
    var i, l;
    for (i = 0, l = array.length; i < l; i++) {
        if (predicate.call(thisArg, array[i], i, array)) {
            return i;
        }
    }
    return -1;
};
var ɵ6 = findIndex;
var find = function (array, predicate, thisArg) {
    var idx = findIndex(array, predicate, thisArg);
    if (idx !== -1) {
        return array[idx];
    }
    return undefined;
};
var ɵ7 = find;
var last = function (collection) {
    return collection[collection.length - 1];
};
var ɵ8 = last;
export default {
    isArray: isArray,
    toArray: toArray,
    each: each,
    map: map,
    filter: filter,
    indexOf: indexOf,
    reduce: reduce,
    findIndex: findIndex,
    find: find,
    last: last
};
export { ɵ0, ɵ1, ɵ2, ɵ3, ɵ4, ɵ5, ɵ6, ɵ7, ɵ8 };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQXJyVXRpbHMuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AcG9scHdhcmUvdGlueW1jZS11dGlsLyIsInNvdXJjZXMiOlsibGliL3V0aWwvQXJyVXRpbHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7O0dBS0c7QUFFSDs7Ozs7R0FLRztBQUVILElBQU0sT0FBTyxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUM7QUFFOUIsSUFBTSxPQUFPLEdBQUcsVUFBVSxHQUFHO0lBQzNCLElBQUksS0FBSyxHQUFHLEdBQUcsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBRXRCLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEVBQUU7UUFDakIsS0FBSyxHQUFHLEVBQUUsQ0FBQztRQUNYLEtBQUssQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsR0FBRyxDQUFDLE1BQU0sRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQ3RDLEtBQUssQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDbkI7S0FDRjtJQUVELE9BQU8sS0FBSyxDQUFDO0FBQ2YsQ0FBQyxDQUFDOztBQUVGLElBQU0sSUFBSSxHQUFHLFVBQVUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFFO0lBQzlCLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUVULElBQUksQ0FBQyxDQUFDLEVBQUU7UUFDTixPQUFPLENBQUMsQ0FBQztLQUNWO0lBRUQsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7SUFFWCxJQUFJLENBQUMsQ0FBQyxNQUFNLEtBQUssU0FBUyxFQUFFO1FBQzFCLG9DQUFvQztRQUNwQyxLQUFLLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUNwQyxJQUFJLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FB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LE9BQU8sRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEtBQUssQ0FBQyxFQUFFO1lBQy9DLE9BQU8sQ0FBQyxDQUFDO1NBQ1Y7S0FDRjtJQUVELE9BQU8sQ0FBQyxDQUFDLENBQUM7QUFDWixDQUFDLENBQUM7O0FBRUYsSUFBTSxJQUFJLEdBQUcsVUFBVSxLQUFLLEVBQUUsU0FBUyxFQUFFLE9BQVE7SUFDL0MsSUFBTSxHQUFHLEdBQUcsU0FBUyxDQUFDLEtBQUssRUFBRSxTQUFTLEVBQUUsT0FBTyxDQUFDLENBQUM7SUFFakQsSUFBSSxHQUFHLEtBQUssQ0FBQyxDQUFDLEVBQUU7UUFDZCxPQUFPLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztLQUNuQjtJQUVELE9BQU8sU0FBUyxDQUFDO0FBQ25CLENBQUMsQ0FBQzs7QUFFRixJQUFNLElBQUksR0FBRyxVQUFVLFVBQVU7SUFDL0IsT0FBTyxVQUFVLENBQUMsVUFBVSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQztBQUMzQyxDQUFDLENBQUM7O0FBRUYsZUFBZTtJQUNiLE9BQU8sU0FBQTtJQUNQLE9BQU8sU0FBQTtJQUNQLElBQUksTUFBQTtJQUNKLEdBQUcsS0FBQTtJQUNILE1BQU0sUUFBQTtJQUNOLE9BQU8sU0FBQTtJQUNQLE1BQU0sUUFBQTtJQUNOLFNBQVMsV0FBQTtJQUNULElBQUksTUFBQTtJQUNKLElBQUksTUFBQTtDQUNMLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIENvcHlyaWdodCAoYykgVGlueSBUZWNobm9sb2dpZXMsIEluYy4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBMR1BMIG9yIGEgY29tbWVyY2lhbCBsaWNlbnNlLlxuICogRm9yIExHUEwgc2VlIExpY2Vuc2UudHh0IGluIHRoZSBwcm9qZWN0IHJvb3QgZm9yIGxpY2Vuc2UgaW5mb3JtYXRpb24uXG4gKiBGb3IgY29tbWVyY2lhbCBsaWNlbnNlcyBzZWUgaHR0cHM6Ly93d3cudGlueS5jbG91ZC9cbiAqL1xuXG4vKipcbiAqIEFycmF5IHV0aWxpdHkgY2xhc3MuXG4gKlxuICogQHByaXZhdGVcbiAqIEBjbGFzcyB0aW55bWNlLnV0aWwuQXJyXG4gKi9cblxuY29uc3QgaXNBcnJheSA9IEFycmF5LmlzQXJyYXk7XG5cbmNvbnN0IHRvQXJyYXkgPSBmdW5jdGlvbiAob2JqKSB7XG4gIGxldCBhcnJheSA9IG9iaiwgaSwgbDtcblxuICBpZiAoIWlzQXJyYXkob2JqKSkge1xuICAgIGFycmF5ID0gW107XG4gICAgZm9yIChpID0gMCwgbCA9IG9iai5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgIGFycmF5W2ldID0gb2JqW2ldO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBhcnJheTtcbn07XG5cbmNvbnN0IGVhY2ggPSBmdW5jdGlvbiAobywgY2IsIHM/KSB7XG4gIGxldCBuLCBsO1xuXG4gIGlmICghbykge1xuICAgIHJldHVybiAwO1xuICB9XG5cbiAgcyA9IHMgfHwgbztcblxuICBpZiAoby5sZW5ndGggIT09IHVuZGVmaW5lZCkge1xuICAgIC8vIEluZGV4ZWQgYXJyYXlzLCBuZWVkZWQgZm9yIFNhZmFyaVxuICAgIGZvciAobiA9IDAsIGwgPSBvLmxlbmd0aDsgbiA8IGw7IG4rKykge1xuICAgICAgaWYgKGNiLmNhbGwocywgb1tuXSwgbiwgbykgPT09IGZhbHNlKSB7XG4gICAgICAgIHJldHVybiAwO1xuICAgICAgfVxuICAgIH1cbiAgfSBlbHNlIHtcbiAgICAvLyBIYXNodGFibGVzXG4gICAgZm9yIChuIGluIG8pIHtcbiAgICAgIGlmIChvLmhhc093blByb3BlcnR5KG4pKSB7XG4gICAgICAgIGlmIChjYi5jYWxsKHMsIG9bbl0sIG4sIG8pID09PSBmYWxzZSkge1xuICAgICAgICAgIHJldHVybiAwO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIDE7XG59O1xuXG5jb25zdCBtYXAgPSBmdW5jdGlvbiAoYXJyYXksIGNhbGxiYWNrKSB7XG4gIGNvbnN0IG91dCA9IFtdO1xuXG4gIGVhY2goYXJyYXksIGZ1bmN0aW9uIChpdGVtLCBpbmRleCkge1xuICAgIG91dC5wdXNoKGNhbGxiYWNrKGl0ZW0sIGluZGV4LCBhcnJheSkpO1xuICB9KTtcblxuICByZXR1cm4gb3V0O1xufTtcblxuY29uc3QgZmlsdGVyID0gZnVuY3Rpb24gKGEsIGY/KSB7XG4gIGNvbnN0IG8gPSBbXTtcblxuICBlYWNoKGEsIGZ1bmN0aW9uICh2LCBpbmRleCkge1xuICAgIGlmICghZiB8fCBmKHYsIGluZGV4LCBhKSkge1xuICAgICAgby5wdXNoKHYpO1xuICAgIH1cbiAgfSk7XG5cbiAgcmV0dXJuIG87XG59O1xuXG5jb25zdCBpbmRleE9mID0gZnVuY3Rpb24gKGEsIHYpIHtcbiAgbGV0IGksIGw7XG5cbiAgaWYgKGEpIHtcbiAgICBmb3IgKGkgPSAwLCBsID0gYS5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgIGlmIChhW2ldID09PSB2KSB7XG4gICAgICAgIHJldHVybiBpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiAtMTtcbn07XG5cbmNvbnN0IHJlZHVjZSA9IGZ1bmN0aW9uIChjb2xsZWN0aW9uLCBpdGVyYXRlZSwgYWNjdW11bGF0b3I/LCB0aGlzQXJnPykge1xuICBsZXQgaSA9IDA7XG5cbiAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPCAzKSB7XG4gICAgYWNjdW11bGF0b3IgPSBjb2xsZWN0aW9uWzBdO1xuICB9XG5cbiAgZm9yICg7IGkgPCBjb2xsZWN0aW9uLmxlbmd0aDsgaSsrKSB7XG4gICAgYWNjdW11bGF0b3IgPSBpdGVyYXRlZS5jYWxsKHRoaXNBcmcsIGFjY3VtdWxhdG9yLCBjb2xsZWN0aW9uW2ldLCBpKTtcbiAgfVxuXG4gIHJldHVybiBhY2N1bXVsYXRvcjtcbn07XG5cbmNvbnN0IGZpbmRJbmRleCA9IGZ1bmN0aW9uIChhcnJheSwgcHJlZGljYXRlLCB0aGlzQXJnPykge1xuICBsZXQgaSwgbDtcblxuICBmb3IgKGkgPSAwLCBsID0gYXJyYXkubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgaWYgKHByZWRpY2F0ZS5jYWxsKHRoaXNBcmcsIGFycmF5W2ldLCBpLCBhcnJheSkpIHtcbiAgICAgIHJldHVybiBpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiAtMTtcbn07XG5cbmNvbnN0IGZpbmQgPSBmdW5jdGlvbiAoYXJyYXksIHByZWRpY2F0ZSwgdGhpc0FyZz8pIHtcbiAgY29uc3QgaWR4ID0gZmluZEluZGV4KGFycmF5LCBwcmVkaWNhdGUsIHRoaXNBcmcpO1xuXG4gIGlmIChpZHggIT09IC0xKSB7XG4gICAgcmV0dXJuIGFycmF5W2lkeF07XG4gIH1cblxuICByZXR1cm4gdW5kZWZpbmVkO1xufTtcblxuY29uc3QgbGFzdCA9IGZ1bmN0aW9uIChjb2xsZWN0aW9uKSB7XG4gIHJldHVybiBjb2xsZWN0aW9uW2NvbGxlY3Rpb24ubGVuZ3RoIC0gMV07XG59O1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIGlzQXJyYXksXG4gIHRvQXJyYXksXG4gIGVhY2gsXG4gIG1hcCxcbiAgZmlsdGVyLFxuICBpbmRleE9mLFxuICByZWR1Y2UsXG4gIGZpbmRJbmRleCxcbiAgZmluZCxcbiAgbGFzdFxufTsiXX0=