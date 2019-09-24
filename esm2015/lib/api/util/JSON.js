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
const serialize = (obj) => {
    const data = JSON.stringify(obj);
    if (!Type.isString(data)) {
        return data;
    }
    // convert unicode chars to escaped chars
    return data.replace(/[\u0080-\uFFFF]/g, (match) => {
        const hexCode = match.charCodeAt(0).toString(16);
        return '\\u' + '0000'.substring(hexCode.length) + hexCode;
    });
};
const ɵ0 = serialize;
const JSONUtils = {
    /**
     * Serializes the specified object as a JSON string.
     *
     * @method serialize
     * @param {Object} obj Object to serialize as a JSON string.
     * @return {string} JSON string serialized from input.
     */
    serialize,
    /**
     * Unserializes/parses the specified JSON string into a object.
     *
     * @method parse
     * @param {string} text JSON String to parse into a JavaScript object.
     * @return {Object} Object from input JSON string or undefined if it failed.
     */
    parse(text) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSlNPTi5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Bwb2xwd2FyZS90aW55bWNlLXV0aWwvIiwic291cmNlcyI6WyJsaWIvYXBpL3V0aWwvSlNPTi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7R0FLRztBQUVILE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUV2Qzs7Ozs7Ozs7Ozs7R0FXRztBQUVILE1BQU0sU0FBUyxHQUFHLENBQUMsR0FBTyxFQUFFLEVBQUU7SUFDNUIsTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUVqQyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsRUFBRTtRQUN4QixPQUFPLElBQUksQ0FBQztLQUNiO0lBRUQseUNBQXlDO0lBQ3pDLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxrQkFBa0IsRUFBRSxDQUFDLEtBQUssRUFBRSxFQUFFO1FBQ2hELE1BQU0sT0FBTyxHQUFHLEtBQUssQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ2pELE9BQU8sS0FBSyxHQUFHLE1BQU0sQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxHQUFHLE9BQU8sQ0FBQztJQUM1RCxDQUFDLENBQUMsQ0FBQztBQUNMLENBQUMsQ0FBQzs7QUFPRixNQUFNLFNBQVMsR0FBYztJQUMzQjs7Ozs7O09BTUc7SUFDSCxTQUFTO0lBRVQ7Ozs7OztPQU1HO0lBQ0gsS0FBSyxDQUFFLElBQVk7UUFDakIsSUFBSTtZQUNGLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUN6QjtRQUFDLE9BQU8sRUFBRSxFQUFFO1lBQ1gsU0FBUztTQUNWO0lBQ0gsQ0FBQztDQUNGLENBQUM7QUFFRixlQUFlLFNBQVMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQ29weXJpZ2h0IChjKSBUaW55IFRlY2hub2xvZ2llcywgSW5jLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICogTGljZW5zZWQgdW5kZXIgdGhlIExHUEwgb3IgYSBjb21tZXJjaWFsIGxpY2Vuc2UuXG4gKiBGb3IgTEdQTCBzZWUgTGljZW5zZS50eHQgaW4gdGhlIHByb2plY3Qgcm9vdCBmb3IgbGljZW5zZSBpbmZvcm1hdGlvbi5cbiAqIEZvciBjb21tZXJjaWFsIGxpY2Vuc2VzIHNlZSBodHRwczovL3d3dy50aW55LmNsb3VkL1xuICovXG5cbmltcG9ydCB7IFR5cGUgfSBmcm9tICdAZXBob3gva2F0YW1hcmknO1xuXG4vKipcbiAqIEpTT04gcGFyc2VyIGFuZCBzZXJpYWxpemVyIGNsYXNzLlxuICpcbiAqIEBjbGFzcyB0aW55bWNlLnV0aWwuSlNPTlxuICogQHN0YXRpY1xuICogQGV4YW1wbGVcbiAqIC8vIEpTT04gcGFyc2UgYSBzdHJpbmcgaW50byBhbiBvYmplY3RcbiAqIHZhciBvYmogPSB0aW55bWNlLnV0aWwuSlNPTi5wYXJzZShzb21lc3RyaW5nKTtcbiAqXG4gKiAvLyBKU09OIHNlcmlhbGl6ZSBhIG9iamVjdCBpbnRvIGFuIHN0cmluZ1xuICogdmFyIHN0ciA9IHRpbnltY2UudXRpbC5KU09OLnNlcmlhbGl6ZShvYmopO1xuICovXG5cbmNvbnN0IHNlcmlhbGl6ZSA9IChvYmo6IHt9KSA9PiB7XG4gIGNvbnN0IGRhdGEgPSBKU09OLnN0cmluZ2lmeShvYmopO1xuXG4gIGlmICghVHlwZS5pc1N0cmluZyhkYXRhKSkge1xuICAgIHJldHVybiBkYXRhO1xuICB9XG5cbiAgLy8gY29udmVydCB1bmljb2RlIGNoYXJzIHRvIGVzY2FwZWQgY2hhcnNcbiAgcmV0dXJuIGRhdGEucmVwbGFjZSgvW1xcdTAwODAtXFx1RkZGRl0vZywgKG1hdGNoKSA9PiB7XG4gICAgY29uc3QgaGV4Q29kZSA9IG1hdGNoLmNoYXJDb2RlQXQoMCkudG9TdHJpbmcoMTYpO1xuICAgIHJldHVybiAnXFxcXHUnICsgJzAwMDAnLnN1YnN0cmluZyhoZXhDb2RlLmxlbmd0aCkgKyBoZXhDb2RlO1xuICB9KTtcbn07XG5cbmludGVyZmFjZSBKU09OVXRpbHMge1xuICBzZXJpYWxpemUgKG9iajoge30pOiBzdHJpbmc7XG4gIHBhcnNlICh0ZXh0OiBzdHJpbmcpOiBhbnk7XG59XG5cbmNvbnN0IEpTT05VdGlsczogSlNPTlV0aWxzID0ge1xuICAvKipcbiAgICogU2VyaWFsaXplcyB0aGUgc3BlY2lmaWVkIG9iamVjdCBhcyBhIEpTT04gc3RyaW5nLlxuICAgKlxuICAgKiBAbWV0aG9kIHNlcmlhbGl6ZVxuICAgKiBAcGFyYW0ge09iamVjdH0gb2JqIE9iamVjdCB0byBzZXJpYWxpemUgYXMgYSBKU09OIHN0cmluZy5cbiAgICogQHJldHVybiB7c3RyaW5nfSBKU09OIHN0cmluZyBzZXJpYWxpemVkIGZyb20gaW5wdXQuXG4gICAqL1xuICBzZXJpYWxpemUsXG5cbiAgLyoqXG4gICAqIFVuc2VyaWFsaXplcy9wYXJzZXMgdGhlIHNwZWNpZmllZCBKU09OIHN0cmluZyBpbnRvIGEgb2JqZWN0LlxuICAgKlxuICAgKiBAbWV0aG9kIHBhcnNlXG4gICAqIEBwYXJhbSB7c3RyaW5nfSB0ZXh0IEpTT04gU3RyaW5nIHRvIHBhcnNlIGludG8gYSBKYXZhU2NyaXB0IG9iamVjdC5cbiAgICogQHJldHVybiB7T2JqZWN0fSBPYmplY3QgZnJvbSBpbnB1dCBKU09OIHN0cmluZyBvciB1bmRlZmluZWQgaWYgaXQgZmFpbGVkLlxuICAgKi9cbiAgcGFyc2UgKHRleHQ6IHN0cmluZyk6IGFueSB7XG4gICAgdHJ5IHtcbiAgICAgIHJldHVybiBKU09OLnBhcnNlKHRleHQpO1xuICAgIH0gY2F0Y2ggKGV4KSB7XG4gICAgICAvLyBJZ25vcmVcbiAgICB9XG4gIH1cbn07XG5cbmV4cG9ydCBkZWZhdWx0IEpTT05VdGlsczsiXX0=