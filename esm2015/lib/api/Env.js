/**
 * Copyright (c) Tiny Technologies, Inc. All rights reserved.
 * Licensed under the LGPL or a commercial license.
 * For LGPL see License.txt in the project root for license information.
 * For commercial licenses see https://www.tiny.cloud/
 */
import { navigator, window, matchMedia, document, URL } from '@ephox/dom-globals';
/**
 * This class contains various environment constants like browser versions etc.
 * Normally you don't want to sniff specific browser versions but sometimes you have
 * to when it's impossible to feature detect. So use this with care.
 *
 * @class tinymce.Env
 * @static
 */
const nav = navigator, userAgent = nav.userAgent;
let opera, webkit, ie, ie11, ie12, gecko, mac, iDevice, android, fileApi, phone, tablet, windowsPhone;
const matchMediaQuery = function (query) {
    return 'matchMedia' in window ? matchMedia(query).matches : false;
};
const ɵ0 = matchMediaQuery;
opera = false;
android = /Android/.test(userAgent);
webkit = /WebKit/.test(userAgent);
ie = !webkit && !opera && (/MSIE/gi).test(userAgent) && (/Explorer/gi).test(nav.appName);
ie = ie && /MSIE (\w+)\./.exec(userAgent)[1];
ie11 = userAgent.indexOf('Trident/') !== -1 && (userAgent.indexOf('rv:') !== -1 || nav.appName.indexOf('Netscape') !== -1) ? 11 : false;
ie12 = (userAgent.indexOf('Edge/') !== -1 && !ie && !ie11) ? 12 : false;
ie = ie || ie11 || ie12;
gecko = !webkit && !ie11 && /Gecko/.test(userAgent);
mac = userAgent.indexOf('Mac') !== -1;
iDevice = /(iPad|iPhone)/.test(userAgent);
fileApi = 'FormData' in window && 'FileReader' in window && 'URL' in window && !!URL.createObjectURL;
phone = matchMediaQuery('only screen and (max-device-width: 480px)') && (android || iDevice);
tablet = matchMediaQuery('only screen and (min-width: 800px)') && (android || iDevice);
windowsPhone = userAgent.indexOf('Windows Phone') !== -1;
if (ie12) {
    webkit = false;
}
// Is a iPad/iPhone and not on iOS5 sniff the WebKit version since older iOS WebKit versions
// says it has contentEditable support but there is no visible caret.
const contentEditable = !iDevice || fileApi || parseInt(userAgent.match(/AppleWebKit\/(\d*)/)[1], 10) >= 534;
const Env = {
    /**
     * Constant that is true if the browser is Opera.
     *
     * @property opera
     * @type Boolean
     * @final
     */
    opera,
    /**
     * Constant that is true if the browser is WebKit (Safari/Chrome).
     *
     * @property webKit
     * @type Boolean
     * @final
     */
    webkit,
    /**
     * Constant that is more than zero if the browser is IE.
     *
     * @property ie
     * @type Boolean
     * @final
     */
    ie,
    /**
     * Constant that is true if the browser is Gecko.
     *
     * @property gecko
     * @type Boolean
     * @final
     */
    gecko,
    /**
     * Constant that is true if the os is Mac OS.
     *
     * @property mac
     * @type Boolean
     * @final
     */
    mac,
    /**
     * Constant that is true if the os is iOS.
     *
     * @property iOS
     * @type Boolean
     * @final
     */
    iOS: iDevice,
    /**
     * Constant that is true if the os is android.
     *
     * @property android
     * @type Boolean
     * @final
     */
    android,
    /**
     * Constant that is true if the browser supports editing.
     *
     * @property contentEditable
     * @type Boolean
     * @final
     */
    contentEditable,
    /**
     * Transparent image data url.
     *
     * @property transparentSrc
     * @type Boolean
     * @final
     */
    transparentSrc: 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7',
    /**
     * Returns true/false if the browser can or can't place the caret after a inline block like an image.
     *
     * @property noCaretAfter
     * @type Boolean
     * @final
     */
    caretAfter: ie !== 8,
    /**
     * Constant that is true if the browser supports native DOM Ranges. IE 9+.
     *
     * @property range
     * @type Boolean
     */
    range: window.getSelection && 'Range' in window,
    /**
     * Returns the IE document mode for non IE browsers this will fake IE 10.
     *
     * @property documentMode
     * @type Number
     */
    documentMode: ie && !ie12 ? (document.documentMode || 7) : 10,
    /**
     * Constant that is true if the browser has a modern file api.
     *
     * @property fileApi
     * @type Boolean
     */
    fileApi,
    /**
     * Constant that is true if the browser supports contentEditable=false regions.
     *
     * @property ceFalse
     * @type Boolean
     */
    ceFalse: (ie === false || ie > 8),
    cacheSuffix: null,
    container: null,
    experimentalShadowDom: false,
    /**
     * Constant if CSP mode is possible or not. Meaning we can't use script urls for the iframe.
     */
    canHaveCSP: (ie === false || ie > 11),
    desktop: !phone && !tablet,
    windowsPhone
};
export default Env;
export { ɵ0 };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRW52LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHBvbHB3YXJlL3RpbnltY2UtdXRpbC8iLCJzb3VyY2VzIjpbImxpYi9hcGkvRW52LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7OztHQUtHO0FBRUgsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLFFBQVEsRUFBRSxHQUFHLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUVsRjs7Ozs7OztHQU9HO0FBRUgsTUFBTSxHQUFHLEdBQUcsU0FBUyxFQUFFLFNBQVMsR0FBRyxHQUFHLENBQUMsU0FBUyxDQUFDO0FBQ2pELElBQUksS0FBSyxFQUFFLE1BQU0sRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsWUFBWSxDQUFDO0FBRXRHLE1BQU0sZUFBZSxHQUFHLFVBQVUsS0FBSztJQUNyQyxPQUFPLFlBQVksSUFBSSxNQUFNLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQztBQUNwRSxDQUFDLENBQUM7O0FBRUYsS0FBSyxHQUFHLEtBQUssQ0FBQztBQUNkLE9BQU8sR0FBRyxTQUFTLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0FBQ3BDLE1BQU0sR0FBRyxRQUFRLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0FBQ2xDLEVBQUUsR0FBRyxDQUFDLE1BQU0sSUFBSSxDQUFDLEtBQUssSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUM7QUFDekYsRUFBRSxHQUFHLEVBQUUsSUFBSSxjQUFjLENBQUMsSUFBSSxDQUFD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LFNBQVMsRUFBRSxJQUFJO0lBQ2YscUJBQXFCLEVBQUUsS0FBSztJQUU1Qjs7T0FFRztJQUNILFVBQVUsRUFBRSxDQUFDLEVBQUUsS0FBSyxLQUFLLElBQUksRUFBRSxHQUFHLEVBQUUsQ0FBQztJQUVyQyxPQUFPLEVBQUUsQ0FBQyxLQUFLLElBQUksQ0FBQyxNQUFNO0lBQzFCLFlBQVk7Q0FDYixDQUFDO0FBRUYsZUFBZSxHQUFHLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIENvcHlyaWdodCAoYykgVGlueSBUZWNobm9sb2dpZXMsIEluYy4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBMR1BMIG9yIGEgY29tbWVyY2lhbCBsaWNlbnNlLlxuICogRm9yIExHUEwgc2VlIExpY2Vuc2UudHh0IGluIHRoZSBwcm9qZWN0IHJvb3QgZm9yIGxpY2Vuc2UgaW5mb3JtYXRpb24uXG4gKiBGb3IgY29tbWVyY2lhbCBsaWNlbnNlcyBzZWUgaHR0cHM6Ly93d3cudGlueS5jbG91ZC9cbiAqL1xuXG5pbXBvcnQgeyBuYXZpZ2F0b3IsIHdpbmRvdywgbWF0Y2hNZWRpYSwgZG9jdW1lbnQsIFVSTCB9IGZyb20gJ0BlcGhveC9kb20tZ2xvYmFscyc7XG5cbi8qKlxuICogVGhpcyBjbGFzcyBjb250YWlucyB2YXJpb3VzIGVudmlyb25tZW50IGNvbnN0YW50cyBsaWtlIGJyb3dzZXIgdmVyc2lvbnMgZXRjLlxuICogTm9ybWFsbHkgeW91IGRvbid0IHdhbnQgdG8gc25pZmYgc3BlY2lmaWMgYnJvd3NlciB2ZXJzaW9ucyBidXQgc29tZXRpbWVzIHlvdSBoYXZlXG4gKiB0byB3aGVuIGl0J3MgaW1wb3NzaWJsZSB0byBmZWF0dXJlIGRldGVjdC4gU28gdXNlIHRoaXMgd2l0aCBjYXJlLlxuICpcbiAqIEBjbGFzcyB0aW55bWNlLkVudlxuICogQHN0YXRpY1xuICovXG5cbmNvbnN0IG5hdiA9IG5hdmlnYXRvciwgdXNlckFnZW50ID0gbmF2LnVzZXJBZ2VudDtcbmxldCBvcGVyYSwgd2Via2l0LCBpZSwgaWUxMSwgaWUxMiwgZ2Vja28sIG1hYywgaURldmljZSwgYW5kcm9pZCwgZmlsZUFwaSwgcGhvbmUsIHRhYmxldCwgd2luZG93c1Bob25lO1xuXG5jb25zdCBtYXRjaE1lZGlhUXVlcnkgPSBmdW5jdGlvbiAocXVlcnkpIHtcbiAgcmV0dXJuICdtYXRjaE1lZGlhJyBpbiB3aW5kb3cgPyBtYXRjaE1lZGlhKHF1ZXJ5KS5tYXRjaGVzIDogZmFsc2U7XG59O1xuXG5vcGVyYSA9IGZhbHNlO1xuYW5kcm9pZCA9IC9BbmRyb2lkLy50ZXN0KHVzZXJBZ2VudCk7XG53ZWJraXQgPSAvV2ViS2l0Ly50ZXN0KHVzZXJBZ2VudCk7XG5pZSA9ICF3ZWJraXQgJiYgIW9wZXJhICYmICgvTVNJRS9naSkudGVzdCh1c2VyQWdlbnQpICYmICgvRXhwbG9yZXIvZ2kpLnRlc3QobmF2LmFwcE5hbWUpO1xuaWUgPSBpZSAmJiAvTVNJRSAoXFx3KylcXC4vLmV4ZWModXNlckFnZW50KVsxXTtcbmllMTEgPSB1c2VyQWdlbnQuaW5kZXhPZignVHJpZGVudC8nKSAhPT0gLTEgJiYgKHVzZXJBZ2VudC5pbmRleE9mKCdydjonKSAhPT0gLTEgfHwgbmF2LmFwcE5hbWUuaW5kZXhPZignTmV0c2NhcGUnKSAhPT0gLTEpID8gMTEgOiBmYWxzZTtcbmllMTIgPSAodXNlckFnZW50LmluZGV4T2YoJ0VkZ2UvJykgIT09IC0xICYmICFpZSAmJiAhaWUxMSkgPyAxMiA6IGZhbHNlO1xuaWUgPSBpZSB8fCBpZTExIHx8IGllMTI7XG5nZWNrbyA9ICF3ZWJraXQgJiYgIWllMTEgJiYgL0dlY2tvLy50ZXN0KHVzZXJBZ2VudCk7XG5tYWMgPSB1c2VyQWdlbnQuaW5kZXhPZignTWFjJykgIT09IC0xO1xuaURldmljZSA9IC8oaVBhZHxpUGhvbmUpLy50ZXN0KHVzZXJBZ2VudCk7XG5maWxlQXBpID0gJ0Zvcm1EYXRhJyBpbiB3aW5kb3cgJiYgJ0ZpbGVSZWFkZXInIGluIHdpbmRvdyAmJiAnVVJMJyBpbiB3aW5kb3cgJiYgISFVUkwuY3JlYXRlT2JqZWN0VVJMO1xucGhvbmUgPSBtYXRjaE1lZGlhUXVlcnkoJ29ubHkgc2NyZWVuIGFuZCAobWF4LWRldmljZS13aWR0aDogNDgwcHgpJykgJiYgKGFuZHJvaWQgfHwgaURldmljZSk7XG50YWJsZXQgPSBtYXRjaE1lZGlhUXVlcnkoJ29ubHkgc2NyZWVuIGFuZCAobWluLXdpZHRoOiA4MDBweCknKSAmJiAoYW5kcm9pZCB8fCBpRGV2aWNlKTtcbndpbmRvd3NQaG9uZSA9IHVzZXJBZ2VudC5pbmRleE9mKCdXaW5kb3dzIFBob25lJykgIT09IC0xO1xuXG5pZiAoaWUxMikge1xuICB3ZWJraXQgPSBmYWxzZTtcbn1cblxuLy8gSXMgYSBpUGFkL2lQaG9uZSBhbmQgbm90IG9uIGlPUzUgc25pZmYgdGhlIFdlYktpdCB2ZXJzaW9uIHNpbmNlIG9sZGVyIGlPUyBXZWJLaXQgdmVyc2lvbnNcbi8vIHNheXMgaXQgaGFzIGNvbnRlbnRFZGl0YWJsZSBzdXBwb3J0IGJ1dCB0aGVyZSBpcyBubyB2aXNpYmxlIGNhcmV0LlxuY29uc3QgY29udGVudEVkaXRhYmxlID0gIWlEZXZpY2UgfHwgZmlsZUFwaSB8fCBwYXJzZUludCh1c2VyQWdlbnQubWF0Y2goL0FwcGxlV2ViS2l0XFwvKFxcZCopLylbMV0sIDEwKSA+PSA1MzQ7XG5cbmludGVyZmFjZSBFbnYge1xuICBvcGVyYTogYm9vbGVhbjtcbiAgd2Via2l0OiBib29sZWFuO1xuICBpZTogYm9vbGVhbiB8IG51bWJlcjtcbiAgZ2Vja286IGJvb2xlYW47XG4gIG1hYzogYm9vbGVhbjtcbiAgaU9TOiBib29sZWFuO1xuICBhbmRyb2lkOiBib29sZWFuO1xuICBjb250ZW50RWRpdGFibGU6IGJvb2xlYW47XG4gIHRyYW5zcGFyZW50U3JjOiBzdHJpbmc7XG4gIGNhcmV0QWZ0ZXI6IGJvb2xlYW47XG4gIHJhbmdlOiBib29sZWFuO1xuICBkb2N1bWVudE1vZGU6IG51bWJlcjtcbiAgZmlsZUFwaTogYm9vbGVhbjtcbiAgY2VGYWxzZTogYm9vbGVhbjtcbiAgY2FjaGVTdWZmaXg6IGFueTtcbiAgY29udGFpbmVyOiBhbnk7XG4gIGV4cGVyaW1lbnRhbFNoYWRvd0RvbTogYm9vbGVhbjtcbiAgY2FuSGF2ZUNTUDogYm9vbGVhbjtcbiAgZGVza3RvcDogYm9vbGVhbjtcbiAgd2luZG93c1Bob25lOiBib29sZWFuO1xufVxuXG5jb25zdCBFbnY6IEVudiA9IHtcbiAgLyoqXG4gICAqIENvbnN0YW50IHRoYXQgaXMgdHJ1ZSBpZiB0aGUgYnJvd3NlciBpcyBPcGVyYS5cbiAgICpcbiAgICogQHByb3BlcnR5IG9wZXJhXG4gICAqIEB0eXBlIEJvb2xlYW5cbiAgICogQGZpbmFsXG4gICAqL1xuICBvcGVyYSxcblxuICAvKipcbiAgICogQ29uc3RhbnQgdGhhdCBpcyB0cnVlIGlmIHRoZSBicm93c2VyIGlzIFdlYktpdCAoU2FmYXJpL0Nocm9tZSkuXG4gICAqXG4gICAqIEBwcm9wZXJ0eSB3ZWJLaXRcbiAgICogQHR5cGUgQm9vbGVhblxuICAgKiBAZmluYWxcbiAgICovXG4gIHdlYmtpdCxcblxuICAvKipcbiAgICogQ29uc3RhbnQgdGhhdCBpcyBtb3JlIHRoYW4gemVybyBpZiB0aGUgYnJvd3NlciBpcyBJRS5cbiAgICpcbiAgICogQHByb3BlcnR5IGllXG4gICAqIEB0eXBlIEJvb2xlYW5cbiAgICogQGZpbmFsXG4gICAqL1xuICBpZSxcblxuICAvKipcbiAgICogQ29uc3RhbnQgdGhhdCBpcyB0cnVlIGlmIHRoZSBicm93c2VyIGlzIEdlY2tvLlxuICAgKlxuICAgKiBAcHJvcGVydHkgZ2Vja29cbiAgICogQHR5cGUgQm9vbGVhblxuICAgKiBAZmluYWxcbiAgICovXG4gIGdlY2tvLFxuXG4gIC8qKlxuICAgKiBDb25zdGFudCB0aGF0IGlzIHRydWUgaWYgdGhlIG9zIGlzIE1hYyBPUy5cbiAgICpcbiAgICogQHByb3BlcnR5IG1hY1xuICAgKiBAdHlwZSBCb29sZWFuXG4gICAqIEBmaW5hbFxuICAgKi9cbiAgbWFjLFxuXG4gIC8qKlxuICAgKiBDb25zdGFudCB0aGF0IGlzIHRydWUgaWYgdGhlIG9zIGlzIGlPUy5cbiAgICpcbiAgICogQHByb3BlcnR5IGlPU1xuICAgKiBAdHlwZSBCb29sZWFuXG4gICAqIEBmaW5hbFxuICAgKi9cbiAgaU9TOiBpRGV2aWNlLFxuXG4gIC8qKlxuICAgKiBDb25zdGFudCB0aGF0IGlzIHRydWUgaWYgdGhlIG9zIGlzIGFuZHJvaWQuXG4gICAqXG4gICAqIEBwcm9wZXJ0eSBhbmRyb2lkXG4gICAqIEB0eXBlIEJvb2xlYW5cbiAgICogQGZpbmFsXG4gICAqL1xuICBhbmRyb2lkLFxuXG4gIC8qKlxuICAgKiBDb25zdGFudCB0aGF0IGlzIHRydWUgaWYgdGhlIGJyb3dzZXIgc3VwcG9ydHMgZWRpdGluZy5cbiAgICpcbiAgICogQHByb3BlcnR5IGNvbnRlbnRFZGl0YWJsZVxuICAgKiBAdHlwZSBCb29sZWFuXG4gICAqIEBmaW5hbFxuICAgKi9cbiAgY29udGVudEVkaXRhYmxlLFxuXG4gIC8qKlxuICAgKiBUcmFuc3BhcmVudCBpbWFnZSBkYXRhIHVybC5cbiAgICpcbiAgICogQHByb3BlcnR5IHRyYW5zcGFyZW50U3JjXG4gICAqIEB0eXBlIEJvb2xlYW5cbiAgICogQGZpbmFsXG4gICAqL1xuICB0cmFuc3BhcmVudFNyYzogJ2RhdGE6aW1hZ2UvZ2lmO2Jhc2U2NCxSMGxHT0RsaEFRQUJBSUFBQUFBQUFQLy8veUg1QkFFQUFBQUFMQUFBQUFBQkFBRUFBQUlCUkFBNycsXG5cbiAgLyoqXG4gICAqIFJldHVybnMgdHJ1ZS9mYWxzZSBpZiB0aGUgYnJvd3NlciBjYW4gb3IgY2FuJ3QgcGxhY2UgdGhlIGNhcmV0IGFmdGVyIGEgaW5saW5lIGJsb2NrIGxpa2UgYW4gaW1hZ2UuXG4gICAqXG4gICAqIEBwcm9wZXJ0eSBub0NhcmV0QWZ0ZXJcbiAgICogQHR5cGUgQm9vbGVhblxuICAgKiBAZmluYWxcbiAgICovXG4gIGNhcmV0QWZ0ZXI6IGllICE9PSA4LFxuXG4gIC8qKlxuICAgKiBDb25zdGFudCB0aGF0IGlzIHRydWUgaWYgdGhlIGJyb3dzZXIgc3VwcG9ydHMgbmF0aXZlIERPTSBSYW5nZXMuIElFIDkrLlxuICAgKlxuICAgKiBAcHJvcGVydHkgcmFuZ2VcbiAgICogQHR5cGUgQm9vbGVhblxuICAgKi9cbiAgcmFuZ2U6IHdpbmRvdy5nZXRTZWxlY3Rpb24gJiYgJ1JhbmdlJyBpbiB3aW5kb3csXG5cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIElFIGRvY3VtZW50IG1vZGUgZm9yIG5vbiBJRSBicm93c2VycyB0aGlzIHdpbGwgZmFrZSBJRSAxMC5cbiAgICpcbiAgICogQHByb3BlcnR5IGRvY3VtZW50TW9kZVxuICAgKiBAdHlwZSBOdW1iZXJcbiAgICovXG4gIGRvY3VtZW50TW9kZTogaWUgJiYgIWllMTIgPyAoKDxhbnk+IGRvY3VtZW50KS5kb2N1bWVudE1vZGUgfHwgNykgOiAxMCxcblxuICAvKipcbiAgICogQ29uc3RhbnQgdGhhdCBpcyB0cnVlIGlmIHRoZSBicm93c2VyIGhhcyBhIG1vZGVybiBmaWxlIGFwaS5cbiAgICpcbiAgICogQHByb3BlcnR5IGZpbGVBcGlcbiAgICogQHR5cGUgQm9vbGVhblxuICAgKi9cbiAgZmlsZUFwaSxcblxuICAvKipcbiAgICogQ29uc3RhbnQgdGhhdCBpcyB0cnVlIGlmIHRoZSBicm93c2VyIHN1cHBvcnRzIGNvbnRlbnRFZGl0YWJsZT1mYWxzZSByZWdpb25zLlxuICAgKlxuICAgKiBAcHJvcGVydHkgY2VGYWxzZVxuICAgKiBAdHlwZSBCb29sZWFuXG4gICAqL1xuICBjZUZhbHNlOiAoaWUgPT09IGZhbHNlIHx8IGllID4gOCksXG5cbiAgY2FjaGVTdWZmaXg6IG51bGwsXG4gIGNvbnRhaW5lcjogbnVsbCxcbiAgZXhwZXJpbWVudGFsU2hhZG93RG9tOiBmYWxzZSxcblxuICAvKipcbiAgICogQ29uc3RhbnQgaWYgQ1NQIG1vZGUgaXMgcG9zc2libGUgb3Igbm90LiBNZWFuaW5nIHdlIGNhbid0IHVzZSBzY3JpcHQgdXJscyBmb3IgdGhlIGlmcmFtZS5cbiAgICovXG4gIGNhbkhhdmVDU1A6IChpZSA9PT0gZmFsc2UgfHwgaWUgPiAxMSksXG5cbiAgZGVza3RvcDogIXBob25lICYmICF0YWJsZXQsXG4gIHdpbmRvd3NQaG9uZVxufTtcblxuZXhwb3J0IGRlZmF1bHQgRW52O1xuIl19