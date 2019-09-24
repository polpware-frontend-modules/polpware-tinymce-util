/**
 * Copyright (c) Tiny Technologies, Inc. All rights reserved.
 * Licensed under the LGPL or a commercial license.
 * For LGPL see License.txt in the project root for license information.
 * For commercial licenses see https://www.tiny.cloud/
 */
import { Type, Obj, Cell } from '@ephox/katamari';
const isRaw = (str) => Type.isObject(str) && Obj.has(str, 'raw');
const ɵ0 = isRaw;
const isTokenised = (str) => Type.isArray(str) && str.length > 1;
const ɵ1 = isTokenised;
const data = {};
const currentCode = Cell('en');
const getData = () => {
    return Obj.map(data, (value) => (Object.assign({}, value)));
};
const ɵ2 = getData;
/**
 * Sets the current language code.
 *
 * @method setCode
 * @param {String} newCode Current language code.
 */
const setCode = (newCode) => {
    if (newCode) {
        currentCode.set(newCode);
    }
};
const ɵ3 = setCode;
/**
 * Returns the current language code.
 *
 * @method getCode
 * @return {String} Current language code.
 */
const getCode = () => currentCode.get();
const ɵ4 = getCode;
/**
 * Adds translations for a specific language code.
 * Translation keys are set to be case insensitive.
 *
 * @method add
 * @param {String} code Language code like sv_SE.
 * @param {Object} items Name/value object where key is english and value is the translation.
 */
const add = (code, items) => {
    let langData = data[code];
    if (!langData) {
        data[code] = langData = {};
    }
    for (const name in items) {
        langData[name.toLowerCase()] = items[name];
    }
};
const ɵ5 = add;
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
const translate = (text) => {
    const langData = data[currentCode.get()] || {};
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
    const toString = function (obj) {
        if (Type.isFunction(obj)) {
            return Object.prototype.toString.call(obj);
        }
        return !isEmpty(obj) ? '' + obj : '';
    };
    const isEmpty = function (text) {
        return text === '' || text === null || text === undefined;
    };
    const getLangData = function (text) {
        // make sure we work on a string and return a string
        const textstr = toString(text);
        const lowercaseTextstr = textstr.toLowerCase();
        return Obj.has(langData, lowercaseTextstr) ? toString(langData[lowercaseTextstr]) : textstr;
    };
    const removeContext = function (str) {
        return str.replace(/{context:\w+}$/, '');
    };
    const translated = (text) => {
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
        const values = text.slice(1);
        const substitued = getLangData(text[0]).replace(/\{([0-9]+)\}/g, function ($1, $2) {
            return Obj.has(values, $2) ? toString(values[$2]) : $1;
        });
        return translated(removeContext(substitued));
    }
    // straight forward translation mapping
    return translated(removeContext(getLangData(text)));
};
const ɵ6 = translate;
/**
 * Returns true/false if the currently active language pack is rtl or not.
 *
 * @method isRtl
 * @return {Boolean} True if the current language pack is rtl.
 */
const isRtl = () => {
    return Obj.get(data, currentCode.get())
        .bind((items) => Obj.get(items, '_dir'))
        .exists((dir) => dir === 'rtl');
};
const ɵ7 = isRtl;
/**
 * Returns true/false if specified language pack exists.
 *
 * @method hasCode
 * @param {String} code Code to check for.
 * @return {Boolean} True if the current language pack for the specified code exists.
 */
