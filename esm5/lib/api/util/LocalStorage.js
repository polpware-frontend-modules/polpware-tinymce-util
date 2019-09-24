/**
 * Copyright (c) Tiny Technologies, Inc. All rights reserved.
 * Licensed under the LGPL or a commercial license.
 * For LGPL see License.txt in the project root for license information.
 * For commercial licenses see https://www.tiny.cloud/
 */
import { window } from '@ephox/dom-globals';
import * as FakeStorage from './FakeStorage';
/**
 * @class tinymce.util.LocalStorage
 * @static
 * @version 4.0
 * @example
 * tinymce.util.LocalStorage.setItem('key', 'value');
 * var value = tinymce.util.LocalStorage.getItem('key');
 */
var localStorage;
// IE11 with certain strict security settings will explode when trying to access localStorage
// so we need to do a try/catch and a simple stub here. #TINY-1782
try {
    localStorage = window.localStorage;
}
catch (e) {
    localStorage = FakeStorage.create();
}
export default localStorage;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTG9jYWxTdG9yYWdlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHBvbHB3YXJlL3RpbnltY2UtdXRpbC8iLCJzb3VyY2VzIjpbImxpYi9hcGkvdXRpbC9Mb2NhbFN0b3JhZ2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7O0dBS0c7QUFFSCxPQUFPLEVBQUUsTUFBTSxFQUFXLE1BQU0sb0JBQW9CLENBQUM7QUFDckQsT0FBTyxLQUFLLFdBQVcsTUFBTSxlQUFlLENBQUM7QUFFN0M7Ozs7Ozs7R0FPRztBQUVILElBQUksWUFBcUIsQ0FBQztBQUUxQiw2RkFBNkY7QUFDN0Ysa0VBQWtFO0FBRWxFLElBQUk7SUFDRixZQUFZLEdBQUcsTUFBTSxDQUFDLFlBQVksQ0FBQztDQUNwQztBQUFDLE9BQU8sQ0FBQyxFQUFFO0lBQ1YsWUFBWSxHQUFHLFdBQVcsQ0FBQyxNQUFNLEVBQUUsQ0FBQztDQUNyQztBQUVELGVBQWUsWUFBWSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIFRpbnkgVGVjaG5vbG9naWVzLCBJbmMuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgTEdQTCBvciBhIGNvbW1lcmNpYWwgbGljZW5zZS5cbiAqIEZvciBMR1BMIHNlZSBMaWNlbnNlLnR4dCBpbiB0aGUgcHJvamVjdCByb290IGZvciBsaWNlbnNlIGluZm9ybWF0aW9uLlxuICogRm9yIGNvbW1lcmNpYWwgbGljZW5zZXMgc2VlIGh0dHBzOi8vd3d3LnRpbnkuY2xvdWQvXG4gKi9cblxuaW1wb3J0IHsgd2luZG93LCBTdG9yYWdlIH0gZnJvbSAnQGVwaG94L2RvbS1nbG9iYWxzJztcbmltcG9ydCAqIGFzIEZha2VTdG9yYWdlIGZyb20gJy4vRmFrZVN0b3JhZ2UnO1xuXG4vKipcbiAqIEBjbGFzcyB0aW55bWNlLnV0aWwuTG9jYWxTdG9yYWdlXG4gKiBAc3RhdGljXG4gKiBAdmVyc2lvbiA0LjBcbiAqIEBleGFtcGxlXG4gKiB0aW55bWNlLnV0aWwuTG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2tleScsICd2YWx1ZScpO1xuICogdmFyIHZhbHVlID0gdGlueW1jZS51dGlsLkxvY2FsU3RvcmFnZS5nZXRJdGVtKCdrZXknKTtcbiAqL1xuXG5sZXQgbG9jYWxTdG9yYWdlOiBTdG9yYWdlO1xuXG4vLyBJRTExIHdpdGggY2VydGFpbiBzdHJpY3Qgc2VjdXJpdHkgc2V0dGluZ3Mgd2lsbCBleHBsb2RlIHdoZW4gdHJ5aW5nIHRvIGFjY2VzcyBsb2NhbFN0b3JhZ2Vcbi8vIHNvIHdlIG5lZWQgdG8gZG8gYSB0cnkvY2F0Y2ggYW5kIGEgc2ltcGxlIHN0dWIgaGVyZS4gI1RJTlktMTc4MlxuXG50cnkge1xuICBsb2NhbFN0b3JhZ2UgPSB3aW5kb3cubG9jYWxTdG9yYWdlO1xufSBjYXRjaCAoZSkge1xuICBsb2NhbFN0b3JhZ2UgPSBGYWtlU3RvcmFnZS5jcmVhdGUoKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgbG9jYWxTdG9yYWdlO1xuIl19