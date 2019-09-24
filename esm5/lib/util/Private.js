/**
 * Copyright (c) Tiny Technologies, Inc. All rights reserved.
 * Licensed under the LGPL or a commercial license.
 * For LGPL see License.txt in the project root for license information.
 * For commercial licenses see https://www.tiny.cloud/
 */
import Uuid from './Uuid';
/**
 * This module lets you create private properties on objects.
 *
 * @class tinymce.util.Private
 * @private
 */
var fieldName = Uuid.uuid('private');
var set = function (publicKey, privateKey) {
    return function (obj, value) {
        if (!obj[fieldName]) {
            obj[fieldName] = {};
        }
        obj[fieldName][publicKey] = function (key) {
            return key === privateKey ? value : null;
        };
    };
};
var ɵ0 = set;
var getOr = function (publicKey, privateKey) {
    return function (obj, defaultValue) {
        var collection = obj[fieldName];
        var accessor = collection ? collection[publicKey] : null;
        return accessor ? accessor(privateKey) : defaultValue;
    };
};
var ɵ1 = getOr;
var create = function () {
    var publicKey = Uuid.uuid('pu');
    var privateKey = Uuid.uuid('pr');
    return {
        getOr: getOr(publicKey, privateKey),
        set: set(publicKey, privateKey)
    };
};
var ɵ2 = create;
export default {
    create: create
};
export { ɵ0, ɵ1, ɵ2 };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUHJpdmF0ZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Bwb2xwd2FyZS90aW55bWNlLXV0aWwvIiwic291cmNlcyI6WyJsaWIvdXRpbC9Qcml2YXRlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7OztHQUtHO0FBRUgsT0FBTyxJQUFJLE1BQU0sUUFBUSxDQUFDO0FBRTFCOzs7OztHQUtHO0FBRUgsSUFBTSxTQUFTLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztBQUV2QyxJQUFNLEdBQUcsR0FBRyxVQUFVLFNBQVMsRUFBRSxVQUFVO0lBQ3pDLE9BQU8sVUFBVSxHQUFHLEVBQUUsS0FBSztRQUN6QixJQUFJLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxFQUFFO1lBQ25CLEdBQUcsQ0FBQyxTQUFTLENBQUMsR0FBRyxFQUFFLENBQUM7U0FDckI7UUFFRCxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUMsU0FBUyxDQUFDLEdBQUcsVUFBVSxHQUFHO1lBQ3ZDLE9BQU8sR0FBRyxLQUFLLFVBQVUsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7UUFDM0MsQ0FBQyxDQUFDO0lBQ0osQ0FBQyxDQUFDO0FBQ0osQ0FBQyxDQUFDOztBQUVGLElBQU0sS0FBSyxHQUFHLFVBQVUsU0FBUyxFQUFFLFVBQVU7SUFDM0MsT0FBTyxVQUFVLEdBQUcsRUFBRSxZQUFZO1FBQ2hDLElBQU0sVUFBVSxHQUFHLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUNsQyxJQUFNLFFBQVEsR0FBRyxVQUFVLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO1FBQzNELE9BQU8sUUFBUSxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLFlBQVksQ0FBQztJQUN4RCxDQUFDLENBQUM7QUFDSixDQUFDLENBQUM7O0FBRUYsSUFBTSxNQUFNLEdBQUc7SUFDYixJQUFNLFNBQVMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ2xDLElBQU0sVUFBVSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFFbkMsT0FBTztRQUNMLEtBQUssRUFBRSxLQUFLLENBQUMsU0FBUyxFQUFFLFVBQVUsQ0FBQztRQUNuQyxHQUFHLEVBQUUsR0FBRyxDQUFDLFNBQVMsRUFBRSxVQUFVLENBQUM7S0FDaEMsQ0FBQztBQUNKLENBQUMsQ0FBQzs7QUFFRixlQUFlO0lBQ2IsTUFBTSxRQUFBO0NBQ1AsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQ29weXJpZ2h0IChjKSBUaW55IFRlY2hub2xvZ2llcywgSW5jLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICogTGljZW5zZWQgdW5kZXIgdGhlIExHUEwgb3IgYSBjb21tZXJjaWFsIGxpY2Vuc2UuXG4gKiBGb3IgTEdQTCBzZWUgTGljZW5zZS50eHQgaW4gdGhlIHByb2plY3Qgcm9vdCBmb3IgbGljZW5zZSBpbmZvcm1hdGlvbi5cbiAqIEZvciBjb21tZXJjaWFsIGxpY2Vuc2VzIHNlZSBodHRwczovL3d3dy50aW55LmNsb3VkL1xuICovXG5cbmltcG9ydCBVdWlkIGZyb20gJy4vVXVpZCc7XG5cbi8qKlxuICogVGhpcyBtb2R1bGUgbGV0cyB5b3UgY3JlYXRlIHByaXZhdGUgcHJvcGVydGllcyBvbiBvYmplY3RzLlxuICpcbiAqIEBjbGFzcyB0aW55bWNlLnV0aWwuUHJpdmF0ZVxuICogQHByaXZhdGVcbiAqL1xuXG5jb25zdCBmaWVsZE5hbWUgPSBVdWlkLnV1aWQoJ3ByaXZhdGUnKTtcblxuY29uc3Qgc2V0ID0gZnVuY3Rpb24gKHB1YmxpY0tleSwgcHJpdmF0ZUtleSkge1xuICByZXR1cm4gZnVuY3Rpb24gKG9iaiwgdmFsdWUpIHtcbiAgICBpZiAoIW9ialtmaWVsZE5hbWVdKSB7XG4gICAgICBvYmpbZmllbGROYW1lXSA9IHt9O1xuICAgIH1cblxuICAgIG9ialtmaWVsZE5hbWVdW3B1YmxpY0tleV0gPSBmdW5jdGlvbiAoa2V5KSB7XG4gICAgICByZXR1cm4ga2V5ID09PSBwcml2YXRlS2V5ID8gdmFsdWUgOiBudWxsO1xuICAgIH07XG4gIH07XG59O1xuXG5jb25zdCBnZXRPciA9IGZ1bmN0aW9uIChwdWJsaWNLZXksIHByaXZhdGVLZXkpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIChvYmosIGRlZmF1bHRWYWx1ZSkge1xuICAgIGNvbnN0IGNvbGxlY3Rpb24gPSBvYmpbZmllbGROYW1lXTtcbiAgICBjb25zdCBhY2Nlc3NvciA9IGNvbGxlY3Rpb24gPyBjb2xsZWN0aW9uW3B1YmxpY0tleV0gOiBudWxsO1xuICAgIHJldHVybiBhY2Nlc3NvciA/IGFjY2Vzc29yKHByaXZhdGVLZXkpIDogZGVmYXVsdFZhbHVlO1xuICB9O1xufTtcblxuY29uc3QgY3JlYXRlID0gZnVuY3Rpb24gKCkge1xuICBjb25zdCBwdWJsaWNLZXkgPSBVdWlkLnV1aWQoJ3B1Jyk7XG4gIGNvbnN0IHByaXZhdGVLZXkgPSBVdWlkLnV1aWQoJ3ByJyk7XG5cbiAgcmV0dXJuIHtcbiAgICBnZXRPcjogZ2V0T3IocHVibGljS2V5LCBwcml2YXRlS2V5KSxcbiAgICBzZXQ6IHNldChwdWJsaWNLZXksIHByaXZhdGVLZXkpXG4gIH07XG59O1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIGNyZWF0ZVxufTsiXX0=