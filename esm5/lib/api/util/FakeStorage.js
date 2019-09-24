/**
 * Copyright (c) Tiny Technologies, Inc. All rights reserved.
 * Licensed under the LGPL or a commercial license.
 * For LGPL see License.txt in the project root for license information.
 * For commercial licenses see https://www.tiny.cloud/
 */
// Simple stub of localstorage for IE11 with strict security settings #TINY-1782
export var create = function () { return (function () {
    var data = {};
    var keys = [];
    var storage = {
        getItem: function (key) {
            var item = data[key];
            return item ? item : null;
        },
        setItem: function (key, value) {
            keys.push(key);
            data[key] = String(value);
        },
        key: function (index) {
            return keys[index];
        },
        removeItem: function (key) {
            keys = keys.filter(function (k) { return k === key; });
            delete data[key];
        },
        clear: function () {
            keys = [];
            data = {};
        },
        length: 0
    };
    Object.defineProperty(storage, 'length', {
        get: function () { return keys.length; },
        configurable: false,
        enumerable: false
    });
    return storage;
})(); };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRmFrZVN0b3JhZ2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AcG9scHdhcmUvdGlueW1jZS11dGlsLyIsInNvdXJjZXMiOlsibGliL2FwaS91dGlsL0Zha2VTdG9yYWdlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7OztHQUtHO0FBRUgsZ0ZBQWdGO0FBQ2hGLE1BQU0sQ0FBQyxJQUFNLE1BQU0sR0FBRyxjQUFNLE9BQUEsQ0FBQztJQUMzQixJQUFJLElBQUksR0FBRyxFQUFFLENBQUM7SUFDZCxJQUFJLElBQUksR0FBRyxFQUFFLENBQUM7SUFDZCxJQUFNLE9BQU8sR0FBRztRQUNkLE9BQU8sWUFBQyxHQUFHO1lBQ1QsSUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ3ZCLE9BQU8sSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztRQUM1QixDQUFDO1FBQ0QsT0FBTyxZQUFDLEdBQUcsRUFBRSxLQUFLO1lBQ2hCLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDZixJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQzVCLENBQUM7UUFDRCxHQUFHLFlBQUMsS0FBSztZQUNQLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3JCLENBQUM7UUFDRCxVQUFVLFlBQUMsR0FBRztZQUNaLElBQUksR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLFVBQUMsQ0FBQyxJQUFLLE9BQUEsQ0FBQyxLQUFLLEdBQUcsRUFBVCxDQUFTLENBQUMsQ0FBQztZQUNyQyxPQUFPLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNuQixDQUFDO1FBQ0QsS0FBSztZQUNILElBQUksR0FBRyxFQUFFLENBQUM7WUFDVixJQUFJLEdBQUcsRUFBRSxDQUFDO1FBQ1osQ0FBQztRQUNELE1BQU0sRUFBRSxDQUFDO0tBQ1YsQ0FBQztJQUVGLE1BQU0sQ0FBQyxjQUFjLENBQUMsT0FBTyxFQUFFLFFBQVEsRUFBRTtRQUN2QyxHQUFHLGdCQUFNLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7UUFDOUIsWUFBWSxFQUFFLEtBQUs7UUFDbkIsVUFBVSxFQUFFLEtBQUs7S0FDbEIsQ0FBQyxDQUFDO0lBRUgsT0FBTyxPQUFPLENBQUM7QUFDakIsQ0FBQyxDQUFDLEVBQUUsRUFqQ3dCLENBaUN4QixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIFRpbnkgVGVjaG5vbG9naWVzLCBJbmMuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgTEdQTCBvciBhIGNvbW1lcmNpYWwgbGljZW5zZS5cbiAqIEZvciBMR1BMIHNlZSBMaWNlbnNlLnR4dCBpbiB0aGUgcHJvamVjdCByb290IGZvciBsaWNlbnNlIGluZm9ybWF0aW9uLlxuICogRm9yIGNvbW1lcmNpYWwgbGljZW5zZXMgc2VlIGh0dHBzOi8vd3d3LnRpbnkuY2xvdWQvXG4gKi9cblxuLy8gU2ltcGxlIHN0dWIgb2YgbG9jYWxzdG9yYWdlIGZvciBJRTExIHdpdGggc3RyaWN0IHNlY3VyaXR5IHNldHRpbmdzICNUSU5ZLTE3ODJcbmV4cG9ydCBjb25zdCBjcmVhdGUgPSAoKSA9PiAoZnVuY3Rpb24gKCkge1xuICBsZXQgZGF0YSA9IHt9O1xuICBsZXQga2V5cyA9IFtdO1xuICBjb25zdCBzdG9yYWdlID0ge1xuICAgIGdldEl0ZW0oa2V5KSB7XG4gICAgICBjb25zdCBpdGVtID0gZGF0YVtrZXldO1xuICAgICAgcmV0dXJuIGl0ZW0gPyBpdGVtIDogbnVsbDtcbiAgICB9LFxuICAgIHNldEl0ZW0oa2V5LCB2YWx1ZSkge1xuICAgICAga2V5cy5wdXNoKGtleSk7XG4gICAgICBkYXRhW2tleV0gPSBTdHJpbmcodmFsdWUpO1xuICAgIH0sXG4gICAga2V5KGluZGV4KSB7XG4gICAgICByZXR1cm4ga2V5c1tpbmRleF07XG4gICAgfSxcbiAgICByZW1vdmVJdGVtKGtleSkge1xuICAgICAga2V5cyA9IGtleXMuZmlsdGVyKChrKSA9PiBrID09PSBrZXkpO1xuICAgICAgZGVsZXRlIGRhdGFba2V5XTtcbiAgICB9LFxuICAgIGNsZWFyKCkge1xuICAgICAga2V5cyA9IFtdO1xuICAgICAgZGF0YSA9IHt9O1xuICAgIH0sXG4gICAgbGVuZ3RoOiAwXG4gIH07XG5cbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHN0b3JhZ2UsICdsZW5ndGgnLCB7XG4gICAgZ2V0ICgpIHsgcmV0dXJuIGtleXMubGVuZ3RoOyB9LFxuICAgIGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gICAgZW51bWVyYWJsZTogZmFsc2VcbiAgfSk7XG5cbiAgcmV0dXJuIHN0b3JhZ2U7XG59KSgpOyJdfQ==