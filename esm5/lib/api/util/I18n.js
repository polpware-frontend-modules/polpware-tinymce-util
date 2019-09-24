/**
 * Copyright (c) Tiny Technologies, Inc. All rights reserved.
 * Licensed under the LGPL or a commercial license.
 * For LGPL see License.txt in the project root for license information.
 * For commercial licenses see https://www.tiny.cloud/
 */
import * as tslib_1 from "tslib";
import { Type, Obj, Cell } from '@ephox/katamari';
var isRaw = function (str) { return Type.isObject(str) && Obj.has(str, 'raw'); };
var ɵ0 = isRaw;
var isTokenised = function (str) { return Type.isArray(str) && str.length > 1; };
var ɵ1 = isTokenised;
var data = {};
var currentCode = Cell('en');
var getData = function () {
    return Obj.map(data, function (value) { return (tslib_1.__assign({}, value)); });
};
var ɵ2 = getData;
/**
 * Sets the current language code.
 *
 * @method setCode
 * @param {String} newCode Current language code.
 */
var setCode = function (newCode) {
    if (newCode) {
        currentCode.set(newCode);
    }
};
var ɵ3 = setCode;
/**
 * Returns the current language code.
 *
 * @method getCode
 * @return {String} Current language code.
 */
var getCode = function () { return currentCode.get(); };
var ɵ4 = getCode;
/**
 * Adds translations for a specific language code.
 * Translation keys are set to be case insensitive.
 *
 * @method add
 * @param {String} code Language code like sv_SE.
 * @param {Object} items Name/value object where key is english and value is the translation.
 */
var add = function (code, items) {
    var langData = data[code];
    if (!langData) {
        data[code] = langData = {};
    }
    for (var name_1 in items) {
        langData[name_1.toLowerCase()] = items[name_1];
    }
};
var ɵ5 = add;
/**
 * Translates the specified text.
 *
 * It has a few formats:
 * I18n.translate("Text");
 * I18n.translate(["Text {0}/{1}", 0, 1]);
 * I18n.translate({raw: "Raw string"});
 *
 * @method translate
 * @param {String/Object/Array} text Text to translate.
 * @return {String} String that got translated.
 */
var translate = function (text) {
    var langData = data[currentCode.get()] || {};
    /**
     * number - string
     * null, undefined and empty string - empty string
     * array - comma-delimited string
     * object - in [object Object]
     * function - in [object Function]
     *
     * @param obj
     * @returns {string}
     */
    var toString = function (obj) {
        if (Type.isFunction(obj)) {
            return Object.prototype.toString.call(obj);
        }
        return !isEmpty(obj) ? '' + obj : '';
    };
    var isEmpty = function (text) {
        return text === '' || text === null || text === undefined;
    };
    var getLangData = function (text) {
        // make sure we work on a string and return a string
        var textstr = toString(text);
        var lowercaseTextstr = textstr.toLowerCase();
        return Obj.has(langData, lowercaseTextstr) ? toString(langData[lowercaseTextstr]) : textstr;
    };
    var removeContext = function (str) {
        return str.replace(/{context:\w+}$/, '');
    };
    var translated = function (text) {
        // TODO: When we figure out how to return a type Translated that fails if you give a String, we implement here
        return text;
    };
    // empty strings
    if (isEmpty(text)) {
        return translated('');
    }
    // Raw, already translated
    if (isRaw(text)) {
        return translated(toString(text.raw));
    }
    // Tokenised {translations}
    if (isTokenised(text)) {
        var values_1 = text.slice(1);
        var substitued = getLangData(text[0]).replace(/\{([0-9]+)\}/g, function ($1, $2) {
            return Obj.has(values_1, $2) ? toString(values_1[$2]) : $1;
        });
        return translated(removeContext(substitued));
    }
    // straight forward translation mapping
    return translated(removeContext(getLangData(text)));
};
var ɵ6 = translate;
/**
 * Returns true/false if the currently active language pack is rtl or not.
 *
 * @method isRtl
 * @return {Boolean} True if the current language pack is rtl.
 */
