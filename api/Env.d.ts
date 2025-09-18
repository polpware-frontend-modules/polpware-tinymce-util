interface Version {
    major: number;
    minor: number;
}
interface Env {
    transparentSrc: string;
    documentMode: number;
    cacheSuffix: any;
    container: any;
    canHaveCSP: boolean;
    windowsPhone: boolean;
    browser: {
        current: string | undefined;
        version: Version;
        isEdge: () => boolean;
        isChromium: () => boolean;
        isIE: () => boolean;
        isOpera: () => boolean;
        isFirefox: () => boolean;
        isSafari: () => boolean;
    };
    os: {
        current: string | undefined;
        version: Version;
        isWindows: () => boolean;
        isiOS: () => boolean;
        isAndroid: () => boolean;
        isMacOS: () => boolean;
        isLinux: () => boolean;
        isSolaris: () => boolean;
        isFreeBSD: () => boolean;
        isChromeOS: () => boolean;
    };
    deviceType: {
        isiPad: () => boolean;
        isiPhone: () => boolean;
        isTablet: () => boolean;
        isPhone: () => boolean;
        isTouch: () => boolean;
        isWebView: () => boolean;
        isDesktop: () => boolean;
    };
}
declare const Env: Env;
export default Env;
//# sourceMappingURL=Env.d.ts.map