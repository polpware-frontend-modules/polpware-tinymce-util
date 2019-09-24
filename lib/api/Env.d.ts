/**
 * Copyright (c) Tiny Technologies, Inc. All rights reserved.
 * Licensed under the LGPL or a commercial license.
 * For LGPL see License.txt in the project root for license information.
 * For commercial licenses see https://www.tiny.cloud/
 */
interface Env {
    opera: boolean;
    webkit: boolean;
    ie: boolean | number;
    gecko: boolean;
    mac: boolean;
    iOS: boolean;
    android: boolean;
    contentEditable: boolean;
    transparentSrc: string;
    caretAfter: boolean;
    range: boolean;
    documentMode: number;
    fileApi: boolean;
    ceFalse: boolean;
    cacheSuffix: any;
    container: any;
    experimentalShadowDom: boolean;
    canHaveCSP: boolean;
    desktop: boolean;
    windowsPhone: boolean;
}
declare const Env: Env;
export default Env;
