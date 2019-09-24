/**
 * Copyright (c) Tiny Technologies, Inc. All rights reserved.
 * Licensed under the LGPL or a commercial license.
 * For LGPL see License.txt in the project root for license information.
 * For commercial licenses see https://www.tiny.cloud/
 */
import { window } from '@ephox/dom-globals';
import Env from '../Env';
import ArrUtils from '../../util/ArrUtils';
/**
 * This class contains various utlity functions. These are also exposed
 * directly on the tinymce namespace.
 *
 * @class tinymce.util.Tools
 */
/**
 * Removes whitespace from the beginning and end of a string.
 *
 * @method trim
 * @param {String} s String to remove whitespace from.
 * @return {String} New string with removed whitespace.
 */
const whiteSpaceRegExp = /^\s*|\s*$/g;
const trim = function (str) {
    return (str === null || str === undefined) ? '' : ('' + str).replace(whiteSpaceRegExp, '');
};
const ɵ0 = trim;
/**
 * Checks if a object is of a specific type for example an array.
 *
 * @method is
 * @param {Object} obj Object to check type of.
 * @param {string} type Optional type to check for.
 * @return {Boolean} true/false if the object is of the specified type.
 */
const is = function (obj, type) {
    if (!type) {
        return obj !== undefined;
    }
    if (type === 'array' && ArrUtils.isArray(obj)) {
        return true;
    }
    return typeof obj === type;
};
const ɵ1 = is;
/**
 * Makes a name/object map out of an array with names.
 *
 * @method makeMap
 * @param {Array/String} items Items to make map out of.
 * @param {String} delim Optional delimiter to split string by.
 * @param {Object} map Optional map to add items to.
 * @return {Object} Name/value map of items.
 */
const makeMap = function (items, delim, map) {
    let i;
    items = items || [];
    delim = delim || ',';
    if (typeof items === 'string') {
        items = items.split(delim);
    }
    map = map || {};
    i = items.length;
    while (i--) {
        map[items[i]] = {};
    }
    return map;
};
const ɵ2 = makeMap;
/**
 * JavaScript does not protect hasOwnProperty method, so it is possible to overwrite it. This is
 * object independent version.
 *
 * @param {Object} obj
 * @param {String} prop
 * @returns {Boolean}
 */
const hasOwnProperty = function (obj, prop) {
    return Object.prototype.hasOwnProperty.call(obj, prop);
};
const ɵ3 = hasOwnProperty;
/**
 * Creates a class, subclass or static singleton.
 * More details on this method can be found in the Wiki.
 *
 * @method create
 * @param {String} s Class name, inheritance and prefix.
 * @param {Object} p Collection of methods to add to the class.
 * @param {Object} root Optional root object defaults to the global window object.
 * @example
 * // Creates a basic class
 * tinymce.create('tinymce.somepackage.SomeClass', {
 *     SomeClass: function() {
 *         // Class constructor
 *     },
 *
 *     method: function() {
 *         // Some method
 *     }
 * });
 *
 * // Creates a basic subclass class
 * tinymce.create('tinymce.somepackage.SomeSubClass:tinymce.somepackage.SomeClass', {
 *     SomeSubClass: function() {
 *         // Class constructor
 *         this.parent(); // Call parent constructor
 *     },
 *
 *     method: function() {
 *         // Some method
 *         this.parent(); // Call parent method
 *     },
 *
 *     'static': {
 *         staticMethod: function() {
 *             // Static method
 *         }
 *     }
 * });
 *
 * // Creates a singleton/static class
 * tinymce.create('static tinymce.somepackage.SomeSingletonClass', {
 *     method: function() {
 *         // Some method
 *     }
 * });
 */
const create = function (s, p, root) {
    const self = this;
    let sp, ns, cn, scn, c, de = 0;
    // Parse : <prefix> <class>:<super class>
    s = /^((static) )?([\w.]+)(:([\w.]+))?/.exec(s);
    cn = s[3].match(/(^|\.)(\w+)$/i)[2]; // Class name
    // Create namespace for new class
    ns = self.createNS(s[3].replace(/\.\w+$/, ''), root);
    // Class already exists
    if (ns[cn]) {
        return;
    }
    // Make pure static class
    if (s[2] === 'static') {
        ns[cn] = p;
        if (this.onCreate) {
            this.onCreate(s[2], s[3], ns[cn]);
        }
        return;
    }
    // Create default constructor
    if (!p[cn]) {
        p[cn] = function () { };
        de = 1;
    }
    // Add constructor and methods
    ns[cn] = p[cn];
    self.extend(ns[cn].prototype, p);
    // Extend
    if (s[5]) {
        sp = self.resolve(s[5]).prototype;
        scn = s[5].match(/\.(\w+)$/i)[1]; // Class name
        // Extend constructor
        c = ns[cn];
        if (de) {
            // Add passthrough constructor
            ns[cn] = function () {
                return sp[scn].apply(this, arguments);
            };
        }
        else {
            // Add inherit constructor
            ns[cn] = function () {
                this.parent = sp[scn];
                return c.apply(this, arguments);
            };
        }
        ns[cn].prototype[cn] = ns[cn];
        // Add super methods
        self.each(sp, function (f, n) {
            ns[cn].prototype[n] = sp[n];
        });
        // Add overridden methods
        self.each(p, function (f, n) {
            // Extend methods if needed
            if (sp[n]) {
                ns[cn].prototype[n] = function () {
                    this.parent = sp[n];
                    return f.apply(this, arguments);
                };
            }
            else {
                if (n !== cn) {
                    ns[cn].prototype[n] = f;
                }
            }
        });
    }
    // Add static methods
    /*jshint sub:true*/
    /*eslint dot-notation:0*/
    self.each(p.static, function (f, n) {
        ns[cn][n] = f;
    });
};
const ɵ4 = create;
const extend = function (obj, ext, ...x) {
    let i, l, name;
    const args = arguments;
    let value;
    for (i = 1, l = args.length; i < l; i++) {
        ext = args[i];
        for (name in ext) {
            if (ext.hasOwnProperty(name)) {
                value = ext[name];
                if (value !== undefined) {
                    obj[name] = value;
                }
            }
        }
    }
    return obj;
};
const ɵ5 = extend;
/**
 * Executed the specified function for each item in a object tree.
 *
 * @method walk
 * @param {Object} o Object tree to walk though.
 * @param {function} f Function to call for each item.
 * @param {String} n Optional name of collection inside the objects to walk for example childNodes.
 * @param {String} s Optional scope to execute the function in.
 */
