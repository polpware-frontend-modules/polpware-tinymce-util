interface KeyboardLikeEvent {
    shiftKey: boolean;
    ctrlKey: boolean;
    altKey: boolean;
    metaKey: boolean;
}
interface VK {
    BACKSPACE: number;
    DELETE: number;
    DOWN: number;
    ENTER: number;
    ESC: number;
    LEFT: number;
    RIGHT: number;
    SPACEBAR: number;
    TAB: number;
    UP: number;
    PAGE_UP: number;
    PAGE_DOWN: number;
    END: number;
    HOME: number;
    modifierPressed: (e: KeyboardLikeEvent) => boolean;
    metaKeyPressed: (e: KeyboardLikeEvent) => boolean;
}
/**
 * This file exposes a set of the common KeyCodes for use. Please grow it as needed.
 */
declare const VK: VK;
export default VK;
//# sourceMappingURL=VK.d.ts.map