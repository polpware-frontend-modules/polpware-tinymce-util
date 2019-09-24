/**
 * Copyright (c) Tiny Technologies, Inc. All rights reserved.
 * Licensed under the LGPL or a commercial license.
 * For LGPL see License.txt in the project root for license information.
 * For commercial licenses see https://www.tiny.cloud/
 */
import Tools from './Tools';
/**
 * This utility class is used for easier inheritance.
 *
 * Features:
 * * Exposed super functions: this._super();
 * * Mixins
 * * Dummy functions
 * * Property functions: var value = object.value(); and object.value(newValue);
 * * Static functions
 * * Defaults settings
 */
const each = Tools.each, extend = Tools.extend;
let extendClass, initializing;
const Class = function () {
};
const ɵ0 = Class;
// Provides classical inheritance, based on code made by John Resig
Class.extend = extendClass = function (prop) {
    const self = this;
    const _super = self.prototype;
    let prototype, name, member;
    // The dummy class constructor
    const Class = function () {
        let i, mixins, mixin;
        const self = this;
        // All construction is actually done in the init method
        if (!initializing) {
            // Run class constructor
            if (self.init) {
                self.init.apply(self, arguments);
            }
            // Run mixin constructors
            mixins = self.Mixins;
            if (mixins) {
                i = mixins.length;
                while (i--) {
                    mixin = mixins[i];
                    if (mixin.init) {
                        mixin.init.apply(self, arguments);
                    }
                }
            }
        }
    };
    // Dummy function, needs to be extended in order to provide functionality
    const dummy = function () {
        return this;
    };
    // Creates a overloaded method for the class
    // this enables you to use this._super(); to call the super function
    const createMethod = function (name, fn) {
        return function () {
            const self = this;
            const tmp = self._super;
            let ret;
            self._super = _super[name];
            ret = fn.apply(self, arguments);
            self._super = tmp;
            return ret;
        };
    };
    // Instantiate a base class (but only create the instance,
    // don't run the init constructor)
    initializing = true;
    /*eslint new-cap:0 */
    prototype = new self();
    initializing = false;
    // Add mixins
    if (prop.Mixins) {
        each(prop.Mixins, function (mixin) {
            for (const name in mixin) {
                if (name !== 'init') {
                    prop[name] = mixin[name];
                }
            }
        });
        if (_super.Mixins) {
            prop.Mixins = _super.Mixins.concat(prop.Mixins);
        }
    }
    // Generate dummy methods
    if (prop.Methods) {
        each(prop.Methods.split(','), function (name) {
            prop[name] = dummy;
        });
    }
    // Generate property methods
    if (prop.Properties) {
        each(prop.Properties.split(','), function (name) {
            const fieldName = '_' + name;
            prop[name] = function (value) {
                const self = this;
                // Set value
                if (value !== undefined) {
                    self[fieldName] = value;
                    return self;
                }
                // Get value
                return self[fieldName];
            };
        });
    }
    // Static functions
    if (prop.Statics) {
        each(prop.Statics, function (func, name) {
            Class[name] = func;
        });
    }
    // Default settings
    if (prop.Defaults && _super.Defaults) {
        prop.Defaults = extend({}, _super.Defaults, prop.Defaults);
    }
    // Copy the properties over onto the new prototype
    for (name in prop) {
        member = prop[name];
        if (typeof member === 'function' && _super[name]) {
            prototype[name] = createMethod(name, member);
        }
        else {
            prototype[name] = member;
        }
    }
    // Populate our constructed prototype object
    Class.prototype = prototype;
    // Enforce the constructor to be what we expect
    Class.constructor = Class;
    // And make this class extendable
    Class.extend = extendClass;
    return Class;
};
export default Class;
export { ɵ0 };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ2xhc3MuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AcG9scHdhcmUvdGlueW1jZS11dGlsLyIsInNvdXJjZXMiOlsibGliL2FwaS91dGlsL0NsYXNzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7OztHQUtHO0FBRUgsT0FBTyxLQUFLLE1BQU0sU0FBUyxDQUFDO0FBRTVCOzs7Ozs7Ozs7O0dBVUc7QUFFSCxNQUFNLElBQUksR0FBRyxLQUFLLENBQUMsSUFBSSxFQUFFLE1BQU0sR0FBRyxLQUFLLENBQUMsTUFBTSxDQUFDO0FBRS9DLElBQUksV0FBVyxFQUFFLFlBQVksQ0FBQztBQXlCOUIsTUFBTSxLQUFLLEdBQVU7QUFDckIsQ0FBQyxDQUFDOztBQUVGLG1FQUFtRTtBQUNuRSxLQUFLLENBQUMsTUFBTSxHQUFHLFdBQVcsR0FBRyxVQUFVLElBQVU7SUFDL0MsTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDO0lBQ2xCLE1BQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUM7SUFDOUIsSUFBSSxTQUFTLEVBQUUsSUFBSSxFQUFFLE1BQU0sQ0FBQztJQUU1Qiw4QkFBOEI7SUFDOUIsTUFBTSxLQUFLLEdBQUc7UUFDWixJQUFJLENBQUMsRUFBRSxNQUFNLEVBQUUsS0FBSyxDQUFDO1FBQ3JCLE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQztRQUVsQix1REFBdUQ7UUFDdkQsSUFBSSxDQUFDLFlBQVksRUFBRTtZQUNqQix3QkFBd0I7WUFDeEIsSUFBSSxJQUFJLENBQUMsSUFBSSxFQUFFO2dCQUNiLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxTQUFTLENBQUMsQ0FBQzthQUNsQztZQUVELHlCQUF5QjtZQUN6QixNQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQztZQUNyQixJQUFJLE1BQU0sRUFBRTtnQkFDVixDQUFDLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQztnQkFDbEIsT0FBTyxDQUFDLEVBQUUsRUFBRTtvQkFDVixLQUFLLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUNsQixJQUFJLEtBQUssQ0FBQyxJQUFJLEVBQUU7d0JBQ2QsS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLFNBQVMsQ0FBQyxDQUFDO3FCQUNuQztpQkFDRjthQUNGO1NBQ0Y7SUFDSCxDQUFDLENBQUM7SUFFRix5RUFBeUU7SUFDekUsTUFBTSxLQUFLLEdBQUc7UUFDWixPQUFPLElBQUksQ0FBQztJQUNkLENBQUMsQ0FBQztJQUVGLDRDQUE0QztJQUM1QyxvRUFBb0U7SUFDcEUsTUFBTSxZQUFZLEdBQUcsVUFBVSxJQUFJLEVBQUUsRUFBRTtRQUNyQyxPQUFPO1lBQ0wsTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDO1lBQ2xCLE1BQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUM7WUFDeEIsSUFBSSxHQUFHLENBQUM7WUFFUixJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUMzQixHQUFHLEdBQUcsRUFBRSxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsU0FBUyxDQUFDLENBQUM7WUFDaEMsSUFBSSxDQUFDLE1BQU0sR0FBRyxHQUFHLENBQUM7WUFFbEIsT0FBTyxHQUFHLENBQUM7UUFDYixDQUFDLENBQUM7SUFDSixDQUFDLENBQUM7SUFFRiwwREFBMEQ7SUFDMUQsa0NBQWtDO0lBQ2xDLFlBQVksR0FBRyxJQUFJLENBQUM7SUFFcEIscUJBQXFCO0lBQ3JCLFNBQVMsR0FBRyxJQUFJLElBQUksRUFBRSxDQUFDO0lBQ3ZCLFlBQVksR0FBRyxLQUFLLENBQUM7SUFFckIsYUFBYTtJQUNiLElBQUksSUFBSSxDQUFDLE1BQU0sRUFBRTtRQUNmLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLFVBQVUsS0FBSztZQUMvQixLQUFLLE1BQU0sSUFBSSxJQUFJLEtBQUssRUFBRTtnQkFDeEIsSUFBSSxJQUFJLEtBQUssTUFBTSxFQUFFO29CQUNuQixJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO2lCQUMxQjthQUNGO1FBQ0gsQ0FBQyxDQUFDLENBQUM7UUFFSCxJQUFJLE1BQU0sQ0FBQyxNQUFNLEVBQUU7WUFDakIsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7U0FDakQ7S0FDRjtJQUVELHlCQUF5QjtJQUN6QixJQUFJLElBQUksQ0FBQyxPQUFPLEVBQUU7UUFDaEIsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxFQUFFLFVBQVUsSUFBSTtZQUMxQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsS0FBSyxDQUFDO1FBQ3JCLENBQUMsQ0FBQyxDQUFDO0tBQ0o7SUFFRCw0QkFBNEI7SUFDNUIsSUFBSSxJQUFJLENBQUMsVUFBVSxFQUFFO1FBQ25CLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsRUFBRSxVQUFVLElBQUk7WUFDN0MsTUFBTSxTQUFTLEdBQUcsR0FBRyxHQUFHLElBQUksQ0FBQztZQUU3QixJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsVUFBVSxLQUFLO2dCQUMxQixNQUFNLElBQUksR0FBRyxJQUFJLENBQUM7Z0JBRWxCLFlBQVk7Z0JBQ1osSUFBSSxLQUFLLEtBQUssU0FBUyxFQUFFO29CQUN2QixJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsS0FBSyxDQUFDO29CQUV4QixPQUFPLElBQUksQ0FBQztpQkFDYjtnQkFFRCxZQUFZO2dCQUNaLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1lBQ3pCLENBQUMsQ0FBQztRQUNKLENBQUMsQ0FBQyxDQUFDO0tBQ0o7SUFFRCxtQkFBbUI7SUFDbkIsSUFBSSxJQUFJLENBQUMsT0FBTyxFQUFFO1FBQ2hCLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLFVBQVUsSUFBSSxFQUFFLElBQUk7WUFDckMsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQztRQUNyQixDQUFDLENBQUMsQ0FBQztLQUNKO0lBRUQsbUJBQW1CO0lBQ25CLElBQUksSUFBSSxDQUFDLFFBQVEsSUFBSSxNQUFNLENBQUMsUUFBUSxFQUFFO1FBQ3BDLElBQUksQ0FBQyxRQUFRLEdBQUcsTUFBTSxDQUFDLEVBQUUsRUFBRSxNQUFNLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztLQUM1RDtJQUVELGtEQUFrRDtJQUNsRCxLQUFLLElBQUksSUFBSSxJQUFJLEVBQUU7UUFDakIsTUFBTSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUVwQixJQUFJLE9BQU8sTUFBTSxLQUFLLFVBQVUsSUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLEVBQUU7WUFDaEQsU0FBUyxDQUFDLElBQUksQ0FBQyxHQUFHLFlBQVksQ0FBQyxJQUFJLEVBQUUsTUFBTSxDQUFDLENBQUM7U0FDOUM7YUFBTTtZQUNMLFNBQVMsQ0FBQyxJQUFJLENBQUMsR0FBRyxNQUFNLENBQUM7U0FDMUI7S0FDRjtJQUVELDRDQUE0QztJQUM1QyxLQUFLLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQztJQUU1QiwrQ0FBK0M7SUFDL0MsS0FBSyxDQUFDLFdBQVcsR0FBRyxLQUFLLENBQUM7SUFFMUIsaUNBQWlDO0lBQ2pDLEtBQUssQ0FBQyxNQUFNLEdBQUcsV0FBVyxDQUFDO0lBRTNCLE9BQU8sS0FBSyxDQUFDO0FBQ2YsQ0FBQyxDQUFDO0FBRUYsZUFBZSxLQUFLLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIENvcHlyaWdodCAoYykgVGlueSBUZWNobm9sb2dpZXMsIEluYy4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBMR1BMIG9yIGEgY29tbWVyY2lhbCBsaWNlbnNlLlxuICogRm9yIExHUEwgc2VlIExpY2Vuc2UudHh0IGluIHRoZSBwcm9qZWN0IHJvb3QgZm9yIGxpY2Vuc2UgaW5mb3JtYXRpb24uXG4gKiBGb3IgY29tbWVyY2lhbCBsaWNlbnNlcyBzZWUgaHR0cHM6Ly93d3cudGlueS5jbG91ZC9cbiAqL1xuXG5pbXBvcnQgVG9vbHMgZnJvbSAnLi9Ub29scyc7XG5cbi8qKlxuICogVGhpcyB1dGlsaXR5IGNsYXNzIGlzIHVzZWQgZm9yIGVhc2llciBpbmhlcml0YW5jZS5cbiAqXG4gKiBGZWF0dXJlczpcbiAqICogRXhwb3NlZCBzdXBlciBmdW5jdGlvbnM6IHRoaXMuX3N1cGVyKCk7XG4gKiAqIE1peGluc1xuICogKiBEdW1teSBmdW5jdGlvbnNcbiAqICogUHJvcGVydHkgZnVuY3Rpb25zOiB2YXIgdmFsdWUgPSBvYmplY3QudmFsdWUoKTsgYW5kIG9iamVjdC52YWx1ZShuZXdWYWx1ZSk7XG4gKiAqIFN0YXRpYyBmdW5jdGlvbnNcbiAqICogRGVmYXVsdHMgc2V0dGluZ3NcbiAqL1xuXG5jb25zdCBlYWNoID0gVG9vbHMuZWFjaCwgZXh0ZW5kID0gVG9vbHMuZXh0ZW5kO1xuXG5sZXQgZXh0ZW5kQ2xhc3MsIGluaXRpYWxpemluZztcblxuaW50ZXJmYWNlIFByb3Age1xuICBNaXhpbnM/OiBhbnk7XG4gIE1ldGhvZHM/OiBhbnk7XG4gIFByb3BlcnRpZXM/OiBhbnk7XG4gIFN0YXRpY3M/OiBhbnk7XG4gIERlZmF1bHRzPzogYW55O1xufVxuXG5pbnRlcmZhY2UgQ2xhc3Mge1xuICBwcm90b3R5cGU6IENsYXNzO1xuXG4gIGV4dGVuZCAocHJvcDogUHJvcCk6IEV4dGVuZGVkQ2xhc3M7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgRXh0ZW5kZWRDbGFzcyBleHRlbmRzIENsYXNzIHtcbiAgY29uc3RydWN0b3I6IEV4dGVuZGVkQ2xhc3M7XG5cbiAgaW5pdD8gKC4uLmFyZ3M6IGFueVtdKTogdm9pZDtcblxuICAvLyBUT0RPIFNlZSBpZiB3ZSBjYW4gdHlwZSB0aGlzIHRvIGFsbG93IGFkZGluZyB0aGUgcHJvcHMgZHluYW1pY2FsbHlcbiAgW2tleTogc3RyaW5nXTogYW55O1xufVxuXG5jb25zdCBDbGFzczogQ2xhc3MgPSBmdW5jdGlvbiAoKSB7XG59O1xuXG4vLyBQcm92aWRlcyBjbGFzc2ljYWwgaW5oZXJpdGFuY2UsIGJhc2VkIG9uIGNvZGUgbWFkZSBieSBKb2huIFJlc2lnXG5DbGFzcy5leHRlbmQgPSBleHRlbmRDbGFzcyA9IGZ1bmN0aW9uIChwcm9wOiBQcm9wKTogRXh0ZW5kZWRDbGFzcyB7XG4gIGNvbnN0IHNlbGYgPSB0aGlzO1xuICBjb25zdCBfc3VwZXIgPSBzZWxmLnByb3RvdHlwZTtcbiAgbGV0IHByb3RvdHlwZSwgbmFtZSwgbWVtYmVyO1xuXG4gIC8vIFRoZSBkdW1teSBjbGFzcyBjb25zdHJ1Y3RvclxuICBjb25zdCBDbGFzcyA9IGZ1bmN0aW9uICgpIHtcbiAgICBsZXQgaSwgbWl4aW5zLCBtaXhpbjtcbiAgICBjb25zdCBzZWxmID0gdGhpcztcblxuICAgIC8vIEFsbCBjb25zdHJ1Y3Rpb24gaXMgYWN0dWFsbHkgZG9uZSBpbiB0aGUgaW5pdCBtZXRob2RcbiAgICBpZiAoIWluaXRpYWxpemluZykge1xuICAgICAgLy8gUnVuIGNsYXNzIGNvbnN0cnVjdG9yXG4gICAgICBpZiAoc2VsZi5pbml0KSB7XG4gICAgICAgIHNlbGYuaW5pdC5hcHBseShzZWxmLCBhcmd1bWVudHMpO1xuICAgICAgfVxuXG4gICAgICAvLyBSdW4gbWl4aW4gY29uc3RydWN0b3JzXG4gICAgICBtaXhpbnMgPSBzZWxmLk1peGlucztcbiAgICAgIGlmIChtaXhpbnMpIHtcbiAgICAgICAgaSA9IG1peGlucy5sZW5ndGg7XG4gICAgICAgIHdoaWxlIChpLS0pIHtcbiAgICAgICAgICBtaXhpbiA9IG1peGluc1tpXTtcbiAgICAgICAgICBpZiAobWl4aW4uaW5pdCkge1xuICAgICAgICAgICAgbWl4aW4uaW5pdC5hcHBseShzZWxmLCBhcmd1bWVudHMpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfTtcblxuICAvLyBEdW1teSBmdW5jdGlvbiwgbmVlZHMgdG8gYmUgZXh0ZW5kZWQgaW4gb3JkZXIgdG8gcHJvdmlkZSBmdW5jdGlvbmFsaXR5XG4gIGNvbnN0IGR1bW15ID0gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB0aGlzO1xuICB9O1xuXG4gIC8vIENyZWF0ZXMgYSBvdmVybG9hZGVkIG1ldGhvZCBmb3IgdGhlIGNsYXNzXG4gIC8vIHRoaXMgZW5hYmxlcyB5b3UgdG8gdXNlIHRoaXMuX3N1cGVyKCk7IHRvIGNhbGwgdGhlIHN1cGVyIGZ1bmN0aW9uXG4gIGNvbnN0IGNyZWF0ZU1ldGhvZCA9IGZ1bmN0aW9uIChuYW1lLCBmbikge1xuICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICBjb25zdCBzZWxmID0gdGhpcztcbiAgICAgIGNvbnN0IHRtcCA9IHNlbGYuX3N1cGVyO1xuICAgICAgbGV0IHJldDtcblxuICAgICAgc2VsZi5fc3VwZXIgPSBfc3VwZXJbbmFtZV07XG4gICAgICByZXQgPSBmbi5hcHBseShzZWxmLCBhcmd1bWVudHMpO1xuICAgICAgc2VsZi5fc3VwZXIgPSB0bXA7XG5cbiAgICAgIHJldHVybiByZXQ7XG4gICAgfTtcbiAgfTtcblxuICAvLyBJbnN0YW50aWF0ZSBhIGJhc2UgY2xhc3MgKGJ1dCBvbmx5IGNyZWF0ZSB0aGUgaW5zdGFuY2UsXG4gIC8vIGRvbid0IHJ1biB0aGUgaW5pdCBjb25zdHJ1Y3RvcilcbiAgaW5pdGlhbGl6aW5nID0gdHJ1ZTtcblxuICAvKmVzbGludCBuZXctY2FwOjAgKi9cbiAgcHJvdG90eXBlID0gbmV3IHNlbGYoKTtcbiAgaW5pdGlhbGl6aW5nID0gZmFsc2U7XG5cbiAgLy8gQWRkIG1peGluc1xuICBpZiAocHJvcC5NaXhpbnMpIHtcbiAgICBlYWNoKHByb3AuTWl4aW5zLCBmdW5jdGlvbiAobWl4aW4pIHtcbiAgICAgIGZvciAoY29uc3QgbmFtZSBpbiBtaXhpbikge1xuICAgICAgICBpZiAobmFtZSAhPT0gJ2luaXQnKSB7XG4gICAgICAgICAgcHJvcFtuYW1lXSA9IG1peGluW25hbWVdO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBpZiAoX3N1cGVyLk1peGlucykge1xuICAgICAgcHJvcC5NaXhpbnMgPSBfc3VwZXIuTWl4aW5zLmNvbmNhdChwcm9wLk1peGlucyk7XG4gICAgfVxuICB9XG5cbiAgLy8gR2VuZXJhdGUgZHVtbXkgbWV0aG9kc1xuICBpZiAocHJvcC5NZXRob2RzKSB7XG4gICAgZWFjaChwcm9wLk1ldGhvZHMuc3BsaXQoJywnKSwgZnVuY3Rpb24gKG5hbWUpIHtcbiAgICAgIHByb3BbbmFtZV0gPSBkdW1teTtcbiAgICB9KTtcbiAgfVxuXG4gIC8vIEdlbmVyYXRlIHByb3BlcnR5IG1ldGhvZHNcbiAgaWYgKHByb3AuUHJvcGVydGllcykge1xuICAgIGVhY2gocHJvcC5Qcm9wZXJ0aWVzLnNwbGl0KCcsJyksIGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgICBjb25zdCBmaWVsZE5hbWUgPSAnXycgKyBuYW1lO1xuXG4gICAgICBwcm9wW25hbWVdID0gZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgIGNvbnN0IHNlbGYgPSB0aGlzO1xuXG4gICAgICAgIC8vIFNldCB2YWx1ZVxuICAgICAgICBpZiAodmFsdWUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIHNlbGZbZmllbGROYW1lXSA9IHZhbHVlO1xuXG4gICAgICAgICAgcmV0dXJuIHNlbGY7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBHZXQgdmFsdWVcbiAgICAgICAgcmV0dXJuIHNlbGZbZmllbGROYW1lXTtcbiAgICAgIH07XG4gICAgfSk7XG4gIH1cblxuICAvLyBTdGF0aWMgZnVuY3Rpb25zXG4gIGlmIChwcm9wLlN0YXRpY3MpIHtcbiAgICBlYWNoKHByb3AuU3RhdGljcywgZnVuY3Rpb24gKGZ1bmMsIG5hbWUpIHtcbiAgICAgIENsYXNzW25hbWVdID0gZnVuYztcbiAgICB9KTtcbiAgfVxuXG4gIC8vIERlZmF1bHQgc2V0dGluZ3NcbiAgaWYgKHByb3AuRGVmYXVsdHMgJiYgX3N1cGVyLkRlZmF1bHRzKSB7XG4gICAgcHJvcC5EZWZhdWx0cyA9IGV4dGVuZCh7fSwgX3N1cGVyLkRlZmF1bHRzLCBwcm9wLkRlZmF1bHRzKTtcbiAgfVxuXG4gIC8vIENvcHkgdGhlIHByb3BlcnRpZXMgb3ZlciBvbnRvIHRoZSBuZXcgcHJvdG90eXBlXG4gIGZvciAobmFtZSBpbiBwcm9wKSB7XG4gICAgbWVtYmVyID0gcHJvcFtuYW1lXTtcblxuICAgIGlmICh0eXBlb2YgbWVtYmVyID09PSAnZnVuY3Rpb24nICYmIF9zdXBlcltuYW1lXSkge1xuICAgICAgcHJvdG90eXBlW25hbWVdID0gY3JlYXRlTWV0aG9kKG5hbWUsIG1lbWJlcik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHByb3RvdHlwZVtuYW1lXSA9IG1lbWJlcjtcbiAgICB9XG4gIH1cblxuICAvLyBQb3B1bGF0ZSBvdXIgY29uc3RydWN0ZWQgcHJvdG90eXBlIG9iamVjdFxuICBDbGFzcy5wcm90b3R5cGUgPSBwcm90b3R5cGU7XG5cbiAgLy8gRW5mb3JjZSB0aGUgY29uc3RydWN0b3IgdG8gYmUgd2hhdCB3ZSBleHBlY3RcbiAgQ2xhc3MuY29uc3RydWN0b3IgPSBDbGFzcztcblxuICAvLyBBbmQgbWFrZSB0aGlzIGNsYXNzIGV4dGVuZGFibGVcbiAgQ2xhc3MuZXh0ZW5kID0gZXh0ZW5kQ2xhc3M7XG5cbiAgcmV0dXJuIENsYXNzO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgQ2xhc3M7Il19