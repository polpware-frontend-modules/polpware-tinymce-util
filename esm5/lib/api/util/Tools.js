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
var whiteSpaceRegExp = /^\s*|\s*$/g;
var trim = function (str) {
    return (str === null || str === undefined) ? '' : ('' + str).replace(whiteSpaceRegExp, '');
};
var ɵ0 = trim;
/**
 * Checks if a object is of a specific type for example an array.
 *
 * @method is
 * @param {Object} obj Object to check type of.
 * @param {string} type Optional type to check for.
 * @return {Boolean} true/false if the object is of the specified type.
 */
var is = function (obj, type) {
    if (!type) {
        return obj !== undefined;
    }
    if (type === 'array' && ArrUtils.isArray(obj)) {
        return true;
    }
    return typeof obj === type;
};
var ɵ1 = is;
/**
 * Makes a name/object map out of an array with names.
 *
 * @method makeMap
 * @param {Array/String} items Items to make map out of.
 * @param {String} delim Optional delimiter to split string by.
 * @param {Object} map Optional map to add items to.
 * @return {Object} Name/value map of items.
 */
var makeMap = function (items, delim, map) {
    var i;
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
var ɵ2 = makeMap;
/**
 * JavaScript does not protect hasOwnProperty method, so it is possible to overwrite it. This is
 * object independent version.
 *
 * @param {Object} obj
 * @param {String} prop
 * @returns {Boolean}
 */
var hasOwnProperty = function (obj, prop) {
    return Object.prototype.hasOwnProperty.call(obj, prop);
};
var ɵ3 = hasOwnProperty;
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
var create = function (s, p, root) {
    var self = this;
    var sp, ns, cn, scn, c, de = 0;
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
var ɵ4 = create;
var extend = function (obj, ext) {
    var x = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        x[_i - 2] = arguments[_i];
    }
    var i, l, name;
    var args = arguments;
    var value;
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
var ɵ5 = extend;
/**
 * Executed the specified function for each item in a object tree.
 *
 * @method walk
 * @param {Object} o Object tree to walk though.
 * @param {function} f Function to call for each item.
 * @param {String} n Optional name of collection inside the objects to walk for example childNodes.
 * @param {String} s Optional scope to execute the function in.
 */
var walk = function (o, f, n, s) {
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
var ɵ6 = walk;
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
var createNS = function (n, o) {
    var i, v;
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
var ɵ7 = createNS;
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
var resolve = function (n, o) {
    var i, l;
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
var ɵ8 = resolve;
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
var explode = function (s, d) {
    if (!s || is(s, 'array')) {
        return s;
    }
    return ArrUtils.map(s.split(d || ','), trim);
};
var ɵ9 = explode;
var _addCacheSuffix = function (url) {
    var cacheSuffix = Env.cacheSuffix;
    if (cacheSuffix) {
        url += (url.indexOf('?') === -1 ? '?' : '&') + cacheSuffix;
    }
    return url;
};
var ɵ10 = _addCacheSuffix;
var Tools = {
    trim: trim,
    /**
     * Returns true/false if the object is an array or not.
     *
     * @method isArray
     * @param {Object} obj Object to check.
     * @return {boolean} true/false state if the object is an array or not.
     */
    isArray: ArrUtils.isArray,
    is: is,
    /**
     * Converts the specified object into a real JavaScript array.
     *
     * @method toArray
     * @param {Object} obj Object to convert into array.
     * @return {Array} Array object based in input.
     */
    toArray: ArrUtils.toArray,
    makeMap: makeMap,
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
    extend: extend,
    create: create,
    walk: walk,
    createNS: createNS,
    resolve: resolve,
    explode: explode,
    _addCacheSuffix: _addCacheSuffix
};
export default Tools;
export { ɵ0, ɵ1, ɵ2, ɵ3, ɵ4, ɵ5, ɵ6, ɵ7, ɵ8, ɵ9, ɵ10 };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVG9vbHMuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AcG9scHdhcmUvdGlueW1jZS11dGlsLyIsInNvdXJjZXMiOlsibGliL2FwaS91dGlsL1Rvb2xzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7OztHQUtHO0FBRUgsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBQzVDLE9BQU8sR0FBRyxNQUFNLFFBQVEsQ0FBQztBQUN6QixPQUFPLFFBQVEsTUFBTSxxQkFBcUIsQ0FBQztBQTJCM0M7Ozs7O0dBS0c7QUFFSDs7Ozs7O0dBTUc7QUFDSCxJQUFNLGdCQUFnQixHQUFHLFlBQVksQ0FBQztBQUV0QyxJQUFNLElBQUksR0FBRyxVQUFVLEdBQUc7SUFDeEIsT0FBTyxDQUFDLEdBQUcsS0FBSyxJQUFJLElBQUksR0FBRyxLQUFLLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxHQUFHLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxnQkFBZ0IsRUFBRSxFQUFFLENBQUMsQ0FBQztBQUM3RixDQUFDLENBQUM7O0FBRUY7Ozs7Ozs7R0FPRztBQUNILElBQU0sRUFBRSxHQUFHLFVBQVUsR0FBNkIsRUFBRSxJQUFZO0lBQzlELElBQUksQ0FBQyxJQUFJLEVBQUU7UUFDVCxPQUFPLEdBQUcsS0FBSyxTQUFTLENBQUM7S0FDMUI7SUFFRCxJQUFJLElBQUksS0FBSyxPQUFPLElBQUksUUFBUSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsRUFBRTtRQUM3QyxPQUFPLElBQUksQ0FBQztLQUNiO0lBRUQsT0FBTyxPQUFPLEdBQUcsS0FBSyxJQUFJLENBQUM7QUFDN0IsQ0FBQyxDQUFDOztBQUVGOzs7Ozs7OztHQVFHO0FBQ0gsSUFBTSxPQUFPLEdBQUcsVUFBVSxLQUFLLEVBQUUsS0FBTSxFQUFFLEdBQUk7SUFDM0MsSUFBSSxDQUFDLENBQUM7SUFFTixLQUFLLEdBQUcsS0FBSyxJQUFJLEVB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QUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLFdBQVcsQ0FBQztLQUM1RDtJQUVELE9BQU8sR0FBRyxDQUFDO0FBQ2IsQ0FBQyxDQUFDOztBQUVGLElBQU0sS0FBSyxHQUFVO0lBQ25CLElBQUksTUFBQTtJQUVKOzs7Ozs7T0FNRztJQUNILE9BQU8sRUFBRSxRQUFRLENBQUMsT0FBTztJQUV6QixFQUFFLElBQUE7SUFFRjs7Ozs7O09BTUc7SUFDSCxPQUFPLEVBQUUsUUFBUSxDQUFDLE9BQU87SUFDekIsT0FBTyxTQUFBO0lBRVA7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7T0FtQkc7SUFDSCxJQUFJLEVBQUUsUUFBUSxDQUFDLElBQUk7SUFFbkI7Ozs7Ozs7O09BUUc7SUFDSCxHQUFHLEVBQUUsUUFBUSxDQUFDLEdBQUc7SUFFakI7Ozs7Ozs7Ozs7O09BV0c7SUFDSCxJQUFJLEVBQUUsUUFBUSxDQUFDLE1BQU07SUFFckI7Ozs7Ozs7T0FPRztJQUNILE9BQU8sRUFBRSxRQUFRLENBQUMsT0FBTztJQUV6QixNQUFNLEVBQUUsY0FBYztJQUV0QixNQUFNLFFBQUE7SUFDTixNQUFNLFFBQUE7SUFDTixJQUFJLE1BQUE7SUFDSixRQUFRLFVBQUE7SUFDUixPQUFPLFNBQUE7SUFDUCxPQUFPLFNBQUE7SUFDUCxlQUFlLGlCQUFBO0NBQ2hCLENBQUM7QUFFRixlQUFlLEtBQUssQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQ29weXJpZ2h0IChjKSBUaW55IFRlY2hub2xvZ2llcywgSW5jLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICogTGljZW5zZWQgdW5kZXIgdGhlIExHUEwgb3IgYSBjb21tZXJjaWFsIGxpY2Vuc2UuXG4gKiBGb3IgTEdQTCBzZWUgTGljZW5zZS50eHQgaW4gdGhlIHByb2plY3Qgcm9vdCBmb3IgbGljZW5zZSBpbmZvcm1hdGlvbi5cbiAqIEZvciBjb21tZXJjaWFsIGxpY2Vuc2VzIHNlZSBodHRwczovL3d3dy50aW55LmNsb3VkL1xuICovXG5cbmltcG9ydCB7IHdpbmRvdyB9IGZyb20gJ0BlcGhveC9kb20tZ2xvYmFscyc7XG5pbXBvcnQgRW52IGZyb20gJy4uL0Vudic7XG5pbXBvcnQgQXJyVXRpbHMgZnJvbSAnLi4vLi4vdXRpbC9BcnJVdGlscyc7XG5cbnR5cGUgQXJyYXlDYWxsYmFjazxULCBSPiA9ICh4OiBULCBpOiBudW1iZXIsIHhzOiBSZWFkb25seUFycmF5PFQ+KSA9PiBSO1xudHlwZSBPYmpDYWxsYmFjazxULCBSPiA9ICh2YWx1ZTogVFtrZXlvZiBUXSwga2V5OiBzdHJpbmcsIG9iajogVCkgPT4gUjtcblxuaW50ZXJmYWNlIFRvb2xzIHtcbiAgaXMgKG9iajogYW55LCB0eXBlOiBzdHJpbmcpOiBib29sZWFuO1xuICBpc0FycmF5IDxUPihUOiBhbnkpOiBUIGlzIEFycmF5TGlrZTxUPjtcbiAgaW5BcnJheSA8VD4oYXJyOiBBcnJheUxpa2U8VD4sIHZhbHVlOiBUKTogbnVtYmVyO1xuICBncmVwIDxUPihhcnI6IEFycmF5TGlrZTxUPiwgcHJlZD86IEFycmF5Q2FsbGJhY2s8VCwgYm9vbGVhbj4pO1xuICB0cmltIChzdHI6IHN0cmluZyk6IHN0cmluZztcbiAgdG9BcnJheSA8VD4ob2JqOiBBcnJheUxpa2U8VD4pOiBUW107XG4gIGhhc093biAob2JqOiBhbnksIG5hbWU6IHN0cmluZyk6IGJvb2xlYW47XG4gIG1ha2VNYXAgPFQ+KGl0ZW1zOiBBcnJheUxpa2U8VD4gfCBzdHJpbmcsIGRlbGltPzogc3RyaW5nIHwgUmVnRXhwLCBtYXA/OiBSZWNvcmQ8c3RyaW5nLCBUIHwgc3RyaW5nPik6IFJlY29yZDxzdHJpbmcsIFQgfCBzdHJpbmc+O1xuICBlYWNoIDxUPihhcnI6IFJlYWRvbmx5QXJyYXk8VD4sIGNiOiBBcnJheUNhbGxiYWNrPFQsIGFueT4sIHNjb3BlPzogYW55KTogdm9pZDtcbiAgZWFjaCA8VD4ob2JqOiBULCBjYjogT2JqQ2FsbGJhY2s8VCwgYW55Piwgc2NvcGU/OiBhbnkpOiB2b2lkO1xuICBtYXAgPFQsIFU+KGFycjogUmVhZG9ubHlBcnJheTxUPiwgY2I6IEFycmF5Q2FsbGJhY2s8VCwgVT4sIHNjb3BlPzogYW55KTogQXJyYXk8VT47XG4gIG1hcCA8VCwgVT4ob2JqOiBULCBjYjogT2JqQ2FsbGJhY2s8VCwgVT4sIHNjb3BlPzogYW55KTogQXJyYXk8VT47XG4gIGV4dGVuZCAob2JqOiB7fSwgZXh0OiB7fSwgLi4ub2Jqczoge31bXSk6IGFueTtcbiAgY3JlYXRlIChuYW1lOiBzdHJpbmcsIHA6IHt9LCByb290Pzoge30pO1xuICB3YWxrIDxUID0ge30+KG9iajogVCwgZjogRnVuY3Rpb24sIG4/OiBrZXlvZiBULCBzY29wZT86IGFueSk6IHZvaWQ7XG4gIGNyZWF0ZU5TIChuYW1lOiBzdHJpbmcsIG8/OiB7fSk6IGFueTtcbiAgcmVzb2x2ZSAocGF0aDogc3RyaW5nLCBvPzoge30pOiBhbnk7XG4gIGV4cGxvZGUgKHM6IHN0cmluZywgZD86IHN0cmluZyB8IFJlZ0V4cCk6IHN0cmluZ1tdO1xuICBfYWRkQ2FjaGVTdWZmaXggKHVybDogc3RyaW5nKTogc3RyaW5nO1xufVxuXG4vKipcbiAqIFRoaXMgY2xhc3MgY29udGFpbnMgdmFyaW91cyB1dGxpdHkgZnVuY3Rpb25zLiBUaGVzZSBhcmUgYWxzbyBleHBvc2VkXG4gKiBkaXJlY3RseSBvbiB0aGUgdGlueW1jZSBuYW1lc3BhY2UuXG4gKlxuICogQGNsYXNzIHRpbnltY2UudXRpbC5Ub29sc1xuICovXG5cbi8qKlxuICogUmVtb3ZlcyB3aGl0ZXNwYWNlIGZyb20gdGhlIGJlZ2lubmluZyBhbmQgZW5kIG9mIGEgc3RyaW5nLlxuICpcbiAqIEBtZXRob2QgdHJpbVxuICogQHBhcmFtIHtTdHJpbmd9IHMgU3RyaW5nIHRvIHJlbW92ZSB3aGl0ZXNwYWNlIGZyb20uXG4gKiBAcmV0dXJuIHtTdHJpbmd9IE5ldyBzdHJpbmcgd2l0aCByZW1vdmVkIHdoaXRlc3BhY2UuXG4gKi9cbmNvbnN0IHdoaXRlU3BhY2VSZWdFeHAgPSAvXlxccyp8XFxzKiQvZztcblxuY29uc3QgdHJpbSA9IGZ1bmN0aW9uIChzdHIpIHtcbiAgcmV0dXJuIChzdHIgPT09IG51bGwgfHwgc3RyID09PSB1bmRlZmluZWQpID8gJycgOiAoJycgKyBzdHIpLnJlcGxhY2Uod2hpdGVTcGFjZVJlZ0V4cCwgJycpO1xufTtcblxuLyoqXG4gKiBDaGVja3MgaWYgYSBvYmplY3QgaXMgb2YgYSBzcGVjaWZpYyB0eXBlIGZvciBleGFtcGxlIGFuIGFycmF5LlxuICpcbiAqIEBtZXRob2QgaXNcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmogT2JqZWN0IHRvIGNoZWNrIHR5cGUgb2YuXG4gKiBAcGFyYW0ge3N0cmluZ30gdHlwZSBPcHRpb25hbCB0eXBlIHRvIGNoZWNrIGZvci5cbiAqIEByZXR1cm4ge0Jvb2xlYW59IHRydWUvZmFsc2UgaWYgdGhlIG9iamVjdCBpcyBvZiB0aGUgc3BlY2lmaWVkIHR5cGUuXG4gKi9cbmNvbnN0IGlzID0gZnVuY3Rpb24gKG9iajogUmVjb3JkPHN0cmluZywgYW55PiB8IHt9LCB0eXBlOiBzdHJpbmcpIHtcbiAgaWYgKCF0eXBlKSB7XG4gICAgcmV0dXJuIG9iaiAhPT0gdW5kZWZpbmVkO1xuICB9XG5cbiAgaWYgKHR5cGUgPT09ICdhcnJheScgJiYgQXJyVXRpbHMuaXNBcnJheShvYmopKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICByZXR1cm4gdHlwZW9mIG9iaiA9PT0gdHlwZTtcbn07XG5cbi8qKlxuICogTWFrZXMgYSBuYW1lL29iamVjdCBtYXAgb3V0IG9mIGFuIGFycmF5IHdpdGggbmFtZXMuXG4gKlxuICogQG1ldGhvZCBtYWtlTWFwXG4gKiBAcGFyYW0ge0FycmF5L1N0cmluZ30gaXRlbXMgSXRlbXMgdG8gbWFrZSBtYXAgb3V0IG9mLlxuICogQHBhcmFtIHtTdHJpbmd9IGRlbGltIE9wdGlvbmFsIGRlbGltaXRlciB0byBzcGxpdCBzdHJpbmcgYnkuXG4gKiBAcGFyYW0ge09iamVjdH0gbWFwIE9wdGlvbmFsIG1hcCB0byBhZGQgaXRlbXMgdG8uXG4gKiBAcmV0dXJuIHtPYmplY3R9IE5hbWUvdmFsdWUgbWFwIG9mIGl0ZW1zLlxuICovXG5jb25zdCBtYWtlTWFwID0gZnVuY3Rpb24gKGl0ZW1zLCBkZWxpbT8sIG1hcD8pIHtcbiAgbGV0IGk7XG5cbiAgaXRlbXMgPSBpdGVtcyB8fCBbXTtcbiAgZGVsaW0gPSBkZWxpbSB8fCAnLCc7XG5cbiAgaWYgKHR5cGVvZiBpdGVtcyA9PT0gJ3N0cmluZycpIHtcbiAgICBpdGVtcyA9IGl0ZW1zLnNwbGl0KGRlbGltKTtcbiAgfVxuXG4gIG1hcCA9IG1hcCB8fCB7fTtcblxuICBpID0gaXRlbXMubGVuZ3RoO1xuICB3aGlsZSAoaS0tKSB7XG4gICAgbWFwW2l0ZW1zW2ldXSA9IHt9O1xuICB9XG5cbiAgcmV0dXJuIG1hcDtcbn07XG5cbi8qKlxuICogSmF2YVNjcmlwdCBkb2VzIG5vdCBwcm90ZWN0IGhhc093blByb3BlcnR5IG1ldGhvZCwgc28gaXQgaXMgcG9zc2libGUgdG8gb3ZlcndyaXRlIGl0LiBUaGlzIGlzXG4gKiBvYmplY3QgaW5kZXBlbmRlbnQgdmVyc2lvbi5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqXG4gKiBAcGFyYW0ge1N0cmluZ30gcHJvcFxuICogQHJldHVybnMge0Jvb2xlYW59XG4gKi9cbmNvbnN0IGhhc093blByb3BlcnR5ID0gZnVuY3Rpb24gKG9iaiwgcHJvcCkge1xuICByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCk7XG59O1xuXG4vKipcbiAqIENyZWF0ZXMgYSBjbGFzcywgc3ViY2xhc3Mgb3Igc3RhdGljIHNpbmdsZXRvbi5cbiAqIE1vcmUgZGV0YWlscyBvbiB0aGlzIG1ldGhvZCBjYW4gYmUgZm91bmQgaW4gdGhlIFdpa2kuXG4gKlxuICogQG1ldGhvZCBjcmVhdGVcbiAqIEBwYXJhbSB7U3RyaW5nfSBzIENsYXNzIG5hbWUsIGluaGVyaXRhbmNlIGFuZCBwcmVmaXguXG4gKiBAcGFyYW0ge09iamVjdH0gcCBDb2xsZWN0aW9uIG9mIG1ldGhvZHMgdG8gYWRkIHRvIHRoZSBjbGFzcy5cbiAqIEBwYXJhbSB7T2JqZWN0fSByb290IE9wdGlvbmFsIHJvb3Qgb2JqZWN0IGRlZmF1bHRzIHRvIHRoZSBnbG9iYWwgd2luZG93IG9iamVjdC5cbiAqIEBleGFtcGxlXG4gKiAvLyBDcmVhdGVzIGEgYmFzaWMgY2xhc3NcbiAqIHRpbnltY2UuY3JlYXRlKCd0aW55bWNlLnNvbWVwYWNrYWdlLlNvbWVDbGFzcycsIHtcbiAqICAgICBTb21lQ2xhc3M6IGZ1bmN0aW9uKCkge1xuICogICAgICAgICAvLyBDbGFzcyBjb25zdHJ1Y3RvclxuICogICAgIH0sXG4gKlxuICogICAgIG1ldGhvZDogZnVuY3Rpb24oKSB7XG4gKiAgICAgICAgIC8vIFNvbWUgbWV0aG9kXG4gKiAgICAgfVxuICogfSk7XG4gKlxuICogLy8gQ3JlYXRlcyBhIGJhc2ljIHN1YmNsYXNzIGNsYXNzXG4gKiB0aW55bWNlLmNyZWF0ZSgndGlueW1jZS5zb21lcGFja2FnZS5Tb21lU3ViQ2xhc3M6dGlueW1jZS5zb21lcGFja2FnZS5Tb21lQ2xhc3MnLCB7XG4gKiAgICAgU29tZVN1YkNsYXNzOiBmdW5jdGlvbigpIHtcbiAqICAgICAgICAgLy8gQ2xhc3MgY29uc3RydWN0b3JcbiAqICAgICAgICAgdGhpcy5wYXJlbnQoKTsgLy8gQ2FsbCBwYXJlbnQgY29uc3RydWN0b3JcbiAqICAgICB9LFxuICpcbiAqICAgICBtZXRob2Q6IGZ1bmN0aW9uKCkge1xuICogICAgICAgICAvLyBTb21lIG1ldGhvZFxuICogICAgICAgICB0aGlzLnBhcmVudCgpOyAvLyBDYWxsIHBhcmVudCBtZXRob2RcbiAqICAgICB9LFxuICpcbiAqICAgICAnc3RhdGljJzoge1xuICogICAgICAgICBzdGF0aWNNZXRob2Q6IGZ1bmN0aW9uKCkge1xuICogICAgICAgICAgICAgLy8gU3RhdGljIG1ldGhvZFxuICogICAgICAgICB9XG4gKiAgICAgfVxuICogfSk7XG4gKlxuICogLy8gQ3JlYXRlcyBhIHNpbmdsZXRvbi9zdGF0aWMgY2xhc3NcbiAqIHRpbnltY2UuY3JlYXRlKCdzdGF0aWMgdGlueW1jZS5zb21lcGFja2FnZS5Tb21lU2luZ2xldG9uQ2xhc3MnLCB7XG4gKiAgICAgbWV0aG9kOiBmdW5jdGlvbigpIHtcbiAqICAgICAgICAgLy8gU29tZSBtZXRob2RcbiAqICAgICB9XG4gKiB9KTtcbiAqL1xuY29uc3QgY3JlYXRlID0gZnVuY3Rpb24gKHMsIHAsIHJvb3Q/KSB7XG4gIGNvbnN0IHNlbGYgPSB0aGlzO1xuICBsZXQgc3AsIG5zLCBjbiwgc2NuLCBjLCBkZSA9IDA7XG5cbiAgLy8gUGFyc2UgOiA8cHJlZml4PiA8Y2xhc3M+OjxzdXBlciBjbGFzcz5cbiAgcyA9IC9eKChzdGF0aWMpICk/KFtcXHcuXSspKDooW1xcdy5dKykpPy8uZXhlYyhzKTtcbiAgY24gPSBzWzNdLm1hdGNoKC8oXnxcXC4pKFxcdyspJC9pKVsyXTsgLy8gQ2xhc3MgbmFtZVxuXG4gIC8vIENyZWF0ZSBuYW1lc3BhY2UgZm9yIG5ldyBjbGFzc1xuICBucyA9IHNlbGYuY3JlYXRlTlMoc1szXS5yZXBsYWNlKC9cXC5cXHcrJC8sICcnKSwgcm9vdCk7XG5cbiAgLy8gQ2xhc3MgYWxyZWFkeSBleGlzdHNcbiAgaWYgKG5zW2NuXSkge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIC8vIE1ha2UgcHVyZSBzdGF0aWMgY2xhc3NcbiAgaWYgKHNbMl0gPT09ICdzdGF0aWMnKSB7XG4gICAgbnNbY25dID0gcDtcblxuICAgIGlmICh0aGlzLm9uQ3JlYXRlKSB7XG4gICAgICB0aGlzLm9uQ3JlYXRlKHNbMl0sIHNbM10sIG5zW2NuXSk7XG4gICAgfVxuXG4gICAgcmV0dXJuO1xuICB9XG5cbiAgLy8gQ3JlYXRlIGRlZmF1bHQgY29uc3RydWN0b3JcbiAgaWYgKCFwW2NuXSkge1xuICAgIHBbY25dID0gZnVuY3Rpb24gKCkgeyB9O1xuICAgIGRlID0gMTtcbiAgfVxuXG4gIC8vIEFkZCBjb25zdHJ1Y3RvciBhbmQgbWV0aG9kc1xuICBuc1tjbl0gPSBwW2NuXTtcbiAgc2VsZi5leHRlbmQobnNbY25dLnByb3RvdHlwZSwgcCk7XG5cbiAgLy8gRXh0ZW5kXG4gIGlmIChzWzVdKSB7XG4gICAgc3AgPSBzZWxmLnJlc29sdmUoc1s1XSkucHJvdG90eXBlO1xuICAgIHNjbiA9IHNbNV0ubWF0Y2goL1xcLihcXHcrKSQvaSlbMV07IC8vIENsYXNzIG5hbWVcblxuICAgIC8vIEV4dGVuZCBjb25zdHJ1Y3RvclxuICAgIGMgPSBuc1tjbl07XG4gICAgaWYgKGRlKSB7XG4gICAgICAvLyBBZGQgcGFzc3Rocm91Z2ggY29uc3RydWN0b3JcbiAgICAgIG5zW2NuXSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHNwW3Njbl0uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgIH07XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIEFkZCBpbmhlcml0IGNvbnN0cnVjdG9yXG4gICAgICBuc1tjbl0gPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMucGFyZW50ID0gc3Bbc2NuXTtcbiAgICAgICAgcmV0dXJuIGMuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgIH07XG4gICAgfVxuICAgIG5zW2NuXS5wcm90b3R5cGVbY25dID0gbnNbY25dO1xuXG4gICAgLy8gQWRkIHN1cGVyIG1ldGhvZHNcbiAgICBzZWxmLmVhY2goc3AsIGZ1bmN0aW9uIChmLCBuKSB7XG4gICAgICBuc1tjbl0ucHJvdG90eXBlW25dID0gc3Bbbl07XG4gICAgfSk7XG5cbiAgICAvLyBBZGQgb3ZlcnJpZGRlbiBtZXRob2RzXG4gICAgc2VsZi5lYWNoKHAsIGZ1bmN0aW9uIChmLCBuKSB7XG4gICAgICAvLyBFeHRlbmQgbWV0aG9kcyBpZiBuZWVkZWRcbiAgICAgIGlmIChzcFtuXSkge1xuICAgICAgICBuc1tjbl0ucHJvdG90eXBlW25dID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgIHRoaXMucGFyZW50ID0gc3Bbbl07XG4gICAgICAgICAgcmV0dXJuIGYuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgICAgfTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmIChuICE9PSBjbikge1xuICAgICAgICAgIG5zW2NuXS5wcm90b3R5cGVbbl0gPSBmO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICAvLyBBZGQgc3RhdGljIG1ldGhvZHNcbiAgLypqc2hpbnQgc3ViOnRydWUqL1xuICAvKmVzbGludCBkb3Qtbm90YXRpb246MCovXG4gIHNlbGYuZWFjaChwLnN0YXRpYywgZnVuY3Rpb24gKGYsIG4pIHtcbiAgICBuc1tjbl1bbl0gPSBmO1xuICB9KTtcbn07XG5cbmNvbnN0IGV4dGVuZCA9IGZ1bmN0aW9uIChvYmosIGV4dCwgLi4ueDogYW55W10pIHtcbiAgbGV0IGksIGwsIG5hbWU7XG4gIGNvbnN0IGFyZ3MgPSBhcmd1bWVudHM7XG4gIGxldCB2YWx1ZTtcblxuICBmb3IgKGkgPSAxLCBsID0gYXJncy5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICBleHQgPSBhcmdzW2ldO1xuICAgIGZvciAobmFtZSBpbiBleHQpIHtcbiAgICAgIGlmIChleHQuaGFzT3duUHJvcGVydHkobmFtZSkpIHtcbiAgICAgICAgdmFsdWUgPSBleHRbbmFtZV07XG5cbiAgICAgICAgaWYgKHZhbHVlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICBvYmpbbmFtZV0gPSB2YWx1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiBvYmo7XG59O1xuXG4vKipcbiAqIEV4ZWN1dGVkIHRoZSBzcGVjaWZpZWQgZnVuY3Rpb24gZm9yIGVhY2ggaXRlbSBpbiBhIG9iamVjdCB0cmVlLlxuICpcbiAqIEBtZXRob2Qgd2Fsa1xuICogQHBhcmFtIHtPYmplY3R9IG8gT2JqZWN0IHRyZWUgdG8gd2FsayB0aG91Z2guXG4gKiBAcGFyYW0ge2Z1bmN0aW9ufSBmIEZ1bmN0aW9uIHRvIGNhbGwgZm9yIGVhY2ggaXRlbS5cbiAqIEBwYXJhbSB7U3RyaW5nfSBuIE9wdGlvbmFsIG5hbWUgb2YgY29sbGVjdGlvbiBpbnNpZGUgdGhlIG9iamVjdHMgdG8gd2FsayBmb3IgZXhhbXBsZSBjaGlsZE5vZGVzLlxuICogQHBhcmFtIHtTdHJpbmd9IHMgT3B0aW9uYWwgc2NvcGUgdG8gZXhlY3V0ZSB0aGUgZnVuY3Rpb24gaW4uXG4gKi9cbmNvbnN0IHdhbGsgPSBmdW5jdGlvbiAobywgZiwgbj8sIHM/KSB7XG4gIHMgPSBzIHx8IHRoaXM7XG5cbiAgaWYgKG8pIHtcbiAgICBpZiAobikge1xuICAgICAgbyA9IG9bbl07XG4gICAgfVxuXG4gICAgQXJyVXRpbHMuZWFjaChvLCBmdW5jdGlvbiAobywgaSkge1xuICAgICAgaWYgKGYuY2FsbChzLCBvLCBpLCBuKSA9PT0gZmFsc2UpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuXG4gICAgICB3YWxrKG8sIGYsIG4sIHMpO1xuICAgIH0pO1xuICB9XG59O1xuXG4vKipcbiAqIENyZWF0ZXMgYSBuYW1lc3BhY2Ugb24gYSBzcGVjaWZpYyBvYmplY3QuXG4gKlxuICogQG1ldGhvZCBjcmVhdGVOU1xuICogQHBhcmFtIHtTdHJpbmd9IG4gTmFtZXNwYWNlIHRvIGNyZWF0ZSBmb3IgZXhhbXBsZSBhLmIuYy5kLlxuICogQHBhcmFtIHtPYmplY3R9IG8gT3B0aW9uYWwgb2JqZWN0IHRvIGFkZCBuYW1lc3BhY2UgdG8sIGRlZmF1bHRzIHRvIHdpbmRvdy5cbiAqIEByZXR1cm4ge09iamVjdH0gTmV3IG5hbWVzcGFjZSBvYmplY3QgdGhlIGxhc3QgaXRlbSBpbiBwYXRoLlxuICogQGV4YW1wbGVcbiAqIC8vIENyZWF0ZSBzb21lIG5hbWVzcGFjZVxuICogdGlueW1jZS5jcmVhdGVOUygndGlueW1jZS5zb21lcGFja2FnZS5zdWJwYWNrYWdlJyk7XG4gKlxuICogLy8gQWRkIGEgc2luZ2xldG9uXG4gKiB2YXIgdGlueW1jZS5zb21lcGFja2FnZS5zdWJwYWNrYWdlLlNvbWVTaW5nbGV0b24gPSB7XG4gKiAgICAgbWV0aG9kOiBmdW5jdGlvbigpIHtcbiAqICAgICAgICAgLy8gU29tZSBtZXRob2RcbiAqICAgICB9XG4gKiB9O1xuICovXG5jb25zdCBjcmVhdGVOUyA9IGZ1bmN0aW9uIChuLCBvPykge1xuICBsZXQgaSwgdjtcblxuICBvID0gbyB8fCB3aW5kb3c7XG5cbiAgbiA9IG4uc3BsaXQoJy4nKTtcbiAgZm9yIChpID0gMDsgaSA8IG4ubGVuZ3RoOyBpKyspIHtcbiAgICB2ID0gbltpXTtcblxuICAgIGlmICghb1t2XSkge1xuICAgICAgb1t2XSA9IHt9O1xuICAgIH1cblxuICAgIG8gPSBvW3ZdO1xuICB9XG5cbiAgcmV0dXJuIG87XG59O1xuXG4vKipcbiAqIFJlc29sdmVzIGEgc3RyaW5nIGFuZCByZXR1cm5zIHRoZSBvYmplY3QgZnJvbSBhIHNwZWNpZmljIHN0cnVjdHVyZS5cbiAqXG4gKiBAbWV0aG9kIHJlc29sdmVcbiAqIEBwYXJhbSB7U3RyaW5nfSBuIFBhdGggdG8gcmVzb2x2ZSBmb3IgZXhhbXBsZSBhLmIuYy5kLlxuICogQHBhcmFtIHtPYmplY3R9IG8gT3B0aW9uYWwgb2JqZWN0IHRvIHNlYXJjaCB0aG91Z2gsIGRlZmF1bHRzIHRvIHdpbmRvdy5cbiAqIEByZXR1cm4ge09iamVjdH0gTGFzdCBvYmplY3QgaW4gcGF0aCBvciBudWxsIGlmIGl0IGNvdWxkbid0IGJlIHJlc29sdmVkLlxuICogQGV4YW1wbGVcbiAqIC8vIFJlc29sdmUgYSBwYXRoIGludG8gYW4gb2JqZWN0IHJlZmVyZW5jZVxuICogdmFyIG9iaiA9IHRpbnltY2UucmVzb2x2ZSgnYS5iLmMuZCcpO1xuICovXG5jb25zdCByZXNvbHZlID0gZnVuY3Rpb24gKG4sIG8/KSB7XG4gIGxldCBpLCBsO1xuXG4gIG8gPSBvIHx8IHdpbmRvdztcblxuICBuID0gbi5zcGxpdCgnLicpO1xuICBmb3IgKGkgPSAwLCBsID0gbi5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICBvID0gb1tuW2ldXTtcblxuICAgIGlmICghbykge1xuICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIG87XG59O1xuXG4vKipcbiAqIFNwbGl0cyBhIHN0cmluZyBidXQgcmVtb3ZlcyB0aGUgd2hpdGVzcGFjZSBiZWZvcmUgYW5kIGFmdGVyIGVhY2ggdmFsdWUuXG4gKlxuICogQG1ldGhvZCBleHBsb2RlXG4gKiBAcGFyYW0ge3N0cmluZ30gcyBTdHJpbmcgdG8gc3BsaXQuXG4gKiBAcGFyYW0ge3N0cmluZ30gZCBEZWxpbWl0ZXIgdG8gc3BsaXQgYnkuXG4gKiBAZXhhbXBsZVxuICogLy8gU3BsaXQgYSBzdHJpbmcgaW50byBhbiBhcnJheSB3aXRoIGEsYixjXG4gKiB2YXIgYXJyID0gdGlueW1jZS5leHBsb2RlKCdhLCBiLCAgIGMnKTtcbiAqL1xuY29uc3QgZXhwbG9kZSA9IGZ1bmN0aW9uIChzLCBkPykge1xuICBpZiAoIXMgfHwgaXMocywgJ2FycmF5JykpIHtcbiAgICByZXR1cm4gcztcbiAgfVxuXG4gIHJldHVybiBBcnJVdGlscy5tYXAocy5zcGxpdChkIHx8ICcsJyksIHRyaW0pO1xufTtcblxuY29uc3QgX2FkZENhY2hlU3VmZml4ID0gZnVuY3Rpb24gKHVybCkge1xuICBjb25zdCBjYWNoZVN1ZmZpeCA9IEVudi5jYWNoZVN1ZmZpeDtcblxuICBpZiAoY2FjaGVTdWZmaXgpIHtcbiAgICB1cmwgKz0gKHVybC5pbmRleE9mKCc/JykgPT09IC0xID8gJz8nIDogJyYnKSArIGNhY2hlU3VmZml4O1xuICB9XG5cbiAgcmV0dXJuIHVybDtcbn07XG5cbmNvbnN0IFRvb2xzOiBUb29scyA9IHtcbiAgdHJpbSxcblxuICAvKipcbiAgICogUmV0dXJucyB0cnVlL2ZhbHNlIGlmIHRoZSBvYmplY3QgaXMgYW4gYXJyYXkgb3Igbm90LlxuICAgKlxuICAgKiBAbWV0aG9kIGlzQXJyYXlcbiAgICogQHBhcmFtIHtPYmplY3R9IG9iaiBPYmplY3QgdG8gY2hlY2suXG4gICAqIEByZXR1cm4ge2Jvb2xlYW59IHRydWUvZmFsc2Ugc3RhdGUgaWYgdGhlIG9iamVjdCBpcyBhbiBhcnJheSBvciBub3QuXG4gICAqL1xuICBpc0FycmF5OiBBcnJVdGlscy5pc0FycmF5LFxuXG4gIGlzLFxuXG4gIC8qKlxuICAgKiBDb252ZXJ0cyB0aGUgc3BlY2lmaWVkIG9iamVjdCBpbnRvIGEgcmVhbCBKYXZhU2NyaXB0IGFycmF5LlxuICAgKlxuICAgKiBAbWV0aG9kIHRvQXJyYXlcbiAgICogQHBhcmFtIHtPYmplY3R9IG9iaiBPYmplY3QgdG8gY29udmVydCBpbnRvIGFycmF5LlxuICAgKiBAcmV0dXJuIHtBcnJheX0gQXJyYXkgb2JqZWN0IGJhc2VkIGluIGlucHV0LlxuICAgKi9cbiAgdG9BcnJheTogQXJyVXRpbHMudG9BcnJheSxcbiAgbWFrZU1hcCxcblxuICAvKipcbiAgICogUGVyZm9ybXMgYW4gaXRlcmF0aW9uIG9mIGFsbCBpdGVtcyBpbiBhIGNvbGxlY3Rpb24gc3VjaCBhcyBhbiBvYmplY3Qgb3IgYXJyYXkuIFRoaXMgbWV0aG9kIHdpbGwgZXhlY3VyZSB0aGVcbiAgICogY2FsbGJhY2sgZnVuY3Rpb24gZm9yIGVhY2ggaXRlbSBpbiB0aGUgY29sbGVjdGlvbiwgaWYgdGhlIGNhbGxiYWNrIHJldHVybnMgZmFsc2UgdGhlIGl0ZXJhdGlvbiB3aWxsIHRlcm1pbmF0ZS5cbiAgICogVGhlIGNhbGxiYWNrIGhhcyB0aGUgZm9sbG93aW5nIGZvcm1hdDogY2IodmFsdWUsIGtleV9vcl9pbmRleCkuXG4gICAqXG4gICAqIEBtZXRob2QgZWFjaFxuICAgKiBAcGFyYW0ge09iamVjdH0gbyBDb2xsZWN0aW9uIHRvIGl0ZXJhdGUuXG4gICAqIEBwYXJhbSB7ZnVuY3Rpb259IGNiIENhbGxiYWNrIGZ1bmN0aW9uIHRvIGV4ZWN1dGUgZm9yIGVhY2ggaXRlbS5cbiAgICogQHBhcmFtIHtPYmplY3R9IHMgT3B0aW9uYWwgc2NvcGUgdG8gZXhlY3V0ZSB0aGUgY2FsbGJhY2sgaW4uXG4gICAqIEBleGFtcGxlXG4gICAqIC8vIEl0ZXJhdGUgYW4gYXJyYXlcbiAgICogdGlueW1jZS5lYWNoKFsxLDIsM10sIGZ1bmN0aW9uKHYsIGkpIHtcbiAgICogICAgIGNvbnNvbGUuZGVidWcoXCJWYWx1ZTogXCIgKyB2ICsgXCIsIEluZGV4OiBcIiArIGkpO1xuICAgKiB9KTtcbiAgICpcbiAgICogLy8gSXRlcmF0ZSBhbiBvYmplY3RcbiAgICogdGlueW1jZS5lYWNoKHthOiAxLCBiOiAyLCBjOiAzXSwgZnVuY3Rpb24odiwgaykge1xuICAgKiAgICAgY29uc29sZS5kZWJ1ZyhcIlZhbHVlOiBcIiArIHYgKyBcIiwgS2V5OiBcIiArIGspO1xuICAgKiB9KTtcbiAgICovXG4gIGVhY2g6IEFyclV0aWxzLmVhY2gsXG5cbiAgLyoqXG4gICAqIENyZWF0ZXMgYSBuZXcgYXJyYXkgYnkgdGhlIHJldHVybiB2YWx1ZSBvZiBlYWNoIGl0ZXJhdGlvbiBmdW5jdGlvbiBjYWxsLiBUaGlzIGVuYWJsZXMgeW91IHRvIGNvbnZlcnRcbiAgICogb25lIGFycmF5IGxpc3QgaW50byBhbm90aGVyLlxuICAgKlxuICAgKiBAbWV0aG9kIG1hcFxuICAgKiBAcGFyYW0ge0FycmF5fSBhcnJheSBBcnJheSBvZiBpdGVtcyB0byBpdGVyYXRlLlxuICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBjYWxsYmFjayBGdW5jdGlvbiB0byBjYWxsIGZvciBlYWNoIGl0ZW0uIEl0J3MgcmV0dXJuIHZhbHVlIHdpbGwgYmUgdGhlIG5ldyB2YWx1ZS5cbiAgICogQHJldHVybiB7QXJyYXl9IEFycmF5IHdpdGggbmV3IHZhbHVlcyBiYXNlZCBvbiBmdW5jdGlvbiByZXR1cm4gdmFsdWVzLlxuICAgKi9cbiAgbWFwOiBBcnJVdGlscy5tYXAsXG5cbiAgLyoqXG4gICAqIEZpbHRlcnMgb3V0IGl0ZW1zIGZyb20gdGhlIGlucHV0IGFycmF5IGJ5IGNhbGxpbmcgdGhlIHNwZWNpZmllZCBmdW5jdGlvbiBmb3IgZWFjaCBpdGVtLlxuICAgKiBJZiB0aGUgZnVuY3Rpb24gcmV0dXJucyBmYWxzZSB0aGUgaXRlbSB3aWxsIGJlIGV4Y2x1ZGVkIGlmIGl0IHJldHVybnMgdHJ1ZSBpdCB3aWxsIGJlIGluY2x1ZGVkLlxuICAgKlxuICAgKiBAbWV0aG9kIGdyZXBcbiAgICogQHBhcmFtIHtBcnJheX0gYSBBcnJheSBvZiBpdGVtcyB0byBsb29wIHRob3VnaC5cbiAgICogQHBhcmFtIHtmdW5jdGlvbn0gZiBGdW5jdGlvbiB0byBjYWxsIGZvciBlYWNoIGl0ZW0uIEluY2x1ZGUvZXhjbHVkZSBkZXBlbmRzIG9uIGl0J3MgcmV0dXJuIHZhbHVlLlxuICAgKiBAcmV0dXJuIHtBcnJheX0gTmV3IGFycmF5IHdpdGggdmFsdWVzIGltcG9ydGVkIGFuZCBmaWx0ZXJlZCBiYXNlZCBpbiBpbnB1dC5cbiAgICogQGV4YW1wbGVcbiAgICogLy8gRmlsdGVyIG91dCBzb21lIGl0ZW1zLCB0aGlzIHdpbGwgcmV0dXJuIGFuIGFycmF5IHdpdGggNCBhbmQgNVxuICAgKiB2YXIgaXRlbXMgPSB0aW55bWNlLmdyZXAoWzEsMiwzLDQsNV0sIGZ1bmN0aW9uKHYpIHtyZXR1cm4gdiA+IDM7fSk7XG4gICAqL1xuICBncmVwOiBBcnJVdGlscy5maWx0ZXIsXG5cbiAgLyoqXG4gICAqIFJldHVybnMgYW4gaW5kZXggb2YgdGhlIGl0ZW0gb3IgLTEgaWYgaXRlbSBpcyBub3QgcHJlc2VudCBpbiB0aGUgYXJyYXkuXG4gICAqXG4gICAqIEBtZXRob2QgaW5BcnJheVxuICAgKiBAcGFyYW0ge2FueX0gaXRlbSBJdGVtIHRvIHNlYXJjaCBmb3IuXG4gICAqIEBwYXJhbSB7QXJyYXl9IGFyciBBcnJheSB0byBzZWFyY2ggaW4uXG4gICAqIEByZXR1cm4ge051bWJlcn0gaW5kZXggb2YgdGhlIGl0ZW0gb3IgLTEgaWYgaXRlbSB3YXMgbm90IGZvdW5kLlxuICAgKi9cbiAgaW5BcnJheTogQXJyVXRpbHMuaW5kZXhPZixcblxuICBoYXNPd246IGhhc093blByb3BlcnR5LFxuXG4gIGV4dGVuZCxcbiAgY3JlYXRlLFxuICB3YWxrLFxuICBjcmVhdGVOUyxcbiAgcmVzb2x2ZSxcbiAgZXhwbG9kZSxcbiAgX2FkZENhY2hlU3VmZml4XG59O1xuXG5leHBvcnQgZGVmYXVsdCBUb29sczsiXX0=