var isRtl = function () {
    return Obj.get(data, currentCode.get())
        .bind(function (items) { return Obj.get(items, '_dir'); })
        .exists(function (dir) { return dir === 'rtl'; });
};
var ɵ7 = isRtl;
/**
 * Returns true/false if specified language pack exists.
 *
 * @method hasCode
 * @param {String} code Code to check for.
 * @return {Boolean} True if the current language pack for the specified code exists.
 */
var hasCode = function (code) { return Obj.has(data, code); };
var ɵ8 = hasCode;
var I18n = {
    getData: getData,
    setCode: setCode,
    getCode: getCode,
    add: add,
    translate: translate,
    isRtl: isRtl,
    hasCode: hasCode
};
export default I18n;
export { ɵ0, ɵ1, ɵ2, ɵ3, ɵ4, ɵ5, ɵ6, ɵ7, ɵ8 };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSTE4bi5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Bwb2xwd2FyZS90aW55bWNlLXV0aWwvIiwic291cmNlcyI6WyJsaWIvYXBpL3V0aWwvSTE4bi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7R0FLRzs7QUFFSCxPQUFPLEVBQUUsSUFBSSxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQXFCbEQsSUFBTSxLQUFLLEdBQUcsVUFBQyxHQUFRLElBQXVCLE9BQUEsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsSUFBSSxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxLQUFLLENBQUMsRUFBekMsQ0FBeUMsQ0FBQzs7QUFFeEYsSUFBTSxXQUFXLEdBQUcsVUFBQyxHQUFRLElBQTZCLE9BQUEsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxHQUFHLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBbkMsQ0FBbUMsQ0FBQzs7QUFFOUYsSUFBTSxJQUFJLEdBQTJDLEVBQUUsQ0FBQztBQUN4RCxJQUFNLFdBQVcsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7QUFFL0IsSUFBTSxPQUFPLEdBQUc7SUFDZCxPQUFPLEdBQUcsQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLFVBQUMsS0FBSyxJQUFLLE9BQUEsc0JBQU0sS0FBSyxFQUFHLEVBQWQsQ0FBYyxDQUFDLENBQUM7QUFDbEQsQ0FBQyxDQUFDOztBQUVGOzs7OztHQUtHO0FBQ0gsSUFBTSxPQUFPLEdBQUcsVUFBQyxPQUFlO0lBQzlCLElBQUksT0FBTyxFQUFFO1FBQ1gsV0FBVyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQztLQUMxQjtBQUNILENBQUMsQ0FBQzs7QUFFRjs7Ozs7R0FLRztBQUNILElBQU0sT0FBTyxHQUFHLGNBQWMsT0FBQSxXQUFXLENBQUMsR0FBRyxFQUFFLEVBQWpCLENBQWlCLENBQUM7O0FBRWhEOzs7Ozs7O0dBT0c7QUFDSCxJQUFNLEdBQUcsR0FBRyxVQUFDLElBQVksRUFBRSxLQUE2QjtJQUN0RCxJQUFJLFFBQVEsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFFMUIsSUFBSSxDQUFDLFFBQVEsRUFBRTtRQUNiLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxRQUFRLEdBQUcsRUFBRSxDQUFDO0tBQzVCO0lBRUQsS0FBSyxJQUFNLE1BQUksSUFBSSxLQUFLLEVBQUU7UUFDeEIsUUFBUSxDQUFDLE1BQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQyxHQUFHLEtBQUssQ0FBQyxNQUFJLENBQUMsQ0FBQztLQUM1QztBQUNILENBQUMsQ0FBQzs7QUFFRjs7Ozs7Ozs7Ozs7R0FXRztBQUNILElBQU0sU0FBUyxHQUFHLFVBQUMsSUFBa0I7SUFDbkMsSUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUMvQzs7Ozs7Ozs7O09BU0c7SUFDSCxJQUFNLFFBQVEsR0FBRyxVQUFVLEdBQUc7UUFDNUIsSUFBSSxJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxFQUFFO1lBQ3hCLE9BQU8sTUFBTSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1NBQzVDO1FBQ0QsT0FBTyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO0lBQ3ZDLENBQUMsQ0FBQztJQUVGLElBQU0sT0FBTyxHQUFHLFVBQVUsSUFBSTtRQUM1QixPQUFPLElBQUksS0FBSyxFQUFFLElBQUksSUFBSSxLQUFLLElBQUksSUFBSSxJQUFJLEtBQUssU0FBUyxDQUFDO0lBQzVELENBQUMsQ0FBQztJQUVGLElBQU0sV0FBVyxHQUFHLFVBQVUsSUFBSTtRQUNoQyxvREFBb0Q7UUFDcEQsSUFBTSxPQUFPLEdBQUcsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQy9CLElBQU0sZ0JBQWdCLEdBQUcsT0FBTyxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQy9DLE9BQU8sR0FBRyxDQUFDLEdBQUcsQ0FBQyxRQUFRLEVBQUUsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQztJQUM5RixDQUFDLENBQUM7SUFFRixJQUFNLGFBQWEsR0FBRyxVQUFVLEdBQVc7UUFDekMsT0FBTyxHQUFHLENBQUMsT0FBTyxDQUFDLGdCQUFnQixFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBQzNDLENBQUMsQ0FBQztJQUVGLElBQU0sVUFBVSxHQUFHLFVBQUMsSUFBSTtRQUN0Qiw4R0FBOEc7UUFDOUcsT0FBTyxJQUFJLENBQUM7SUFDZCxDQUFDLENBQUM7SUFFRixnQkFBZ0I7SUFDaEIsSUFBSSxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUU7UUFDakIsT0FBTyxVQUFVLENBQUMsRUFBRSxDQUFDLENBQUM7S0FDdkI7SUFFRCwwQkFBMEI7SUFDMUIsSUFBSSxLQUFLLENBQUMsSUFBSSxDQUFDLEVBQUU7UUFDZixPQUFPLFVBQVUsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7S0FDdkM7SUFFRCwyQkFBMkI7SUFDM0IsSUFBSSxXQUFXLENBQUMsSUFBSSxDQUFDLEVBQUU7UUFDckIsSUFBTSxRQUFNLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUM3QixJQUFNLFVBQVUsR0FBRyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLGVBQWUsRUFBRSxVQUFVLEVBQUUsRUFBRSxFQUFFO1lBQy9FLE9BQU8sR0FBRyxDQUFDLEdBQUcsQ0FBQyxRQUFNLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxRQUFNLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO1FBQ3pELENBQUMsQ0FBQyxDQUFDO1FBQ0gsT0FBTyxVQUFVLENBQUMsYUFBYSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7S0FDOUM7SUFFRCx1Q0FBdUM7SUFDdkMsT0FBTyxVQUFVLENBQUMsYUFBYSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDdEQsQ0FBQyxDQUFDOztBQUVGOzs7OztHQUtHO0FBQ0gsSUFBTSxLQUFLLEdBQUc7SUFDWixPQUFPLEdBQUcsQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLFdBQVcsQ0FBQyxHQUFHLEVBQUUsQ0FBQztTQUNwQyxJQUFJLENBQUMsVUFBQyxLQUFLLElBQUssT0FBQSxHQUFHLENBQUMsR0FBRyxDQUFDLEtBQUssRUFBRSxNQUFNLENBQUMsRUFBdEIsQ0FBc0IsQ0FBQztTQUN2QyxNQUFNLENBQUMsVUFBQyxHQUFHLElBQUssT0FBQSxHQUFHLEtBQUssS0FBSyxFQUFiLENBQWEsQ0FBQyxDQUFDO0FBQ3BDLENBQUMsQ0FBQzs7QUFFRjs7Ozs7O0dBTUc7QUFDSCxJQUFNLE9BQU8sR0FBRyxVQUFDLElBQVksSUFBSyxPQUFBLEdBQUcsQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxFQUFuQixDQUFtQixDQUFDOztBQVl0RCxJQUFNLElBQUksR0FBUztJQUNqQixPQUFPLFNBQUE7SUFDUCxPQUFPLFNBQUE7SUFDUCxPQUFPLFNBQUE7SUFDUCxHQUFHLEtBQUE7SUFDSCxTQUFTLFdBQUE7SUFDVCxLQUFLLE9BQUE7SUFDTCxPQUFPLFNBQUE7Q0FDUixDQUFDO0FBRUYsZUFBZSxJQUFJLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIENvcHlyaWdodCAoYykgVGlueSBUZWNobm9sb2dpZXMsIEluYy4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBMR1BMIG9yIGEgY29tbWVyY2lhbCBsaWNlbnNlLlxuICogRm9yIExHUEwgc2VlIExpY2Vuc2UudHh0IGluIHRoZSBwcm9qZWN0IHJvb3QgZm9yIGxpY2Vuc2UgaW5mb3JtYXRpb24uXG4gKiBGb3IgY29tbWVyY2lhbCBsaWNlbnNlcyBzZWUgaHR0cHM6Ly93d3cudGlueS5jbG91ZC9cbiAqL1xuXG5pbXBvcnQgeyBUeXBlLCBPYmosIENlbGwgfSBmcm9tICdAZXBob3gva2F0YW1hcmknO1xuXG4vKipcbiAqIEkxOG4gY2xhc3MgdGhhdCBoYW5kbGVzIHRyYW5zbGF0aW9uIG9mIFRpbnlNQ0UgVUkuXG4gKiBVc2VzIHBvIHN0eWxlIHdpdGggY3NoYXJwIHN0eWxlIHBhcmFtZXRlcnMuXG4gKlxuICogQGNsYXNzIHRpbnltY2UudXRpbC5JMThuXG4gKi9cblxuZXhwb3J0IGludGVyZmFjZSBSYXdTdHJpbmcge1xuICByYXc6IHN0cmluZztcbn1cblxuZXhwb3J0IHR5cGUgVG9rZW5pc2VkU3RyaW5nID0gc3RyaW5nW107XG5cbmV4cG9ydCB0eXBlIFVudHJhbnNsYXRlZCA9IGFueTtcblxuZXhwb3J0IHR5cGUgVHJhbnNsYXRlZFN0cmluZyA9IHN0cmluZztcblxuZXhwb3J0IHR5cGUgVHJhbnNsYXRlSWZOZWVkZWQgPSBVbnRyYW5zbGF0ZWQgfCBUcmFuc2xhdGVkU3RyaW5nO1xuXG5jb25zdCBpc1JhdyA9IChzdHI6IGFueSk6IHN0ciBpcyBSYXdTdHJpbmcgPT4gVHlwZS5pc09iamVjdChzdHIpICYmIE9iai5oYXMoc3RyLCAncmF3Jyk7XG5cbmNvbnN0IGlzVG9rZW5pc2VkID0gKHN0cjogYW55KTogc3RyIGlzIFRva2VuaXNlZFN0cmluZyA9PiBUeXBlLmlzQXJyYXkoc3RyKSAmJiBzdHIubGVuZ3RoID4gMTtcblxuY29uc3QgZGF0YTogUmVjb3JkPHN0cmluZywgUmVjb3JkPHN0cmluZywgc3RyaW5nPj4gPSB7fTtcbmNvbnN0IGN1cnJlbnRDb2RlID0gQ2VsbCgnZW4nKTtcblxuY29uc3QgZ2V0RGF0YSA9ICgpOiBSZWNvcmQ8c3RyaW5nLCBSZWNvcmQ8c3RyaW5nLCBzdHJpbmc+PiA9PiB7XG4gIHJldHVybiBPYmoubWFwKGRhdGEsICh2YWx1ZSkgPT4gKHsgLi4udmFsdWUgfSkpO1xufTtcblxuLyoqXG4gKiBTZXRzIHRoZSBjdXJyZW50IGxhbmd1YWdlIGNvZGUuXG4gKlxuICogQG1ldGhvZCBzZXRDb2RlXG4gKiBAcGFyYW0ge1N0cmluZ30gbmV3Q29kZSBDdXJyZW50IGxhbmd1YWdlIGNvZGUuXG4gKi9cbmNvbnN0IHNldENvZGUgPSAobmV3Q29kZTogc3RyaW5nKSA9PiB7XG4gIGlmIChuZXdDb2RlKSB7XG4gICAgY3VycmVudENvZGUuc2V0KG5ld0NvZGUpO1xuICB9XG59O1xuXG4vKipcbiAqIFJldHVybnMgdGhlIGN1cnJlbnQgbGFuZ3VhZ2UgY29kZS5cbiAqXG4gKiBAbWV0aG9kIGdldENvZGVcbiAqIEByZXR1cm4ge1N0cmluZ30gQ3VycmVudCBsYW5ndWFnZSBjb2RlLlxuICovXG5jb25zdCBnZXRDb2RlID0gKCk6IHN0cmluZyA9PiBjdXJyZW50Q29kZS5nZXQoKTtcblxuLyoqXG4gKiBBZGRzIHRyYW5zbGF0aW9ucyBmb3IgYSBzcGVjaWZpYyBsYW5ndWFnZSBjb2RlLlxuICogVHJhbnNsYXRpb24ga2V5cyBhcmUgc2V0IHRvIGJlIGNhc2UgaW5zZW5zaXRpdmUuXG4gKlxuICogQG1ldGhvZCBhZGRcbiAqIEBwYXJhbSB7U3RyaW5nfSBjb2RlIExhbmd1YWdlIGNvZGUgbGlrZSBzdl9TRS5cbiAqIEBwYXJhbSB7T2JqZWN0fSBpdGVtcyBOYW1lL3ZhbHVlIG9iamVjdCB3aGVyZSBrZXkgaXMgZW5nbGlzaCBhbmQgdmFsdWUgaXMgdGhlIHRyYW5zbGF0aW9uLlxuICovXG5jb25zdCBhZGQgPSAoY29kZTogc3RyaW5nLCBpdGVtczogUmVjb3JkPHN0cmluZywgc3RyaW5nPikgPT4ge1xuICBsZXQgbGFuZ0RhdGEgPSBkYXRhW2NvZGVdO1xuXG4gIGlmICghbGFuZ0RhdGEpIHtcbiAgICBkYXRhW2NvZGVdID0gbGFuZ0RhdGEgPSB7fTtcbiAgfVxuXG4gIGZvciAoY29uc3QgbmFtZSBpbiBpdGVtcykge1xuICAgIGxhbmdEYXRhW25hbWUudG9Mb3dlckNhc2UoKV0gPSBpdGVtc1tuYW1lXTtcbiAgfVxufTtcblxuLyoqXG4gKiBUcmFuc2xhdGVzIHRoZSBzcGVjaWZpZWQgdGV4dC5cbiAqXG4gKiBJdCBoYXMgYSBmZXcgZm9ybWF0czpcbiAqIEkxOG4udHJhbnNsYXRlKFwiVGV4dFwiKTtcbiAqIEkxOG4udHJhbnNsYXRlKFtcIlRleHQgezB9L3sxfVwiLCAwLCAxXSk7XG4gKiBJMThuLnRyYW5zbGF0ZSh7cmF3OiBcIlJhdyBzdHJpbmdcIn0pO1xuICpcbiAqIEBtZXRob2QgdHJhbnNsYXRlXG4gKiBAcGFyYW0ge1N0cmluZy9PYmplY3QvQXJyYXl9IHRleHQgVGV4dCB0byB0cmFuc2xhdGUuXG4gKiBAcmV0dXJuIHtTdHJpbmd9IFN0cmluZyB0aGF0IGdvdCB0cmFuc2xhdGVkLlxuICovXG5jb25zdCB0cmFuc2xhdGUgPSAodGV4dDogVW50cmFuc2xhdGVkKTogVHJhbnNsYXRlZFN0cmluZyA9PiB7XG4gIGNvbnN0IGxhbmdEYXRhID0gZGF0YVtjdXJyZW50Q29kZS5nZXQoKV0gfHwge307XG4gIC8qKlxuICAgKiBudW1iZXIgLSBzdHJpbmdcbiAgICogbnVsbCwgdW5kZWZpbmVkIGFuZCBlbXB0eSBzdHJpbmcgLSBlbXB0eSBzdHJpbmdcbiAgICogYXJyYXkgLSBjb21tYS1kZWxpbWl0ZWQgc3RyaW5nXG4gICAqIG9iamVjdCAtIGluIFtvYmplY3QgT2JqZWN0XVxuICAgKiBmdW5jdGlvbiAtIGluIFtvYmplY3QgRnVuY3Rpb25dXG4gICAqXG4gICAqIEBwYXJhbSBvYmpcbiAgICogQHJldHVybnMge3N0cmluZ31cbiAgICovXG4gIGNvbnN0IHRvU3RyaW5nID0gZnVuY3Rpb24gKG9iaikge1xuICAgIGlmIChUeXBlLmlzRnVuY3Rpb24ob2JqKSkge1xuICAgICAgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChvYmopO1xuICAgIH1cbiAgICByZXR1cm4gIWlzRW1wdHkob2JqKSA/ICcnICsgb2JqIDogJyc7XG4gIH07XG5cbiAgY29uc3QgaXNFbXB0eSA9IGZ1bmN0aW9uICh0ZXh0KSB7XG4gICAgcmV0dXJuIHRleHQgPT09ICcnIHx8IHRleHQgPT09IG51bGwgfHwgdGV4dCA9PT0gdW5kZWZpbmVkO1xuICB9O1xuXG4gIGNvbnN0IGdldExhbmdEYXRhID0gZnVuY3Rpb24gKHRleHQpIHtcbiAgICAvLyBtYWtlIHN1cmUgd2Ugd29yayBvbiBhIHN0cmluZyBhbmQgcmV0dXJuIGEgc3RyaW5nXG4gICAgY29uc3QgdGV4dHN0ciA9IHRvU3RyaW5nKHRleHQpO1xuICAgIGNvbnN0IGxvd2VyY2FzZVRleHRzdHIgPSB0ZXh0c3RyLnRvTG93ZXJDYXNlKCk7XG4gICAgcmV0dXJuIE9iai5oYXMobGFuZ0RhdGEsIGxvd2VyY2FzZVRleHRzdHIpID8gdG9TdHJpbmcobGFuZ0RhdGFbbG93ZXJjYXNlVGV4dHN0cl0pIDogdGV4dHN0cjtcbiAgfTtcblxuICBjb25zdCByZW1vdmVDb250ZXh0ID0gZnVuY3Rpb24gKHN0cjogc3RyaW5nKSB7XG4gICAgcmV0dXJuIHN0ci5yZXBsYWNlKC97Y29udGV4dDpcXHcrfSQvLCAnJyk7XG4gIH07XG5cbiAgY29uc3QgdHJhbnNsYXRlZCA9ICh0ZXh0KTogVHJhbnNsYXRlZFN0cmluZyA9PiB7XG4gICAgLy8gVE9ETzogV2hlbiB3ZSBmaWd1cmUgb3V0IGhvdyB0byByZXR1cm4gYSB0eXBlIFRyYW5zbGF0ZWQgdGhhdCBmYWlscyBpZiB5b3UgZ2l2ZSBhIFN0cmluZywgd2UgaW1wbGVtZW50IGhlcmVcbiAgICByZXR1cm4gdGV4dDtcbiAgfTtcblxuICAvLyBlbXB0eSBzdHJpbmdzXG4gIGlmIChpc0VtcHR5KHRleHQpKSB7XG4gICAgcmV0dXJuIHRyYW5zbGF0ZWQoJycpO1xuICB9XG5cbiAgLy8gUmF3LCBhbHJlYWR5IHRyYW5zbGF0ZWRcbiAgaWYgKGlzUmF3KHRleHQpKSB7XG4gICAgcmV0dXJuIHRyYW5zbGF0ZWQodG9TdHJpbmcodGV4dC5yYXcpKTtcbiAgfVxuXG4gIC8vIFRva2VuaXNlZCB7dHJhbnNsYXRpb25zfVxuICBpZiAoaXNUb2tlbmlzZWQodGV4dCkpIHtcbiAgICBjb25zdCB2YWx1ZXMgPSB0ZXh0LnNsaWNlKDEpO1xuICAgIGNvbnN0IHN1YnN0aXR1ZWQgPSBnZXRMYW5nRGF0YSh0ZXh0WzBdKS5yZXBsYWNlKC9cXHsoWzAtOV0rKVxcfS9nLCBmdW5jdGlvbiAoJDEsICQyKSB7XG4gICAgICByZXR1cm4gT2JqLmhhcyh2YWx1ZXMsICQyKSA/IHRvU3RyaW5nKHZhbHVlc1skMl0pIDogJDE7XG4gICAgfSk7XG4gICAgcmV0dXJuIHRyYW5zbGF0ZWQocmVtb3ZlQ29udGV4dChzdWJzdGl0dWVkKSk7XG4gIH1cblxuICAvLyBzdHJhaWdodCBmb3J3YXJkIHRyYW5zbGF0aW9uIG1hcHBpbmdcbiAgcmV0dXJuIHRyYW5zbGF0ZWQocmVtb3ZlQ29udGV4dChnZXRMYW5nRGF0YSh0ZXh0KSkpO1xufTtcblxuLyoqXG4gKiBSZXR1cm5zIHRydWUvZmFsc2UgaWYgdGhlIGN1cnJlbnRseSBhY3RpdmUgbGFuZ3VhZ2UgcGFjayBpcyBydGwgb3Igbm90LlxuICpcbiAqIEBtZXRob2QgaXNSdGxcbiAqIEByZXR1cm4ge0Jvb2xlYW59IFRydWUgaWYgdGhlIGN1cnJlbnQgbGFuZ3VhZ2UgcGFjayBpcyBydGwuXG4gKi9cbmNvbnN0IGlzUnRsID0gKCkgPT4ge1xuICByZXR1cm4gT2JqLmdldChkYXRhLCBjdXJyZW50Q29kZS5nZXQoKSlcbiAgICAuYmluZCgoaXRlbXMpID0+IE9iai5nZXQoaXRlbXMsICdfZGlyJykpXG4gICAgLmV4aXN0cygoZGlyKSA9PiBkaXIgPT09ICdydGwnKTtcbn07XG5cbi8qKlxuICogUmV0dXJucyB0cnVlL2ZhbHNlIGlmIHNwZWNpZmllZCBsYW5ndWFnZSBwYWNrIGV4aXN0cy5cbiAqXG4gKiBAbWV0aG9kIGhhc0NvZGVcbiAqIEBwYXJhbSB7U3RyaW5nfSBjb2RlIENvZGUgdG8gY2hlY2sgZm9yLlxuICogQHJldHVybiB7Qm9vbGVhbn0gVHJ1ZSBpZiB0aGUgY3VycmVudCBsYW5ndWFnZSBwYWNrIGZvciB0aGUgc3BlY2lmaWVkIGNvZGUgZXhpc3RzLlxuICovXG5jb25zdCBoYXNDb2RlID0gKGNvZGU6IHN0cmluZykgPT4gT2JqLmhhcyhkYXRhLCBjb2RlKTtcblxuaW50ZXJmYWNlIEkxOG4ge1xuICBnZXREYXRhICgpOiBSZWNvcmQ8c3RyaW5nLCBSZWNvcmQ8c3RyaW5nLCBzdHJpbmc+PjtcbiAgc2V0Q29kZSAobmV3Q29kZTogc3RyaW5nKTogdm9pZDtcbiAgZ2V0Q29kZSAoKTogc3RyaW5nO1xuICBhZGQgKGNvZGU6IHN0cmluZywgaXRlbXM6IFJlY29yZDxzdHJpbmcsIHN0cmluZz4pOiB2b2lkO1xuICB0cmFuc2xhdGUgKHRleHQ6IFVudHJhbnNsYXRlZCk6IFRyYW5zbGF0ZWRTdHJpbmc7XG4gIGlzUnRsICgpOiBib29sZWFuO1xuICBoYXNDb2RlIChjb2RlOiBzdHJpbmcpOiBib29sZWFuO1xufVxuXG5jb25zdCBJMThuOiBJMThuID0ge1xuICBnZXREYXRhLFxuICBzZXRDb2RlLFxuICBnZXRDb2RlLFxuICBhZGQsXG4gIHRyYW5zbGF0ZSxcbiAgaXNSdGwsXG4gIGhhc0NvZGVcbn07XG5cbmV4cG9ydCBkZWZhdWx0IEkxOG47XG4iXX0=