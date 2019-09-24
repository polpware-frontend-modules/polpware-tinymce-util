/**
 * Copyright (c) Tiny Technologies, Inc. All rights reserved.
 * Licensed under the LGPL or a commercial license.
 * For LGPL see License.txt in the project root for license information.
 * For commercial licenses see https://www.tiny.cloud/
 */
import { Option } from '@ephox/katamari';
var evaluateUntil = function (fns, args) {
    for (var i = 0; i < fns.length; i++) {
        var result = fns[i].apply(null, args);
        if (result.isSome()) {
            return result;
        }
    }
    return Option.none();
};
var ɵ0 = evaluateUntil;
export default {
    evaluateUntil: evaluateUntil
};
export { ɵ0 };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTGF6eUV2YWx1YXRvci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Bwb2xwd2FyZS90aW55bWNlLXV0aWwvIiwic291cmNlcyI6WyJsaWIvdXRpbC9MYXp5RXZhbHVhdG9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7OztHQUtHO0FBRUgsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBRXpDLElBQU0sYUFBYSxHQUFHLFVBQVUsR0FBRyxFQUFFLElBQUk7SUFDdkMsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7UUFDbkMsSUFBTSxNQUFNLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDeEMsSUFBSSxNQUFNLENBQUMsTUFBTSxFQUFFLEVBQUU7WUFDbkIsT0FBTyxNQUFNLENBQUM7U0FDZjtLQUNGO0lBRUQsT0FBTyxNQUFNLENBQUMsSUFBSSxFQUFFLENBQUM7QUFDdkIsQ0FBQyxDQUFDOztBQUVGLGVBQWU7SUFDYixhQUFhLGVBQUE7Q0FDZCxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIFRpbnkgVGVjaG5vbG9naWVzLCBJbmMuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgTEdQTCBvciBhIGNvbW1lcmNpYWwgbGljZW5zZS5cbiAqIEZvciBMR1BMIHNlZSBMaWNlbnNlLnR4dCBpbiB0aGUgcHJvamVjdCByb290IGZvciBsaWNlbnNlIGluZm9ybWF0aW9uLlxuICogRm9yIGNvbW1lcmNpYWwgbGljZW5zZXMgc2VlIGh0dHBzOi8vd3d3LnRpbnkuY2xvdWQvXG4gKi9cblxuaW1wb3J0IHsgT3B0aW9uIH0gZnJvbSAnQGVwaG94L2thdGFtYXJpJztcblxuY29uc3QgZXZhbHVhdGVVbnRpbCA9IGZ1bmN0aW9uIChmbnMsIGFyZ3MpIHtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBmbnMubGVuZ3RoOyBpKyspIHtcbiAgICBjb25zdCByZXN1bHQgPSBmbnNbaV0uYXBwbHkobnVsbCwgYXJncyk7XG4gICAgaWYgKHJlc3VsdC5pc1NvbWUoKSkge1xuICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gT3B0aW9uLm5vbmUoKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgZXZhbHVhdGVVbnRpbFxufTsiXX0=