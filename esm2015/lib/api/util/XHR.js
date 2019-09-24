/**
 * Copyright (c) Tiny Technologies, Inc. All rights reserved.
 * Licensed under the LGPL or a commercial license.
 * For LGPL see License.txt in the project root for license information.
 * For commercial licenses see https://www.tiny.cloud/
 */
import { XMLHttpRequest } from '@ephox/dom-globals';
import Delay from './Delay';
import Observable from './Observable';
import Tools from './Tools';
/**
 * This class enables you to send XMLHTTPRequests cross browser.
 * @class tinymce.util.XHR
 * @mixes tinymce.util.Observable
 * @static
 * @example
 * // Sends a low level Ajax request
 * tinymce.util.XHR.send({
 *    url: 'someurl',
 *    success: function(text) {
 *       console.debug(text);
 *    }
 * });
 *
 * // Add custom header to XHR request
 * tinymce.util.XHR.on('beforeSend', function(e) {
 *     e.xhr.setRequestHeader('X-Requested-With', 'Something');
 * });
 */
const XHR = Object.assign({}, Observable, { 
    /**
     * Sends a XMLHTTPRequest.
     * Consult the Wiki for details on what settings this method takes.
     *
     * @method send
     * @param {Object} settings Object will target URL, callbacks and other info needed to make the request.
     */
    send(settings) {
        let xhr, count = 0;
        const ready = function () {
            if (!settings.async || xhr.readyState === 4 || count++ > 10000) {
                if (settings.success && count < 10000 && xhr.status === 200) {
                    settings.success.call(settings.success_scope, '' + xhr.responseText, xhr, settings);
                }
                else if (settings.error) {
                    settings.error.call(settings.error_scope, count > 10000 ? 'TIMED_OUT' : 'GENERAL', xhr, settings);
                }
                xhr = null;
            }
            else {
                Delay.setTimeout(ready, 10);
            }
        };
        // Default settings
        settings.scope = settings.scope || this;
        settings.success_scope = settings.success_scope || settings.scope;
        settings.error_scope = settings.error_scope || settings.scope;
        settings.async = settings.async !== false;
        settings.data = settings.data || '';
        XHR.fire('beforeInitialize', { settings });
        xhr = new XMLHttpRequest();
        if (xhr) {
            if (xhr.overrideMimeType) {
                xhr.overrideMimeType(settings.content_type);
            }
            xhr.open(settings.type || (settings.data ? 'POST' : 'GET'), settings.url, settings.async);
            if (settings.crossDomain) {
                xhr.withCredentials = true;
            }
            if (settings.content_type) {
                xhr.setRequestHeader('Content-Type', settings.content_type);
            }
            if (settings.requestheaders) {
                Tools.each(settings.requestheaders, function (header) {
                    xhr.setRequestHeader(header.key, header.value);
                });
            }
            xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
            xhr = XHR.fire('beforeSend', { xhr, settings }).xhr;
            xhr.send(settings.data);
            // Syncronous request
            if (!settings.async) {
                return ready();
            }
            // Wait for response, onReadyStateChange can not be used since it leaks memory in IE
            Delay.setTimeout(ready, 10);
        }
    } });
