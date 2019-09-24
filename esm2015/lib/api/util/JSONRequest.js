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
const extend = Tools.extend;
class JSONRequest {
    /**
     * Simple helper function to send a JSON-RPC request without the need to initialize an object.
     * Consult the Wiki API documentation for more details on what you can pass to this function.
     *
     * @method sendRPC
     * @static
     * @param {Object} o Call object where there are three field id, method and params this object should also contain callbacks etc.
     */
    static sendRPC(o) {
        return new JSONRequest().send(o);
    }
    constructor(settings) {
        this.settings = extend({}, settings);
        this.count = 0;
    }
    /**
     * Sends a JSON-RPC call. Consult the Wiki API documentation for more details on what you can pass to this function.
     *
     * @method send
     * @param {Object} args Call object where there are three field id, method and params this object should also contain callbacks etc.
     */
    send(args) {
        const ecb = args.error, scb = args.success;
        const xhrArgs = extend(this.settings, args);
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
    }
}
export default JSONRequest;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSlNPTlJlcXVlc3QuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AcG9scHdhcmUvdGlueW1jZS11dGlsLyIsInNvdXJjZXMiOlsibGliL2FwaS91dGlsL0pTT05SZXF1ZXN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7OztHQUtHO0FBRUgsT0FBTyxJQUFJLE1BQU0sUUFBUSxDQUFDO0FBQzFCLE9BQU8sR0FBb0IsTUFBTSxPQUFPLENBQUM7QUFDekMsT0FBTyxLQUFLLE1BQU0sU0FBUyxDQUFDO0FBRTVCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQTBCRztBQUVILE1BQU0sTUFBTSxHQUFHLEtBQUssQ0FBQyxNQUFNLENBQUM7QUE0QjVCLE1BQU0sV0FBVztJQUNmOzs7Ozs7O09BT0c7SUFDSSxNQUFNLENBQUMsT0FBTyxDQUFFLENBQWtCO1FBQ3ZDLE9BQU8sSUFBSSxXQUFXLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDbkMsQ0FBQztJQUtELFlBQWEsUUFBOEI7UUFDekMsSUFBSSxDQUFDLFFBQVEsR0FBRyxNQUFNLENBQUMsRUFBRSxFQUFFLFFBQVEsQ0FBQyxDQUFDO1FBQ3JDLElBQUksQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDO0lBQ2pCLENBQUM7SUFFRDs7Ozs7T0FLRztJQUNJLElBQUksQ0FBRSxJQUFxQjtRQUNoQyxNQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsS0FBSyxFQUFFLEdBQUcsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDO1FBRTNDLE1BQU0sT0FBTyxHQUFnQixNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUV6RCxPQUFPLENBQUMsT0FBTyxHQUFHLFVBQVUsQ0FBTSxFQUFFLENBQUM7WUFDbkMsQ0FBQyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFFbEIsSUFBSSxPQUFPLENBQUMsS0FBSyxXQUFXLEVBQUU7Z0JBQzVCLENBQUMsR0FBRztvQkFDRixLQUFLLEVBQUUsbUJBQW1CO2lCQUMzQixDQUFDO2FBQ0g7WUFFRCxJQUFJLENBQUMsQ0FBQyxLQUFLLEVBQUU7Z0JBQ1gsR0FBRyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsV0FBVyxJQUFJLE9BQU8sQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQzthQUM1RDtpQkFBTTtnQkFDTCxHQUFHLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxhQUFhLElBQUksT0FBTyxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUM7YUFDNUQ7UUFDSCxDQUFDLENBQUM7UUFFRixPQUFPLENBQUMsS0FBSyxHQUFHLFVBQVUsRUFBRSxFQUFFLENBQUM7WUFDN0IsSUFBSSxHQUFHLEVBQUU7Z0JBQ1AsR0FBRyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsV0FBVyxJQUFJLE9BQU8sQ0FBQyxLQUFLLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDO2FBQ3ZEO1FBQ0gsQ0FBQyxDQUFDO1FBRUYsT0FBTyxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDO1lBQzVCLEVBQUUsRUFBRSxJQUFJLENBQUMsRUFBRSxJQUFJLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztZQUNuQyxNQUFNLEVBQUUsSUFBSSxDQUFDLE1BQU07WUFDbkIsTUFBTSxFQUFFLElBQUksQ0FBQyxNQUFNO1NBQ3BCLENBQUMsQ0FBQztRQUVILHFEQUFxRDtRQUNyRCxPQUFPLENBQUMsWUFBWSxHQUFHLGtCQUFrQixDQUFDO1FBRTFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDcEIsQ0FBQztDQUNGO0FBRUQsZUFBZSxXQUFXLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIENvcHlyaWdodCAoYykgVGlueSBUZWNobm9sb2dpZXMsIEluYy4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBMR1BMIG9yIGEgY29tbWVyY2lhbCBsaWNlbnNlLlxuICogRm9yIExHUEwgc2VlIExpY2Vuc2UudHh0IGluIHRoZSBwcm9qZWN0IHJvb3QgZm9yIGxpY2Vuc2UgaW5mb3JtYXRpb24uXG4gKiBGb3IgY29tbWVyY2lhbCBsaWNlbnNlcyBzZWUgaHR0cHM6Ly93d3cudGlueS5jbG91ZC9cbiAqL1xuXG5pbXBvcnQgSlNPTiBmcm9tICcuL0pTT04nO1xuaW1wb3J0IFhIUiwgeyBYSFJTZXR0aW5ncyB9IGZyb20gJy4vWEhSJztcbmltcG9ydCBUb29scyBmcm9tICcuL1Rvb2xzJztcblxuLyoqXG4gKiBUaGlzIGNsYXNzIGVuYWJsZXMgeW91IHRvIHVzZSBKU09OLVJQQyB0byBjYWxsIGJhY2tlbmQgbWV0aG9kcy5cbiAqXG4gKiBAY2xhc3MgdGlueW1jZS51dGlsLkpTT05SZXF1ZXN0XG4gKiBAZXhhbXBsZVxuICogdmFyIGpzb24gPSBuZXcgdGlueW1jZS51dGlsLkpTT05SZXF1ZXN0KHtcbiAqICAgICB1cmw6ICdzb21lYmFja2VuZC5waHAnXG4gKiB9KTtcbiAqXG4gKiAvLyBTZW5kIFJQQyBjYWxsIDFcbiAqIGpzb24uc2VuZCh7XG4gKiAgICAgbWV0aG9kOiAnc29tZU1ldGhvZDEnLFxuICogICAgIHBhcmFtczogWydhJywgJ2InXSxcbiAqICAgICBzdWNjZXNzOiBmdW5jdGlvbihyZXN1bHQpIHtcbiAqICAgICAgICAgY29uc29sZS5kaXIocmVzdWx0KTtcbiAqICAgICB9XG4gKiB9KTtcbiAqXG4gKiAvLyBTZW5kIFJQQyBjYWxsIDJcbiAqIGpzb24uc2VuZCh7XG4gKiAgICAgbWV0aG9kOiAnc29tZU1ldGhvZDInLFxuICogICAgIHBhcmFtczogWydhJywgJ2InXSxcbiAqICAgICBzdWNjZXNzOiBmdW5jdGlvbihyZXN1bHQpIHtcbiAqICAgICAgICAgY29uc29sZS5kaXIocmVzdWx0KTtcbiAqICAgICB9XG4gKiB9KTtcbiAqL1xuXG5jb25zdCBleHRlbmQgPSBUb29scy5leHRlbmQ7XG5cbmV4cG9ydCBpbnRlcmZhY2UgSlNPTlJlcXVlc3RTZXR0aW5ncyB7XG4gIGNyb3NzRG9tYWluPzogYm9vbGVhbjtcbiAgcmVxdWVzdGhlYWRlcnM/OiBSZWNvcmQ8c3RyaW5nLCB7IGtleTogc3RyaW5nLCB2YWx1ZTogc3RyaW5nfT47XG4gIHR5cGU/OiBzdHJpbmc7XG4gIHVybD86IHN0cmluZztcbiAgZXJyb3Jfc2NvcGU/OiB7fTtcbiAgc3VjY2Vzc19zY29wZT86IHt9O1xuICBzdWNjZXNzPyAoZGF0YTogYW55KTogdm9pZDtcbiAgZXJyb3I/IChlcnJvcjogYW55KTogdm9pZDtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBKU09OUmVxdWVzdEFyZ3MgZXh0ZW5kcyBKU09OUmVxdWVzdFNldHRpbmdzIHtcbiAgaWQ/OiBzdHJpbmc7XG4gIG1ldGhvZD86IHN0cmluZztcbiAgcGFyYW1zPzogc3RyaW5nO1xuICB1cmw6IHN0cmluZztcbn1cblxuZXhwb3J0IGludGVyZmFjZSBKU09OUmVxdWVzdENvbnN0cnVjdG9yIHtcbiAgcmVhZG9ubHkgcHJvdG90eXBlOiBKU09OUmVxdWVzdDtcblxuICBuZXcgKHNldHRpbmdzPzogSlNPTlJlcXVlc3RTZXR0aW5ncyk6IEpTT05SZXF1ZXN0O1xuXG4gIHNlbmRSUEMgKG86IEpTT05SZXF1ZXN0QXJncyk6IHZvaWQ7XG59XG5cbmNsYXNzIEpTT05SZXF1ZXN0IHtcbiAgLyoqXG4gICAqIFNpbXBsZSBoZWxwZXIgZnVuY3Rpb24gdG8gc2VuZCBhIEpTT04tUlBDIHJlcXVlc3Qgd2l0aG91dCB0aGUgbmVlZCB0byBpbml0aWFsaXplIGFuIG9iamVjdC5cbiAgICogQ29uc3VsdCB0aGUgV2lraSBBUEkgZG9jdW1lbnRhdGlvbiBmb3IgbW9yZSBkZXRhaWxzIG9uIHdoYXQgeW91IGNhbiBwYXNzIHRvIHRoaXMgZnVuY3Rpb24uXG4gICAqXG4gICAqIEBtZXRob2Qgc2VuZFJQQ1xuICAgKiBAc3RhdGljXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvIENhbGwgb2JqZWN0IHdoZXJlIHRoZXJlIGFyZSB0aHJlZSBmaWVsZCBpZCwgbWV0aG9kIGFuZCBwYXJhbXMgdGhpcyBvYmplY3Qgc2hvdWxkIGFsc28gY29udGFpbiBjYWxsYmFja3MgZXRjLlxuICAgKi9cbiAgcHVibGljIHN0YXRpYyBzZW5kUlBDIChvOiBKU09OUmVxdWVzdEFyZ3MpIHtcbiAgICByZXR1cm4gbmV3IEpTT05SZXF1ZXN0KCkuc2VuZChvKTtcbiAgfVxuXG4gIHB1YmxpYyBzZXR0aW5nczogSlNPTlJlcXVlc3RTZXR0aW5ncztcbiAgcHVibGljIGNvdW50OiBudW1iZXI7XG5cbiAgY29uc3RydWN0b3IgKHNldHRpbmdzPzogSlNPTlJlcXVlc3RTZXR0aW5ncykge1xuICAgIHRoaXMuc2V0dGluZ3MgPSBleHRlbmQoe30sIHNldHRpbmdzKTtcbiAgICB0aGlzLmNvdW50ID0gMDtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZW5kcyBhIEpTT04tUlBDIGNhbGwuIENvbnN1bHQgdGhlIFdpa2kgQVBJIGRvY3VtZW50YXRpb24gZm9yIG1vcmUgZGV0YWlscyBvbiB3aGF0IHlvdSBjYW4gcGFzcyB0byB0aGlzIGZ1bmN0aW9uLlxuICAgKlxuICAgKiBAbWV0aG9kIHNlbmRcbiAgICogQHBhcmFtIHtPYmplY3R9IGFyZ3MgQ2FsbCBvYmplY3Qgd2hlcmUgdGhlcmUgYXJlIHRocmVlIGZpZWxkIGlkLCBtZXRob2QgYW5kIHBhcmFtcyB0aGlzIG9iamVjdCBzaG91bGQgYWxzbyBjb250YWluIGNhbGxiYWNrcyBldGMuXG4gICAqL1xuICBwdWJsaWMgc2VuZCAoYXJnczogSlNPTlJlcXVlc3RBcmdzKSB7XG4gICAgY29uc3QgZWNiID0gYXJncy5lcnJvciwgc2NiID0gYXJncy5zdWNjZXNzO1xuXG4gICAgY29uc3QgeGhyQXJnczogWEhSU2V0dGluZ3MgPSBleHRlbmQodGhpcy5zZXR0aW5ncywgYXJncyk7XG5cbiAgICB4aHJBcmdzLnN1Y2Nlc3MgPSBmdW5jdGlvbiAoYzogYW55LCB4KSB7XG4gICAgICBjID0gSlNPTi5wYXJzZShjKTtcblxuICAgICAgaWYgKHR5cGVvZiBjID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICBjID0ge1xuICAgICAgICAgIGVycm9yOiAnSlNPTiBQYXJzZSBlcnJvci4nXG4gICAgICAgIH07XG4gICAgICB9XG5cbiAgICAgIGlmIChjLmVycm9yKSB7XG4gICAgICAgIGVjYi5jYWxsKHhockFyZ3MuZXJyb3Jfc2NvcGUgfHwgeGhyQXJncy5zY29wZSwgYy5lcnJvciwgeCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzY2IuY2FsbCh4aHJBcmdzLnN1Y2Nlc3Nfc2NvcGUgfHwgeGhyQXJncy5zY29wZSwgYy5yZXN1bHQpO1xuICAgICAgfVxuICAgIH07XG5cbiAgICB4aHJBcmdzLmVycm9yID0gZnVuY3Rpb24gKHR5LCB4KSB7XG4gICAgICBpZiAoZWNiKSB7XG4gICAgICAgIGVjYi5jYWxsKHhockFyZ3MuZXJyb3Jfc2NvcGUgfHwgeGhyQXJncy5zY29wZSwgdHksIHgpO1xuICAgICAgfVxuICAgIH07XG5cbiAgICB4aHJBcmdzLmRhdGEgPSBKU09OLnNlcmlhbGl6ZSh7XG4gICAgICBpZDogYXJncy5pZCB8fCAnYycgKyAodGhpcy5jb3VudCsrKSxcbiAgICAgIG1ldGhvZDogYXJncy5tZXRob2QsXG4gICAgICBwYXJhbXM6IGFyZ3MucGFyYW1zXG4gICAgfSk7XG5cbiAgICAvLyBKU09OIGNvbnRlbnQgdHlwZSBmb3IgUnVieSBvbiByYWlscy4gQnVnOiAjMTg4MzI4N1xuICAgIHhockFyZ3MuY29udGVudF90eXBlID0gJ2FwcGxpY2F0aW9uL2pzb24nO1xuXG4gICAgWEhSLnNlbmQoeGhyQXJncyk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgSlNPTlJlcXVlc3Q7Il19