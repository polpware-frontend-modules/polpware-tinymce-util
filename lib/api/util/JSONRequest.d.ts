/**
 * Copyright (c) Tiny Technologies, Inc. All rights reserved.
 * Licensed under the LGPL or a commercial license.
 * For LGPL see License.txt in the project root for license information.
 * For commercial licenses see https://www.tiny.cloud/
 */
export interface JSONRequestSettings {
    crossDomain?: boolean;
    requestheaders?: Record<string, {
        key: string;
        value: string;
    }>;
    type?: string;
    url?: string;
    error_scope?: {};
    success_scope?: {};
    success?(data: any): void;
    error?(error: any): void;
}
export interface JSONRequestArgs extends JSONRequestSettings {
    id?: string;
    method?: string;
    params?: string;
    url: string;
}
export interface JSONRequestConstructor {
    readonly prototype: JSONRequest;
    new (settings?: JSONRequestSettings): JSONRequest;
    sendRPC(o: JSONRequestArgs): void;
}
declare class JSONRequest {
    /**
     * Simple helper function to send a JSON-RPC request without the need to initialize an object.
     * Consult the Wiki API documentation for more details on what you can pass to this function.
     *
     * @method sendRPC
     * @static
     * @param {Object} o Call object where there are three field id, method and params this object should also contain callbacks etc.
     */
    static sendRPC(o: JSONRequestArgs): void;
    settings: JSONRequestSettings;
    count: number;
    constructor(settings?: JSONRequestSettings);
    /**
     * Sends a JSON-RPC call. Consult the Wiki API documentation for more details on what you can pass to this function.
     *
     * @method send
     * @param {Object} args Call object where there are three field id, method and params this object should also contain callbacks etc.
     */
    send(args: JSONRequestArgs): void;
}
export default JSONRequest;
