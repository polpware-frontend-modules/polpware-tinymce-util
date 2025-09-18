export interface URISettings {
    base_uri?: URI;
}
export interface URIConstructor {
    readonly prototype: URI;
    new (url: string, settings?: URISettings): URI;
    getDocumentBaseUrl: (loc: {
        protocol: string;
        host?: string;
        href?: string;
        pathname?: string;
    }) => string;
    parseDataUri: (uri: string) => {
        type: string;
        data: string;
    };
}
interface SafeUriOptions {
    readonly allow_html_data_urls?: boolean;
    readonly allow_script_urls?: boolean;
    readonly allow_svg_data_urls?: boolean;
}
export declare const isInvalidUri: (settings: SafeUriOptions, uri: string, tagName?: string) => boolean;
declare class URI {
    static parseDataUri(uri: string): {
        type: string | undefined;
        data: string;
    };
    /**
     * Check to see if a URI is safe to use in the Document Object Model (DOM). This will return
     * true if the URI can be used in the DOM without potentially triggering a security issue.
     *
     * @method isDomSafe
     * @static
     * @param {String} uri The URI to be validated.
     * @param {Object} context An optional HTML tag name where the element is being used.
     * @param {Object} options An optional set of options to use when determining if the URI is safe.
     * @return {Boolean} True if the URI is safe, otherwise false.
     */
    static isDomSafe(uri: string, context?: string, options?: SafeUriOptions): boolean;
    static getDocumentBaseUrl(loc: {
        protocol: string;
        host?: string;
        href?: string;
        pathname?: string;
    }): string;
    source: string;
    protocol: string | undefined;
    authority: string | undefined;
    userInfo: string | undefined;
    user: string | undefined;
    password: string | undefined;
    host: string | undefined;
    port: string | undefined;
    relative: string | undefined;
    path: string;
    directory: string;
    file: string | undefined;
    query: string | undefined;
    anchor: string | undefined;
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
     * @param {String} path Path string to set.
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
     * const url = new tinymce.util.URI('http://www.site.com/dir/').toRelative('http://www.site.com/dir/somedir/somefile.htm');
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
     * const url = new tinymce.util.URI('http://www.site.com/dir/').toAbsolute('somedir/somefile.htm');
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
//# sourceMappingURL=URI.d.ts.map