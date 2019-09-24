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
var count = 0;
var seed = function () {
    var rnd = function () {
        return Math.round(Math.random() * 0xFFFFFFFF).toString(36);
    };
    var now = new Date().getTime();
    return 's' + now.toString(36) + rnd() + rnd() + rnd();
};
var ɵ0 = seed;
var uuid = function (prefix) {
    return prefix + (count++) + seed();
};
var ɵ1 = uuid;
export default {
    uuid: uuid
};
export { ɵ0, ɵ1 };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVXVpZC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Bwb2xwd2FyZS90aW55bWNlLXV0aWwvIiwic291cmNlcyI6WyJsaWIvdXRpbC9VdWlkLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7OztHQUtHO0FBRUg7Ozs7O0dBS0c7QUFFSCxJQUFJLEtBQUssR0FBRyxDQUFDLENBQUM7QUFFZCxJQUFNLElBQUksR0FBRztJQUNYLElBQU0sR0FBRyxHQUFHO1FBQ1YsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsR0FBRyxVQUFVLENBQUMsQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDN0QsQ0FBQyxDQUFDO0lBRUYsSUFBTSxHQUFHLEdBQUcsSUFBSSxJQUFJLEVBQUUsQ0FBQyxPQUFPLEVBQUUsQ0FBQztJQUNqQyxPQUFPLEdBQUcsR0FBRyxHQUFHLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxHQUFHLEdBQUcsRUFBRSxHQUFHLEdBQUcsRUFBRSxHQUFHLEdBQUcsRUFBRSxDQUFDO0FBQ3hELENBQUMsQ0FBQzs7QUFFRixJQUFNLElBQUksR0FBRyxVQUFVLE1BQU07SUFDM0IsT0FBTyxNQUFNLEdBQUcsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxHQUFHLElBQUksRUFBRSxDQUFDO0FBQ3JDLENBQUMsQ0FBQzs7QUFFRixlQUFlO0lBQ2IsSUFBSSxNQUFBO0NBQ0wsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQ29weXJpZ2h0IChjKSBUaW55IFRlY2hub2xvZ2llcywgSW5jLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICogTGljZW5zZWQgdW5kZXIgdGhlIExHUEwgb3IgYSBjb21tZXJjaWFsIGxpY2Vuc2UuXG4gKiBGb3IgTEdQTCBzZWUgTGljZW5zZS50eHQgaW4gdGhlIHByb2plY3Qgcm9vdCBmb3IgbGljZW5zZSBpbmZvcm1hdGlvbi5cbiAqIEZvciBjb21tZXJjaWFsIGxpY2Vuc2VzIHNlZSBodHRwczovL3d3dy50aW55LmNsb3VkL1xuICovXG5cbi8qKlxuICogR2VuZXJhdGVzIHVuaXF1ZSBpZHMuXG4gKlxuICogQGNsYXNzIHRpbnltY2UudXRpbC5VdWlkXG4gKiBAcHJpdmF0ZVxuICovXG5cbmxldCBjb3VudCA9IDA7XG5cbmNvbnN0IHNlZWQgPSBmdW5jdGlvbiAoKSB7XG4gIGNvbnN0IHJuZCA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gTWF0aC5yb3VuZChNYXRoLnJhbmRvbSgpICogMHhGRkZGRkZGRikudG9TdHJpbmcoMzYpO1xuICB9O1xuXG4gIGNvbnN0IG5vdyA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xuICByZXR1cm4gJ3MnICsgbm93LnRvU3RyaW5nKDM2KSArIHJuZCgpICsgcm5kKCkgKyBybmQoKTtcbn07XG5cbmNvbnN0IHV1aWQgPSBmdW5jdGlvbiAocHJlZml4KSB7XG4gIHJldHVybiBwcmVmaXggKyAoY291bnQrKykgKyBzZWVkKCk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIHV1aWRcbn07Il19