const walk = function (o, f, n, s) {
    s = s || this;
    if (o) {
        if (n) {
            o = o[n];
        }
        ArrUtils.each(o, function (o, i) {
            if (f.call(s, o, i, n) === false) {
                return false;
            }
            walk(o, f, n, s);
        });
    }
};
const ɵ6 = walk;
/**
 * Creates a namespace on a specific object.
 *
 * @method createNS
 * @param {String} n Namespace to create for example a.b.c.d.
 * @param {Object} o Optional object to add namespace to, defaults to window.
 * @return {Object} New namespace object the last item in path.
 * @example
 * // Create some namespace
 * tinymce.createNS('tinymce.somepackage.subpackage');
 *
 * // Add a singleton
 * var tinymce.somepackage.subpackage.SomeSingleton = {
 *     method: function() {
 *         // Some method
 *     }
 * };
 */
const createNS = function (n, o) {
    let i, v;
    o = o || window;
    n = n.split('.');
    for (i = 0; i < n.length; i++) {
        v = n[i];
        if (!o[v]) {
            o[v] = {};
        }
        o = o[v];
    }
    return o;
};
const ɵ7 = createNS;
/**
 * Resolves a string and returns the object from a specific structure.
 *
 * @method resolve
 * @param {String} n Path to resolve for example a.b.c.d.
 * @param {Object} o Optional object to search though, defaults to window.
 * @return {Object} Last object in path or null if it couldn't be resolved.
 * @example
 * // Resolve a path into an object reference
 * var obj = tinymce.resolve('a.b.c.d');
 */
const resolve = function (n, o) {
    let i, l;
    o = o || window;
    n = n.split('.');
    for (i = 0, l = n.length; i < l; i++) {
        o = o[n[i]];
        if (!o) {
            break;
        }
    }
    return o;
};
const ɵ8 = resolve;
/**
 * Splits a string but removes the whitespace before and after each value.
 *
 * @method explode
 * @param {string} s String to split.
 * @param {string} d Delimiter to split by.
 * @example
 * // Split a string into an array with a,b,c
 * var arr = tinymce.explode('a, b,   c');
 */
