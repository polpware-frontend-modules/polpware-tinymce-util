/**
 * @license MIT License
 *
 * This file is a modern TypeScript conversion of a classical inheritance
 * utility, originally based on code by John Resig. It now uses native
 * ES module and class syntax.
 */
export interface IClassDefinition {
    init?: (...args: any[]) => void;
    Mixins?: any[];
    Methods?: string;
    Properties?: string;
    Statics?: Record<string, any>;
    Defaults?: Record<string, any>;
    [key: string]: any;
}
type PolpwareClassConstructor<T extends PolpwareClass = PolpwareClass> = {
    new (...args: any[]): T;
    extend<U extends typeof PolpwareClass>(this: U, prop: IClassDefinition): U;
    Defaults?: Record<string, any>;
};
/**
 * A base class that provides a classical inheritance-style `extend` method.
 * All other classes created with this system will inherit from this class.
 */
declare class PolpwareClass {
    init?(...args: any[]): void;
    protected _super?: (...args: any[]) => any;
    Mixins?: any[];
    static Defaults?: Record<string, any>;
    /**
     * Provides classical inheritance, based on code by John Resig.
     * This static method creates and returns a new class that inherits from `this` class.
     * @param prop An object defining the new class's properties, methods, and statics.
     * @returns A new class constructor.
     */
    static extend<T extends PolpwareClassConstructor>(this: T, prop: IClassDefinition): T;
}
export default PolpwareClass;
//# sourceMappingURL=Class.d.ts.map