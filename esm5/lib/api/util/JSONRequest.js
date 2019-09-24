/**
 * Copyright (c) Tiny Technologies, Inc. All rights reserved.
 * Licensed under the LGPL or a commercial license.
 * For LGPL see License.txt in the project root for license information.
 * For commercial licenses see https://www.tiny.cloud/
 */
import JSON from './JSON';
import XHR from './XHR';
import Tools from './Tools';
/**
 * This class enables you to use JSON-RPC to call backend methods.
 *
 * @class tinymce.util.JSONRequest
 * @example
 * var json = new tinymce.util.JSONRequest({
 *     url: 'somebackend.php'
 * });
 *
 * // Send RPC call 1
 * json.send({
 *     method: 'someMethod1',
 *     params: ['a', 'b'],
 *     success: function(result) {
 *         console.dir(result);
 *     }
 * });
 *
 * // Send RPC call 2
 * json.send({
 *     method: 'someMethod2',
 *     params: ['a', 'b'],
 *     success: function(result) {
 *         console.dir(result);
 *     }
 * });
 */
var extend = Tools.extend;
var JSONRequest = /** @class */ (function () {
    function JSONRequest(settings) {
        this.settings = extend({}, settings);
        this.count = 0;
    }
    /**
     * Simple helper function to send a JSON-RPC request without the need to initialize an object.
     * Consult the Wiki API documentation for more details on what you can pass to this function.
     *
     * @method sendRPC
     * @static
     * @param {Object} o Call object where there are three field id, method and params this object should also contain callbacks etc.
     */
    JSONRequest.sendRPC = function (o) {
        return new JSONRequest().send(o);
    };
    /**
     * Sends a JSON-RPC call. Consult the Wiki API documentation for more details on what you can pass to this function.
     *
     * @method send
     * @param {Object} args Call object where there are three field id, method and params this object should also contain callbacks etc.
     */
    JSONRequest.prototype.send = function (args) {
        var ecb = args.error, scb = args.success;
        var xhrArgs = extend(this.settings, args);
        xhrArgs.success = function (c, x) {
            c = JSON.parse(c);
            if (typeof c === 'undefined') {
                c = {
                    error: 'JSON Parse error.'
                };
            }
            if (c.error) {
                ecb.call(xhrArgs.error_scope || xhrArgs.scope, c.error, x);
            }
            else {
                scb.call(xhrArgs.success_scope || xhrArgs.scope, c.result);
            }
        };
        xhrArgs.error = function (ty, x) {
            if (ecb) {
                ecb.call(xhrArgs.error_scope || xhrArgs.scope, ty, x);
            }
        };
        xhrArgs.data = JSON.serialize({
            id: args.id || 'c' + (this.count++),
            method: args.method,
            params: args.params
        });
        // JSON content type for Ruby on rails. Bug: #1883287
        xhrArgs.content_type = 'application/json';
        XHR.send(xhrArgs);
    };
    return JSONRequest;
}());
export default JSONRequest;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSlNPTlJlcXVlc3QuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AcG9scHdhcmUvdGlueW1jZS11dGlsLyIsInNvdXJjZXMiOlsibGliL2FwaS91dGlsL0pTT05SZXF1ZXN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7OztHQUtHO0FBRUgsT0FBTyxJQUFJLE1BQU0sUUFBUSxDQUFDO0FBQzFCLE9BQU8sR0FBb0IsTUFBTSxPQUFPLENBQUM7QUFDekMsT0FBTyxLQUFLLE1BQU0sU0FBUyxDQUFDO0FBRTVCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQTBCRztBQUVILElBQU0sTUFBTSxHQUFHLEtBQUssQ0FBQyxNQUFNLENBQUM7QUE0QjVCO0lBZ0JFLHFCQUFhLFFBQThCO1FBQ3pDLElBQUksQ0FBQyxRQUFRLEdBQUcsTUFBTSxDQUFDLEVBQUUsRUFBRSxRQUFRLENBQUMsQ0FBQztRQUNyQyxJQUFJLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQztJQUNqQixDQUFDO0lBbEJEOzs7Ozs7O09BT0c7SUFDVyxtQkFBTyxHQUFyQixVQUF1QixDQUFrQjtRQUN2QyxPQUFPLElBQUksV0FBVyxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ25DLENBQUM7SUFVRDs7Ozs7T0FLRztJQUNJLDBCQUFJLEdBQVgsVUFBYSxJQUFxQjtRQUNoQyxJQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsS0FBSyxFQUFFLEdBQUcsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDO1FBRTNDLElBQU0sT0FBTyxHQUFnQixNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUV6RCxPQUFPLENBQUMsT0FBTyxHQUFHLFVBQVUsQ0FBTSxFQUFFLENBQUM7WUFDbkMsQ0FBQyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFFbEIsSUFBSSxPQUFPLENBQUMsS0FBSyxXQUFXLEVBQUU7Z0JBQzVCLENBQUMsR0FBRztvQkFDRixLQUFLLEVBQUUsbUJBQW1CO2lCQUMzQixDQUFDO2FBQ0g7WUFFRCxJQUFJLENBQUMsQ0FBQyxLQUFLLEVBQUU7Z0JBQ1gsR0FBRyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsV0FBVyxJQUFJLE9BQU8sQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQzthQUM1RDtpQkFBTTtnQkFDTCxHQUFHLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxhQUFhLElBQUksT0FBTyxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUM7YUFDNUQ7UUFDSCxDQUFDLENBQUM7UUFFRixPQUFPLENBQUMsS0FBSyxHQUFHLFVBQVUsRUFBRSxFQUFFLENBQUM7WUFDN0IsSUFBSSxHQUFHLEVBQUU7Z0JBQ1AsR0FBRyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsV0FBVyxJQUFJLE9BQU8sQ0FBQyxLQUFLLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDO2FBQ3ZEO1FBQ0gsQ0FBQyxDQUFDO1FBRUYsT0FBTyxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDO1lBQzVCLEVBQUUsRUFBRSxJQUFJLENBQUMsRUFBRSxJQUFJLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztZQUNuQyxNQUFNLEVBQUUsSUFBSSxDQUFDLE1BQU07WUFDbkIsTUFBTSxFQUFFLElBQUksQ0FBQyxNQUFNO1NBQ3BCLENBQUMsQ0FBQztRQUVILHFEQUFxRDtRQUNyRCxPQUFPLENBQUMsWUFBWSxHQUFHLGtCQUFrQixDQUFDO1FBRTFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDcEIsQ0FBQztJQUNILGtCQUFDO0FBQUQsQ0FBQyxBQWpFRCxJQWlFQztBQUVELGVBQWUsV0FBVyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIFRpbnkgVGVjaG5vbG9naWVzLCBJbmMuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgTEdQTCBvciBhIGNvbW1lcmNpYWwgbGljZW5zZS5cbiAqIEZvciBMR1BMIHNlZSBMaWNlbnNlLnR4dCBpbiB0aGUgcHJvamVjdCByb290IGZvciBsaWNlbnNlIGluZm9ybWF0aW9uLlxuICogRm9yIGNvbW1lcmNpYWwgbGljZW5zZXMgc2VlIGh0dHBzOi8vd3d3LnRpbnkuY2xvdWQvXG4gKi9cblxuaW1wb3J0IEpTT04gZnJvbSAnLi9KU09OJztcbmltcG9ydCBYSFIsIHsgWEhSU2V0dGluZ3MgfSBmcm9tICcuL1hIUic7XG5pbXBvcnQgVG9vbHMgZnJvbSAnLi9Ub29scyc7XG5cbi8qKlxuICogVGhpcyBjbGFzcyBlbmFibGVzIHlvdSB0byB1c2UgSlNPTi1SUEMgdG8gY2FsbCBiYWNrZW5kIG1ldGhvZHMuXG4gKlxuICogQGNsYXNzIHRpbnltY2UudXRpbC5KU09OUmVxdWVzdFxuICogQGV4YW1wbGVcbiAqIHZhciBqc29uID0gbmV3IHRpbnltY2UudXRpbC5KU09OUmVxdWVzdCh7XG4gKiAgICAgdXJsOiAnc29tZWJhY2tlbmQucGhwJ1xuICogfSk7XG4gKlxuICogLy8gU2VuZCBSUEMgY2FsbCAxXG4gKiBqc29uLnNlbmQoe1xuICogICAgIG1ldGhvZDogJ3NvbWVNZXRob2QxJyxcbiAqICAgICBwYXJhbXM6IFsnYScsICdiJ10sXG4gKiAgICAgc3VjY2VzczogZnVuY3Rpb24ocmVzdWx0KSB7XG4gKiAgICAgICAgIGNvbnNvbGUuZGlyKHJlc3VsdCk7XG4gKiAgICAgfVxuICogfSk7XG4gKlxuICogLy8gU2VuZCBSUEMgY2FsbCAyXG4gKiBqc29uLnNlbmQoe1xuICogICAgIG1ldGhvZDogJ3NvbWVNZXRob2QyJyxcbiAqICAgICBwYXJhbXM6IFsnYScsICdiJ10sXG4gKiAgICAgc3VjY2VzczogZnVuY3Rpb24ocmVzdWx0KSB7XG4gKiAgICAgICAgIGNvbnNvbGUuZGlyKHJlc3VsdCk7XG4gKiAgICAgfVxuICogfSk7XG4gKi9cblxuY29uc3QgZXh0ZW5kID0gVG9vbHMuZXh0ZW5kO1xuXG5leHBvcnQgaW50ZXJmYWNlIEpTT05SZXF1ZXN0U2V0dGluZ3Mge1xuICBjcm9zc0RvbWFpbj86IGJvb2xlYW47XG4gIHJlcXVlc3RoZWFkZXJzPzogUmVjb3JkPHN0cmluZywgeyBrZXk6IHN0cmluZywgdmFsdWU6IHN0cmluZ30+O1xuICB0eXBlPzogc3RyaW5nO1xuICB1cmw/OiBzdHJpbmc7XG4gIGVycm9yX3Njb3BlPzoge307XG4gIHN1Y2Nlc3Nfc2NvcGU/OiB7fTtcbiAgc3VjY2Vzcz8gKGRhdGE6IGFueSk6IHZvaWQ7XG4gIGVycm9yPyAoZXJyb3I6IGFueSk6IHZvaWQ7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgSlNPTlJlcXVlc3RBcmdzIGV4dGVuZHMgSlNPTlJlcXVlc3RTZXR0aW5ncyB7XG4gIGlkPzogc3RyaW5nO1xuICBtZXRob2Q/OiBzdHJpbmc7XG4gIHBhcmFtcz86IHN0cmluZztcbiAgdXJsOiBzdHJpbmc7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgSlNPTlJlcXVlc3RDb25zdHJ1Y3RvciB7XG4gIHJlYWRvbmx5IHByb3RvdHlwZTogSlNPTlJlcXVlc3Q7XG5cbiAgbmV3IChzZXR0aW5ncz86IEpTT05SZXF1ZXN0U2V0dGluZ3MpOiBKU09OUmVxdWVzdDtcblxuICBzZW5kUlBDIChvOiBKU09OUmVxdWVzdEFyZ3MpOiB2b2lkO1xufVxuXG5jbGFzcyBKU09OUmVxdWVzdCB7XG4gIC8qKlxuICAgKiBTaW1wbGUgaGVscGVyIGZ1bmN0aW9uIHRvIHNlbmQgYSBKU09OLVJQQyByZXF1ZXN0IHdpdGhvdXQgdGhlIG5lZWQgdG8gaW5pdGlhbGl6ZSBhbiBvYmplY3QuXG4gICAqIENvbnN1bHQgdGhlIFdpa2kgQVBJIGRvY3VtZW50YXRpb24gZm9yIG1vcmUgZGV0YWlscyBvbiB3aGF0IHlvdSBjYW4gcGFzcyB0byB0aGlzIGZ1bmN0aW9uLlxuICAgKlxuICAgKiBAbWV0aG9kIHNlbmRSUENcbiAgICogQHN0YXRpY1xuICAgKiBAcGFyYW0ge09iamVjdH0gbyBDYWxsIG9iamVjdCB3aGVyZSB0aGVyZSBhcmUgdGhyZWUgZmllbGQgaWQsIG1ldGhvZCBhbmQgcGFyYW1zIHRoaXMgb2JqZWN0IHNob3VsZCBhbHNvIGNvbnRhaW4gY2FsbGJhY2tzIGV0Yy5cbiAgICovXG4gIHB1YmxpYyBzdGF0aWMgc2VuZFJQQyAobzogSlNPTlJlcXVlc3RBcmdzKSB7XG4gICAgcmV0dXJuIG5ldyBKU09OUmVxdWVzdCgpLnNlbmQobyk7XG4gIH1cblxuICBwdWJsaWMgc2V0dGluZ3M6IEpTT05SZXF1ZXN0U2V0dGluZ3M7XG4gIHB1YmxpYyBjb3VudDogbnVtYmVyO1xuXG4gIGNvbnN0cnVjdG9yIChzZXR0aW5ncz86IEpTT05SZXF1ZXN0U2V0dGluZ3MpIHtcbiAgICB0aGlzLnNldHRpbmdzID0gZXh0ZW5kKHt9LCBzZXR0aW5ncyk7XG4gICAgdGhpcy5jb3VudCA9IDA7XG4gIH1cblxuICAvKipcbiAgICogU2VuZHMgYSBKU09OLVJQQyBjYWxsLiBDb25zdWx0IHRoZSBXaWtpIEFQSSBkb2N1bWVudGF0aW9uIGZvciBtb3JlIGRldGFpbHMgb24gd2hhdCB5b3UgY2FuIHBhc3MgdG8gdGhpcyBmdW5jdGlvbi5cbiAgICpcbiAgICogQG1ldGhvZCBzZW5kXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBhcmdzIENhbGwgb2JqZWN0IHdoZXJlIHRoZXJlIGFyZSB0aHJlZSBmaWVsZCBpZCwgbWV0aG9kIGFuZCBwYXJhbXMgdGhpcyBvYmplY3Qgc2hvdWxkIGFsc28gY29udGFpbiBjYWxsYmFja3MgZXRjLlxuICAgKi9cbiAgcHVibGljIHNlbmQgKGFyZ3M6IEpTT05SZXF1ZXN0QXJncykge1xuICAgIGNvbnN0IGVjYiA9IGFyZ3MuZXJyb3IsIHNjYiA9IGFyZ3Muc3VjY2VzcztcblxuICAgIGNvbnN0IHhockFyZ3M6IFhIUlNldHRpbmdzID0gZXh0ZW5kKHRoaXMuc2V0dGluZ3MsIGFyZ3MpO1xuXG4gICAgeGhyQXJncy5zdWNjZXNzID0gZnVuY3Rpb24gKGM6IGFueSwgeCkge1xuICAgICAgYyA9IEpTT04ucGFyc2UoYyk7XG5cbiAgICAgIGlmICh0eXBlb2YgYyA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgYyA9IHtcbiAgICAgICAgICBlcnJvcjogJ0pTT04gUGFyc2UgZXJyb3IuJ1xuICAgICAgICB9O1xuICAgICAgfVxuXG4gICAgICBpZiAoYy5lcnJvcikge1xuICAgICAgICBlY2IuY2FsbCh4aHJBcmdzLmVycm9yX3Njb3BlIHx8IHhockFyZ3Muc2NvcGUsIGMuZXJyb3IsIHgpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc2NiLmNhbGwoeGhyQXJncy5zdWNjZXNzX3Njb3BlIHx8IHhockFyZ3Muc2NvcGUsIGMucmVzdWx0KTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgeGhyQXJncy5lcnJvciA9IGZ1bmN0aW9uICh0eSwgeCkge1xuICAgICAgaWYgKGVjYikge1xuICAgICAgICBlY2IuY2FsbCh4aHJBcmdzLmVycm9yX3Njb3BlIHx8IHhockFyZ3Muc2NvcGUsIHR5LCB4KTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgeGhyQXJncy5kYXRhID0gSlNPTi5zZXJpYWxpemUoe1xuICAgICAgaWQ6IGFyZ3MuaWQgfHwgJ2MnICsgKHRoaXMuY291bnQrKyksXG4gICAgICBtZXRob2Q6IGFyZ3MubWV0aG9kLFxuICAgICAgcGFyYW1zOiBhcmdzLnBhcmFtc1xuICAgIH0pO1xuXG4gICAgLy8gSlNPTiBjb250ZW50IHR5cGUgZm9yIFJ1Ynkgb24gcmFpbHMuIEJ1ZzogIzE4ODMyODdcbiAgICB4aHJBcmdzLmNvbnRlbnRfdHlwZSA9ICdhcHBsaWNhdGlvbi9qc29uJztcblxuICAgIFhIUi5zZW5kKHhockFyZ3MpO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IEpTT05SZXF1ZXN0OyJdfQ==