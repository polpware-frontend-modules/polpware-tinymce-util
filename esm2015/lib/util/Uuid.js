/**
 * Copyright (c) Tiny Technologies, Inc. All rights reserved.
 * Licensed under the LGPL or a commercial license.
 * For LGPL see License.txt in the project root for license information.
 * For commercial licenses see https://www.tiny.cloud/
 */
/**
 * Generates unique ids.
 *
 * @class tinymce.util.Uuid
 * @private
 */
let count = 0;
const seed = function () {
    const rnd = function () {
        return Math.round(Math.random() * 0xFFFFFFFF).toString(36);
    };
    const now = new Date().getTime();
    return 's' + now.toString(36) + rnd() + rnd() + rnd();
};
const ɵ0 = seed;
const uuid = function (prefix) {
    return prefix + (count++) + seed();
};
const ɵ1 = uuid;
export default {
    uuid
};
export { ɵ0, ɵ1 };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVXVpZC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Bwb2xwd2FyZS90aW55bWNlLXV0aWwvIiwic291cmNlcyI6WyJsaWIvdXRpbC9VdWlkLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7OztHQUtHO0FBRUg7Ozs7O0dBS0c7QUFFSCxJQUFJLEtBQUssR0FBRyxDQUFDLENBQUM7QUFFZCxNQUFNLElBQUksR0FBRztJQUNYLE1BQU0sR0FBRyxHQUFHO1FBQ1YsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsR0FBRyxVQUFVLENBQUMsQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDN0QsQ0FBQyxDQUFDO0lBRUYsTUFBTSxHQUFHLEdBQUcsSUFBSSxJQUFJLEVBQUUsQ0FBQyxPQUFPLEVBQUUsQ0FBQztJQUNqQyxPQUFPLEdBQUcsR0FBRyxHQUFHLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxHQUFHLEdBQUcsRUFBRSxHQUFHLEdBQUcsRUFBRSxHQUFHLEdBQUcsRUFBRSxDQUFDO0FBQ3hELENBQUMsQ0FBQzs7QUFFRixNQUFNLElBQUksR0FBRyxVQUFVLE1BQU07SUFDM0IsT0FBTyxNQUFNLEdBQUcsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxHQUFHLElBQUksRUFBRSxDQUFDO0FBQ3JDLENBQUMsQ0FBQzs7QUFFRixlQUFlO0lBQ2IsSUFBSTtDQUNMLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIENvcHlyaWdodCAoYykgVGlueSBUZWNobm9sb2dpZXMsIEluYy4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBMR1BMIG9yIGEgY29tbWVyY2lhbCBsaWNlbnNlLlxuICogRm9yIExHUEwgc2VlIExpY2Vuc2UudHh0IGluIHRoZSBwcm9qZWN0IHJvb3QgZm9yIGxpY2Vuc2UgaW5mb3JtYXRpb24uXG4gKiBGb3IgY29tbWVyY2lhbCBsaWNlbnNlcyBzZWUgaHR0cHM6Ly93d3cudGlueS5jbG91ZC9cbiAqL1xuXG4vKipcbiAqIEdlbmVyYXRlcyB1bmlxdWUgaWRzLlxuICpcbiAqIEBjbGFzcyB0aW55bWNlLnV0aWwuVXVpZFxuICogQHByaXZhdGVcbiAqL1xuXG5sZXQgY291bnQgPSAwO1xuXG5jb25zdCBzZWVkID0gZnVuY3Rpb24gKCkge1xuICBjb25zdCBybmQgPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIE1hdGgucm91bmQoTWF0aC5yYW5kb20oKSAqIDB4RkZGRkZGRkYpLnRvU3RyaW5nKDM2KTtcbiAgfTtcblxuICBjb25zdCBub3cgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcbiAgcmV0dXJuICdzJyArIG5vdy50b1N0cmluZygzNikgKyBybmQoKSArIHJuZCgpICsgcm5kKCk7XG59O1xuXG5jb25zdCB1dWlkID0gZnVuY3Rpb24gKHByZWZpeCkge1xuICByZXR1cm4gcHJlZml4ICsgKGNvdW50KyspICsgc2VlZCgpO1xufTtcblxuZXhwb3J0IGRlZmF1bHQge1xuICB1dWlkXG59OyJdfQ==