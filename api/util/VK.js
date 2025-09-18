import Env from '../Env';
/**
 * This file exposes a set of the common KeyCodes for use. Please grow it as needed.
 */
const VK = {
    BACKSPACE: 8,
    DELETE: 46,
    DOWN: 40,
    ENTER: 13,
    ESC: 27,
    LEFT: 37,
    RIGHT: 39,
    SPACEBAR: 32,
    TAB: 9,
    UP: 38,
    PAGE_UP: 33,
    PAGE_DOWN: 34,
    END: 35,
    HOME: 36,
    modifierPressed: (e) => {
        return e.shiftKey || e.ctrlKey || e.altKey || VK.metaKeyPressed(e);
    },
    metaKeyPressed: (e) => {
        // Check if ctrl or meta key is pressed. Edge case for AltGr on Windows where it produces ctrlKey+altKey states
        return Env.os.isMacOS() || Env.os.isiOS() ? e.metaKey : e.ctrlKey && !e.altKey;
    }
};
export default VK;
//# sourceMappingURL=VK.js.map