export default XHR;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiWEhSLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHBvbHB3YXJlL3RpbnltY2UtdXRpbC8iLCJzb3VyY2VzIjpbImxpYi9hcGkvdXRpbC9YSFIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7O0dBS0c7QUFFSCxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDcEQsT0FBTyxLQUFLLE1BQU0sU0FBUyxDQUFDO0FBQzVCLE9BQU8sVUFBVSxNQUFNLGNBQWMsQ0FBQztBQUN0QyxPQUFPLEtBQUssTUFBTSxTQUFTLENBQUM7QUEwQjVCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FrQkc7QUFFSCxNQUFNLEdBQUcscUJBQ0osVUFBVTtJQUViOzs7Ozs7T0FNRztJQUNILElBQUksQ0FBRSxRQUFxQjtRQUN6QixJQUFJLEdBQUcsRUFBRSxLQUFLLEdBQUcsQ0FBQyxDQUFDO1FBRW5CLE1BQU0sS0FBSyxHQUFHO1lBQ1osSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLElBQUksR0FBRyxDQUFDLFVBQVUsS0FBSyxDQUFDLElBQUksS0FBSyxFQUFFLEdBQUcsS0FBSyxFQUFFO2dCQUM5RCxJQUFJLFFBQVEsQ0FBQyxPQUFPLElBQUksS0FBSyxHQUFHLEtBQUssSUFBSSxHQUFHLENBQUMsTUFBTSxLQUFLLEdBQUcsRUFBRTtvQkFDM0QsUUFBUSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLGFBQWEsRUFBRSxFQUFFLEdBQUcsR0FBRyxDQUFDLFlBQVksRUFBRSxHQUFHLEVBQUUsUUFBUSxDQUFDLENBQUM7aUJBQ3JGO3FCQUFNLElBQUksUUFBUSxDQUFDLEtBQUssRUFBRTtvQkFDekIsUUFBUSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsRUFBRSxLQUFLLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLFNBQVMsRUFBRSxHQUFHLEVBQUUsUUFBUSxDQUFDLENBQUM7aUJBQ25HO2dCQUVELEdBQUcsR0FBRyxJQUFJLENBQUM7YUFDWjtpQkFBTTtnQkFDTCxLQUFLLENBQUMsVUFBVSxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsQ0FBQzthQUM3QjtRQUNILENBQUMsQ0FBQztRQUVGLG1CQUFtQjtRQUNuQixRQUFRLENBQUMsS0FBSyxHQUFHLFFBQVEsQ0FBQyxLQUFLLElBQUksSUFBSSxDQUFDO1FBQ3hDLFFBQVEsQ0FBQyxhQUFhLEdBQUcsUUFBUSxDQUFDLGFBQWEsSUFBSSxRQUFRLENBQUMsS0FBSyxDQUFDO1FBQ2xFLFFBQVEsQ0FBQyxXQUFXLEdBQUcsUUFBUSxDQUFDLFdBQVcsSUFBSSxRQUFRLENBQUMsS0FBSyxDQUFDO1FBQzlELFFBQVEsQ0FBQyxLQUFLLEdBQUcsUUFBUSxDQUFDLEtBQUssS0FBSyxLQUFLLENBQUM7UUFDMUMsUUFBUSxDQUFDLElBQUksR0FBRyxRQUFRLENBQUMsSUFBSSxJQUFJLEVBQUUsQ0FBQztRQUVwQyxHQUFHLENBQUMsSUFBSSxDQUFDLGtCQUFrQixFQUFFLEVBQUUsUUFBUSxFQUFFLENBQUMsQ0FBQztRQUUzQyxHQUFHLEdBQUcsSUFBSSxjQUFjLEVBQUUsQ0FBQztRQUUzQixJQUFJLEdBQUcsRUFBRTtZQUNQLElBQUksR0FBRyxDQUFDLGdCQUFnQixFQUFFO2dCQUN4QixHQUFHLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxDQUFDLFlBQVksQ0FBQyxDQUFDO2FBQzdDO1lBRUQsR0FBRyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsRUFBRSxRQUFRLENBQUMsR0FBRyxFQUFFLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUUxRixJQUFJLFFBQVEsQ0FBQyxXQUFXLEVBQUU7Z0JBQ3hCLEdBQUcsQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDO2FBQzVCO1lBRUQsSUFBSSxRQUFRLENBQUMsWUFBWSxFQUFFO2dCQUN6QixHQUFHLENBQUMsZ0JBQWdCLENBQUMsY0FBYyxFQUFFLFFBQVEsQ0FBQyxZQUFZLENBQUMsQ0FBQzthQUM3RDtZQUVELElBQUksUUFBUSxDQUFDLGNBQWMsRUFBRTtnQkFDM0IsS0FBSyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsY0FBYyxFQUFFLFVBQVUsTUFBTTtvQkFDbEQsR0FBRyxDQUFDLGdCQUFnQixDQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUUsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUNqRCxDQUFDLENBQUMsQ0FBQzthQUNKO1lBRUQsR0FBRyxDQUFDLGdCQUFnQixDQUFDLGtCQUFrQixFQUFFLGdCQUFnQixDQUFDLENBQUM7WUFFM0QsR0FBRyxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFLEVBQUUsR0FBRyxFQUFFLFFBQVEsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDO1lBQ3BELEdBQUcsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBRXhCLHFCQUFxQjtZQUNyQixJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssRUFBRTtnQkFDbkIsT0FBTyxLQUFLLEVBQUUsQ0FBQzthQUNoQjtZQUVELG9GQUFvRjtZQUNwRixLQUFLLENBQUMsVUFBVSxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsQ0FBQztTQUM3QjtJQUNILENBQUMsR0FDRixDQUFDO0FBRUYsZUFBZSxHQUFHLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIENvcHlyaWdodCAoYykgVGlueSBUZWNobm9sb2dpZXMsIEluYy4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBMR1BMIG9yIGEgY29tbWVyY2lhbCBsaWNlbnNlLlxuICogRm9yIExHUEwgc2VlIExpY2Vuc2UudHh0IGluIHRoZSBwcm9qZWN0IHJvb3QgZm9yIGxpY2Vuc2UgaW5mb3JtYXRpb24uXG4gKiBGb3IgY29tbWVyY2lhbCBsaWNlbnNlcyBzZWUgaHR0cHM6Ly93d3cudGlueS5jbG91ZC9cbiAqL1xuXG5pbXBvcnQgeyBYTUxIdHRwUmVxdWVzdCB9IGZyb20gJ0BlcGhveC9kb20tZ2xvYmFscyc7XG5pbXBvcnQgRGVsYXkgZnJvbSAnLi9EZWxheSc7XG5pbXBvcnQgT2JzZXJ2YWJsZSBmcm9tICcuL09ic2VydmFibGUnO1xuaW1wb3J0IFRvb2xzIGZyb20gJy4vVG9vbHMnO1xuaW1wb3J0IHsgTmF0aXZlRXZlbnRNYXAgfSBmcm9tICcuL0V2ZW50RGlzcGF0Y2hlcic7XG5cbmV4cG9ydCBpbnRlcmZhY2UgWEhSU2V0dGluZ3Mge1xuICBhc3luYz86IGJvb2xlYW47XG4gIGNvbnRlbnRfdHlwZT86IHN0cmluZztcbiAgY3Jvc3NEb21haW4/OiBib29sZWFuO1xuICBkYXRhPzogc3RyaW5nO1xuICByZXF1ZXN0aGVhZGVycz86IFJlY29yZDxzdHJpbmcsIHsga2V5OiBzdHJpbmcsIHZhbHVlOiBzdHJpbmd9PjtcbiAgc2NvcGU/OiB7fTtcbiAgdHlwZT86IHN0cmluZztcbiAgdXJsOiBzdHJpbmc7XG4gIGVycm9yX3Njb3BlPzoge307XG4gIHN1Y2Nlc3Nfc2NvcGU/OiB7fTtcbiAgZXJyb3I/IChtZXNzYWdlOiAnVElNRURfT1VUJyB8ICdHRU5FUkFMJywgeGhyOiBYTUxIdHRwUmVxdWVzdCwgc2V0dGluZ3M6IFhIUlNldHRpbmdzKTogdm9pZDtcbiAgc3VjY2Vzcz8gKHRleHQ6IHN0cmluZywgeGhyOiBYTUxIdHRwUmVxdWVzdCwgc2V0dGluZ3M6IFhIUlNldHRpbmdzKTogdm9pZDtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBYSFJFdmVudE1hcCBleHRlbmRzIE5hdGl2ZUV2ZW50TWFwIHtcbiAgJ2JlZm9yZUluaXRpYWxpemUnOiB7IHNldHRpbmdzOiBYSFJTZXR0aW5ncyB9O1xufVxuXG5pbnRlcmZhY2UgWEhSIGV4dGVuZHMgT2JzZXJ2YWJsZTxYSFJFdmVudE1hcD4ge1xuICBzZW5kIChzZXR0aW5nczogWEhSU2V0dGluZ3MpOiB2b2lkO1xufVxuXG4vKipcbiAqIFRoaXMgY2xhc3MgZW5hYmxlcyB5b3UgdG8gc2VuZCBYTUxIVFRQUmVxdWVzdHMgY3Jvc3MgYnJvd3Nlci5cbiAqIEBjbGFzcyB0aW55bWNlLnV0aWwuWEhSXG4gKiBAbWl4ZXMgdGlueW1jZS51dGlsLk9ic2VydmFibGVcbiAqIEBzdGF0aWNcbiAqIEBleGFtcGxlXG4gKiAvLyBTZW5kcyBhIGxvdyBsZXZlbCBBamF4IHJlcXVlc3RcbiAqIHRpbnltY2UudXRpbC5YSFIuc2VuZCh7XG4gKiAgICB1cmw6ICdzb21ldXJsJyxcbiAqICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKHRleHQpIHtcbiAqICAgICAgIGNvbnNvbGUuZGVidWcodGV4dCk7XG4gKiAgICB9XG4gKiB9KTtcbiAqXG4gKiAvLyBBZGQgY3VzdG9tIGhlYWRlciB0byBYSFIgcmVxdWVzdFxuICogdGlueW1jZS51dGlsLlhIUi5vbignYmVmb3JlU2VuZCcsIGZ1bmN0aW9uKGUpIHtcbiAqICAgICBlLnhoci5zZXRSZXF1ZXN0SGVhZGVyKCdYLVJlcXVlc3RlZC1XaXRoJywgJ1NvbWV0aGluZycpO1xuICogfSk7XG4gKi9cblxuY29uc3QgWEhSOiBYSFIgPSB7XG4gIC4uLk9ic2VydmFibGUsXG5cbiAgLyoqXG4gICAqIFNlbmRzIGEgWE1MSFRUUFJlcXVlc3QuXG4gICAqIENvbnN1bHQgdGhlIFdpa2kgZm9yIGRldGFpbHMgb24gd2hhdCBzZXR0aW5ncyB0aGlzIG1ldGhvZCB0YWtlcy5cbiAgICpcbiAgICogQG1ldGhvZCBzZW5kXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBzZXR0aW5ncyBPYmplY3Qgd2lsbCB0YXJnZXQgVVJMLCBjYWxsYmFja3MgYW5kIG90aGVyIGluZm8gbmVlZGVkIHRvIG1ha2UgdGhlIHJlcXVlc3QuXG4gICAqL1xuICBzZW5kIChzZXR0aW5nczogWEhSU2V0dGluZ3MpIHtcbiAgICBsZXQgeGhyLCBjb3VudCA9IDA7XG5cbiAgICBjb25zdCByZWFkeSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIGlmICghc2V0dGluZ3MuYXN5bmMgfHwgeGhyLnJlYWR5U3RhdGUgPT09IDQgfHwgY291bnQrKyA+IDEwMDAwKSB7XG4gICAgICAgIGlmIChzZXR0aW5ncy5zdWNjZXNzICYmIGNvdW50IDwgMTAwMDAgJiYgeGhyLnN0YXR1cyA9PT0gMjAwKSB7XG4gICAgICAgICAgc2V0dGluZ3Muc3VjY2Vzcy5jYWxsKHNldHRpbmdzLnN1Y2Nlc3Nfc2NvcGUsICcnICsgeGhyLnJlc3BvbnNlVGV4dCwgeGhyLCBzZXR0aW5ncyk7XG4gICAgICAgIH0gZWxzZSBpZiAoc2V0dGluZ3MuZXJyb3IpIHtcbiAgICAgICAgICBzZXR0aW5ncy5lcnJvci5jYWxsKHNldHRpbmdzLmVycm9yX3Njb3BlLCBjb3VudCA+IDEwMDAwID8gJ1RJTUVEX09VVCcgOiAnR0VORVJBTCcsIHhociwgc2V0dGluZ3MpO1xuICAgICAgICB9XG5cbiAgICAgICAgeGhyID0gbnVsbDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIERlbGF5LnNldFRpbWVvdXQocmVhZHksIDEwKTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgLy8gRGVmYXVsdCBzZXR0aW5nc1xuICAgIHNldHRpbmdzLnNjb3BlID0gc2V0dGluZ3Muc2NvcGUgfHwgdGhpcztcbiAgICBzZXR0aW5ncy5zdWNjZXNzX3Njb3BlID0gc2V0dGluZ3Muc3VjY2Vzc19zY29wZSB8fCBzZXR0aW5ncy5zY29wZTtcbiAgICBzZXR0aW5ncy5lcnJvcl9zY29wZSA9IHNldHRpbmdzLmVycm9yX3Njb3BlIHx8IHNldHRpbmdzLnNjb3BlO1xuICAgIHNldHRpbmdzLmFzeW5jID0gc2V0dGluZ3MuYXN5bmMgIT09IGZhbHNlO1xuICAgIHNldHRpbmdzLmRhdGEgPSBzZXR0aW5ncy5kYXRhIHx8ICcnO1xuXG4gICAgWEhSLmZpcmUoJ2JlZm9yZUluaXRpYWxpemUnLCB7IHNldHRpbmdzIH0pO1xuXG4gICAgeGhyID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG5cbiAgICBpZiAoeGhyKSB7XG4gICAgICBpZiAoeGhyLm92ZXJyaWRlTWltZVR5cGUpIHtcbiAgICAgICAgeGhyLm92ZXJyaWRlTWltZVR5cGUoc2V0dGluZ3MuY29udGVudF90eXBlKTtcbiAgICAgIH1cblxuICAgICAgeGhyLm9wZW4oc2V0dGluZ3MudHlwZSB8fCAoc2V0dGluZ3MuZGF0YSA/ICdQT1NUJyA6ICdHRVQnKSwgc2V0dGluZ3MudXJsLCBzZXR0aW5ncy5hc3luYyk7XG5cbiAgICAgIGlmIChzZXR0aW5ncy5jcm9zc0RvbWFpbikge1xuICAgICAgICB4aHIud2l0aENyZWRlbnRpYWxzID0gdHJ1ZTtcbiAgICAgIH1cblxuICAgICAgaWYgKHNldHRpbmdzLmNvbnRlbnRfdHlwZSkge1xuICAgICAgICB4aHIuc2V0UmVxdWVzdEhlYWRlcignQ29udGVudC1UeXBlJywgc2V0dGluZ3MuY29udGVudF90eXBlKTtcbiAgICAgIH1cblxuICAgICAgaWYgKHNldHRpbmdzLnJlcXVlc3RoZWFkZXJzKSB7XG4gICAgICAgIFRvb2xzLmVhY2goc2V0dGluZ3MucmVxdWVzdGhlYWRlcnMsIGZ1bmN0aW9uIChoZWFkZXIpIHtcbiAgICAgICAgICB4aHIuc2V0UmVxdWVzdEhlYWRlcihoZWFkZXIua2V5LCBoZWFkZXIudmFsdWUpO1xuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgeGhyLnNldFJlcXVlc3RIZWFkZXIoJ1gtUmVxdWVzdGVkLVdpdGgnLCAnWE1MSHR0cFJlcXVlc3QnKTtcblxuICAgICAgeGhyID0gWEhSLmZpcmUoJ2JlZm9yZVNlbmQnLCB7IHhociwgc2V0dGluZ3MgfSkueGhyO1xuICAgICAgeGhyLnNlbmQoc2V0dGluZ3MuZGF0YSk7XG5cbiAgICAgIC8vIFN5bmNyb25vdXMgcmVxdWVzdFxuICAgICAgaWYgKCFzZXR0aW5ncy5hc3luYykge1xuICAgICAgICByZXR1cm4gcmVhZHkoKTtcbiAgICAgIH1cblxuICAgICAgLy8gV2FpdCBmb3IgcmVzcG9uc2UsIG9uUmVhZHlTdGF0ZUNoYW5nZSBjYW4gbm90IGJlIHVzZWQgc2luY2UgaXQgbGVha3MgbWVtb3J5IGluIElFXG4gICAgICBEZWxheS5zZXRUaW1lb3V0KHJlYWR5LCAxMCk7XG4gICAgfVxuICB9XG59O1xuXG5leHBvcnQgZGVmYXVsdCBYSFI7Il19