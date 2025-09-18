export interface PartialEvent {
    readonly type?: string;
    readonly target?: any;
    readonly srcElement?: any;
    readonly isDefaultPrevented?: () => boolean;
    readonly preventDefault?: () => void;
    readonly isPropagationStopped?: () => boolean;
    readonly stopPropagation?: () => void;
    readonly isImmediatePropagationStopped?: () => boolean;
    readonly stopImmediatePropagation?: () => void;
    readonly composedPath?: () => EventTarget[];
    readonly getModifierState?: (keyArg: string) => boolean;
    readonly getTargetRanges?: () => StaticRange[];
    returnValue?: boolean;
    defaultPrevented?: boolean;
    cancelBubble?: boolean;
}
export type NormalizedEvent<E, T = any> = E & {
    readonly type: string;
    readonly target: T;
    readonly isDefaultPrevented: () => boolean;
    readonly preventDefault: () => void;
    readonly isPropagationStopped: () => boolean;
    readonly stopPropagation: () => void;
    readonly isImmediatePropagationStopped: () => boolean;
    readonly stopImmediatePropagation: () => void;
};
declare const clone: <T extends PartialEvent>(originalEvent: T, data?: T) => T;
declare const normalize: <T extends PartialEvent>(type: string, originalEvent: T, fallbackTarget: any, data?: T) => NormalizedEvent<T>;
export { clone, normalize };
//# sourceMappingURL=EventUtils.d.ts.map