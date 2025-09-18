import { Fun, Obj, Type } from '@ephox/katamari';
// Note: The values here aren't used. This is just used as a hash map to see if the key exists
const deprecated = {
    keyLocation: true,
    layerX: true,
    layerY: true,
    returnValue: true,
    webkitMovementX: true,
    webkitMovementY: true,
    keyIdentifier: true,
    mozPressure: true
};
// Note: We can't rely on `instanceof` here as it won't work if the event was fired from another window.
// Additionally, the constructor name might be `MouseEvent` or similar so we can't rely on the constructor name.
const isNativeEvent = (event) => event instanceof Event || Type.isFunction(event.initEvent);
// Checks if it is our own isDefaultPrevented function
const hasIsDefaultPrevented = (event) => event.isDefaultPrevented === Fun.always || event.isDefaultPrevented === Fun.never;
// An event needs normalizing if it doesn't have the prevent default function or if it's a native event
const needsNormalizing = (event) => Type.isNullable(event.preventDefault) || isNativeEvent(event);
const clone = (originalEvent, data) => {
    const event = data ?? {};
    // Copy all properties from the original event
    for (const name in originalEvent) {
        // Some properties are deprecated and produces a warning so don't include them
        if (!Obj.has(deprecated, name)) {
            event[name] = originalEvent[name];
        }
    }
    // The composed path can't be cloned, so delegate instead
    if (Type.isNonNullable(originalEvent.composedPath)) {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        event.composedPath = () => originalEvent.composedPath();
    }
    // The getModifierState won't work when cloned, so delegate instead
    if (Type.isNonNullable(originalEvent.getModifierState)) {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        event.getModifierState = (keyArg) => originalEvent.getModifierState(keyArg);
    }
    // The getTargetRanges won't work when cloned, so delegate instead
    if (Type.isNonNullable(originalEvent.getTargetRanges)) {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        event.getTargetRanges = () => originalEvent.getTargetRanges();
    }
    return event;
};
const normalize = (type, originalEvent, fallbackTarget, data) => {
    const event = clone(originalEvent, data);
    event.type = type;
    // Normalize target IE uses srcElement
    if (Type.isNullable(event.target)) {
        event.target = event.srcElement ?? fallbackTarget;
    }
    if (needsNormalizing(originalEvent)) {
        // Add preventDefault method
        event.preventDefault = () => {
            event.defaultPrevented = true;
            event.isDefaultPrevented = Fun.always;
            // Execute preventDefault on the original event object
            if (Type.isFunction(originalEvent.preventDefault)) {
                originalEvent.preventDefault();
            }
        };
        // Add stopPropagation
        event.stopPropagation = () => {
            event.cancelBubble = true;
            event.isPropagationStopped = Fun.always;
            // Execute stopPropagation on the original event object
            if (Type.isFunction(originalEvent.stopPropagation)) {
                originalEvent.stopPropagation();
            }
        };
        // Add stopImmediatePropagation
        event.stopImmediatePropagation = () => {
            event.isImmediatePropagationStopped = Fun.always;
            event.stopPropagation();
        };
        // Add event delegation states
        if (!hasIsDefaultPrevented(event)) {
            event.isDefaultPrevented = event.defaultPrevented === true ? Fun.always : Fun.never;
            event.isPropagationStopped = event.cancelBubble === true ? Fun.always : Fun.never;
            event.isImmediatePropagationStopped = Fun.never;
        }
    }
    return event;
};
export { clone, normalize };
//# sourceMappingURL=EventUtils.js.map