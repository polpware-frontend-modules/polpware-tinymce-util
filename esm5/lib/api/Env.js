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
var nav = navigator, userAgent = nav.userAgent;
var opera, webkit, ie, ie11, ie12, gecko, mac, iDevice, android, fileApi, phone, tablet, windowsPhone;
var matchMediaQuery = function (query) {
    return 'matchMedia' in window ? matchMedia(query).matches : false;
};
var ɵ0 = matchMediaQuery;
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
var contentEditable = !iDevice || fileApi || parseInt(userAgent.match(/AppleWebKit\/(\d*)/)[1], 10) >= 534;
var Env = {
    /**
     * Constant that is true if the browser is Opera.
     *
     * @property opera
     * @type Boolean
     * @final
     */
    opera: opera,
    /**
     * Constant that is true if the browser is WebKit (Safari/Chrome).
     *
     * @property webKit
     * @type Boolean
     * @final
     */
    webkit: webkit,
    /**
     * Constant that is more than zero if the browser is IE.
     *
     * @property ie
     * @type Boolean
     * @final
     */
    ie: ie,
    /**
     * Constant that is true if the browser is Gecko.
     *
     * @property gecko
     * @type Boolean
     * @final
     */
    gecko: gecko,
    /**
     * Constant that is true if the os is Mac OS.
     *
     * @property mac
     * @type Boolean
     * @final
     */
    mac: mac,
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
    android: android,
    /**
     * Constant that is true if the browser supports editing.
     *
     * @property contentEditable
     * @type Boolean
     * @final
     */
    contentEditable: contentEditable,
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
    fileApi: fileApi,
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
    windowsPhone: windowsPhone
};
export default Env;
export { ɵ0 };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRW52LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHBvbHB3YXJlL3RpbnltY2UtdXRpbC8iLCJzb3VyY2VzIjpbImxpYi9hcGkvRW52LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7OztHQUtHO0FBRUgsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLFFBQVEsRUFBRSxHQUFHLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUVsRjs7Ozs7OztHQU9HO0FBRUgsSUFBTSxHQUFHLEdBQUcsU0FBUyxFQUFFLFNBQVMsR0FBRyxHQUFHLENBQUMsU0FBUyxDQUFDO0FBQ2pELElBQUksS0FBSyxFQUFFLE1BQU0sRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsWUFBWSxDQUFDO0FBRXRHLElBQU0sZUFBZSxHQUFHLFVBQVUsS0FBSztJQUNyQyxPQUFPLFlBQVksSUFBSSxNQUFNLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQztBQUNwRSxDQUFDLENBQUM7O0FBRUYsS0FBSyxHQUFHLEtBQUssQ0FBQztBQUNkLE9BQU8sR0FBRyxTQUFTLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0FBQ3BDLE1BQU0sR0FBRyxRQUFRLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0FBQ2xDLEVBQUUsR0FBRyxDQUFDLE1BQU0sSUFBSSxDQUFDLEtBQUssSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUM7QUFDekYsRUFBRSxHQUFHLEVBQUUsSUFBSSxjQUFjLENBQUMsSUFBSSxDQUFD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R0FBRyxDQUFDLENBQUM7SUFFakMsV0FBVyxFQUFFLElBQUk7SUFDakIsU0FBUyxFQUFFLElBQUk7SUFDZixxQkFBcUIsRUFBRSxLQUFLO0lBRTVCOztPQUVHO0lBQ0gsVUFBVSxFQUFFLENBQUMsRUFBRSxLQUFLLEtBQUssSUFBSSxFQUFFLEdBQUcsRUFBRSxDQUFDO0lBRXJDLE9BQU8sRUFBRSxDQUFDLEtBQUssSUFBSSxDQUFDLE1BQU07SUFDMUIsWUFBWSxjQUFBO0NBQ2IsQ0FBQztBQUVGLGVBQWUsR0FBRyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIFRpbnkgVGVjaG5vbG9naWVzLCBJbmMuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgTEdQTCBvciBhIGNvbW1lcmNpYWwgbGljZW5zZS5cbiAqIEZvciBMR1BMIHNlZSBMaWNlbnNlLnR4dCBpbiB0aGUgcHJvamVjdCByb290IGZvciBsaWNlbnNlIGluZm9ybWF0aW9uLlxuICogRm9yIGNvbW1lcmNpYWwgbGljZW5zZXMgc2VlIGh0dHBzOi8vd3d3LnRpbnkuY2xvdWQvXG4gKi9cblxuaW1wb3J0IHsgbmF2aWdhdG9yLCB3aW5kb3csIG1hdGNoTWVkaWEsIGRvY3VtZW50LCBVUkwgfSBmcm9tICdAZXBob3gvZG9tLWdsb2JhbHMnO1xuXG4vKipcbiAqIFRoaXMgY2xhc3MgY29udGFpbnMgdmFyaW91cyBlbnZpcm9ubWVudCBjb25zdGFudHMgbGlrZSBicm93c2VyIHZlcnNpb25zIGV0Yy5cbiAqIE5vcm1hbGx5IHlvdSBkb24ndCB3YW50IHRvIHNuaWZmIHNwZWNpZmljIGJyb3dzZXIgdmVyc2lvbnMgYnV0IHNvbWV0aW1lcyB5b3UgaGF2ZVxuICogdG8gd2hlbiBpdCdzIGltcG9zc2libGUgdG8gZmVhdHVyZSBkZXRlY3QuIFNvIHVzZSB0aGlzIHdpdGggY2FyZS5cbiAqXG4gKiBAY2xhc3MgdGlueW1jZS5FbnZcbiAqIEBzdGF0aWNcbiAqL1xuXG5jb25zdCBuYXYgPSBuYXZpZ2F0b3IsIHVzZXJBZ2VudCA9IG5hdi51c2VyQWdlbnQ7XG5sZXQgb3BlcmEsIHdlYmtpdCwgaWUsIGllMTEsIGllMTIsIGdlY2tvLCBtYWMsIGlEZXZpY2UsIGFuZHJvaWQsIGZpbGVBcGksIHBob25lLCB0YWJsZXQsIHdpbmRvd3NQaG9uZTtcblxuY29uc3QgbWF0Y2hNZWRpYVF1ZXJ5ID0gZnVuY3Rpb24gKHF1ZXJ5KSB7XG4gIHJldHVybiAnbWF0Y2hNZWRpYScgaW4gd2luZG93ID8gbWF0Y2hNZWRpYShxdWVyeSkubWF0Y2hlcyA6IGZhbHNlO1xufTtcblxub3BlcmEgPSBmYWxzZTtcbmFuZHJvaWQgPSAvQW5kcm9pZC8udGVzdCh1c2VyQWdlbnQpO1xud2Via2l0ID0gL1dlYktpdC8udGVzdCh1c2VyQWdlbnQpO1xuaWUgPSAhd2Via2l0ICYmICFvcGVyYSAmJiAoL01TSUUvZ2kpLnRlc3QodXNlckFnZW50KSAmJiAoL0V4cGxvcmVyL2dpKS50ZXN0KG5hdi5hcHBOYW1lKTtcbmllID0gaWUgJiYgL01TSUUgKFxcdyspXFwuLy5leGVjKHVzZXJBZ2VudClbMV07XG5pZTExID0gdXNlckFnZW50LmluZGV4T2YoJ1RyaWRlbnQvJykgIT09IC0xICYmICh1c2VyQWdlbnQuaW5kZXhPZigncnY6JykgIT09IC0xIHx8IG5hdi5hcHBOYW1lLmluZGV4T2YoJ05ldHNjYXBlJykgIT09IC0xKSA/IDExIDogZmFsc2U7XG5pZTEyID0gKHVzZXJBZ2VudC5pbmRleE9mKCdFZGdlLycpICE9PSAtMSAmJiAhaWUgJiYgIWllMTEpID8gMTIgOiBmYWxzZTtcbmllID0gaWUgfHwgaWUxMSB8fCBpZTEyO1xuZ2Vja28gPSAhd2Via2l0ICYmICFpZTExICYmIC9HZWNrby8udGVzdCh1c2VyQWdlbnQpO1xubWFjID0gdXNlckFnZW50LmluZGV4T2YoJ01hYycpICE9PSAtMTtcbmlEZXZpY2UgPSAvKGlQYWR8aVBob25lKS8udGVzdCh1c2VyQWdlbnQpO1xuZmlsZUFwaSA9ICdGb3JtRGF0YScgaW4gd2luZG93ICYmICdGaWxlUmVhZGVyJyBpbiB3aW5kb3cgJiYgJ1VSTCcgaW4gd2luZG93ICYmICEhVVJMLmNyZWF0ZU9iamVjdFVSTDtcbnBob25lID0gbWF0Y2hNZWRpYVF1ZXJ5KCdvbmx5IHNjcmVlbiBhbmQgKG1heC1kZXZpY2Utd2lkdGg6IDQ4MHB4KScpICYmIChhbmRyb2lkIHx8IGlEZXZpY2UpO1xudGFibGV0ID0gbWF0Y2hNZWRpYVF1ZXJ5KCdvbmx5IHNjcmVlbiBhbmQgKG1pbi13aWR0aDogODAwcHgpJykgJiYgKGFuZHJvaWQgfHwgaURldmljZSk7XG53aW5kb3dzUGhvbmUgPSB1c2VyQWdlbnQuaW5kZXhPZignV2luZG93cyBQaG9uZScpICE9PSAtMTtcblxuaWYgKGllMTIpIHtcbiAgd2Via2l0ID0gZmFsc2U7XG59XG5cbi8vIElzIGEgaVBhZC9pUGhvbmUgYW5kIG5vdCBvbiBpT1M1IHNuaWZmIHRoZSBXZWJLaXQgdmVyc2lvbiBzaW5jZSBvbGRlciBpT1MgV2ViS2l0IHZlcnNpb25zXG4vLyBzYXlzIGl0IGhhcyBjb250ZW50RWRpdGFibGUgc3VwcG9ydCBidXQgdGhlcmUgaXMgbm8gdmlzaWJsZSBjYXJldC5cbmNvbnN0IGNvbnRlbnRFZGl0YWJsZSA9ICFpRGV2aWNlIHx8IGZpbGVBcGkgfHwgcGFyc2VJbnQodXNlckFnZW50Lm1hdGNoKC9BcHBsZVdlYktpdFxcLyhcXGQqKS8pWzFdLCAxMCkgPj0gNTM0O1xuXG5pbnRlcmZhY2UgRW52IHtcbiAgb3BlcmE6IGJvb2xlYW47XG4gIHdlYmtpdDogYm9vbGVhbjtcbiAgaWU6IGJvb2xlYW4gfCBudW1iZXI7XG4gIGdlY2tvOiBib29sZWFuO1xuICBtYWM6IGJvb2xlYW47XG4gIGlPUzogYm9vbGVhbjtcbiAgYW5kcm9pZDogYm9vbGVhbjtcbiAgY29udGVudEVkaXRhYmxlOiBib29sZWFuO1xuICB0cmFuc3BhcmVudFNyYzogc3RyaW5nO1xuICBjYXJldEFmdGVyOiBib29sZWFuO1xuICByYW5nZTogYm9vbGVhbjtcbiAgZG9jdW1lbnRNb2RlOiBudW1iZXI7XG4gIGZpbGVBcGk6IGJvb2xlYW47XG4gIGNlRmFsc2U6IGJvb2xlYW47XG4gIGNhY2hlU3VmZml4OiBhbnk7XG4gIGNvbnRhaW5lcjogYW55O1xuICBleHBlcmltZW50YWxTaGFkb3dEb206IGJvb2xlYW47XG4gIGNhbkhhdmVDU1A6IGJvb2xlYW47XG4gIGRlc2t0b3A6IGJvb2xlYW47XG4gIHdpbmRvd3NQaG9uZTogYm9vbGVhbjtcbn1cblxuY29uc3QgRW52OiBFbnYgPSB7XG4gIC8qKlxuICAgKiBDb25zdGFudCB0aGF0IGlzIHRydWUgaWYgdGhlIGJyb3dzZXIgaXMgT3BlcmEuXG4gICAqXG4gICAqIEBwcm9wZXJ0eSBvcGVyYVxuICAgKiBAdHlwZSBCb29sZWFuXG4gICAqIEBmaW5hbFxuICAgKi9cbiAgb3BlcmEsXG5cbiAgLyoqXG4gICAqIENvbnN0YW50IHRoYXQgaXMgdHJ1ZSBpZiB0aGUgYnJvd3NlciBpcyBXZWJLaXQgKFNhZmFyaS9DaHJvbWUpLlxuICAgKlxuICAgKiBAcHJvcGVydHkgd2ViS2l0XG4gICAqIEB0eXBlIEJvb2xlYW5cbiAgICogQGZpbmFsXG4gICAqL1xuICB3ZWJraXQsXG5cbiAgLyoqXG4gICAqIENvbnN0YW50IHRoYXQgaXMgbW9yZSB0aGFuIHplcm8gaWYgdGhlIGJyb3dzZXIgaXMgSUUuXG4gICAqXG4gICAqIEBwcm9wZXJ0eSBpZVxuICAgKiBAdHlwZSBCb29sZWFuXG4gICAqIEBmaW5hbFxuICAgKi9cbiAgaWUsXG5cbiAgLyoqXG4gICAqIENvbnN0YW50IHRoYXQgaXMgdHJ1ZSBpZiB0aGUgYnJvd3NlciBpcyBHZWNrby5cbiAgICpcbiAgICogQHByb3BlcnR5IGdlY2tvXG4gICAqIEB0eXBlIEJvb2xlYW5cbiAgICogQGZpbmFsXG4gICAqL1xuICBnZWNrbyxcblxuICAvKipcbiAgICogQ29uc3RhbnQgdGhhdCBpcyB0cnVlIGlmIHRoZSBvcyBpcyBNYWMgT1MuXG4gICAqXG4gICAqIEBwcm9wZXJ0eSBtYWNcbiAgICogQHR5cGUgQm9vbGVhblxuICAgKiBAZmluYWxcbiAgICovXG4gIG1hYyxcblxuICAvKipcbiAgICogQ29uc3RhbnQgdGhhdCBpcyB0cnVlIGlmIHRoZSBvcyBpcyBpT1MuXG4gICAqXG4gICAqIEBwcm9wZXJ0eSBpT1NcbiAgICogQHR5cGUgQm9vbGVhblxuICAgKiBAZmluYWxcbiAgICovXG4gIGlPUzogaURldmljZSxcblxuICAvKipcbiAgICogQ29uc3RhbnQgdGhhdCBpcyB0cnVlIGlmIHRoZSBvcyBpcyBhbmRyb2lkLlxuICAgKlxuICAgKiBAcHJvcGVydHkgYW5kcm9pZFxuICAgKiBAdHlwZSBCb29sZWFuXG4gICAqIEBmaW5hbFxuICAgKi9cbiAgYW5kcm9pZCxcblxuICAvKipcbiAgICogQ29uc3RhbnQgdGhhdCBpcyB0cnVlIGlmIHRoZSBicm93c2VyIHN1cHBvcnRzIGVkaXRpbmcuXG4gICAqXG4gICAqIEBwcm9wZXJ0eSBjb250ZW50RWRpdGFibGVcbiAgICogQHR5cGUgQm9vbGVhblxuICAgKiBAZmluYWxcbiAgICovXG4gIGNvbnRlbnRFZGl0YWJsZSxcblxuICAvKipcbiAgICogVHJhbnNwYXJlbnQgaW1hZ2UgZGF0YSB1cmwuXG4gICAqXG4gICAqIEBwcm9wZXJ0eSB0cmFuc3BhcmVudFNyY1xuICAgKiBAdHlwZSBCb29sZWFuXG4gICAqIEBmaW5hbFxuICAgKi9cbiAgdHJhbnNwYXJlbnRTcmM6ICdkYXRhOmltYWdlL2dpZjtiYXNlNjQsUjBsR09EbGhBUUFCQUlBQUFBQUFBUC8vL3lINUJBRUFBQUFBTEFBQUFBQUJBQUVBQUFJQlJBQTcnLFxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRydWUvZmFsc2UgaWYgdGhlIGJyb3dzZXIgY2FuIG9yIGNhbid0IHBsYWNlIHRoZSBjYXJldCBhZnRlciBhIGlubGluZSBibG9jayBsaWtlIGFuIGltYWdlLlxuICAgKlxuICAgKiBAcHJvcGVydHkgbm9DYXJldEFmdGVyXG4gICAqIEB0eXBlIEJvb2xlYW5cbiAgICogQGZpbmFsXG4gICAqL1xuICBjYXJldEFmdGVyOiBpZSAhPT0gOCxcblxuICAvKipcbiAgICogQ29uc3RhbnQgdGhhdCBpcyB0cnVlIGlmIHRoZSBicm93c2VyIHN1cHBvcnRzIG5hdGl2ZSBET00gUmFuZ2VzLiBJRSA5Ky5cbiAgICpcbiAgICogQHByb3BlcnR5IHJhbmdlXG4gICAqIEB0eXBlIEJvb2xlYW5cbiAgICovXG4gIHJhbmdlOiB3aW5kb3cuZ2V0U2VsZWN0aW9uICYmICdSYW5nZScgaW4gd2luZG93LFxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSBJRSBkb2N1bWVudCBtb2RlIGZvciBub24gSUUgYnJvd3NlcnMgdGhpcyB3aWxsIGZha2UgSUUgMTAuXG4gICAqXG4gICAqIEBwcm9wZXJ0eSBkb2N1bWVudE1vZGVcbiAgICogQHR5cGUgTnVtYmVyXG4gICAqL1xuICBkb2N1bWVudE1vZGU6IGllICYmICFpZTEyID8gKCg8YW55PiBkb2N1bWVudCkuZG9jdW1lbnRNb2RlIHx8IDcpIDogMTAsXG5cbiAgLyoqXG4gICAqIENvbnN0YW50IHRoYXQgaXMgdHJ1ZSBpZiB0aGUgYnJvd3NlciBoYXMgYSBtb2Rlcm4gZmlsZSBhcGkuXG4gICAqXG4gICAqIEBwcm9wZXJ0eSBmaWxlQXBpXG4gICAqIEB0eXBlIEJvb2xlYW5cbiAgICovXG4gIGZpbGVBcGksXG5cbiAgLyoqXG4gICAqIENvbnN0YW50IHRoYXQgaXMgdHJ1ZSBpZiB0aGUgYnJvd3NlciBzdXBwb3J0cyBjb250ZW50RWRpdGFibGU9ZmFsc2UgcmVnaW9ucy5cbiAgICpcbiAgICogQHByb3BlcnR5IGNlRmFsc2VcbiAgICogQHR5cGUgQm9vbGVhblxuICAgKi9cbiAgY2VGYWxzZTogKGllID09PSBmYWxzZSB8fCBpZSA+IDgpLFxuXG4gIGNhY2hlU3VmZml4OiBudWxsLFxuICBjb250YWluZXI6IG51bGwsXG4gIGV4cGVyaW1lbnRhbFNoYWRvd0RvbTogZmFsc2UsXG5cbiAgLyoqXG4gICAqIENvbnN0YW50IGlmIENTUCBtb2RlIGlzIHBvc3NpYmxlIG9yIG5vdC4gTWVhbmluZyB3ZSBjYW4ndCB1c2Ugc2NyaXB0IHVybHMgZm9yIHRoZSBpZnJhbWUuXG4gICAqL1xuICBjYW5IYXZlQ1NQOiAoaWUgPT09IGZhbHNlIHx8IGllID4gMTEpLFxuXG4gIGRlc2t0b3A6ICFwaG9uZSAmJiAhdGFibGV0LFxuICB3aW5kb3dzUGhvbmVcbn07XG5cbmV4cG9ydCBkZWZhdWx0IEVudjtcbiJdfQ==