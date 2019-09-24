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
const fieldName = Uuid.uuid('private');
const set = function (publicKey, privateKey) {
    return function (obj, value) {
        if (!obj[fieldName]) {
            obj[fieldName] = {};
        }
        obj[fieldName][publicKey] = function (key) {
            return key === privateKey ? value : null;
        };
    };
};
const ɵ0 = set;
const getOr = function (publicKey, privateKey) {
    return function (obj, defaultValue) {
        const collection = obj[fieldName];
        const accessor = collection ? collection[publicKey] : null;
        return accessor ? accessor(privateKey) : defaultValue;
    };
};
const ɵ1 = getOr;
const create = function () {
    const publicKey = Uuid.uuid('pu');
    const privateKey = Uuid.uuid('pr');
    return {
        getOr: getOr(publicKey, privateKey),
        set: set(publicKey, privateKey)
    };
};
const ɵ2 = create;
export default {
    create
};
export { ɵ0, ɵ1, ɵ2 };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUHJpdmF0ZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Bwb2xwd2FyZS90aW55bWNlLXV0aWwvIiwic291cmNlcyI6WyJsaWIvdXRpbC9Qcml2YXRlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7OztHQUtHO0FBRUgsT0FBTyxJQUFJLE1BQU0sUUFBUSxDQUFDO0FBRTFCOzs7OztHQUtHO0FBRUgsTUFBTSxTQUFTLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztBQUV2QyxNQUFNLEdBQUcsR0FBRyxVQUFVLFNBQVMsRUFBRSxVQUFVO0lBQ3pDLE9BQU8sVUFBVSxHQUFHLEVBQUUsS0FBSztRQUN6QixJQUFJLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxFQUFFO1lBQ25CLEdBQUcsQ0FBQyxTQUFTLENBQUMsR0FBRyxFQUFFLENBQUM7U0FDckI7UUFFRCxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUMsU0FBUyxDQUFDLEdBQUcsVUFBVSxHQUFHO1lBQ3ZDLE9BQU8sR0FBRyxLQUFLLFVBQVUsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7UUFDM0MsQ0FBQyxDQUFDO0lBQ0osQ0FBQyxDQUFDO0FBQ0osQ0FBQyxDQUFDOztBQUVGLE1BQU0sS0FBSyxHQUFHLFVBQVUsU0FBUyxFQUFFLFVBQVU7SUFDM0MsT0FBTyxVQUFVLEdBQUcsRUFBRSxZQUFZO1FBQ2hDLE1BQU0sVUFBVSxHQUFHLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUNsQyxNQUFNLFFBQVEsR0FBRyxVQUFVLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO1FBQzNELE9BQU8sUUFBUSxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLFlBQVksQ0FBQztJQUN4RCxDQUFDLENBQUM7QUFDSixDQUFDLENBQUM7O0FBRUYsTUFBTSxNQUFNLEdBQUc7SUFDYixNQUFNLFNBQVMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ2xDLE1BQU0sVUFBVSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFFbkMsT0FBTztRQUNMLEtBQUssRUFBRSxLQUFLLENBQUMsU0FBUyxFQUFFLFVBQVUsQ0FBQztRQUNuQyxHQUFHLEVBQUUsR0FBRyxDQUFDLFNBQVMsRUFBRSxVQUFVLENBQUM7S0FDaEMsQ0FBQztBQUNKLENBQUMsQ0FBQzs7QUFFRixlQUFlO0lBQ2IsTUFBTTtDQUNQLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIENvcHlyaWdodCAoYykgVGlueSBUZWNobm9sb2dpZXMsIEluYy4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBMR1BMIG9yIGEgY29tbWVyY2lhbCBsaWNlbnNlLlxuICogRm9yIExHUEwgc2VlIExpY2Vuc2UudHh0IGluIHRoZSBwcm9qZWN0IHJvb3QgZm9yIGxpY2Vuc2UgaW5mb3JtYXRpb24uXG4gKiBGb3IgY29tbWVyY2lhbCBsaWNlbnNlcyBzZWUgaHR0cHM6Ly93d3cudGlueS5jbG91ZC9cbiAqL1xuXG5pbXBvcnQgVXVpZCBmcm9tICcuL1V1aWQnO1xuXG4vKipcbiAqIFRoaXMgbW9kdWxlIGxldHMgeW91IGNyZWF0ZSBwcml2YXRlIHByb3BlcnRpZXMgb24gb2JqZWN0cy5cbiAqXG4gKiBAY2xhc3MgdGlueW1jZS51dGlsLlByaXZhdGVcbiAqIEBwcml2YXRlXG4gKi9cblxuY29uc3QgZmllbGROYW1lID0gVXVpZC51dWlkKCdwcml2YXRlJyk7XG5cbmNvbnN0IHNldCA9IGZ1bmN0aW9uIChwdWJsaWNLZXksIHByaXZhdGVLZXkpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIChvYmosIHZhbHVlKSB7XG4gICAgaWYgKCFvYmpbZmllbGROYW1lXSkge1xuICAgICAgb2JqW2ZpZWxkTmFtZV0gPSB7fTtcbiAgICB9XG5cbiAgICBvYmpbZmllbGROYW1lXVtwdWJsaWNLZXldID0gZnVuY3Rpb24gKGtleSkge1xuICAgICAgcmV0dXJuIGtleSA9PT0gcHJpdmF0ZUtleSA/IHZhbHVlIDogbnVsbDtcbiAgICB9O1xuICB9O1xufTtcblxuY29uc3QgZ2V0T3IgPSBmdW5jdGlvbiAocHVibGljS2V5LCBwcml2YXRlS2V5KSB7XG4gIHJldHVybiBmdW5jdGlvbiAob2JqLCBkZWZhdWx0VmFsdWUpIHtcbiAgICBjb25zdCBjb2xsZWN0aW9uID0gb2JqW2ZpZWxkTmFtZV07XG4gICAgY29uc3QgYWNjZXNzb3IgPSBjb2xsZWN0aW9uID8gY29sbGVjdGlvbltwdWJsaWNLZXldIDogbnVsbDtcbiAgICByZXR1cm4gYWNjZXNzb3IgPyBhY2Nlc3Nvcihwcml2YXRlS2V5KSA6IGRlZmF1bHRWYWx1ZTtcbiAgfTtcbn07XG5cbmNvbnN0IGNyZWF0ZSA9IGZ1bmN0aW9uICgpIHtcbiAgY29uc3QgcHVibGljS2V5ID0gVXVpZC51dWlkKCdwdScpO1xuICBjb25zdCBwcml2YXRlS2V5ID0gVXVpZC51dWlkKCdwcicpO1xuXG4gIHJldHVybiB7XG4gICAgZ2V0T3I6IGdldE9yKHB1YmxpY0tleSwgcHJpdmF0ZUtleSksXG4gICAgc2V0OiBzZXQocHVibGljS2V5LCBwcml2YXRlS2V5KVxuICB9O1xufTtcblxuZXhwb3J0IGRlZmF1bHQge1xuICBjcmVhdGVcbn07Il19