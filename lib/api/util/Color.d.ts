/**
 * Copyright (c) Tiny Technologies, Inc. All rights reserved.
 * Licensed under the LGPL or a commercial license.
 * For LGPL see License.txt in the project root for license information.
 * For commercial licenses see https://www.tiny.cloud/
 */
interface RGB {
    r: number;
    g: number;
    b: number;
}
interface HSV {
    h: number;
    s: number;
    v: number;
}
interface Color {
    toRgb(): RGB;
    toHsv(): HSV;
    toHex(): string;
    parse(value: string | RGB | HSV): Color;
}
/**
 * Constructs a new color instance.
 *
 * @constructor
 * @method Color
 * @param {String} value Optional initial value to parse.
 */
declare const Color: (value?: any) => Color;
export default Color;
