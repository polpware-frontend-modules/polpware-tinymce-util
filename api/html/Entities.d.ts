export interface EntitiesMap {
    [name: string]: string;
}
interface Entities {
    encodeRaw: (text: string, attr?: boolean) => string;
    encodeAllRaw: (text: string) => string;
    encodeNumeric: (text: string, attr?: boolean) => string;
    encodeNamed: (text: string, attr?: boolean, entities?: EntitiesMap) => string;
    getEncodeFunc: (name: string, entities?: string) => (text: string, attr?: boolean) => string;
    decode: (text: string) => string;
}
declare const Entities: Entities;
export default Entities;
//# sourceMappingURL=Entities.d.ts.map