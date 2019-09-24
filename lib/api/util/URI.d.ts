/**
 * Copyright (c) Tiny Technologies, Inc. All rights reserved.
 * Licensed under the LGPL or a commercial license.
 * For LGPL see License.txt in the project root for license information.
 * For commercial licenses see https://www.tiny.cloud/
 */
export interface URISettings {
    base_uri?: URI;
}
export interface URIConstructor {
    readonly prototype: URI;
    new (url: string, settings?: URISettings): URI;
    getDocumentBaseUrl(loc: {
        protocol: string;
        host?: string;
        href?: string;
        pathname?: string;
    }): string;
    parseDataUri(uri: string): {
        type: string;
        data: string;
    };
}
declare class URI {
    static parseDataUri(uri: string): {
        type: string;
        data: string;
    };
    static getDocumentBaseUrl(loc: {
        protocol: string;
        host?: string;
        href?: string;
        pathname?: string;
    }): string;
    source: string;
    protocol: string;
    authority: string;
    userInfo: string;
    user: string;
    password: string;
    host: string;
    port: string;
    relative: string;
    path: string;
    directory: string;
    file: string;
    query: string;
    anchor: string;
    settings: URISettings;
    /**
     * Constructs a new URI instance.
     *
     * @constructor
     * @method URI
     * @param {String} url URI string to parse.
     * @param {Object} settings Optional settings object.
     */
    constructor(url: string, settings?: URISettings);
    /**
     * Sets the internal path part of the URI.
     *
     * @method setPath
     * @param {string} path Path string to set.
     */
    setPath(path: string): void;
    /**
     * Converts the specified URI into a relative URI based on the current URI instance location.
     *
     * @method toRelative
     * @param {String} uri URI to convert into a relative path/URI.
     * @return {String} Relative URI from the point specified in the current URI instance.
     * @example
     * // Converts an absolute URL to an relative URL url will be somedir/somefile.htm
     * var url = new tinymce.util.URI('http://www.site.com/dir/').toRelative('http://www.site.com/dir/somedir/somefile.htm');
     */
    toRelative(uri: string): string;
    /**
     * Converts the specified URI into a absolute URI based on the current URI instance location.
     *
     * @method toAbsolute
     * @param {String} uri URI to convert into a relative path/URI.
     * @param {Boolean} noHost No host and protocol prefix.
     * @return {String} Absolute URI from the point specified in the current URI instance.
     * @example
     * // Converts an relative URL to an absolute URL url will be http://www.site.com/dir/somedir/somefile.htm
     * var url = new tinymce.util.URI('http://www.site.com/dir/').toAbsolute('somedir/somefile.htm');
     */
    toAbsolute(uri: string, noHost?: boolean): string;
    /**
     * Determine whether the given URI has the same origin as this URI.  Based on RFC-6454.
     * Supports default ports for protocols listed in DEFAULT_PORTS.  Unsupported protocols will fail safe: they
     * won't match, if the port specifications differ.
     *
     * @method isSameOrigin
     * @param {tinymce.util.URI} uri Uri instance to compare.
     * @returns {Boolean} True if the origins are the same.
     */
    isSameOrigin(uri: URI): boolean;
    /**
     * Converts a absolute path into a relative path.
     *
     * @method toRelPath
     * @param {String} base Base point to convert the path from.
     * @param {String} path Absolute path to convert into a relative path.
     */
    toRelPath(base: string, path: string): string;
    /**
     * Converts a relative path into a absolute path.
     *
     * @method toAbsPath
     * @param {String} base Base point to convert the path from.
     * @param {String} path Relative path to convert into an absolute path.
     */
    toAbsPath(base: string, path: string): string;
    /**
     * Returns the full URI of the internal structure.
     *
     * @method getURI
     * @param {Boolean} noProtoHost Optional no host and protocol part. Defaults to false.
     */
    getURI(noProtoHost?: boolean): string;
}
export default URI;
