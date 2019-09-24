/**
 * Copyright (c) Tiny Technologies, Inc. All rights reserved.
 * Licensed under the LGPL or a commercial license.
 * For LGPL see License.txt in the project root for license information.
 * For commercial licenses see https://www.tiny.cloud/
 */
import { XMLHttpRequest } from '@ephox/dom-globals';
import Observable from './Observable';
import { NativeEventMap } from './EventDispatcher';
export interface XHRSettings {
    async?: boolean;
    content_type?: string;
    crossDomain?: boolean;
    data?: string;
    requestheaders?: Record<string, {
        key: string;
        value: string;
    }>;
    scope?: {};
    type?: string;
    url: string;
    error_scope?: {};
    success_scope?: {};
    error?(message: 'TIMED_OUT' | 'GENERAL', xhr: XMLHttpRequest, settings: XHRSettings): void;
    success?(text: string, xhr: XMLHttpRequest, settings: XHRSettings): void;
}
export interface XHREventMap extends NativeEventMap {
    'beforeInitialize': {
        settings: XHRSettings;
    };
}
interface XHR extends Observable<XHREventMap> {
    send(settings: XHRSettings): void;
}
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
declare const XHR: XHR;
export default XHR;