const explode = function (s, d) {
    if (!s || is(s, 'array')) {
        return s;
    }
    return ArrUtils.map(s.split(d || ','), trim);
};
const ɵ9 = explode;
const _addCacheSuffix = function (url) {
    const cacheSuffix = Env.cacheSuffix;
    if (cacheSuffix) {
        url += (url.indexOf('?') === -1 ? '?' : '&') + cacheSuffix;
    }
    return url;
};
const ɵ10 = _addCacheSuffix;
const Tools = {
    trim,
    /**
     * Returns true/false if the object is an array or not.
     *
     * @method isArray
     * @param {Object} obj Object to check.
     * @return {boolean} true/false state if the object is an array or not.
     */
    isArray: ArrUtils.isArray,
    is,
    /**
     * Converts the specified object into a real JavaScript array.
     *
     * @method toArray
     * @param {Object} obj Object to convert into array.
     * @return {Array} Array object based in input.
     */
    toArray: ArrUtils.toArray,
    makeMap,
    /**
     * Performs an iteration of all items in a collection such as an object or array. This method will execure the
     * callback function for each item in the collection, if the callback returns false the iteration will terminate.
     * The callback has the following format: cb(value, key_or_index).
     *
     * @method each
     * @param {Object} o Collection to iterate.
     * @param {function} cb Callback function to execute for each item.
     * @param {Object} s Optional scope to execute the callback in.
     * @example
     * // Iterate an array
     * tinymce.each([1,2,3], function(v, i) {
     *     console.debug("Value: " + v + ", Index: " + i);
     * });
     *
     * // Iterate an object
     * tinymce.each({a: 1, b: 2, c: 3], function(v, k) {
     *     console.debug("Value: " + v + ", Key: " + k);
     * });
     */
    each: ArrUtils.each,
    /**
     * Creates a new array by the return value of each iteration function call. This enables you to convert
     * one array list into another.
     *
     * @method map
     * @param {Array} array Array of items to iterate.
     * @param {function} callback Function to call for each item. It's return value will be the new value.
     * @return {Array} Array with new values based on function return values.
     */
    map: ArrUtils.map,
    /**
     * Filters out items from the input array by calling the specified function for each item.
     * If the function returns false the item will be excluded if it returns true it will be included.
     *
     * @method grep
     * @param {Array} a Array of items to loop though.
     * @param {function} f Function to call for each item. Include/exclude depends on it's return value.
     * @return {Array} New array with values imported and filtered based in input.
     * @example
     * // Filter out some items, this will return an array with 4 and 5
     * var items = tinymce.grep([1,2,3,4,5], function(v) {return v > 3;});
     */
    grep: ArrUtils.filter,
    /**
     * Returns an index of the item or -1 if item is not present in the array.
     *
     * @method inArray
     * @param {any} item Item to search for.
     * @param {Array} arr Array to search in.
     * @return {Number} index of the item or -1 if item was not found.
     */
    inArray: ArrUtils.indexOf,
    hasOwn: hasOwnProperty,
    extend,
    create,
    walk,
    createNS,
    resolve,
    explode,
    _addCacheSuffix
};
export default Tools;
export { ɵ0, ɵ1, ɵ2, ɵ3, ɵ4, ɵ5, ɵ6, ɵ7, ɵ8, ɵ9, ɵ10 };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVG9vbHMuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AcG9scHdhcmUvdGlueW1jZS11dGlsLyIsInNvdXJjZXMiOlsibGliL2FwaS91dGlsL1Rvb2xzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7OztHQUtHO0FBRUgsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBQzVDLE9BQU8sR0FBRyxNQUFNLFFBQVEsQ0FBQztBQUN6QixPQUFPLFFBQVEsTUFBTSxxQkFBcUIsQ0FBQztBQTJCM0M7Ozs7O0dBS0c7QUFFSDs7Ozs7O0dBTUc7QUFDSCxNQUFNLGdCQUFnQixHQUFHLFlBQVksQ0FBQztBQUV0QyxNQUFNLElBQUksR0FBRyxVQUFVLEdBQUc7SUFDeEIsT0FBTyxDQUFDLEdBQUcsS0FBSyxJQUFJLElBQUksR0FBRyxLQUFLLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxHQUFHLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxnQkFBZ0IsRUFBRSxFQUFFLENBQUMsQ0FBQztBQUM3RixDQUFDLENBQUM7O0FBRUY7Ozs7Ozs7R0FPRztBQUNILE1BQU0sRUFBRSxHQUFHLFVBQVUsR0FBNkIsRUFBRSxJQUFZO0lBQzlELElBQUksQ0FBQyxJQUFJLEVBQUU7UUFDVCxPQUFPLEdBQUcsS0FBSyxTQUFTLENBQUM7S0FDMUI7SUFFRCxJQUFJLElBQUksS0FBSyxPQUFPLElBQUksUUFBUSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsRUFBRTtRQUM3QyxPQUFPLElBQUksQ0FBQztLQUNiO0lBRUQsT0FBTyxPQUFPLEdBQUcsS0FBSyxJQUFJLENBQUM7QUFDN0IsQ0FBQyxDQUFDOztBQUVGOzs7Ozs7OztHQVFHO0FBQ0gsTUFBTSxPQUFPLEdBQUcsVUFBVSxLQUFLLEVBQUUsS0FBTSxFQUFFLEdBQUk7SUFDM0MsSUFBSSxDQUFDLENBQUM7SUFFTixLQUFLLEdBQUcsS0FBSyxJQUFJLEVB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LENBQUM7S0FDNUQ7SUFFRCxPQUFPLEdBQUcsQ0FBQztBQUNiLENBQUMsQ0FBQzs7QUFFRixNQUFNLEtBQUssR0FBVTtJQUNuQixJQUFJO0lBRUo7Ozs7OztPQU1HO0lBQ0gsT0FBTyxFQUFFLFFBQVEsQ0FBQyxPQUFPO0lBRXpCLEVBQUU7SUFFRjs7Ozs7O09BTUc7SUFDSCxPQUFPLEVBQUUsUUFBUSxDQUFDLE9BQU87SUFDekIsT0FBTztJQUVQOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O09BbUJHO0lBQ0gsSUFBSSxFQUFFLFFBQVEsQ0FBQyxJQUFJO0lBRW5COzs7Ozs7OztPQVFHO0lBQ0gsR0FBRyxFQUFFLFFBQVEsQ0FBQyxHQUFHO0lBRWpCOzs7Ozs7Ozs7OztPQVdHO0lBQ0gsSUFBSSxFQUFFLFFBQVEsQ0FBQyxNQUFNO0lBRXJCOzs7Ozs7O09BT0c7SUFDSCxPQUFPLEVBQUUsUUFBUSxDQUFDLE9BQU87SUFFekIsTUFBTSxFQUFFLGNBQWM7SUFFdEIsTUFBTTtJQUNOLE1BQU07SUFDTixJQUFJO0lBQ0osUUFBUTtJQUNSLE9BQU87SUFDUCxPQUFPO0lBQ1AsZUFBZTtDQUNoQixDQUFDO0FBRUYsZUFBZSxLQUFLLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIENvcHlyaWdodCAoYykgVGlueSBUZWNobm9sb2dpZXMsIEluYy4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBMR1BMIG9yIGEgY29tbWVyY2lhbCBsaWNlbnNlLlxuICogRm9yIExHUEwgc2VlIExpY2Vuc2UudHh0IGluIHRoZSBwcm9qZWN0IHJvb3QgZm9yIGxpY2Vuc2UgaW5mb3JtYXRpb24uXG4gKiBGb3IgY29tbWVyY2lhbCBsaWNlbnNlcyBzZWUgaHR0cHM6Ly93d3cudGlueS5jbG91ZC9cbiAqL1xuXG5pbXBvcnQgeyB3aW5kb3cgfSBmcm9tICdAZXBob3gvZG9tLWdsb2JhbHMnO1xuaW1wb3J0IEVudiBmcm9tICcuLi9FbnYnO1xuaW1wb3J0IEFyclV0aWxzIGZyb20gJy4uLy4uL3V0aWwvQXJyVXRpbHMnO1xuXG50eXBlIEFycmF5Q2FsbGJhY2s8VCwgUj4gPSAoeDogVCwgaTogbnVtYmVyLCB4czogUmVhZG9ubHlBcnJheTxUPikgPT4gUjtcbnR5cGUgT2JqQ2FsbGJhY2s8VCwgUj4gPSAodmFsdWU6IFRba2V5b2YgVF0sIGtleTogc3RyaW5nLCBvYmo6IFQpID0+IFI7XG5cbmludGVyZmFjZSBUb29scyB7XG4gIGlzIChvYmo6IGFueSwgdHlwZTogc3RyaW5nKTogYm9vbGVhbjtcbiAgaXNBcnJheSA8VD4oVDogYW55KTogVCBpcyBBcnJheUxpa2U8VD47XG4gIGluQXJyYXkgPFQ+KGFycjogQXJyYXlMaWtlPFQ+LCB2YWx1ZTogVCk6IG51bWJlcjtcbiAgZ3JlcCA8VD4oYXJyOiBBcnJheUxpa2U8VD4sIHByZWQ/OiBBcnJheUNhbGxiYWNrPFQsIGJvb2xlYW4+KTtcbiAgdHJpbSAoc3RyOiBzdHJpbmcpOiBzdHJpbmc7XG4gIHRvQXJyYXkgPFQ+KG9iajogQXJyYXlMaWtlPFQ+KTogVFtdO1xuICBoYXNPd24gKG9iajogYW55LCBuYW1lOiBzdHJpbmcpOiBib29sZWFuO1xuICBtYWtlTWFwIDxUPihpdGVtczogQXJyYXlMaWtlPFQ+IHwgc3RyaW5nLCBkZWxpbT86IHN0cmluZyB8IFJlZ0V4cCwgbWFwPzogUmVjb3JkPHN0cmluZywgVCB8IHN0cmluZz4pOiBSZWNvcmQ8c3RyaW5nLCBUIHwgc3RyaW5nPjtcbiAgZWFjaCA8VD4oYXJyOiBSZWFkb25seUFycmF5PFQ+LCBjYjogQXJyYXlDYWxsYmFjazxULCBhbnk+LCBzY29wZT86IGFueSk6IHZvaWQ7XG4gIGVhY2ggPFQ+KG9iajogVCwgY2I6IE9iakNhbGxiYWNrPFQsIGFueT4sIHNjb3BlPzogYW55KTogdm9pZDtcbiAgbWFwIDxULCBVPihhcnI6IFJlYWRvbmx5QXJyYXk8VD4sIGNiOiBBcnJheUNhbGxiYWNrPFQsIFU+LCBzY29wZT86IGFueSk6IEFycmF5PFU+O1xuICBtYXAgPFQsIFU+KG9iajogVCwgY2I6IE9iakNhbGxiYWNrPFQsIFU+LCBzY29wZT86IGFueSk6IEFycmF5PFU+O1xuICBleHRlbmQgKG9iajoge30sIGV4dDoge30sIC4uLm9ianM6IHt9W10pOiBhbnk7XG4gIGNyZWF0ZSAobmFtZTogc3RyaW5nLCBwOiB7fSwgcm9vdD86IHt9KTtcbiAgd2FsayA8VCA9IHt9PihvYmo6IFQsIGY6IEZ1bmN0aW9uLCBuPzoga2V5b2YgVCwgc2NvcGU/OiBhbnkpOiB2b2lkO1xuICBjcmVhdGVOUyAobmFtZTogc3RyaW5nLCBvPzoge30pOiBhbnk7XG4gIHJlc29sdmUgKHBhdGg6IHN0cmluZywgbz86IHt9KTogYW55O1xuICBleHBsb2RlIChzOiBzdHJpbmcsIGQ/OiBzdHJpbmcgfCBSZWdFeHApOiBzdHJpbmdbXTtcbiAgX2FkZENhY2hlU3VmZml4ICh1cmw6IHN0cmluZyk6IHN0cmluZztcbn1cblxuLyoqXG4gKiBUaGlzIGNsYXNzIGNvbnRhaW5zIHZhcmlvdXMgdXRsaXR5IGZ1bmN0aW9ucy4gVGhlc2UgYXJlIGFsc28gZXhwb3NlZFxuICogZGlyZWN0bHkgb24gdGhlIHRpbnltY2UgbmFtZXNwYWNlLlxuICpcbiAqIEBjbGFzcyB0aW55bWNlLnV0aWwuVG9vbHNcbiAqL1xuXG4vKipcbiAqIFJlbW92ZXMgd2hpdGVzcGFjZSBmcm9tIHRoZSBiZWdpbm5pbmcgYW5kIGVuZCBvZiBhIHN0cmluZy5cbiAqXG4gKiBAbWV0aG9kIHRyaW1cbiAqIEBwYXJhbSB7U3RyaW5nfSBzIFN0cmluZyB0byByZW1vdmUgd2hpdGVzcGFjZSBmcm9tLlxuICogQHJldHVybiB7U3RyaW5nfSBOZXcgc3RyaW5nIHdpdGggcmVtb3ZlZCB3aGl0ZXNwYWNlLlxuICovXG5jb25zdCB3aGl0ZVNwYWNlUmVnRXhwID0gL15cXHMqfFxccyokL2c7XG5cbmNvbnN0IHRyaW0gPSBmdW5jdGlvbiAoc3RyKSB7XG4gIHJldHVybiAoc3RyID09PSBudWxsIHx8IHN0ciA9PT0gdW5kZWZpbmVkKSA/ICcnIDogKCcnICsgc3RyKS5yZXBsYWNlKHdoaXRlU3BhY2VSZWdFeHAsICcnKTtcbn07XG5cbi8qKlxuICogQ2hlY2tzIGlmIGEgb2JqZWN0IGlzIG9mIGEgc3BlY2lmaWMgdHlwZSBmb3IgZXhhbXBsZSBhbiBhcnJheS5cbiAqXG4gKiBAbWV0aG9kIGlzXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqIE9iamVjdCB0byBjaGVjayB0eXBlIG9mLlxuICogQHBhcmFtIHtzdHJpbmd9IHR5cGUgT3B0aW9uYWwgdHlwZSB0byBjaGVjayBmb3IuXG4gKiBAcmV0dXJuIHtCb29sZWFufSB0cnVlL2ZhbHNlIGlmIHRoZSBvYmplY3QgaXMgb2YgdGhlIHNwZWNpZmllZCB0eXBlLlxuICovXG5jb25zdCBpcyA9IGZ1bmN0aW9uIChvYmo6IFJlY29yZDxzdHJpbmcsIGFueT4gfCB7fSwgdHlwZTogc3RyaW5nKSB7XG4gIGlmICghdHlwZSkge1xuICAgIHJldHVybiBvYmogIT09IHVuZGVmaW5lZDtcbiAgfVxuXG4gIGlmICh0eXBlID09PSAnYXJyYXknICYmIEFyclV0aWxzLmlzQXJyYXkob2JqKSkge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgcmV0dXJuIHR5cGVvZiBvYmogPT09IHR5cGU7XG59O1xuXG4vKipcbiAqIE1ha2VzIGEgbmFtZS9vYmplY3QgbWFwIG91dCBvZiBhbiBhcnJheSB3aXRoIG5hbWVzLlxuICpcbiAqIEBtZXRob2QgbWFrZU1hcFxuICogQHBhcmFtIHtBcnJheS9TdHJpbmd9IGl0ZW1zIEl0ZW1zIHRvIG1ha2UgbWFwIG91dCBvZi5cbiAqIEBwYXJhbSB7U3RyaW5nfSBkZWxpbSBPcHRpb25hbCBkZWxpbWl0ZXIgdG8gc3BsaXQgc3RyaW5nIGJ5LlxuICogQHBhcmFtIHtPYmplY3R9IG1hcCBPcHRpb25hbCBtYXAgdG8gYWRkIGl0ZW1zIHRvLlxuICogQHJldHVybiB7T2JqZWN0fSBOYW1lL3ZhbHVlIG1hcCBvZiBpdGVtcy5cbiAqL1xuY29uc3QgbWFrZU1hcCA9IGZ1bmN0aW9uIChpdGVtcywgZGVsaW0/LCBtYXA/KSB7XG4gIGxldCBpO1xuXG4gIGl0ZW1zID0gaXRlbXMgfHwgW107XG4gIGRlbGltID0gZGVsaW0gfHwgJywnO1xuXG4gIGlmICh0eXBlb2YgaXRlbXMgPT09ICdzdHJpbmcnKSB7XG4gICAgaXRlbXMgPSBpdGVtcy5zcGxpdChkZWxpbSk7XG4gIH1cblxuICBtYXAgPSBtYXAgfHwge307XG5cbiAgaSA9IGl0ZW1zLmxlbmd0aDtcbiAgd2hpbGUgKGktLSkge1xuICAgIG1hcFtpdGVtc1tpXV0gPSB7fTtcbiAgfVxuXG4gIHJldHVybiBtYXA7XG59O1xuXG4vKipcbiAqIEphdmFTY3JpcHQgZG9lcyBub3QgcHJvdGVjdCBoYXNPd25Qcm9wZXJ0eSBtZXRob2QsIHNvIGl0IGlzIHBvc3NpYmxlIHRvIG92ZXJ3cml0ZSBpdC4gVGhpcyBpc1xuICogb2JqZWN0IGluZGVwZW5kZW50IHZlcnNpb24uXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IG9ialxuICogQHBhcmFtIHtTdHJpbmd9IHByb3BcbiAqIEByZXR1cm5zIHtCb29sZWFufVxuICovXG5jb25zdCBoYXNPd25Qcm9wZXJ0eSA9IGZ1bmN0aW9uIChvYmosIHByb3ApIHtcbiAgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApO1xufTtcblxuLyoqXG4gKiBDcmVhdGVzIGEgY2xhc3MsIHN1YmNsYXNzIG9yIHN0YXRpYyBzaW5nbGV0b24uXG4gKiBNb3JlIGRldGFpbHMgb24gdGhpcyBtZXRob2QgY2FuIGJlIGZvdW5kIGluIHRoZSBXaWtpLlxuICpcbiAqIEBtZXRob2QgY3JlYXRlXG4gKiBAcGFyYW0ge1N0cmluZ30gcyBDbGFzcyBuYW1lLCBpbmhlcml0YW5jZSBhbmQgcHJlZml4LlxuICogQHBhcmFtIHtPYmplY3R9IHAgQ29sbGVjdGlvbiBvZiBtZXRob2RzIHRvIGFkZCB0byB0aGUgY2xhc3MuXG4gKiBAcGFyYW0ge09iamVjdH0gcm9vdCBPcHRpb25hbCByb290IG9iamVjdCBkZWZhdWx0cyB0byB0aGUgZ2xvYmFsIHdpbmRvdyBvYmplY3QuXG4gKiBAZXhhbXBsZVxuICogLy8gQ3JlYXRlcyBhIGJhc2ljIGNsYXNzXG4gKiB0aW55bWNlLmNyZWF0ZSgndGlueW1jZS5zb21lcGFja2FnZS5Tb21lQ2xhc3MnLCB7XG4gKiAgICAgU29tZUNsYXNzOiBmdW5jdGlvbigpIHtcbiAqICAgICAgICAgLy8gQ2xhc3MgY29uc3RydWN0b3JcbiAqICAgICB9LFxuICpcbiAqICAgICBtZXRob2Q6IGZ1bmN0aW9uKCkge1xuICogICAgICAgICAvLyBTb21lIG1ldGhvZFxuICogICAgIH1cbiAqIH0pO1xuICpcbiAqIC8vIENyZWF0ZXMgYSBiYXNpYyBzdWJjbGFzcyBjbGFzc1xuICogdGlueW1jZS5jcmVhdGUoJ3RpbnltY2Uuc29tZXBhY2thZ2UuU29tZVN1YkNsYXNzOnRpbnltY2Uuc29tZXBhY2thZ2UuU29tZUNsYXNzJywge1xuICogICAgIFNvbWVTdWJDbGFzczogZnVuY3Rpb24oKSB7XG4gKiAgICAgICAgIC8vIENsYXNzIGNvbnN0cnVjdG9yXG4gKiAgICAgICAgIHRoaXMucGFyZW50KCk7IC8vIENhbGwgcGFyZW50IGNvbnN0cnVjdG9yXG4gKiAgICAgfSxcbiAqXG4gKiAgICAgbWV0aG9kOiBmdW5jdGlvbigpIHtcbiAqICAgICAgICAgLy8gU29tZSBtZXRob2RcbiAqICAgICAgICAgdGhpcy5wYXJlbnQoKTsgLy8gQ2FsbCBwYXJlbnQgbWV0aG9kXG4gKiAgICAgfSxcbiAqXG4gKiAgICAgJ3N0YXRpYyc6IHtcbiAqICAgICAgICAgc3RhdGljTWV0aG9kOiBmdW5jdGlvbigpIHtcbiAqICAgICAgICAgICAgIC8vIFN0YXRpYyBtZXRob2RcbiAqICAgICAgICAgfVxuICogICAgIH1cbiAqIH0pO1xuICpcbiAqIC8vIENyZWF0ZXMgYSBzaW5nbGV0b24vc3RhdGljIGNsYXNzXG4gKiB0aW55bWNlLmNyZWF0ZSgnc3RhdGljIHRpbnltY2Uuc29tZXBhY2thZ2UuU29tZVNpbmdsZXRvbkNsYXNzJywge1xuICogICAgIG1ldGhvZDogZnVuY3Rpb24oKSB7XG4gKiAgICAgICAgIC8vIFNvbWUgbWV0aG9kXG4gKiAgICAgfVxuICogfSk7XG4gKi9cbmNvbnN0IGNyZWF0ZSA9IGZ1bmN0aW9uIChzLCBwLCByb290Pykge1xuICBjb25zdCBzZWxmID0gdGhpcztcbiAgbGV0IHNwLCBucywgY24sIHNjbiwgYywgZGUgPSAwO1xuXG4gIC8vIFBhcnNlIDogPHByZWZpeD4gPGNsYXNzPjo8c3VwZXIgY2xhc3M+XG4gIHMgPSAvXigoc3RhdGljKSApPyhbXFx3Ll0rKSg6KFtcXHcuXSspKT8vLmV4ZWMocyk7XG4gIGNuID0gc1szXS5tYXRjaCgvKF58XFwuKShcXHcrKSQvaSlbMl07IC8vIENsYXNzIG5hbWVcblxuICAvLyBDcmVhdGUgbmFtZXNwYWNlIGZvciBuZXcgY2xhc3NcbiAgbnMgPSBzZWxmLmNyZWF0ZU5TKHNbM10ucmVwbGFjZSgvXFwuXFx3KyQvLCAnJyksIHJvb3QpO1xuXG4gIC8vIENsYXNzIGFscmVhZHkgZXhpc3RzXG4gIGlmIChuc1tjbl0pIHtcbiAgICByZXR1cm47XG4gIH1cblxuICAvLyBNYWtlIHB1cmUgc3RhdGljIGNsYXNzXG4gIGlmIChzWzJdID09PSAnc3RhdGljJykge1xuICAgIG5zW2NuXSA9IHA7XG5cbiAgICBpZiAodGhpcy5vbkNyZWF0ZSkge1xuICAgICAgdGhpcy5vbkNyZWF0ZShzWzJdLCBzWzNdLCBuc1tjbl0pO1xuICAgIH1cblxuICAgIHJldHVybjtcbiAgfVxuXG4gIC8vIENyZWF0ZSBkZWZhdWx0IGNvbnN0cnVjdG9yXG4gIGlmICghcFtjbl0pIHtcbiAgICBwW2NuXSA9IGZ1bmN0aW9uICgpIHsgfTtcbiAgICBkZSA9IDE7XG4gIH1cblxuICAvLyBBZGQgY29uc3RydWN0b3IgYW5kIG1ldGhvZHNcbiAgbnNbY25dID0gcFtjbl07XG4gIHNlbGYuZXh0ZW5kKG5zW2NuXS5wcm90b3R5cGUsIHApO1xuXG4gIC8vIEV4dGVuZFxuICBpZiAoc1s1XSkge1xuICAgIHNwID0gc2VsZi5yZXNvbHZlKHNbNV0pLnByb3RvdHlwZTtcbiAgICBzY24gPSBzWzVdLm1hdGNoKC9cXC4oXFx3KykkL2kpWzFdOyAvLyBDbGFzcyBuYW1lXG5cbiAgICAvLyBFeHRlbmQgY29uc3RydWN0b3JcbiAgICBjID0gbnNbY25dO1xuICAgIGlmIChkZSkge1xuICAgICAgLy8gQWRkIHBhc3N0aHJvdWdoIGNvbnN0cnVjdG9yXG4gICAgICBuc1tjbl0gPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBzcFtzY25dLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICB9O1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBBZGQgaW5oZXJpdCBjb25zdHJ1Y3RvclxuICAgICAgbnNbY25dID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLnBhcmVudCA9IHNwW3Njbl07XG4gICAgICAgIHJldHVybiBjLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICB9O1xuICAgIH1cbiAgICBuc1tjbl0ucHJvdG90eXBlW2NuXSA9IG5zW2NuXTtcblxuICAgIC8vIEFkZCBzdXBlciBtZXRob2RzXG4gICAgc2VsZi5lYWNoKHNwLCBmdW5jdGlvbiAoZiwgbikge1xuICAgICAgbnNbY25dLnByb3RvdHlwZVtuXSA9IHNwW25dO1xuICAgIH0pO1xuXG4gICAgLy8gQWRkIG92ZXJyaWRkZW4gbWV0aG9kc1xuICAgIHNlbGYuZWFjaChwLCBmdW5jdGlvbiAoZiwgbikge1xuICAgICAgLy8gRXh0ZW5kIG1ldGhvZHMgaWYgbmVlZGVkXG4gICAgICBpZiAoc3Bbbl0pIHtcbiAgICAgICAgbnNbY25dLnByb3RvdHlwZVtuXSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICB0aGlzLnBhcmVudCA9IHNwW25dO1xuICAgICAgICAgIHJldHVybiBmLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICAgIH07XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAobiAhPT0gY24pIHtcbiAgICAgICAgICBuc1tjbl0ucHJvdG90eXBlW25dID0gZjtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgLy8gQWRkIHN0YXRpYyBtZXRob2RzXG4gIC8qanNoaW50IHN1Yjp0cnVlKi9cbiAgLyplc2xpbnQgZG90LW5vdGF0aW9uOjAqL1xuICBzZWxmLmVhY2gocC5zdGF0aWMsIGZ1bmN0aW9uIChmLCBuKSB7XG4gICAgbnNbY25dW25dID0gZjtcbiAgfSk7XG59O1xuXG5jb25zdCBleHRlbmQgPSBmdW5jdGlvbiAob2JqLCBleHQsIC4uLng6IGFueVtdKSB7XG4gIGxldCBpLCBsLCBuYW1lO1xuICBjb25zdCBhcmdzID0gYXJndW1lbnRzO1xuICBsZXQgdmFsdWU7XG5cbiAgZm9yIChpID0gMSwgbCA9IGFyZ3MubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgZXh0ID0gYXJnc1tpXTtcbiAgICBmb3IgKG5hbWUgaW4gZXh0KSB7XG4gICAgICBpZiAoZXh0Lmhhc093blByb3BlcnR5KG5hbWUpKSB7XG4gICAgICAgIHZhbHVlID0gZXh0W25hbWVdO1xuXG4gICAgICAgIGlmICh2YWx1ZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgb2JqW25hbWVdID0gdmFsdWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXR1cm4gb2JqO1xufTtcblxuLyoqXG4gKiBFeGVjdXRlZCB0aGUgc3BlY2lmaWVkIGZ1bmN0aW9uIGZvciBlYWNoIGl0ZW0gaW4gYSBvYmplY3QgdHJlZS5cbiAqXG4gKiBAbWV0aG9kIHdhbGtcbiAqIEBwYXJhbSB7T2JqZWN0fSBvIE9iamVjdCB0cmVlIHRvIHdhbGsgdGhvdWdoLlxuICogQHBhcmFtIHtmdW5jdGlvbn0gZiBGdW5jdGlvbiB0byBjYWxsIGZvciBlYWNoIGl0ZW0uXG4gKiBAcGFyYW0ge1N0cmluZ30gbiBPcHRpb25hbCBuYW1lIG9mIGNvbGxlY3Rpb24gaW5zaWRlIHRoZSBvYmplY3RzIHRvIHdhbGsgZm9yIGV4YW1wbGUgY2hpbGROb2Rlcy5cbiAqIEBwYXJhbSB7U3RyaW5nfSBzIE9wdGlvbmFsIHNjb3BlIHRvIGV4ZWN1dGUgdGhlIGZ1bmN0aW9uIGluLlxuICovXG5jb25zdCB3YWxrID0gZnVuY3Rpb24gKG8sIGYsIG4/LCBzPykge1xuICBzID0gcyB8fCB0aGlzO1xuXG4gIGlmIChvKSB7XG4gICAgaWYgKG4pIHtcbiAgICAgIG8gPSBvW25dO1xuICAgIH1cblxuICAgIEFyclV0aWxzLmVhY2gobywgZnVuY3Rpb24gKG8sIGkpIHtcbiAgICAgIGlmIChmLmNhbGwocywgbywgaSwgbikgPT09IGZhbHNlKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cblxuICAgICAgd2FsayhvLCBmLCBuLCBzKTtcbiAgICB9KTtcbiAgfVxufTtcblxuLyoqXG4gKiBDcmVhdGVzIGEgbmFtZXNwYWNlIG9uIGEgc3BlY2lmaWMgb2JqZWN0LlxuICpcbiAqIEBtZXRob2QgY3JlYXRlTlNcbiAqIEBwYXJhbSB7U3RyaW5nfSBuIE5hbWVzcGFjZSB0byBjcmVhdGUgZm9yIGV4YW1wbGUgYS5iLmMuZC5cbiAqIEBwYXJhbSB7T2JqZWN0fSBvIE9wdGlvbmFsIG9iamVjdCB0byBhZGQgbmFtZXNwYWNlIHRvLCBkZWZhdWx0cyB0byB3aW5kb3cuXG4gKiBAcmV0dXJuIHtPYmplY3R9IE5ldyBuYW1lc3BhY2Ugb2JqZWN0IHRoZSBsYXN0IGl0ZW0gaW4gcGF0aC5cbiAqIEBleGFtcGxlXG4gKiAvLyBDcmVhdGUgc29tZSBuYW1lc3BhY2VcbiAqIHRpbnltY2UuY3JlYXRlTlMoJ3RpbnltY2Uuc29tZXBhY2thZ2Uuc3VicGFja2FnZScpO1xuICpcbiAqIC8vIEFkZCBhIHNpbmdsZXRvblxuICogdmFyIHRpbnltY2Uuc29tZXBhY2thZ2Uuc3VicGFja2FnZS5Tb21lU2luZ2xldG9uID0ge1xuICogICAgIG1ldGhvZDogZnVuY3Rpb24oKSB7XG4gKiAgICAgICAgIC8vIFNvbWUgbWV0aG9kXG4gKiAgICAgfVxuICogfTtcbiAqL1xuY29uc3QgY3JlYXRlTlMgPSBmdW5jdGlvbiAobiwgbz8pIHtcbiAgbGV0IGksIHY7XG5cbiAgbyA9IG8gfHwgd2luZG93O1xuXG4gIG4gPSBuLnNwbGl0KCcuJyk7XG4gIGZvciAoaSA9IDA7IGkgPCBuLmxlbmd0aDsgaSsrKSB7XG4gICAgdiA9IG5baV07XG5cbiAgICBpZiAoIW9bdl0pIHtcbiAgICAgIG9bdl0gPSB7fTtcbiAgICB9XG5cbiAgICBvID0gb1t2XTtcbiAgfVxuXG4gIHJldHVybiBvO1xufTtcblxuLyoqXG4gKiBSZXNvbHZlcyBhIHN0cmluZyBhbmQgcmV0dXJucyB0aGUgb2JqZWN0IGZyb20gYSBzcGVjaWZpYyBzdHJ1Y3R1cmUuXG4gKlxuICogQG1ldGhvZCByZXNvbHZlXG4gKiBAcGFyYW0ge1N0cmluZ30gbiBQYXRoIHRvIHJlc29sdmUgZm9yIGV4YW1wbGUgYS5iLmMuZC5cbiAqIEBwYXJhbSB7T2JqZWN0fSBvIE9wdGlvbmFsIG9iamVjdCB0byBzZWFyY2ggdGhvdWdoLCBkZWZhdWx0cyB0byB3aW5kb3cuXG4gKiBAcmV0dXJuIHtPYmplY3R9IExhc3Qgb2JqZWN0IGluIHBhdGggb3IgbnVsbCBpZiBpdCBjb3VsZG4ndCBiZSByZXNvbHZlZC5cbiAqIEBleGFtcGxlXG4gKiAvLyBSZXNvbHZlIGEgcGF0aCBpbnRvIGFuIG9iamVjdCByZWZlcmVuY2VcbiAqIHZhciBvYmogPSB0aW55bWNlLnJlc29sdmUoJ2EuYi5jLmQnKTtcbiAqL1xuY29uc3QgcmVzb2x2ZSA9IGZ1bmN0aW9uIChuLCBvPykge1xuICBsZXQgaSwgbDtcblxuICBvID0gbyB8fCB3aW5kb3c7XG5cbiAgbiA9IG4uc3BsaXQoJy4nKTtcbiAgZm9yIChpID0gMCwgbCA9IG4ubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgbyA9IG9bbltpXV07XG5cbiAgICBpZiAoIW8pIHtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBvO1xufTtcblxuLyoqXG4gKiBTcGxpdHMgYSBzdHJpbmcgYnV0IHJlbW92ZXMgdGhlIHdoaXRlc3BhY2UgYmVmb3JlIGFuZCBhZnRlciBlYWNoIHZhbHVlLlxuICpcbiAqIEBtZXRob2QgZXhwbG9kZVxuICogQHBhcmFtIHtzdHJpbmd9IHMgU3RyaW5nIHRvIHNwbGl0LlxuICogQHBhcmFtIHtzdHJpbmd9IGQgRGVsaW1pdGVyIHRvIHNwbGl0IGJ5LlxuICogQGV4YW1wbGVcbiAqIC8vIFNwbGl0IGEgc3RyaW5nIGludG8gYW4gYXJyYXkgd2l0aCBhLGIsY1xuICogdmFyIGFyciA9IHRpbnltY2UuZXhwbG9kZSgnYSwgYiwgICBjJyk7XG4gKi9cbmNvbnN0IGV4cGxvZGUgPSBmdW5jdGlvbiAocywgZD8pIHtcbiAgaWYgKCFzIHx8IGlzKHMsICdhcnJheScpKSB7XG4gICAgcmV0dXJuIHM7XG4gIH1cblxuICByZXR1cm4gQXJyVXRpbHMubWFwKHMuc3BsaXQoZCB8fCAnLCcpLCB0cmltKTtcbn07XG5cbmNvbnN0IF9hZGRDYWNoZVN1ZmZpeCA9IGZ1bmN0aW9uICh1cmwpIHtcbiAgY29uc3QgY2FjaGVTdWZmaXggPSBFbnYuY2FjaGVTdWZmaXg7XG5cbiAgaWYgKGNhY2hlU3VmZml4KSB7XG4gICAgdXJsICs9ICh1cmwuaW5kZXhPZignPycpID09PSAtMSA/ICc/JyA6ICcmJykgKyBjYWNoZVN1ZmZpeDtcbiAgfVxuXG4gIHJldHVybiB1cmw7XG59O1xuXG5jb25zdCBUb29sczogVG9vbHMgPSB7XG4gIHRyaW0sXG5cbiAgLyoqXG4gICAqIFJldHVybnMgdHJ1ZS9mYWxzZSBpZiB0aGUgb2JqZWN0IGlzIGFuIGFycmF5IG9yIG5vdC5cbiAgICpcbiAgICogQG1ldGhvZCBpc0FycmF5XG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvYmogT2JqZWN0IHRvIGNoZWNrLlxuICAgKiBAcmV0dXJuIHtib29sZWFufSB0cnVlL2ZhbHNlIHN0YXRlIGlmIHRoZSBvYmplY3QgaXMgYW4gYXJyYXkgb3Igbm90LlxuICAgKi9cbiAgaXNBcnJheTogQXJyVXRpbHMuaXNBcnJheSxcblxuICBpcyxcblxuICAvKipcbiAgICogQ29udmVydHMgdGhlIHNwZWNpZmllZCBvYmplY3QgaW50byBhIHJlYWwgSmF2YVNjcmlwdCBhcnJheS5cbiAgICpcbiAgICogQG1ldGhvZCB0b0FycmF5XG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvYmogT2JqZWN0IHRvIGNvbnZlcnQgaW50byBhcnJheS5cbiAgICogQHJldHVybiB7QXJyYXl9IEFycmF5IG9iamVjdCBiYXNlZCBpbiBpbnB1dC5cbiAgICovXG4gIHRvQXJyYXk6IEFyclV0aWxzLnRvQXJyYXksXG4gIG1ha2VNYXAsXG5cbiAgLyoqXG4gICAqIFBlcmZvcm1zIGFuIGl0ZXJhdGlvbiBvZiBhbGwgaXRlbXMgaW4gYSBjb2xsZWN0aW9uIHN1Y2ggYXMgYW4gb2JqZWN0IG9yIGFycmF5LiBUaGlzIG1ldGhvZCB3aWxsIGV4ZWN1cmUgdGhlXG4gICAqIGNhbGxiYWNrIGZ1bmN0aW9uIGZvciBlYWNoIGl0ZW0gaW4gdGhlIGNvbGxlY3Rpb24sIGlmIHRoZSBjYWxsYmFjayByZXR1cm5zIGZhbHNlIHRoZSBpdGVyYXRpb24gd2lsbCB0ZXJtaW5hdGUuXG4gICAqIFRoZSBjYWxsYmFjayBoYXMgdGhlIGZvbGxvd2luZyBmb3JtYXQ6IGNiKHZhbHVlLCBrZXlfb3JfaW5kZXgpLlxuICAgKlxuICAgKiBAbWV0aG9kIGVhY2hcbiAgICogQHBhcmFtIHtPYmplY3R9IG8gQ29sbGVjdGlvbiB0byBpdGVyYXRlLlxuICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBjYiBDYWxsYmFjayBmdW5jdGlvbiB0byBleGVjdXRlIGZvciBlYWNoIGl0ZW0uXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBzIE9wdGlvbmFsIHNjb3BlIHRvIGV4ZWN1dGUgdGhlIGNhbGxiYWNrIGluLlxuICAgKiBAZXhhbXBsZVxuICAgKiAvLyBJdGVyYXRlIGFuIGFycmF5XG4gICAqIHRpbnltY2UuZWFjaChbMSwyLDNdLCBmdW5jdGlvbih2LCBpKSB7XG4gICAqICAgICBjb25zb2xlLmRlYnVnKFwiVmFsdWU6IFwiICsgdiArIFwiLCBJbmRleDogXCIgKyBpKTtcbiAgICogfSk7XG4gICAqXG4gICAqIC8vIEl0ZXJhdGUgYW4gb2JqZWN0XG4gICAqIHRpbnltY2UuZWFjaCh7YTogMSwgYjogMiwgYzogM10sIGZ1bmN0aW9uKHYsIGspIHtcbiAgICogICAgIGNvbnNvbGUuZGVidWcoXCJWYWx1ZTogXCIgKyB2ICsgXCIsIEtleTogXCIgKyBrKTtcbiAgICogfSk7XG4gICAqL1xuICBlYWNoOiBBcnJVdGlscy5lYWNoLFxuXG4gIC8qKlxuICAgKiBDcmVhdGVzIGEgbmV3IGFycmF5IGJ5IHRoZSByZXR1cm4gdmFsdWUgb2YgZWFjaCBpdGVyYXRpb24gZnVuY3Rpb24gY2FsbC4gVGhpcyBlbmFibGVzIHlvdSB0byBjb252ZXJ0XG4gICAqIG9uZSBhcnJheSBsaXN0IGludG8gYW5vdGhlci5cbiAgICpcbiAgICogQG1ldGhvZCBtYXBcbiAgICogQHBhcmFtIHtBcnJheX0gYXJyYXkgQXJyYXkgb2YgaXRlbXMgdG8gaXRlcmF0ZS5cbiAgICogQHBhcmFtIHtmdW5jdGlvbn0gY2FsbGJhY2sgRnVuY3Rpb24gdG8gY2FsbCBmb3IgZWFjaCBpdGVtLiBJdCdzIHJldHVybiB2YWx1ZSB3aWxsIGJlIHRoZSBuZXcgdmFsdWUuXG4gICAqIEByZXR1cm4ge0FycmF5fSBBcnJheSB3aXRoIG5ldyB2YWx1ZXMgYmFzZWQgb24gZnVuY3Rpb24gcmV0dXJuIHZhbHVlcy5cbiAgICovXG4gIG1hcDogQXJyVXRpbHMubWFwLFxuXG4gIC8qKlxuICAgKiBGaWx0ZXJzIG91dCBpdGVtcyBmcm9tIHRoZSBpbnB1dCBhcnJheSBieSBjYWxsaW5nIHRoZSBzcGVjaWZpZWQgZnVuY3Rpb24gZm9yIGVhY2ggaXRlbS5cbiAgICogSWYgdGhlIGZ1bmN0aW9uIHJldHVybnMgZmFsc2UgdGhlIGl0ZW0gd2lsbCBiZSBleGNsdWRlZCBpZiBpdCByZXR1cm5zIHRydWUgaXQgd2lsbCBiZSBpbmNsdWRlZC5cbiAgICpcbiAgICogQG1ldGhvZCBncmVwXG4gICAqIEBwYXJhbSB7QXJyYXl9IGEgQXJyYXkgb2YgaXRlbXMgdG8gbG9vcCB0aG91Z2guXG4gICAqIEBwYXJhbSB7ZnVuY3Rpb259IGYgRnVuY3Rpb24gdG8gY2FsbCBmb3IgZWFjaCBpdGVtLiBJbmNsdWRlL2V4Y2x1ZGUgZGVwZW5kcyBvbiBpdCdzIHJldHVybiB2YWx1ZS5cbiAgICogQHJldHVybiB7QXJyYXl9IE5ldyBhcnJheSB3aXRoIHZhbHVlcyBpbXBvcnRlZCBhbmQgZmlsdGVyZWQgYmFzZWQgaW4gaW5wdXQuXG4gICAqIEBleGFtcGxlXG4gICAqIC8vIEZpbHRlciBvdXQgc29tZSBpdGVtcywgdGhpcyB3aWxsIHJldHVybiBhbiBhcnJheSB3aXRoIDQgYW5kIDVcbiAgICogdmFyIGl0ZW1zID0gdGlueW1jZS5ncmVwKFsxLDIsMyw0LDVdLCBmdW5jdGlvbih2KSB7cmV0dXJuIHYgPiAzO30pO1xuICAgKi9cbiAgZ3JlcDogQXJyVXRpbHMuZmlsdGVyLFxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIGFuIGluZGV4IG9mIHRoZSBpdGVtIG9yIC0xIGlmIGl0ZW0gaXMgbm90IHByZXNlbnQgaW4gdGhlIGFycmF5LlxuICAgKlxuICAgKiBAbWV0aG9kIGluQXJyYXlcbiAgICogQHBhcmFtIHthbnl9IGl0ZW0gSXRlbSB0byBzZWFyY2ggZm9yLlxuICAgKiBAcGFyYW0ge0FycmF5fSBhcnIgQXJyYXkgdG8gc2VhcmNoIGluLlxuICAgKiBAcmV0dXJuIHtOdW1iZXJ9IGluZGV4IG9mIHRoZSBpdGVtIG9yIC0xIGlmIGl0ZW0gd2FzIG5vdCBmb3VuZC5cbiAgICovXG4gIGluQXJyYXk6IEFyclV0aWxzLmluZGV4T2YsXG5cbiAgaGFzT3duOiBoYXNPd25Qcm9wZXJ0eSxcblxuICBleHRlbmQsXG4gIGNyZWF0ZSxcbiAgd2FsayxcbiAgY3JlYXRlTlMsXG4gIHJlc29sdmUsXG4gIGV4cGxvZGUsXG4gIF9hZGRDYWNoZVN1ZmZpeFxufTtcblxuZXhwb3J0IGRlZmF1bHQgVG9vbHM7Il19