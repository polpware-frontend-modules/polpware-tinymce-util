/**
 * I18n class that handles translation of TinyMCE UI.
 * Uses po style with csharp style parameters.
 *
 * @class tinymce.util.I18n
 */
export interface RawString {
    raw: string;
}
type Primitive = string | number | boolean | Record<string | number, any> | Function;
export type TokenisedString = [string, ...Primitive[]];
export type Untranslated = Primitive | TokenisedString | RawString | null | undefined;
export type TranslatedString = string;
interface I18n {
    getData: () => Record<string, Record<string, string>>;
    setCode: (newCode: string) => void;
    getCode: () => string;
    add: (code: string, items: Record<string, string>) => void;
    translate: (text: Untranslated) => TranslatedString;
    isRtl: () => boolean;
    hasCode: (code: string) => boolean;
}
declare const I18n: I18n;
export default I18n;
//# sourceMappingURL=I18n.d.ts.map