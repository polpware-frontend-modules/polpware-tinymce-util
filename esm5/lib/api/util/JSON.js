/**
 * Copyright (c) Tiny Technologies, Inc. All rights reserved.
 * Licensed under the LGPL or a commercial license.
 * For LGPL see License.txt in the project root for license information.
 * For commercial licenses see https://www.tiny.cloud/
 */
import { Type } from '@ephox/katamari';
/**
 * JSON parser and serializer class.
 *
 * @class tinymce.util.JSON
 * @static
 * @example
 * // JSON parse a string into an object
 * var obj = tinymce.util.JSON.parse(somestring);
 *
 * // JSON serialize a object into an string
 * var str = tinymce.util.JSON.serialize(obj);
 */
var serialize = function (obj) {
    var data = JSON.stringify(obj);
    if (!Type.isString(data)) {
        return data;
    }
    // convert unicode chars to escaped chars
    return data.replace(/[\u0080-\uFFFF]/g, function (match) {
        var hexCode = match.charCodeAt(0).toString(16);
        return '\\u' + '0000'.substring(hexCode.length) + hexCode;
    });
};
var ɵ0 = serialize;
var JSONUtils = {
    /**
     * Serializes the specified object as a JSON string.
     *
     * @method serialize
     * @param {Object} obj Object to serialize as a JSON string.
     * @return {string} JSON string serialized from input.
     */
    serialize: serialize,
    /**
     * Unserializes/parses the specified JSON string into a object.
     *
     * @method parse
     * @param {string} text JSON String to parse into a JavaScript object.
     * @return {Object} Object from input JSON string or undefined if it failed.
     */
    parse: function (text) {
        try {
            return JSON.parse(text);
        }
        catch (ex) {
            // Ignore
        }
    }
};
export default JSONUtils;
export { ɵ0 };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSlNPTi5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Bwb2xwd2FyZS90aW55bWNlLXV0aWwvIiwic291cmNlcyI6WyJsaWIvYXBpL3V0aWwvSlNPTi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7R0FLRztBQUVILE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUV2Qzs7Ozs7Ozs7Ozs7R0FXRztBQUVILElBQU0sU0FBUyxHQUFHLFVBQUMsR0FBTztJQUN4QixJQUFNLElBQUksR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBRWpDLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxFQUFFO1FBQ3hCLE9BQU8sSUFBSSxDQUFDO0tBQ2I7SUFFRCx5Q0FBeUM7SUFDekMsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLGtCQUFrQixFQUFFLFVBQUMsS0FBSztRQUM1QyxJQUFNLE9BQU8sR0FBRyxLQUFLLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUNqRCxPQUFPLEtBQUssR0FBRyxNQUFNLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsR0FBRyxPQUFPLENBQUM7SUFDNUQsQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDLENBQUM7O0FBT0YsSUFBTSxTQUFTLEdBQWM7SUFDM0I7Ozs7OztPQU1HO0lBQ0gsU0FBUyxXQUFBO0lBRVQ7Ozs7OztPQU1HO0lBQ0gsS0FBSyxFQUFMLFVBQU8sSUFBWTtRQUNqQixJQUFJO1lBQ0YsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQ3pCO1FBQUMsT0FBTyxFQUFFLEVBQUU7WUFDWCxTQUFTO1NBQ1Y7SUFDSCxDQUFDO0NBQ0YsQ0FBQztBQUVGLGVBQWUsU0FBUyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIFRpbnkgVGVjaG5vbG9naWVzLCBJbmMuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgTEdQTCBvciBhIGNvbW1lcmNpYWwgbGljZW5zZS5cbiAqIEZvciBMR1BMIHNlZSBMaWNlbnNlLnR4dCBpbiB0aGUgcHJvamVjdCByb290IGZvciBsaWNlbnNlIGluZm9ybWF0aW9uLlxuICogRm9yIGNvbW1lcmNpYWwgbGljZW5zZXMgc2VlIGh0dHBzOi8vd3d3LnRpbnkuY2xvdWQvXG4gKi9cblxuaW1wb3J0IHsgVHlwZSB9IGZyb20gJ0BlcGhveC9rYXRhbWFyaSc7XG5cbi8qKlxuICogSlNPTiBwYXJzZXIgYW5kIHNlcmlhbGl6ZXIgY2xhc3MuXG4gKlxuICogQGNsYXNzIHRpbnltY2UudXRpbC5KU09OXG4gKiBAc3RhdGljXG4gKiBAZXhhbXBsZVxuICogLy8gSlNPTiBwYXJzZSBhIHN0cmluZyBpbnRvIGFuIG9iamVjdFxuICogdmFyIG9iaiA9IHRpbnltY2UudXRpbC5KU09OLnBhcnNlKHNvbWVzdHJpbmcpO1xuICpcbiAqIC8vIEpTT04gc2VyaWFsaXplIGEgb2JqZWN0IGludG8gYW4gc3RyaW5nXG4gKiB2YXIgc3RyID0gdGlueW1jZS51dGlsLkpTT04uc2VyaWFsaXplKG9iaik7XG4gKi9cblxuY29uc3Qgc2VyaWFsaXplID0gKG9iajoge30pID0+IHtcbiAgY29uc3QgZGF0YSA9IEpTT04uc3RyaW5naWZ5KG9iaik7XG5cbiAgaWYgKCFUeXBlLmlzU3RyaW5nKGRhdGEpKSB7XG4gICAgcmV0dXJuIGRhdGE7XG4gIH1cblxuICAvLyBjb252ZXJ0IHVuaWNvZGUgY2hhcnMgdG8gZXNjYXBlZCBjaGFyc1xuICByZXR1cm4gZGF0YS5yZXBsYWNlKC9bXFx1MDA4MC1cXHVGRkZGXS9nLCAobWF0Y2gpID0+IHtcbiAgICBjb25zdCBoZXhDb2RlID0gbWF0Y2guY2hhckNvZGVBdCgwKS50b1N0cmluZygxNik7XG4gICAgcmV0dXJuICdcXFxcdScgKyAnMDAwMCcuc3Vic3RyaW5nKGhleENvZGUubGVuZ3RoKSArIGhleENvZGU7XG4gIH0pO1xufTtcblxuaW50ZXJmYWNlIEpTT05VdGlscyB7XG4gIHNlcmlhbGl6ZSAob2JqOiB7fSk6IHN0cmluZztcbiAgcGFyc2UgKHRleHQ6IHN0cmluZyk6IGFueTtcbn1cblxuY29uc3QgSlNPTlV0aWxzOiBKU09OVXRpbHMgPSB7XG4gIC8qKlxuICAgKiBTZXJpYWxpemVzIHRoZSBzcGVjaWZpZWQgb2JqZWN0IGFzIGEgSlNPTiBzdHJpbmcuXG4gICAqXG4gICAqIEBtZXRob2Qgc2VyaWFsaXplXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvYmogT2JqZWN0IHRvIHNlcmlhbGl6ZSBhcyBhIEpTT04gc3RyaW5nLlxuICAgKiBAcmV0dXJuIHtzdHJpbmd9IEpTT04gc3RyaW5nIHNlcmlhbGl6ZWQgZnJvbSBpbnB1dC5cbiAgICovXG4gIHNlcmlhbGl6ZSxcblxuICAvKipcbiAgICogVW5zZXJpYWxpemVzL3BhcnNlcyB0aGUgc3BlY2lmaWVkIEpTT04gc3RyaW5nIGludG8gYSBvYmplY3QuXG4gICAqXG4gICAqIEBtZXRob2QgcGFyc2VcbiAgICogQHBhcmFtIHtzdHJpbmd9IHRleHQgSlNPTiBTdHJpbmcgdG8gcGFyc2UgaW50byBhIEphdmFTY3JpcHQgb2JqZWN0LlxuICAgKiBAcmV0dXJuIHtPYmplY3R9IE9iamVjdCBmcm9tIGlucHV0IEpTT04gc3RyaW5nIG9yIHVuZGVmaW5lZCBpZiBpdCBmYWlsZWQuXG4gICAqL1xuICBwYXJzZSAodGV4dDogc3RyaW5nKTogYW55IHtcbiAgICB0cnkge1xuICAgICAgcmV0dXJuIEpTT04ucGFyc2UodGV4dCk7XG4gICAgfSBjYXRjaCAoZXgpIHtcbiAgICAgIC8vIElnbm9yZVxuICAgIH1cbiAgfVxufTtcblxuZXhwb3J0IGRlZmF1bHQgSlNPTlV0aWxzOyJdfQ==