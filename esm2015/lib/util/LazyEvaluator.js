/**
 * Copyright (c) Tiny Technologies, Inc. All rights reserved.
 * Licensed under the LGPL or a commercial license.
 * For LGPL see License.txt in the project root for license information.
 * For commercial licenses see https://www.tiny.cloud/
 */
import { Option } from '@ephox/katamari';
const evaluateUntil = function (fns, args) {
    for (let i = 0; i < fns.length; i++) {
        const result = fns[i].apply(null, args);
        if (result.isSome()) {
            return result;
        }
    }
    return Option.none();
};
const ɵ0 = evaluateUntil;
export default {
    evaluateUntil
};
export { ɵ0 };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTGF6eUV2YWx1YXRvci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Bwb2xwd2FyZS90aW55bWNlLXV0aWwvIiwic291cmNlcyI6WyJsaWIvdXRpbC9MYXp5RXZhbHVhdG9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7OztHQUtHO0FBRUgsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBRXpDLE1BQU0sYUFBYSxHQUFHLFVBQVUsR0FBRyxFQUFFLElBQUk7SUFDdkMsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7UUFDbkMsTUFBTSxNQUFNLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDeEMsSUFBSSxNQUFNLENBQUMsTUFBTSxFQUFFLEVBQUU7WUFDbkIsT0FBTyxNQUFNLENBQUM7U0FDZjtLQUNGO0lBRUQsT0FBTyxNQUFNLENBQUMsSUFBSSxFQUFFLENBQUM7QUFDdkIsQ0FBQyxDQUFDOztBQUVGLGVBQWU7SUFDYixhQUFhO0NBQ2QsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQ29weXJpZ2h0IChjKSBUaW55IFRlY2hub2xvZ2llcywgSW5jLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICogTGljZW5zZWQgdW5kZXIgdGhlIExHUEwgb3IgYSBjb21tZXJjaWFsIGxpY2Vuc2UuXG4gKiBGb3IgTEdQTCBzZWUgTGljZW5zZS50eHQgaW4gdGhlIHByb2plY3Qgcm9vdCBmb3IgbGljZW5zZSBpbmZvcm1hdGlvbi5cbiAqIEZvciBjb21tZXJjaWFsIGxpY2Vuc2VzIHNlZSBodHRwczovL3d3dy50aW55LmNsb3VkL1xuICovXG5cbmltcG9ydCB7IE9wdGlvbiB9IGZyb20gJ0BlcGhveC9rYXRhbWFyaSc7XG5cbmNvbnN0IGV2YWx1YXRlVW50aWwgPSBmdW5jdGlvbiAoZm5zLCBhcmdzKSB7XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgZm5zLmxlbmd0aDsgaSsrKSB7XG4gICAgY29uc3QgcmVzdWx0ID0gZm5zW2ldLmFwcGx5KG51bGwsIGFyZ3MpO1xuICAgIGlmIChyZXN1bHQuaXNTb21lKCkpIHtcbiAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIE9wdGlvbi5ub25lKCk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIGV2YWx1YXRlVW50aWxcbn07Il19