const hasCode = (code) => Obj.has(data, code);
const ɵ8 = hasCode;
const I18n = {
    getData,
    setCode,
    getCode,
    add,
    translate,
    isRtl,
    hasCode
};
export default I18n;
export { ɵ0, ɵ1, ɵ2, ɵ3, ɵ4, ɵ5, ɵ6, ɵ7, ɵ8 };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSTE4bi5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Bwb2xwd2FyZS90aW55bWNlLXV0aWwvIiwic291cmNlcyI6WyJsaWIvYXBpL3V0aWwvSTE4bi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7R0FLRztBQUVILE9BQU8sRUFBRSxJQUFJLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBcUJsRCxNQUFNLEtBQUssR0FBRyxDQUFDLEdBQVEsRUFBb0IsRUFBRSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLElBQUksR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsS0FBSyxDQUFDLENBQUM7O0FBRXhGLE1BQU0sV0FBVyxHQUFHLENBQUMsR0FBUSxFQUEwQixFQUFFLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxHQUFHLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQzs7QUFFOUYsTUFBTSxJQUFJLEdBQTJDLEVBQUUsQ0FBQztBQUN4RCxNQUFNLFdBQVcsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7QUFFL0IsTUFBTSxPQUFPLEdBQUcsR0FBMkMsRUFBRTtJQUMzRCxPQUFPLEdBQUcsQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxtQkFBTSxLQUFLLEVBQUcsQ0FBQyxDQUFDO0FBQ2xELENBQUMsQ0FBQzs7QUFFRjs7Ozs7R0FLRztBQUNILE1BQU0sT0FBTyxHQUFHLENBQUMsT0FBZSxFQUFFLEVBQUU7SUFDbEMsSUFBSSxPQUFPLEVBQUU7UUFDWCxXQUFXLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0tBQzFCO0FBQ0gsQ0FBQyxDQUFDOztBQUVGOzs7OztHQUtHO0FBQ0gsTUFBTSxPQUFPLEdBQUcsR0FBVyxFQUFFLENBQUMsV0FBVyxDQUFDLEdBQUcsRUFBRSxDQUFDOztBQUVoRDs7Ozs7OztHQU9HO0FB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RUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO1FBQ3pELENBQUMsQ0FBQyxDQUFDO1FBQ0gsT0FBTyxVQUFVLENBQUMsYUFBYSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7S0FDOUM7SUFFRCx1Q0FBdUM7SUFDdkMsT0FBTyxVQUFVLENBQUMsYUFBYSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDdEQsQ0FBQyxDQUFDOztBQUVGOzs7OztHQUtHO0FBQ0gsTUFBTSxLQUFLLEdBQUcsR0FBRyxFQUFFO0lBQ2pCLE9BQU8sR0FBRyxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsV0FBVyxDQUFDLEdBQUcsRUFBRSxDQUFDO1NBQ3BDLElBQUksQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxLQUFLLEVBQUUsTUFBTSxDQUFDLENBQUM7U0FDdkMsTUFBTSxDQUFDLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxHQUFHLEtBQUssS0FBSyxDQUFDLENBQUM7QUFDcEMsQ0FBQyxDQUFDOztBQUVGOzs7Ozs7R0FNRztBQUNILE1BQU0sT0FBTyxHQUFHLENBQUMsSUFBWSxFQUFFLEVBQUUsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQzs7QUFZdEQsTUFBTSxJQUFJLEdBQVM7SUFDakIsT0FBTztJQUNQLE9BQU87SUFDUCxPQUFPO0lBQ1AsR0FBRztJQUNILFNBQVM7SUFDVCxLQUFLO0lBQ0wsT0FBTztDQUNSLENBQUM7QUFFRixlQUFlLElBQUksQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQ29weXJpZ2h0IChjKSBUaW55IFRlY2hub2xvZ2llcywgSW5jLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICogTGljZW5zZWQgdW5kZXIgdGhlIExHUEwgb3IgYSBjb21tZXJjaWFsIGxpY2Vuc2UuXG4gKiBGb3IgTEdQTCBzZWUgTGljZW5zZS50eHQgaW4gdGhlIHByb2plY3Qgcm9vdCBmb3IgbGljZW5zZSBpbmZvcm1hdGlvbi5cbiAqIEZvciBjb21tZXJjaWFsIGxpY2Vuc2VzIHNlZSBodHRwczovL3d3dy50aW55LmNsb3VkL1xuICovXG5cbmltcG9ydCB7IFR5cGUsIE9iaiwgQ2VsbCB9IGZyb20gJ0BlcGhveC9rYXRhbWFyaSc7XG5cbi8qKlxuICogSTE4biBjbGFzcyB0aGF0IGhhbmRsZXMgdHJhbnNsYXRpb24gb2YgVGlueU1DRSBVSS5cbiAqIFVzZXMgcG8gc3R5bGUgd2l0aCBjc2hhcnAgc3R5bGUgcGFyYW1ldGVycy5cbiAqXG4gKiBAY2xhc3MgdGlueW1jZS51dGlsLkkxOG5cbiAqL1xuXG5leHBvcnQgaW50ZXJmYWNlIFJhd1N0cmluZyB7XG4gIHJhdzogc3RyaW5nO1xufVxuXG5leHBvcnQgdHlwZSBUb2tlbmlzZWRTdHJpbmcgPSBzdHJpbmdbXTtcblxuZXhwb3J0IHR5cGUgVW50cmFuc2xhdGVkID0gYW55O1xuXG5leHBvcnQgdHlwZSBUcmFuc2xhdGVkU3RyaW5nID0gc3RyaW5nO1xuXG5leHBvcnQgdHlwZSBUcmFuc2xhdGVJZk5lZWRlZCA9IFVudHJhbnNsYXRlZCB8IFRyYW5zbGF0ZWRTdHJpbmc7XG5cbmNvbnN0IGlzUmF3ID0gKHN0cjogYW55KTogc3RyIGlzIFJhd1N0cmluZyA9PiBUeXBlLmlzT2JqZWN0KHN0cikgJiYgT2JqLmhhcyhzdHIsICdyYXcnKTtcblxuY29uc3QgaXNUb2tlbmlzZWQgPSAoc3RyOiBhbnkpOiBzdHIgaXMgVG9rZW5pc2VkU3RyaW5nID0+IFR5cGUuaXNBcnJheShzdHIpICYmIHN0ci5sZW5ndGggPiAxO1xuXG5jb25zdCBkYXRhOiBSZWNvcmQ8c3RyaW5nLCBSZWNvcmQ8c3RyaW5nLCBzdHJpbmc+PiA9IHt9O1xuY29uc3QgY3VycmVudENvZGUgPSBDZWxsKCdlbicpO1xuXG5jb25zdCBnZXREYXRhID0gKCk6IFJlY29yZDxzdHJpbmcsIFJlY29yZDxzdHJpbmcsIHN0cmluZz4+ID0+IHtcbiAgcmV0dXJuIE9iai5tYXAoZGF0YSwgKHZhbHVlKSA9PiAoeyAuLi52YWx1ZSB9KSk7XG59O1xuXG4vKipcbiAqIFNldHMgdGhlIGN1cnJlbnQgbGFuZ3VhZ2UgY29kZS5cbiAqXG4gKiBAbWV0aG9kIHNldENvZGVcbiAqIEBwYXJhbSB7U3RyaW5nfSBuZXdDb2RlIEN1cnJlbnQgbGFuZ3VhZ2UgY29kZS5cbiAqL1xuY29uc3Qgc2V0Q29kZSA9IChuZXdDb2RlOiBzdHJpbmcpID0+IHtcbiAgaWYgKG5ld0NvZGUpIHtcbiAgICBjdXJyZW50Q29kZS5zZXQobmV3Q29kZSk7XG4gIH1cbn07XG5cbi8qKlxuICogUmV0dXJucyB0aGUgY3VycmVudCBsYW5ndWFnZSBjb2RlLlxuICpcbiAqIEBtZXRob2QgZ2V0Q29kZVxuICogQHJldHVybiB7U3RyaW5nfSBDdXJyZW50IGxhbmd1YWdlIGNvZGUuXG4gKi9cbmNvbnN0IGdldENvZGUgPSAoKTogc3RyaW5nID0+IGN1cnJlbnRDb2RlLmdldCgpO1xuXG4vKipcbiAqIEFkZHMgdHJhbnNsYXRpb25zIGZvciBhIHNwZWNpZmljIGxhbmd1YWdlIGNvZGUuXG4gKiBUcmFuc2xhdGlvbiBrZXlzIGFyZSBzZXQgdG8gYmUgY2FzZSBpbnNlbnNpdGl2ZS5cbiAqXG4gKiBAbWV0aG9kIGFkZFxuICogQHBhcmFtIHtTdHJpbmd9IGNvZGUgTGFuZ3VhZ2UgY29kZSBsaWtlIHN2X1NFLlxuICogQHBhcmFtIHtPYmplY3R9IGl0ZW1zIE5hbWUvdmFsdWUgb2JqZWN0IHdoZXJlIGtleSBpcyBlbmdsaXNoIGFuZCB2YWx1ZSBpcyB0aGUgdHJhbnNsYXRpb24uXG4gKi9cbmNvbnN0IGFkZCA9IChjb2RlOiBzdHJpbmcsIGl0ZW1zOiBSZWNvcmQ8c3RyaW5nLCBzdHJpbmc+KSA9PiB7XG4gIGxldCBsYW5nRGF0YSA9IGRhdGFbY29kZV07XG5cbiAgaWYgKCFsYW5nRGF0YSkge1xuICAgIGRhdGFbY29kZV0gPSBsYW5nRGF0YSA9IHt9O1xuICB9XG5cbiAgZm9yIChjb25zdCBuYW1lIGluIGl0ZW1zKSB7XG4gICAgbGFuZ0RhdGFbbmFtZS50b0xvd2VyQ2FzZSgpXSA9IGl0ZW1zW25hbWVdO1xuICB9XG59O1xuXG4vKipcbiAqIFRyYW5zbGF0ZXMgdGhlIHNwZWNpZmllZCB0ZXh0LlxuICpcbiAqIEl0IGhhcyBhIGZldyBmb3JtYXRzOlxuICogSTE4bi50cmFuc2xhdGUoXCJUZXh0XCIpO1xuICogSTE4bi50cmFuc2xhdGUoW1wiVGV4dCB7MH0vezF9XCIsIDAsIDFdKTtcbiAqIEkxOG4udHJhbnNsYXRlKHtyYXc6IFwiUmF3IHN0cmluZ1wifSk7XG4gKlxuICogQG1ldGhvZCB0cmFuc2xhdGVcbiAqIEBwYXJhbSB7U3RyaW5nL09iamVjdC9BcnJheX0gdGV4dCBUZXh0IHRvIHRyYW5zbGF0ZS5cbiAqIEByZXR1cm4ge1N0cmluZ30gU3RyaW5nIHRoYXQgZ290IHRyYW5zbGF0ZWQuXG4gKi9cbmNvbnN0IHRyYW5zbGF0ZSA9ICh0ZXh0OiBVbnRyYW5zbGF0ZWQpOiBUcmFuc2xhdGVkU3RyaW5nID0+IHtcbiAgY29uc3QgbGFuZ0RhdGEgPSBkYXRhW2N1cnJlbnRDb2RlLmdldCgpXSB8fCB7fTtcbiAgLyoqXG4gICAqIG51bWJlciAtIHN0cmluZ1xuICAgKiBudWxsLCB1bmRlZmluZWQgYW5kIGVtcHR5IHN0cmluZyAtIGVtcHR5IHN0cmluZ1xuICAgKiBhcnJheSAtIGNvbW1hLWRlbGltaXRlZCBzdHJpbmdcbiAgICogb2JqZWN0IC0gaW4gW29iamVjdCBPYmplY3RdXG4gICAqIGZ1bmN0aW9uIC0gaW4gW29iamVjdCBGdW5jdGlvbl1cbiAgICpcbiAgICogQHBhcmFtIG9ialxuICAgKiBAcmV0dXJucyB7c3RyaW5nfVxuICAgKi9cbiAgY29uc3QgdG9TdHJpbmcgPSBmdW5jdGlvbiAob2JqKSB7XG4gICAgaWYgKFR5cGUuaXNGdW5jdGlvbihvYmopKSB7XG4gICAgICByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKG9iaik7XG4gICAgfVxuICAgIHJldHVybiAhaXNFbXB0eShvYmopID8gJycgKyBvYmogOiAnJztcbiAgfTtcblxuICBjb25zdCBpc0VtcHR5ID0gZnVuY3Rpb24gKHRleHQpIHtcbiAgICByZXR1cm4gdGV4dCA9PT0gJycgfHwgdGV4dCA9PT0gbnVsbCB8fCB0ZXh0ID09PSB1bmRlZmluZWQ7XG4gIH07XG5cbiAgY29uc3QgZ2V0TGFuZ0RhdGEgPSBmdW5jdGlvbiAodGV4dCkge1xuICAgIC8vIG1ha2Ugc3VyZSB3ZSB3b3JrIG9uIGEgc3RyaW5nIGFuZCByZXR1cm4gYSBzdHJpbmdcbiAgICBjb25zdCB0ZXh0c3RyID0gdG9TdHJpbmcodGV4dCk7XG4gICAgY29uc3QgbG93ZXJjYXNlVGV4dHN0ciA9IHRleHRzdHIudG9Mb3dlckNhc2UoKTtcbiAgICByZXR1cm4gT2JqLmhhcyhsYW5nRGF0YSwgbG93ZXJjYXNlVGV4dHN0cikgPyB0b1N0cmluZyhsYW5nRGF0YVtsb3dlcmNhc2VUZXh0c3RyXSkgOiB0ZXh0c3RyO1xuICB9O1xuXG4gIGNvbnN0IHJlbW92ZUNvbnRleHQgPSBmdW5jdGlvbiAoc3RyOiBzdHJpbmcpIHtcbiAgICByZXR1cm4gc3RyLnJlcGxhY2UoL3tjb250ZXh0Olxcdyt9JC8sICcnKTtcbiAgfTtcblxuICBjb25zdCB0cmFuc2xhdGVkID0gKHRleHQpOiBUcmFuc2xhdGVkU3RyaW5nID0+IHtcbiAgICAvLyBUT0RPOiBXaGVuIHdlIGZpZ3VyZSBvdXQgaG93IHRvIHJldHVybiBhIHR5cGUgVHJhbnNsYXRlZCB0aGF0IGZhaWxzIGlmIHlvdSBnaXZlIGEgU3RyaW5nLCB3ZSBpbXBsZW1lbnQgaGVyZVxuICAgIHJldHVybiB0ZXh0O1xuICB9O1xuXG4gIC8vIGVtcHR5IHN0cmluZ3NcbiAgaWYgKGlzRW1wdHkodGV4dCkpIHtcbiAgICByZXR1cm4gdHJhbnNsYXRlZCgnJyk7XG4gIH1cblxuICAvLyBSYXcsIGFscmVhZHkgdHJhbnNsYXRlZFxuICBpZiAoaXNSYXcodGV4dCkpIHtcbiAgICByZXR1cm4gdHJhbnNsYXRlZCh0b1N0cmluZyh0ZXh0LnJhdykpO1xuICB9XG5cbiAgLy8gVG9rZW5pc2VkIHt0cmFuc2xhdGlvbnN9XG4gIGlmIChpc1Rva2VuaXNlZCh0ZXh0KSkge1xuICAgIGNvbnN0IHZhbHVlcyA9IHRleHQuc2xpY2UoMSk7XG4gICAgY29uc3Qgc3Vic3RpdHVlZCA9IGdldExhbmdEYXRhKHRleHRbMF0pLnJlcGxhY2UoL1xceyhbMC05XSspXFx9L2csIGZ1bmN0aW9uICgkMSwgJDIpIHtcbiAgICAgIHJldHVybiBPYmouaGFzKHZhbHVlcywgJDIpID8gdG9TdHJpbmcodmFsdWVzWyQyXSkgOiAkMTtcbiAgICB9KTtcbiAgICByZXR1cm4gdHJhbnNsYXRlZChyZW1vdmVDb250ZXh0KHN1YnN0aXR1ZWQpKTtcbiAgfVxuXG4gIC8vIHN0cmFpZ2h0IGZvcndhcmQgdHJhbnNsYXRpb24gbWFwcGluZ1xuICByZXR1cm4gdHJhbnNsYXRlZChyZW1vdmVDb250ZXh0KGdldExhbmdEYXRhKHRleHQpKSk7XG59O1xuXG4vKipcbiAqIFJldHVybnMgdHJ1ZS9mYWxzZSBpZiB0aGUgY3VycmVudGx5IGFjdGl2ZSBsYW5ndWFnZSBwYWNrIGlzIHJ0bCBvciBub3QuXG4gKlxuICogQG1ldGhvZCBpc1J0bFxuICogQHJldHVybiB7Qm9vbGVhbn0gVHJ1ZSBpZiB0aGUgY3VycmVudCBsYW5ndWFnZSBwYWNrIGlzIHJ0bC5cbiAqL1xuY29uc3QgaXNSdGwgPSAoKSA9PiB7XG4gIHJldHVybiBPYmouZ2V0KGRhdGEsIGN1cnJlbnRDb2RlLmdldCgpKVxuICAgIC5iaW5kKChpdGVtcykgPT4gT2JqLmdldChpdGVtcywgJ19kaXInKSlcbiAgICAuZXhpc3RzKChkaXIpID0+IGRpciA9PT0gJ3J0bCcpO1xufTtcblxuLyoqXG4gKiBSZXR1cm5zIHRydWUvZmFsc2UgaWYgc3BlY2lmaWVkIGxhbmd1YWdlIHBhY2sgZXhpc3RzLlxuICpcbiAqIEBtZXRob2QgaGFzQ29kZVxuICogQHBhcmFtIHtTdHJpbmd9IGNvZGUgQ29kZSB0byBjaGVjayBmb3IuXG4gKiBAcmV0dXJuIHtCb29sZWFufSBUcnVlIGlmIHRoZSBjdXJyZW50IGxhbmd1YWdlIHBhY2sgZm9yIHRoZSBzcGVjaWZpZWQgY29kZSBleGlzdHMuXG4gKi9cbmNvbnN0IGhhc0NvZGUgPSAoY29kZTogc3RyaW5nKSA9PiBPYmouaGFzKGRhdGEsIGNvZGUpO1xuXG5pbnRlcmZhY2UgSTE4biB7XG4gIGdldERhdGEgKCk6IFJlY29yZDxzdHJpbmcsIFJlY29yZDxzdHJpbmcsIHN0cmluZz4+O1xuICBzZXRDb2RlIChuZXdDb2RlOiBzdHJpbmcpOiB2b2lkO1xuICBnZXRDb2RlICgpOiBzdHJpbmc7XG4gIGFkZCAoY29kZTogc3RyaW5nLCBpdGVtczogUmVjb3JkPHN0cmluZywgc3RyaW5nPik6IHZvaWQ7XG4gIHRyYW5zbGF0ZSAodGV4dDogVW50cmFuc2xhdGVkKTogVHJhbnNsYXRlZFN0cmluZztcbiAgaXNSdGwgKCk6IGJvb2xlYW47XG4gIGhhc0NvZGUgKGNvZGU6IHN0cmluZyk6IGJvb2xlYW47XG59XG5cbmNvbnN0IEkxOG46IEkxOG4gPSB7XG4gIGdldERhdGEsXG4gIHNldENvZGUsXG4gIGdldENvZGUsXG4gIGFkZCxcbiAgdHJhbnNsYXRlLFxuICBpc1J0bCxcbiAgaGFzQ29kZVxufTtcblxuZXhwb3J0IGRlZmF1bHQgSTE4bjtcbiJdfQ==