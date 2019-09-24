/**
 * Copyright (c) Tiny Technologies, Inc. All rights reserved.
 * Licensed under the LGPL or a commercial license.
 * For LGPL see License.txt in the project root for license information.
 * For commercial licenses see https://www.tiny.cloud/
 */
const slice = [].slice;
const or = function (...x) {
    const args = slice.call(arguments);
    return function (x) {
        for (let i = 0; i < args.length; i++) {
            if (args[i](x)) {
                return true;
            }
        }
        return false;
    };
};
const ɵ0 = or;
const and = function (...x) {
    const args = slice.call(arguments);
    return function (x) {
        for (let i = 0; i < args.length; i++) {
            if (!args[i](x)) {
                return false;
            }
        }
        return true;
    };
};
const ɵ1 = and;
export default {
    and,
    or
};
export { ɵ0, ɵ1 };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUHJlZGljYXRlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHBvbHB3YXJlL3RpbnltY2UtdXRpbC8iLCJzb3VyY2VzIjpbImxpYi91dGlsL1ByZWRpY2F0ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7R0FLRztBQUVILE1BQU0sS0FBSyxHQUFHLEVBQUUsQ0FBQyxLQUFLLENBQUM7QUFFdkIsTUFBTSxFQUFFLEdBQUcsVUFBVSxHQUFHLENBQVE7SUFDOUIsTUFBTSxJQUFJLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUVuQyxPQUFPLFVBQVUsQ0FBQztRQUNoQixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUNwQyxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRTtnQkFDZCxPQUFPLElBQUksQ0FBQzthQUNiO1NBQ0Y7UUFFRCxPQUFPLEtBQUssQ0FBQztJQUNmLENBQUMsQ0FBQztBQUNKLENBQUMsQ0FBQzs7QUFFRixNQUFNLEdBQUcsR0FBRyxVQUFVLEdBQUcsQ0FBUTtJQUMvQixNQUFNLElBQUksR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBRW5DLE9BQU8sVUFBVSxDQUFDO1FBQ2hCLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQ3BDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUU7Z0JBQ2YsT0FBTyxLQUFLLENBQUM7YUFDZDtTQUNGO1FBRUQsT0FBTyxJQUFJLENBQUM7SUFDZCxDQUFDLENBQUM7QUFDSixDQUFDLENBQUM7O0FBRUYsZUFBZTtJQUNiLEdBQUc7SUFDSCxFQUFFO0NBQ0gsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQ29weXJpZ2h0IChjKSBUaW55IFRlY2hub2xvZ2llcywgSW5jLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICogTGljZW5zZWQgdW5kZXIgdGhlIExHUEwgb3IgYSBjb21tZXJjaWFsIGxpY2Vuc2UuXG4gKiBGb3IgTEdQTCBzZWUgTGljZW5zZS50eHQgaW4gdGhlIHByb2plY3Qgcm9vdCBmb3IgbGljZW5zZSBpbmZvcm1hdGlvbi5cbiAqIEZvciBjb21tZXJjaWFsIGxpY2Vuc2VzIHNlZSBodHRwczovL3d3dy50aW55LmNsb3VkL1xuICovXG5cbmNvbnN0IHNsaWNlID0gW10uc2xpY2U7XG5cbmNvbnN0IG9yID0gZnVuY3Rpb24gKC4uLng6IGFueVtdKSB7XG4gIGNvbnN0IGFyZ3MgPSBzbGljZS5jYWxsKGFyZ3VtZW50cyk7XG5cbiAgcmV0dXJuIGZ1bmN0aW9uICh4KSB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBhcmdzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBpZiAoYXJnc1tpXSh4KSkge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gZmFsc2U7XG4gIH07XG59O1xuXG5jb25zdCBhbmQgPSBmdW5jdGlvbiAoLi4ueDogYW55W10pIHtcbiAgY29uc3QgYXJncyA9IHNsaWNlLmNhbGwoYXJndW1lbnRzKTtcblxuICByZXR1cm4gZnVuY3Rpb24gKHgpIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGFyZ3MubGVuZ3RoOyBpKyspIHtcbiAgICAgIGlmICghYXJnc1tpXSh4KSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHRydWU7XG4gIH07XG59O1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIGFuZCxcbiAgb3Jcbn07XG4iXX0=