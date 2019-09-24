/**
 * Copyright (c) Tiny Technologies, Inc. All rights reserved.
 * Licensed under the LGPL or a commercial license.
 * For LGPL see License.txt in the project root for license information.
 * For commercial licenses see https://www.tiny.cloud/
 */
import { document } from '@ephox/dom-globals';
import Tools from './Tools';
/**
 * This class handles parsing, modification and serialization of URI/URL strings.
 * @class tinymce.util.URI
 */
var each = Tools.each, trim = Tools.trim;
var queryParts = 'source protocol authority userInfo user password host port relative path directory file query anchor'.split(' ');
var DEFAULT_PORTS = {
    ftp: 21,
    http: 80,
    https: 443,
    mailto: 25
};
var URI = /** @class */ (function () {
    /**
     * Constructs a new URI instance.
     *
     * @constructor
     * @method URI
     * @param {String} url URI string to parse.
     * @param {Object} settings Optional settings object.
     */
    function URI(url, settings) {
        url = trim(url);
        this.settings = settings || {};
        var baseUri = this.settings.base_uri;
        var self = this;
        // Strange app protocol that isn't http/https or local anchor
        // For example: mailto,skype,tel etc.
        if (/^([\w\-]+):([^\/]{2})/i.test(url) || /^\s*#/.test(url)) {
            self.source = url;
            return;
        }
        var isProtocolRelative = url.indexOf('//') === 0;
        // Absolute path with no host, fake host and protocol
        if (url.indexOf('/') === 0 && !isProtocolRelative) {
            url = (baseUri ? baseUri.protocol || 'http' : 'http') + '://mce_host' + url;
        }
        // Relative path http:// or protocol relative //path
        if (!/^[\w\-]*:?\/\//.test(url)) {
            var baseUrl = this.settings.base_uri ? this.settings.base_uri.path : new URI(document.location.href).directory;
            // tslint:disable-next-line:triple-equals
            if (this.settings.base_uri && this.settings.base_uri.protocol == '') {
                url = '//mce_host' + self.toAbsPath(baseUrl, url);
            }
            else {
                var match = /([^#?]*)([#?]?.*)/.exec(url);
                url = ((baseUri && baseUri.protocol) || 'http') + '://mce_host' + self.toAbsPath(baseUrl, match[1]) + match[2];
            }
        }
        // Parse URL (Credits goes to Steave, http://blog.stevenlevithan.com/archives/parseuri)
        url = url.replace(/@@/g, '(mce_at)'); // Zope 3 workaround, they use @@something
        var urlMatch = /^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/)?((?:(([^:@\/]*):?([^:@\/]*))?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/.exec(url);
        each(queryParts, function (v, i) {
            var part = urlMatch[i];
            // Zope 3 workaround, they use @@something
            if (part) {
                part = part.replace(/\(mce_at\)/g, '@@');
            }
            self[v] = part;
        });
        if (baseUri) {
            if (!self.protocol) {
                self.protocol = baseUri.protocol;
            }
            if (!self.userInfo) {
                self.userInfo = baseUri.userInfo;
            }
            if (!self.port && self.host === 'mce_host') {
                self.port = baseUri.port;
            }
            if (!self.host || self.host === 'mce_host') {
                self.host = baseUri.host;
            }
            self.source = '';
        }
        if (isProtocolRelative) {
            self.protocol = '';
        }
    }
    URI.parseDataUri = function (uri) {
        var type;
        var uriComponents = decodeURIComponent(uri).split(',');
        var matches = /data:([^;]+)/.exec(uriComponents[0]);
        if (matches) {
            type = matches[1];
        }
        return {
            type: type,
            data: uriComponents[1]
        };
    };
    URI.getDocumentBaseUrl = function (loc) {
        var baseUrl;
        // Pass applewebdata:// and other non web protocols though
        if (loc.protocol.indexOf('http') !== 0 && loc.protocol !== 'file:') {
            baseUrl = loc.href;
        }
        else {
            baseUrl = loc.protocol + '//' + loc.host + loc.pathname;
        }
        if (/^[^:]+:\/\/\/?[^\/]+\//.test(baseUrl)) {
            baseUrl = baseUrl.replace(/[\?#].*$/, '').replace(/[\/\\][^\/]+$/, '');
            if (!/[\/\\]$/.test(baseUrl)) {
                baseUrl += '/';
            }
        }
        return baseUrl;
    };
    /**
     * Sets the internal path part of the URI.
     *
     * @method setPath
     * @param {string} path Path string to set.
     */
    URI.prototype.setPath = function (path) {
        var pathMatch = /^(.*?)\/?(\w+)?$/.exec(path);
        // Update path parts
        this.path = pathMatch[0];
        this.directory = pathMatch[1];
        this.file = pathMatch[2];
        // Rebuild source
        this.source = '';
        this.getURI();
    };
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
    URI.prototype.toRelative = function (uri) {
        var output;
        if (uri === './') {
            return uri;
        }
        var relativeUri = new URI(uri, { base_uri: this });
        // Not on same domain/port or protocol
        if ((relativeUri.host !== 'mce_host' && this.host !== relativeUri.host && relativeUri.host) || this.port !== relativeUri.port ||
            (this.protocol !== relativeUri.protocol && relativeUri.protocol !== '')) {
            return relativeUri.getURI();
        }
        var tu = this.getURI(), uu = relativeUri.getURI();
        // Allow usage of the base_uri when relative_urls = true
        if (tu === uu || (tu.charAt(tu.length - 1) === '/' && tu.substr(0, tu.length - 1) === uu)) {
            return tu;
        }
        output = this.toRelPath(this.path, relativeUri.path);
        // Add query
        if (relativeUri.query) {
            output += '?' + relativeUri.query;
        }
        // Add anchor
        if (relativeUri.anchor) {
            output += '#' + relativeUri.anchor;
        }
        return output;
    };
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
    URI.prototype.toAbsolute = function (uri, noHost) {
        var absoluteUri = new URI(uri, { base_uri: this });
        return absoluteUri.getURI(noHost && this.isSameOrigin(absoluteUri));
    };
    /**
     * Determine whether the given URI has the same origin as this URI.  Based on RFC-6454.
     * Supports default ports for protocols listed in DEFAULT_PORTS.  Unsupported protocols will fail safe: they
     * won't match, if the port specifications differ.
     *
     * @method isSameOrigin
     * @param {tinymce.util.URI} uri Uri instance to compare.
     * @returns {Boolean} True if the origins are the same.
     */
    URI.prototype.isSameOrigin = function (uri) {
        // tslint:disable-next-line:triple-equals
        if (this.host == uri.host && this.protocol == uri.protocol) {
            // tslint:disable-next-line:triple-equals
            if (this.port == uri.port) {
                return true;
            }
            var defaultPort = DEFAULT_PORTS[this.protocol];
            // tslint:disable-next-line:triple-equals
            if (defaultPort && ((this.port || defaultPort) == (uri.port || defaultPort))) {
                return true;
            }
        }
        return false;
    };
    /**
     * Converts a absolute path into a relative path.
     *
     * @method toRelPath
     * @param {String} base Base point to convert the path from.
     * @param {String} path Absolute path to convert into a relative path.
     */
    URI.prototype.toRelPath = function (base, path) {
        var items, breakPoint = 0, out = '', i, l;
        // Split the paths
        var normalizedBase = base.substring(0, base.lastIndexOf('/')).split('/');
        items = path.split('/');
        if (normalizedBase.length >= items.length) {
            for (i = 0, l = normalizedBase.length; i < l; i++) {
                if (i >= items.length || normalizedBase[i] !== items[i]) {
                    breakPoint = i + 1;
                    break;
                }
            }
        }
        if (normalizedBase.length < items.length) {
            for (i = 0, l = items.length; i < l; i++) {
                if (i >= normalizedBase.length || normalizedBase[i] !== items[i]) {
                    breakPoint = i + 1;
                    break;
                }
            }
        }
        if (breakPoint === 1) {
            return path;
        }
        for (i = 0, l = normalizedBase.length - (breakPoint - 1); i < l; i++) {
            out += '../';
        }
        for (i = breakPoint - 1, l = items.length; i < l; i++) {
            if (i !== breakPoint - 1) {
                out += '/' + items[i];
            }
            else {
                out += items[i];
            }
        }
        return out;
    };
    /**
     * Converts a relative path into a absolute path.
     *
     * @method toAbsPath
     * @param {String} base Base point to convert the path from.
     * @param {String} path Relative path to convert into an absolute path.
     */
    URI.prototype.toAbsPath = function (base, path) {
        var i, nb = 0, o = [], tr, outPath;
        // Split paths
        tr = /\/$/.test(path) ? '/' : '';
        var normalizedBase = base.split('/');
        var normalizedPath = path.split('/');
        // Remove empty chunks
        each(normalizedBase, function (k) {
            if (k) {
                o.push(k);
            }
        });
        normalizedBase = o;
        // Merge relURLParts chunks
        for (i = normalizedPath.length - 1, o = []; i >= 0; i--) {
            // Ignore empty or .
            if (normalizedPath[i].length === 0 || normalizedPath[i] === '.') {
                continue;
            }
            // Is parent
            if (normalizedPath[i] === '..') {
                nb++;
                continue;
            }
            // Move up
            if (nb > 0) {
                nb--;
                continue;
            }
            o.push(normalizedPath[i]);
        }
        i = normalizedBase.length - nb;
        // If /a/b/c or /
        if (i <= 0) {
            outPath = o.reverse().join('/');
        }
        else {
            outPath = normalizedBase.slice(0, i).join('/') + '/' + o.reverse().join('/');
        }
        // Add front / if it's needed
        if (outPath.indexOf('/') !== 0) {
            outPath = '/' + outPath;
        }
        // Add trailing / if it's needed
        if (tr && outPath.lastIndexOf('/') !== outPath.length - 1) {
            outPath += tr;
        }
        return outPath;
    };
    /**
     * Returns the full URI of the internal structure.
     *
     * @method getURI
     * @param {Boolean} noProtoHost Optional no host and protocol part. Defaults to false.
     */
    URI.prototype.getURI = function (noProtoHost) {
        if (noProtoHost === void 0) { noProtoHost = false; }
        var s;
        // Rebuild source
        if (!this.source || noProtoHost) {
            s = '';
            if (!noProtoHost) {
                if (this.protocol) {
                    s += this.protocol + '://';
                }
                else {
                    s += '//';
                }
                if (this.userInfo) {
                    s += this.userInfo + '@';
                }
                if (this.host) {
                    s += this.host;
                }
                if (this.port) {
                    s += ':' + this.port;
                }
            }
            if (this.path) {
                s += this.path;
            }
            if (this.query) {
                s += '?' + this.query;
            }
            if (this.anchor) {
                s += '#' + this.anchor;
            }
            this.source = s;
        }
        return this.source;
    };
    return URI;
}());
export default URI;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVVJJLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHBvbHB3YXJlL3RpbnltY2UtdXRpbC8iLCJzb3VyY2VzIjpbImxpYi9hcGkvdXRpbC9VUkkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7O0dBS0c7QUFFSCxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDOUMsT0FBTyxLQUFLLE1BQU0sU0FBUyxDQUFDO0FBRTVCOzs7R0FHRztBQUVILElBQU0sSUFBSSxHQUFHLEtBQUssQ0FBQyxJQUFJLEVBQUUsSUFBSSxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUM7QUFDM0MsSUFBTSxVQUFVLEdBQUcsc0dBQXNHLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQ3JJLElBQU0sYUFBYSxHQUFHO0lBQ3BCLEdBQUcsRUFBRSxFQUFFO0lBQ1AsSUFBSSxFQUFFLEVBQUU7SUFDUixLQUFLLEVBQUUsR0FBRztJQUNWLE1BQU0sRUFBRSxFQUFFO0NBQ1gsQ0FBQztBQWVGO0lBdURFOzs7Ozs7O09BT0c7SUFDSCxhQUFZLEdBQVcsRUFBRSxRQUFzQjtRQUM3QyxHQUFHLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ2hCLElBQUksQ0FBQyxRQUFRLEdBQUcsUUFBUSxJQUFJLEVBQUUsQ0FBQztRQUMvQixJQUFNLE9BQU8sR0FBUSxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQztRQUM1QyxJQUFNLElBQUksR0FBRyxJQUFJLENBQUM7UUFFbEIsNkRBQTZEO1FBQzdELHFDQUFxQztRQUNyQyxJQUFJLHdCQUF3QixDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxPQUFPLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFO1lBQzNELElBQUksQ0FBQyxNQUFNLEdBQUcsR0FBRyxDQUFDO1lBQ2xCLE9BQU87U0FDUjtRQUVELElBQU0sa0JBQWtCLEdBQUcsR0FBRyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMs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RUFBRTtvQkFDakIsQ0FBQyxJQUFJLElBQUksQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFDO2lCQUM1QjtxQkFBTTtvQkFDTCxDQUFDLElBQUksSUFBSSxDQUFDO2lCQUNYO2dCQUVELElBQUksSUFBSSxDQUFDLFFBQVEsRUFBRTtvQkFDakIsQ0FBQyxJQUFJLElBQUksQ0FBQyxRQUFRLEdBQUcsR0FBRyxDQUFDO2lCQUMxQjtnQkFFRCxJQUFJLElBQUksQ0FBQyxJQUFJLEVBQUU7b0JBQ2IsQ0FBQyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUM7aUJBQ2hCO2dCQUVELElBQUksSUFBSSxDQUFDLElBQUksRUFBRTtvQkFDYixDQUFDLElBQUksR0FBRyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUM7aUJBQ3RCO2FBQ0Y7WUFFRCxJQUFJLElBQUksQ0FBQyxJQUFJLEVBQUU7Z0JBQ2IsQ0FBQyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUM7YUFDaEI7WUFFRCxJQUFJLElBQUksQ0FBQyxLQUFLLEVBQUU7Z0JBQ2QsQ0FBQyxJQUFJLEdBQUcsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDO2FBQ3ZCO1lBRUQsSUFBSSxJQUFJLENBQUMsTUFBTSxFQUFFO2dCQUNmLENBQUMsSUFBSSxHQUFHLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQzthQUN4QjtZQUVELElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO1NBQ2pCO1FBRUQsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDO0lBQ3JCLENBQUM7SUFDSCxVQUFDO0FBQUQsQ0FBQyxBQS9aRCxJQStaQztBQUVELGVBQWUsR0FBRyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIFRpbnkgVGVjaG5vbG9naWVzLCBJbmMuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgTEdQTCBvciBhIGNvbW1lcmNpYWwgbGljZW5zZS5cbiAqIEZvciBMR1BMIHNlZSBMaWNlbnNlLnR4dCBpbiB0aGUgcHJvamVjdCByb290IGZvciBsaWNlbnNlIGluZm9ybWF0aW9uLlxuICogRm9yIGNvbW1lcmNpYWwgbGljZW5zZXMgc2VlIGh0dHBzOi8vd3d3LnRpbnkuY2xvdWQvXG4gKi9cblxuaW1wb3J0IHsgZG9jdW1lbnQgfSBmcm9tICdAZXBob3gvZG9tLWdsb2JhbHMnO1xuaW1wb3J0IFRvb2xzIGZyb20gJy4vVG9vbHMnO1xuXG4vKipcbiAqIFRoaXMgY2xhc3MgaGFuZGxlcyBwYXJzaW5nLCBtb2RpZmljYXRpb24gYW5kIHNlcmlhbGl6YXRpb24gb2YgVVJJL1VSTCBzdHJpbmdzLlxuICogQGNsYXNzIHRpbnltY2UudXRpbC5VUklcbiAqL1xuXG5jb25zdCBlYWNoID0gVG9vbHMuZWFjaCwgdHJpbSA9IFRvb2xzLnRyaW07XG5jb25zdCBxdWVyeVBhcnRzID0gJ3NvdXJjZSBwcm90b2NvbCBhdXRob3JpdHkgdXNlckluZm8gdXNlciBwYXNzd29yZCBob3N0IHBvcnQgcmVsYXRpdmUgcGF0aCBkaXJlY3RvcnkgZmlsZSBxdWVyeSBhbmNob3InLnNwbGl0KCcgJyk7XG5jb25zdCBERUZBVUxUX1BPUlRTID0ge1xuICBmdHA6IDIxLFxuICBodHRwOiA4MCxcbiAgaHR0cHM6IDQ0MyxcbiAgbWFpbHRvOiAyNVxufTtcblxuZXhwb3J0IGludGVyZmFjZSBVUklTZXR0aW5ncyB7XG4gIGJhc2VfdXJpPzogVVJJO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFVSSUNvbnN0cnVjdG9yIHtcbiAgcmVhZG9ubHkgcHJvdG90eXBlOiBVUkk7XG5cbiAgbmV3ICh1cmw6IHN0cmluZywgc2V0dGluZ3M/OiBVUklTZXR0aW5ncyk6IFVSSTtcblxuICBnZXREb2N1bWVudEJhc2VVcmwgKGxvYzogeyBwcm90b2NvbDogc3RyaW5nOyBob3N0Pzogc3RyaW5nOyBocmVmPzogc3RyaW5nOyBwYXRobmFtZT86IHN0cmluZyB9KTogc3RyaW5nO1xuICBwYXJzZURhdGFVcmkgKHVyaTogc3RyaW5nKTogeyB0eXBlOiBzdHJpbmc7IGRhdGE6IHN0cmluZyB9O1xufVxuXG5jbGFzcyBVUkkge1xuXG4gIHB1YmxpYyBzdGF0aWMgcGFyc2VEYXRhVXJpICh1cmk6IHN0cmluZyk6IHsgdHlwZTogc3RyaW5nOyBkYXRhOiBzdHJpbmd9IHtcbiAgICBsZXQgdHlwZTtcblxuICAgIGNvbnN0IHVyaUNvbXBvbmVudHMgPSBkZWNvZGVVUklDb21wb25lbnQodXJpKS5zcGxpdCgnLCcpO1xuXG4gICAgY29uc3QgbWF0Y2hlcyA9IC9kYXRhOihbXjtdKykvLmV4ZWModXJpQ29tcG9uZW50c1swXSk7XG4gICAgaWYgKG1hdGNoZXMpIHtcbiAgICAgIHR5cGUgPSBtYXRjaGVzWzFdO1xuICAgIH1cblxuICAgIHJldHVybiB7XG4gICAgICB0eXBlLFxuICAgICAgZGF0YTogdXJpQ29tcG9uZW50c1sxXVxuICAgIH07XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIGdldERvY3VtZW50QmFzZVVybCAobG9jOiB7IHByb3RvY29sOiBzdHJpbmc7IGhvc3Q/OiBzdHJpbmc7IGhyZWY/OiBzdHJpbmc7IHBhdGhuYW1lPzogc3RyaW5nIH0pOiBzdHJpbmcge1xuICAgIGxldCBiYXNlVXJsO1xuXG4gICAgLy8gUGFzcyBhcHBsZXdlYmRhdGE6Ly8gYW5kIG90aGVyIG5vbiB3ZWIgcHJvdG9jb2xzIHRob3VnaFxuICAgIGlmIChsb2MucHJvdG9jb2wuaW5kZXhPZignaHR0cCcpICE9PSAwICYmIGxvYy5wcm90b2NvbCAhPT0gJ2ZpbGU6Jykge1xuICAgICAgYmFzZVVybCA9IGxvYy5ocmVmO1xuICAgIH0gZWxzZSB7XG4gICAgICBiYXNlVXJsID0gbG9jLnByb3RvY29sICsgJy8vJyArIGxvYy5ob3N0ICsgbG9jLnBhdGhuYW1lO1xuICAgIH1cblxuICAgIGlmICgvXlteOl0rOlxcL1xcL1xcLz9bXlxcL10rXFwvLy50ZXN0KGJhc2VVcmwpKSB7XG4gICAgICBiYXNlVXJsID0gYmFzZVVybC5yZXBsYWNlKC9bXFw/I10uKiQvLCAnJykucmVwbGFjZSgvW1xcL1xcXFxdW15cXC9dKyQvLCAnJyk7XG5cbiAgICAgIGlmICghL1tcXC9cXFxcXSQvLnRlc3QoYmFzZVVybCkpIHtcbiAgICAgICAgYmFzZVVybCArPSAnLyc7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGJhc2VVcmw7XG4gIH1cblxuICBwdWJsaWMgc291cmNlOiBzdHJpbmc7XG4gIHB1YmxpYyBwcm90b2NvbDogc3RyaW5nO1xuICBwdWJsaWMgYXV0aG9yaXR5OiBzdHJpbmc7XG4gIHB1YmxpYyB1c2VySW5mbzogc3RyaW5nO1xuICBwdWJsaWMgdXNlcjogc3RyaW5nO1xuICBwdWJsaWMgcGFzc3dvcmQ6IHN0cmluZztcbiAgcHVibGljIGhvc3Q6IHN0cmluZztcbiAgcHVibGljIHBvcnQ6IHN0cmluZztcbiAgcHVibGljIHJlbGF0aXZlOiBzdHJpbmc7XG4gIHB1YmxpYyBwYXRoOiBzdHJpbmc7XG4gIHB1YmxpYyBkaXJlY3Rvcnk6IHN0cmluZztcbiAgcHVibGljIGZpbGU6IHN0cmluZztcbiAgcHVibGljIHF1ZXJ5OiBzdHJpbmc7XG4gIHB1YmxpYyBhbmNob3I6IHN0cmluZztcbiAgcHVibGljIHNldHRpbmdzOiBVUklTZXR0aW5ncztcblxuICAvKipcbiAgICogQ29uc3RydWN0cyBhIG5ldyBVUkkgaW5zdGFuY2UuXG4gICAqXG4gICAqIEBjb25zdHJ1Y3RvclxuICAgKiBAbWV0aG9kIFVSSVxuICAgKiBAcGFyYW0ge1N0cmluZ30gdXJsIFVSSSBzdHJpbmcgdG8gcGFyc2UuXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBzZXR0aW5ncyBPcHRpb25hbCBzZXR0aW5ncyBvYmplY3QuXG4gICAqL1xuICBjb25zdHJ1Y3Rvcih1cmw6IHN0cmluZywgc2V0dGluZ3M/OiBVUklTZXR0aW5ncykge1xuICAgIHVybCA9IHRyaW0odXJsKTtcbiAgICB0aGlzLnNldHRpbmdzID0gc2V0dGluZ3MgfHwge307XG4gICAgY29uc3QgYmFzZVVyaTogVVJJID0gdGhpcy5zZXR0aW5ncy5iYXNlX3VyaTtcbiAgICBjb25zdCBzZWxmID0gdGhpcztcblxuICAgIC8vIFN0cmFuZ2UgYXBwIHByb3RvY29sIHRoYXQgaXNuJ3QgaHR0cC9odHRwcyBvciBsb2NhbCBhbmNob3JcbiAgICAvLyBGb3IgZXhhbXBsZTogbWFpbHRvLHNreXBlLHRlbCBldGMuXG4gICAgaWYgKC9eKFtcXHdcXC1dKyk6KFteXFwvXXsyfSkvaS50ZXN0KHVybCkgfHwgL15cXHMqIy8udGVzdCh1cmwpKSB7XG4gICAgICBzZWxmLnNvdXJjZSA9IHVybDtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCBpc1Byb3RvY29sUmVsYXRpdmUgPSB1cmwuaW5kZXhPZignLy8nKSA9PT0gMDtcblxuICAgIC8vIEFic29sdXRlIHBhdGggd2l0aCBubyBob3N0LCBmYWtlIGhvc3QgYW5kIHByb3RvY29sXG4gICAgaWYgKHVybC5pbmRleE9mKCcvJykgPT09IDAgJiYgIWlzUHJvdG9jb2xSZWxhdGl2ZSkge1xuICAgICAgdXJsID0gKGJhc2VVcmkgPyBiYXNlVXJpLnByb3RvY29sIHx8ICdodHRwJyA6ICdodHRwJykgKyAnOi8vbWNlX2hvc3QnICsgdXJsO1xuICAgIH1cblxuICAgIC8vIFJlbGF0aXZlIHBhdGggaHR0cDovLyBvciBwcm90b2NvbCByZWxhdGl2ZSAvL3BhdGhcbiAgICBpZiAoIS9eW1xcd1xcLV0qOj9cXC9cXC8vLnRlc3QodXJsKSkge1xuICAgICAgY29uc3QgYmFzZVVybCA9IHRoaXMuc2V0dGluZ3MuYmFzZV91cmkgPyB0aGlzLnNldHRpbmdzLmJhc2VfdXJpLnBhdGggOiBuZXcgVVJJKGRvY3VtZW50LmxvY2F0aW9uLmhyZWYpLmRpcmVjdG9yeTtcbiAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTp0cmlwbGUtZXF1YWxzXG4gICAgICBpZiAodGhpcy5zZXR0aW5ncy5iYXNlX3VyaSAmJiB0aGlzLnNldHRpbmdzLmJhc2VfdXJpLnByb3RvY29sID09ICcnKSB7XG4gICAgICAgIHVybCA9ICcvL21jZV9ob3N0JyArIHNlbGYudG9BYnNQYXRoKGJhc2VVcmwsIHVybCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zdCBtYXRjaCA9IC8oW14jP10qKShbIz9dPy4qKS8uZXhlYyh1cmwpO1xuICAgICAgICB1cmwgPSAoKGJhc2VVcmkgJiYgYmFzZVVyaS5wcm90b2NvbCkgfHwgJ2h0dHAnKSArICc6Ly9tY2VfaG9zdCcgKyBzZWxmLnRvQWJzUGF0aChiYXNlVXJsLCBtYXRjaFsxXSkgKyBtYXRjaFsyXTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBQYXJzZSBVUkwgKENyZWRpdHMgZ29lcyB0byBTdGVhdmUsIGh0dHA6Ly9ibG9nLnN0ZXZlbmxldml0aGFuLmNvbS9hcmNoaXZlcy9wYXJzZXVyaSlcbiAgICB1cmwgPSB1cmwucmVwbGFjZSgvQEAvZywgJyhtY2VfYXQpJyk7IC8vIFpvcGUgMyB3b3JrYXJvdW5kLCB0aGV5IHVzZSBAQHNvbWV0aGluZ1xuXG4gICAgY29uc3QgdXJsTWF0Y2ggPSAvXig/Oig/IVteOkBdKzpbXjpAXFwvXSpAKShbXjpcXC8/Iy5dKyk6KT8oPzpcXC9cXC8pPygoPzooKFteOkBcXC9dKik6PyhbXjpAXFwvXSopKT9AKT8oW146XFwvPyNdKikoPzo6KFxcZCopKT8pKCgoXFwvKD86W14/I10oPyFbXj8jXFwvXSpcXC5bXj8jXFwvLl0rKD86Wz8jXXwkKSkpKlxcLz8pPyhbXj8jXFwvXSopKSg/OlxcPyhbXiNdKikpPyg/OiMoLiopKT8pLy5leGVjKHVybCk7XG5cbiAgICBlYWNoKHF1ZXJ5UGFydHMsICh2LCBpKSA9PiB7XG4gICAgICBsZXQgcGFydCA9IHVybE1hdGNoW2ldO1xuXG4gICAgICAvLyBab3BlIDMgd29ya2Fyb3VuZCwgdGhleSB1c2UgQEBzb21ldGhpbmdcbiAgICAgIGlmIChwYXJ0KSB7XG4gICAgICAgIHBhcnQgPSBwYXJ0LnJlcGxhY2UoL1xcKG1jZV9hdFxcKS9nLCAnQEAnKTtcbiAgICAgIH1cblxuICAgICAgc2VsZlt2XSA9IHBhcnQ7XG4gICAgfSk7XG5cbiAgICBpZiAoYmFzZVVyaSkge1xuICAgICAgaWYgKCFzZWxmLnByb3RvY29sKSB7XG4gICAgICAgIHNlbGYucHJvdG9jb2wgPSBiYXNlVXJpLnByb3RvY29sO1xuICAgICAgfVxuXG4gICAgICBpZiAoIXNlbGYudXNlckluZm8pIHtcbiAgICAgICAgc2VsZi51c2VySW5mbyA9IGJhc2VVcmkudXNlckluZm87XG4gICAgICB9XG5cbiAgICAgIGlmICghc2VsZi5wb3J0ICYmIHNlbGYuaG9zdCA9PT0gJ21jZV9ob3N0Jykge1xuICAgICAgICBzZWxmLnBvcnQgPSBiYXNlVXJpLnBvcnQ7XG4gICAgICB9XG5cbiAgICAgIGlmICghc2VsZi5ob3N0IHx8IHNlbGYuaG9zdCA9PT0gJ21jZV9ob3N0Jykge1xuICAgICAgICBzZWxmLmhvc3QgPSBiYXNlVXJpLmhvc3Q7XG4gICAgICB9XG5cbiAgICAgIHNlbGYuc291cmNlID0gJyc7XG4gICAgfVxuXG4gICAgaWYgKGlzUHJvdG9jb2xSZWxhdGl2ZSkge1xuICAgICAgc2VsZi5wcm90b2NvbCA9ICcnO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBTZXRzIHRoZSBpbnRlcm5hbCBwYXRoIHBhcnQgb2YgdGhlIFVSSS5cbiAgICpcbiAgICogQG1ldGhvZCBzZXRQYXRoXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBwYXRoIFBhdGggc3RyaW5nIHRvIHNldC5cbiAgICovXG4gIHB1YmxpYyBzZXRQYXRoIChwYXRoOiBzdHJpbmcpIHtcbiAgICBjb25zdCBwYXRoTWF0Y2ggPSAvXiguKj8pXFwvPyhcXHcrKT8kLy5leGVjKHBhdGgpO1xuXG4gICAgLy8gVXBkYXRlIHBhdGggcGFydHNcbiAgICB0aGlzLnBhdGggPSBwYXRoTWF0Y2hbMF07XG4gICAgdGhpcy5kaXJlY3RvcnkgPSBwYXRoTWF0Y2hbMV07XG4gICAgdGhpcy5maWxlID0gcGF0aE1hdGNoWzJdO1xuXG4gICAgLy8gUmVidWlsZCBzb3VyY2VcbiAgICB0aGlzLnNvdXJjZSA9ICcnO1xuICAgIHRoaXMuZ2V0VVJJKCk7XG4gIH1cblxuICAvKipcbiAgICogQ29udmVydHMgdGhlIHNwZWNpZmllZCBVUkkgaW50byBhIHJlbGF0aXZlIFVSSSBiYXNlZCBvbiB0aGUgY3VycmVudCBVUkkgaW5zdGFuY2UgbG9jYXRpb24uXG4gICAqXG4gICAqIEBtZXRob2QgdG9SZWxhdGl2ZVxuICAgKiBAcGFyYW0ge1N0cmluZ30gdXJpIFVSSSB0byBjb252ZXJ0IGludG8gYSByZWxhdGl2ZSBwYXRoL1VSSS5cbiAgICogQHJldHVybiB7U3RyaW5nfSBSZWxhdGl2ZSBVUkkgZnJvbSB0aGUgcG9pbnQgc3BlY2lmaWVkIGluIHRoZSBjdXJyZW50IFVSSSBpbnN0YW5jZS5cbiAgICogQGV4YW1wbGVcbiAgICogLy8gQ29udmVydHMgYW4gYWJzb2x1dGUgVVJMIHRvIGFuIHJlbGF0aXZlIFVSTCB1cmwgd2lsbCBiZSBzb21lZGlyL3NvbWVmaWxlLmh0bVxuICAgKiB2YXIgdXJsID0gbmV3IHRpbnltY2UudXRpbC5VUkkoJ2h0dHA6Ly93d3cuc2l0ZS5jb20vZGlyLycpLnRvUmVsYXRpdmUoJ2h0dHA6Ly93d3cuc2l0ZS5jb20vZGlyL3NvbWVkaXIvc29tZWZpbGUuaHRtJyk7XG4gICAqL1xuICBwdWJsaWMgdG9SZWxhdGl2ZSAodXJpOiBzdHJpbmcpOiBzdHJpbmcge1xuICAgIGxldCBvdXRwdXQ7XG5cbiAgICBpZiAodXJpID09PSAnLi8nKSB7XG4gICAgICByZXR1cm4gdXJpO1xuICAgIH1cblxuICAgIGNvbnN0IHJlbGF0aXZlVXJpID0gbmV3IFVSSSh1cmksIHsgYmFzZV91cmk6IHRoaXMgfSk7XG5cbiAgICAvLyBOb3Qgb24gc2FtZSBkb21haW4vcG9ydCBvciBwcm90b2NvbFxuICAgIGlmICgocmVsYXRpdmVVcmkuaG9zdCAhPT0gJ21jZV9ob3N0JyAmJiB0aGlzLmhvc3QgIT09IHJlbGF0aXZlVXJpLmhvc3QgJiYgcmVsYXRpdmVVcmkuaG9zdCkgfHwgdGhpcy5wb3J0ICE9PSByZWxhdGl2ZVVyaS5wb3J0IHx8XG4gICAgICAodGhpcy5wcm90b2NvbCAhPT0gcmVsYXRpdmVVcmkucHJvdG9jb2wgJiYgcmVsYXRpdmVVcmkucHJvdG9jb2wgIT09ICcnKSkge1xuICAgICAgcmV0dXJuIHJlbGF0aXZlVXJpLmdldFVSSSgpO1xuICAgIH1cblxuICAgIGNvbnN0IHR1ID0gdGhpcy5nZXRVUkkoKSwgdXUgPSByZWxhdGl2ZVVyaS5nZXRVUkkoKTtcblxuICAgIC8vIEFsbG93IHVzYWdlIG9mIHRoZSBiYXNlX3VyaSB3aGVuIHJlbGF0aXZlX3VybHMgPSB0cnVlXG4gICAgaWYgKHR1ID09PSB1dSB8fCAodHUuY2hhckF0KHR1Lmxlbmd0aCAtIDEpID09PSAnLycgJiYgdHUuc3Vic3RyKDAsIHR1Lmxlbmd0aCAtIDEpID09PSB1dSkpIHtcbiAgICAgIHJldHVybiB0dTtcbiAgICB9XG5cbiAgICBvdXRwdXQgPSB0aGlzLnRvUmVsUGF0aCh0aGlzLnBhdGgsIHJlbGF0aXZlVXJpLnBhdGgpO1xuXG4gICAgLy8gQWRkIHF1ZXJ5XG4gICAgaWYgKHJlbGF0aXZlVXJpLnF1ZXJ5KSB7XG4gICAgICBvdXRwdXQgKz0gJz8nICsgcmVsYXRpdmVVcmkucXVlcnk7XG4gICAgfVxuXG4gICAgLy8gQWRkIGFuY2hvclxuICAgIGlmIChyZWxhdGl2ZVVyaS5hbmNob3IpIHtcbiAgICAgIG91dHB1dCArPSAnIycgKyByZWxhdGl2ZVVyaS5hbmNob3I7XG4gICAgfVxuXG4gICAgcmV0dXJuIG91dHB1dDtcbiAgfVxuXG4gIC8qKlxuICAgKiBDb252ZXJ0cyB0aGUgc3BlY2lmaWVkIFVSSSBpbnRvIGEgYWJzb2x1dGUgVVJJIGJhc2VkIG9uIHRoZSBjdXJyZW50IFVSSSBpbnN0YW5jZSBsb2NhdGlvbi5cbiAgICpcbiAgICogQG1ldGhvZCB0b0Fic29sdXRlXG4gICAqIEBwYXJhbSB7U3RyaW5nfSB1cmkgVVJJIHRvIGNvbnZlcnQgaW50byBhIHJlbGF0aXZlIHBhdGgvVVJJLlxuICAgKiBAcGFyYW0ge0Jvb2xlYW59IG5vSG9zdCBObyBob3N0IGFuZCBwcm90b2NvbCBwcmVmaXguXG4gICAqIEByZXR1cm4ge1N0cmluZ30gQWJzb2x1dGUgVVJJIGZyb20gdGhlIHBvaW50IHNwZWNpZmllZCBpbiB0aGUgY3VycmVudCBVUkkgaW5zdGFuY2UuXG4gICAqIEBleGFtcGxlXG4gICAqIC8vIENvbnZlcnRzIGFuIHJlbGF0aXZlIFVSTCB0byBhbiBhYnNvbHV0ZSBVUkwgdXJsIHdpbGwgYmUgaHR0cDovL3d3dy5zaXRlLmNvbS9kaXIvc29tZWRpci9zb21lZmlsZS5odG1cbiAgICogdmFyIHVybCA9IG5ldyB0aW55bWNlLnV0aWwuVVJJKCdodHRwOi8vd3d3LnNpdGUuY29tL2Rpci8nKS50b0Fic29sdXRlKCdzb21lZGlyL3NvbWVmaWxlLmh0bScpO1xuICAgKi9cbiAgcHVibGljIHRvQWJzb2x1dGUgKHVyaTogc3RyaW5nLCBub0hvc3Q/OiBib29sZWFuKTogc3RyaW5nIHtcbiAgICBjb25zdCBhYnNvbHV0ZVVyaSA9IG5ldyBVUkkodXJpLCB7IGJhc2VfdXJpOiB0aGlzIH0pO1xuXG4gICAgcmV0dXJuIGFic29sdXRlVXJpLmdldFVSSShub0hvc3QgJiYgdGhpcy5pc1NhbWVPcmlnaW4oYWJzb2x1dGVVcmkpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBEZXRlcm1pbmUgd2hldGhlciB0aGUgZ2l2ZW4gVVJJIGhhcyB0aGUgc2FtZSBvcmlnaW4gYXMgdGhpcyBVUkkuICBCYXNlZCBvbiBSRkMtNjQ1NC5cbiAgICogU3VwcG9ydHMgZGVmYXVsdCBwb3J0cyBmb3IgcHJvdG9jb2xzIGxpc3RlZCBpbiBERUZBVUxUX1BPUlRTLiAgVW5zdXBwb3J0ZWQgcHJvdG9jb2xzIHdpbGwgZmFpbCBzYWZlOiB0aGV5XG4gICAqIHdvbid0IG1hdGNoLCBpZiB0aGUgcG9ydCBzcGVjaWZpY2F0aW9ucyBkaWZmZXIuXG4gICAqXG4gICAqIEBtZXRob2QgaXNTYW1lT3JpZ2luXG4gICAqIEBwYXJhbSB7dGlueW1jZS51dGlsLlVSSX0gdXJpIFVyaSBpbnN0YW5jZSB0byBjb21wYXJlLlxuICAgKiBAcmV0dXJucyB7Qm9vbGVhbn0gVHJ1ZSBpZiB0aGUgb3JpZ2lucyBhcmUgdGhlIHNhbWUuXG4gICAqL1xuICBwdWJsaWMgaXNTYW1lT3JpZ2luICh1cmk6IFVSSSk6IGJvb2xlYW4ge1xuICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTp0cmlwbGUtZXF1YWxzXG4gICAgaWYgKHRoaXMuaG9zdCA9PSB1cmkuaG9zdCAmJiB0aGlzLnByb3RvY29sID09IHVyaS5wcm90b2NvbCkge1xuICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOnRyaXBsZS1lcXVhbHNcbiAgICAgIGlmICh0aGlzLnBvcnQgPT0gdXJpLnBvcnQpIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGRlZmF1bHRQb3J0ID0gREVGQVVMVF9QT1JUU1t0aGlzLnByb3RvY29sXTtcbiAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTp0cmlwbGUtZXF1YWxzXG4gICAgICBpZiAoZGVmYXVsdFBvcnQgJiYgKCh0aGlzLnBvcnQgfHwgZGVmYXVsdFBvcnQpID09ICh1cmkucG9ydCB8fCBkZWZhdWx0UG9ydCkpKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDb252ZXJ0cyBhIGFic29sdXRlIHBhdGggaW50byBhIHJlbGF0aXZlIHBhdGguXG4gICAqXG4gICAqIEBtZXRob2QgdG9SZWxQYXRoXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBiYXNlIEJhc2UgcG9pbnQgdG8gY29udmVydCB0aGUgcGF0aCBmcm9tLlxuICAgKiBAcGFyYW0ge1N0cmluZ30gcGF0aCBBYnNvbHV0ZSBwYXRoIHRvIGNvbnZlcnQgaW50byBhIHJlbGF0aXZlIHBhdGguXG4gICAqL1xuICBwdWJsaWMgdG9SZWxQYXRoIChiYXNlOiBzdHJpbmcsIHBhdGg6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgbGV0IGl0ZW1zLCBicmVha1BvaW50ID0gMCwgb3V0ID0gJycsIGksIGw7XG5cbiAgICAvLyBTcGxpdCB0aGUgcGF0aHNcbiAgICBjb25zdCBub3JtYWxpemVkQmFzZSA9IGJhc2Uuc3Vic3RyaW5nKDAsIGJhc2UubGFzdEluZGV4T2YoJy8nKSkuc3BsaXQoJy8nKTtcbiAgICBpdGVtcyA9IHBhdGguc3BsaXQoJy8nKTtcblxuICAgIGlmIChub3JtYWxpemVkQmFzZS5sZW5ndGggPj0gaXRlbXMubGVuZ3RoKSB7XG4gICAgICBmb3IgKGkgPSAwLCBsID0gbm9ybWFsaXplZEJhc2UubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgICAgIGlmIChpID49IGl0ZW1zLmxlbmd0aCB8fCBub3JtYWxpemVkQmFzZVtpXSAhPT0gaXRlbXNbaV0pIHtcbiAgICAgICAgICBicmVha1BvaW50ID0gaSArIDE7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAobm9ybWFsaXplZEJhc2UubGVuZ3RoIDwgaXRlbXMubGVuZ3RoKSB7XG4gICAgICBmb3IgKGkgPSAwLCBsID0gaXRlbXMubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgICAgIGlmIChpID49IG5vcm1hbGl6ZWRCYXNlLmxlbmd0aCB8fCBub3JtYWxpemVkQmFzZVtpXSAhPT0gaXRlbXNbaV0pIHtcbiAgICAgICAgICBicmVha1BvaW50ID0gaSArIDE7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoYnJlYWtQb2ludCA9PT0gMSkge1xuICAgICAgcmV0dXJuIHBhdGg7XG4gICAgfVxuXG4gICAgZm9yIChpID0gMCwgbCA9IG5vcm1hbGl6ZWRCYXNlLmxlbmd0aCAtIChicmVha1BvaW50IC0gMSk7IGkgPCBsOyBpKyspIHtcbiAgICAgIG91dCArPSAnLi4vJztcbiAgICB9XG5cbiAgICBmb3IgKGkgPSBicmVha1BvaW50IC0gMSwgbCA9IGl0ZW1zLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgICAgaWYgKGkgIT09IGJyZWFrUG9pbnQgLSAxKSB7XG4gICAgICAgIG91dCArPSAnLycgKyBpdGVtc1tpXTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIG91dCArPSBpdGVtc1tpXTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gb3V0O1xuICB9XG5cbiAgLyoqXG4gICAqIENvbnZlcnRzIGEgcmVsYXRpdmUgcGF0aCBpbnRvIGEgYWJzb2x1dGUgcGF0aC5cbiAgICpcbiAgICogQG1ldGhvZCB0b0Fic1BhdGhcbiAgICogQHBhcmFtIHtTdHJpbmd9IGJhc2UgQmFzZSBwb2ludCB0byBjb252ZXJ0IHRoZSBwYXRoIGZyb20uXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBwYXRoIFJlbGF0aXZlIHBhdGggdG8gY29udmVydCBpbnRvIGFuIGFic29sdXRlIHBhdGguXG4gICAqL1xuICBwdWJsaWMgdG9BYnNQYXRoIChiYXNlOiBzdHJpbmcsIHBhdGg6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgbGV0IGksIG5iID0gMCwgbyA9IFtdLCB0ciwgb3V0UGF0aDtcblxuICAgIC8vIFNwbGl0IHBhdGhzXG4gICAgdHIgPSAvXFwvJC8udGVzdChwYXRoKSA/ICcvJyA6ICcnO1xuICAgIGxldCBub3JtYWxpemVkQmFzZSA9IGJhc2Uuc3BsaXQoJy8nKTtcbiAgICBjb25zdCBub3JtYWxpemVkUGF0aCA9IHBhdGguc3BsaXQoJy8nKTtcblxuICAgIC8vIFJlbW92ZSBlbXB0eSBjaHVua3NcbiAgICBlYWNoKG5vcm1hbGl6ZWRCYXNlLCBmdW5jdGlvbiAoaykge1xuICAgICAgaWYgKGspIHtcbiAgICAgICAgby5wdXNoKGspO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgbm9ybWFsaXplZEJhc2UgPSBvO1xuXG4gICAgLy8gTWVyZ2UgcmVsVVJMUGFydHMgY2h1bmtzXG4gICAgZm9yIChpID0gbm9ybWFsaXplZFBhdGgubGVuZ3RoIC0gMSwgbyA9IFtdOyBpID49IDA7IGktLSkge1xuICAgICAgLy8gSWdub3JlIGVtcHR5IG9yIC5cbiAgICAgIGlmIChub3JtYWxpemVkUGF0aFtpXS5sZW5ndGggPT09IDAgfHwgbm9ybWFsaXplZFBhdGhbaV0gPT09ICcuJykge1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cblxuICAgICAgLy8gSXMgcGFyZW50XG4gICAgICBpZiAobm9ybWFsaXplZFBhdGhbaV0gPT09ICcuLicpIHtcbiAgICAgICAgbmIrKztcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG5cbiAgICAgIC8vIE1vdmUgdXBcbiAgICAgIGlmIChuYiA+IDApIHtcbiAgICAgICAgbmItLTtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG5cbiAgICAgIG8ucHVzaChub3JtYWxpemVkUGF0aFtpXSk7XG4gICAgfVxuXG4gICAgaSA9IG5vcm1hbGl6ZWRCYXNlLmxlbmd0aCAtIG5iO1xuXG4gICAgLy8gSWYgL2EvYi9jIG9yIC9cbiAgICBpZiAoaSA8PSAwKSB7XG4gICAgICBvdXRQYXRoID0gby5yZXZlcnNlKCkuam9pbignLycpO1xuICAgIH0gZWxzZSB7XG4gICAgICBvdXRQYXRoID0gbm9ybWFsaXplZEJhc2Uuc2xpY2UoMCwgaSkuam9pbignLycpICsgJy8nICsgby5yZXZlcnNlKCkuam9pbignLycpO1xuICAgIH1cblxuICAgIC8vIEFkZCBmcm9udCAvIGlmIGl0J3MgbmVlZGVkXG4gICAgaWYgKG91dFBhdGguaW5kZXhPZignLycpICE9PSAwKSB7XG4gICAgICBvdXRQYXRoID0gJy8nICsgb3V0UGF0aDtcbiAgICB9XG5cbiAgICAvLyBBZGQgdHJhaWxpbmcgLyBpZiBpdCdzIG5lZWRlZFxuICAgIGlmICh0ciAmJiBvdXRQYXRoLmxhc3RJbmRleE9mKCcvJykgIT09IG91dFBhdGgubGVuZ3RoIC0gMSkge1xuICAgICAgb3V0UGF0aCArPSB0cjtcbiAgICB9XG5cbiAgICByZXR1cm4gb3V0UGF0aDtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSBmdWxsIFVSSSBvZiB0aGUgaW50ZXJuYWwgc3RydWN0dXJlLlxuICAgKlxuICAgKiBAbWV0aG9kIGdldFVSSVxuICAgKiBAcGFyYW0ge0Jvb2xlYW59IG5vUHJvdG9Ib3N0IE9wdGlvbmFsIG5vIGhvc3QgYW5kIHByb3RvY29sIHBhcnQuIERlZmF1bHRzIHRvIGZhbHNlLlxuICAgKi9cbiAgcHVibGljIGdldFVSSSAobm9Qcm90b0hvc3Q6IGJvb2xlYW4gPSBmYWxzZSk6IHN0cmluZyB7XG4gICAgbGV0IHM7XG5cbiAgICAvLyBSZWJ1aWxkIHNvdXJjZVxuICAgIGlmICghdGhpcy5zb3VyY2UgfHwgbm9Qcm90b0hvc3QpIHtcbiAgICAgIHMgPSAnJztcblxuICAgICAgaWYgKCFub1Byb3RvSG9zdCkge1xuICAgICAgICBpZiAodGhpcy5wcm90b2NvbCkge1xuICAgICAgICAgIHMgKz0gdGhpcy5wcm90b2NvbCArICc6Ly8nO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHMgKz0gJy8vJztcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLnVzZXJJbmZvKSB7XG4gICAgICAgICAgcyArPSB0aGlzLnVzZXJJbmZvICsgJ0AnO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuaG9zdCkge1xuICAgICAgICAgIHMgKz0gdGhpcy5ob3N0O1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMucG9ydCkge1xuICAgICAgICAgIHMgKz0gJzonICsgdGhpcy5wb3J0O1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmICh0aGlzLnBhdGgpIHtcbiAgICAgICAgcyArPSB0aGlzLnBhdGg7XG4gICAgICB9XG5cbiAgICAgIGlmICh0aGlzLnF1ZXJ5KSB7XG4gICAgICAgIHMgKz0gJz8nICsgdGhpcy5xdWVyeTtcbiAgICAgIH1cblxuICAgICAgaWYgKHRoaXMuYW5jaG9yKSB7XG4gICAgICAgIHMgKz0gJyMnICsgdGhpcy5hbmNob3I7XG4gICAgICB9XG5cbiAgICAgIHRoaXMuc291cmNlID0gcztcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5zb3VyY2U7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgVVJJO1xuIl19