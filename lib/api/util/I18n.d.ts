/**
 * Copyright (c) Tiny Technologies, Inc. All rights reserved.
 * Licensed under the LGPL or a commercial license.
 * For LGPL see License.txt in the project root for license information.
 * For commercial licenses see https://www.tiny.cloud/
 */
/**
 * I18n class that handles translation of TinyMCE UI.
 * Uses po style with csharp style parameters.
 *
 * @class tinymce.util.I18n
 */
export interface RawString {
    raw: string;
}
export declare type TokenisedString = string[];
export declare type Untranslated = any;
export declare type TranslatedString = string;
export declare type TranslateIfNeeded = Untranslated | TranslatedString;
interface I18n {
    getData(): Record<string, Record<string, string>>;
    setCode(newCode: string): void;
    getCode(): string;
    add(code: string, items: Record<string, string>): void;
    translate(text: Untranslated): TranslatedString;
    isRtl(): boolean;
    hasCode(code: string): boolean;
}
declare const I18n: I18n;
export default I18n;
